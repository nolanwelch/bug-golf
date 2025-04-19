import bodyParser from "body-parser";
import express from "express";
import ivm from "isolated-vm";

const app = express();
app.use(bodyParser.json());

app.post("/run", async (req, res) => {
  const { userCode, harnessCode, timeoutMs = 1000, memoryMB = 128 } = req.body;

  // Create a new isolate with a memory cap
  const isolate = new ivm.Isolate({ memoryLimit: memoryMB });

  // Create a context and expose a safe global object
  const context = await isolate.createContext();
  const jail = context.global;
  // Make the global object available inside the sandbox
  await jail.set("global", jail.derefInto());

  // Combine user code + harness into one async IIFE
  const scriptSource = `
    (async function(){
      "use strict";
      ${userCode}
      // your harnessCode should return or throw
      return (async () => {
        ${harnessCode}
      })();
    })()
  `;

  try {
    const script = await isolate.compileScript(scriptSource);
    const resultRef = await script.run(context, {
      timeout: timeoutMs,
      // “copy” ensures primitives/objects are transferred back, not references
      result: { copy: true },
    });

    // If it's a Reference to a promise, await it inside the sandbox.
    //  Otherwise, it's already the final value.
    let result;
    if (resultRef && typeof resultRef.then === "function") {
      // resultRef is a promise-value inside the isolate
      result = await resultRef.copy();
    } else {
      result = resultRef;
    }

    return res.json({ success: true, result });
  } catch (err) {
    // Capture timeout, OOM, syntax errors, runtime errors, etc.
    return res.json({
      success: false,
      error: err.message || String(err),
    });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Sandbox (isolated-vm) listening on :${port}`);
});

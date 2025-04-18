// src/components/ChallengeArea.tsx
import Editor from "@monaco-editor/react";

function ChallengeArea() {
  const initialCode = `function add(a, b) {
  return a - b; // Fix this bug!
}`;

  return (
    <div className="mb-6">
      <Editor
        height="300px"
        defaultLanguage="javascript"
        defaultValue={initialCode}
        theme="vs-dark"
        options={{ readOnly: false }}
      />
    </div>
  );
}

export default ChallengeArea;

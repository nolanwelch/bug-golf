import { Kata, TestCase } from "@/shared/schema/kata.schema";
import { FormEvent, useState } from "react";

export default function NewKataForm() {
  const [form, setForm] = useState({
    description: "",
    starterCode: "",
    testCases: "[]",
  });
  const [parsedTestCases, setParsedTestCases] = useState<TestCase[]>([]);
  const [jsonError, setJsonError] = useState<string | null>(null);

  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));

    if (name === "testCases") {
      try {
        const parsed = JSON.parse(value) as TestCase[];

        // Quick shape check
        if (!Array.isArray(parsed)) throw new Error("Must be an array");
        parsed.forEach((tc, i) => {
          if (!Array.isArray(tc.args))
            throw new Error(`testCases[${i}].args must be an array`);
          if (!("expected" in tc))
            throw new Error(`testCases[${i}] missing \`expected\``);
        });

        setParsedTestCases(parsed);
        setJsonError(null);
      } catch (err) {
        setParsedTestCases([]);
        setJsonError((err as Error).message);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (jsonError) {
      return; // Should never happen if button disabled
    }

    setSuccess(false);

    const payload: Omit<Kata, "description" | "starterCode" | "testCases"> & {
      description: string;
      starterCode: string;
      testCases: TestCase[];
    } = {
      description: form.description,
      starterCode: form.starterCode,
      testCases: parsedTestCases,
    };

    try {
      const res = await fetch("/api/katas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error(await res.text());
      }
      setSuccess(true);

      // Reset the form (testCases back to JSON string)
      setForm({ description: "", starterCode: "", testCases: "[]" });
      setParsedTestCases([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <h2 className="text-2xl font-bold">Create a New Kata</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {success && (
            <div className="text-green-600 bg-green-100 p-2 rounded">
              Kata created!
            </div>
          )}

          {/* Description */}
          <div>
            <label htmlFor="description" className="block font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded p-2"
              required
            />
          </div>

          {/* Starter Code */}
          <div>
            <label htmlFor="starterCode" className="block font-medium mb-1">
              Starter Code
            </label>
            <textarea
              id="starterCode"
              name="starterCode"
              value={form.starterCode}
              onChange={handleChange}
              rows={6}
              className="w-full font-mono text-sm border rounded p-2"
              required
            />
          </div>

          {/* Test Cases JSON */}
          <div>
            <label htmlFor="testCases" className="block font-medium mb-1">
              Test Cases (JSON)
            </label>
            <textarea
              id="testCases"
              name="testCases"
              value={form.testCases}
              onChange={handleChange}
              rows={6}
              className={`w-full font-mono text-sm border rounded p-2 ${
                jsonError ? "border-red-500" : ""
              }`}
              required
            />
            {jsonError && (
              <p className="text-red-600 text-sm mt-1">{jsonError}</p>
            )}
          </div>

          <button
            type="submit"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={!!jsonError}
          >
            Create Kata
          </button>
        </form>
      </div>
    </div>
  );
}

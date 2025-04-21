import { CreateKataInput } from "@/shared/schema/kata.schema";
import { FormEvent, useState } from "react";

export default function NewKataForm() {
  const [form, setForm] = useState<CreateKataInput>({
    description: "",
    starterCode: "",
    testCode: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    try {
      const res = await fetch("/api/katas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await res.text());
      setSuccess(true);
      setForm({ description: "", starterCode: "", testCode: "" });
    } catch (err) {
      console.log(err);
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

          <div>
            <label htmlFor="testCode" className="block font-medium mb-1">
              Test Code
            </label>
            <textarea
              id="testCode"
              name="testCode"
              value={form.testCode}
              onChange={handleChange}
              rows={6}
              className="w-full font-mono text-sm border rounded p-2"
              required
            />
          </div>

          <button
            type="submit"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Kata
          </button>
        </form>
      </div>
    </div>
  );
}

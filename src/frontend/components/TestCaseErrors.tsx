import { TestCaseResult } from "@/shared/api/schema/kata.schema";

export interface TestCaseErrorsProps {
  failures: Array<TestCaseResult>;
}

export default function TestCaseErrors({ failures }: TestCaseErrorsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-red-700">Failed:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {failures.map((failure, idx) => (
          <div
            key={idx}
            className="border border-red-400 bg-red-50 p-4 rounded-lg shadow"
          >
            <div className="text-sm text-gray-600 mb-2">Input:</div>
            <div className="bg-white p-2 rounded mb-2 text-sm font-mono shadow-inner">
              {failure.input
                ? JSON.stringify(failure.input)
                : "(input not captured)"}
            </div>

            <div className="text-sm text-gray-600 mb-2">Expected Output:</div>
            <div className="bg-white p-2 rounded mb-2 text-sm font-mono shadow-inner">
              {JSON.stringify(failure.expectedOutput)}
            </div>

            <div className="text-sm text-gray-600 mb-2">Actual Output:</div>
            <div className="bg-white p-2 rounded text-sm font-mono shadow-inner">
              {JSON.stringify(failure.actualOutput)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

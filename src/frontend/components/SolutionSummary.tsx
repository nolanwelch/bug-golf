import { formatTime } from "@/shared/utils/format";

export interface SolutionSummaryProps {
  keystrokeCount: number;
  editDistance: number;
  timeTaken: number;
  score: number;
}

export default function SolutionSummary({
  keystrokeCount,
  editDistance,
  timeTaken,
  score,
}: SolutionSummaryProps) {
  const shareText = `I solved today's challenge with ${keystrokeCount} keystrokes and an edit distance of ${editDistance} in ${formatTime(timeTaken)}! (Score: ${score}) 🏆 #BugGolf`;

  return (
    <div className="mt-8 p-6 bg-green-50 rounded-lg shadow space-y-4">
      <h2 className="text-lg font-bold text-green-700">🎉 You did it!</h2>

      <div className="text-gray-700 text-sm text-center">{shareText}</div>

      <button
        onClick={() => {
          navigator.clipboard.writeText(shareText);
        }}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition"
      >
        Copy to Clipboard
      </button>
    </div>
  );
}

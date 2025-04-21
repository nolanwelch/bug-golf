import { PublicKata, publicKataSchema } from "@/shared/schema/kata.schema";
import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";

export interface ChallengeAreaProps {
  kataId: string;
}

function ChallengeArea({ kataId }: ChallengeAreaProps) {
  const [kata, setKata] = useState<PublicKata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state
    setKata(null);
    setError(null);
    setLoading(true);

    (async () => {
      try {
        const resp = await fetch(`/api/katas/${kataId}`);
        if (!resp.ok) {
          throw new Error(`Status ${resp.status}`);
        }
        const data = await resp.json();
        const parsed = publicKataSchema.safeParse(data);
        if (!parsed.success) {
          console.error(`Kata parse error: ${parsed.error}`);
          throw new Error("Invalid kata payload");
        }
        setKata(parsed.data);
      } catch (err) {
        setError(err as string);
      } finally {
        setLoading(false);
      }
    })();
  }, [kataId]);

  if (loading) {
    return (
      <div
        className="max-w-4xl mx-auto py-12 px-6 text-center"
        style={{ height: "200px" }}
      />
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-6 text-red-500 text-center">
        Error: {error}
      </div>
    );
  }

  if (!kata) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-6 text-gray-500 text-center">
        No kata assigned for today.
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      <Editor
        height="200px"
        defaultLanguage="javascript"
        loading=""
        defaultValue={kata!.starterCode}
        theme="vs-light"
        options={{
          readOnly: false,
          fontSize: 14,
          wordWrap: "on",
          folding: false,
          // Customize editor highlighting
          renderLineHighlight: "gutter",
          occurrencesHighlight: "off",
          matchBrackets: "near",
          minimap: { enabled: false },
          overviewRulerLanes: 0,
          // Prevent extra empty space at the bottom
          scrollBeyondLastLine: false,
          // Turn off smooth (animated) scrolling
          smoothScrolling: false,

          // Hide both vertical & horizontal scrollbars
          scrollbar: {
            vertical: "hidden",
            horizontal: "hidden",
            // don’t steal mouse wheel events
            alwaysConsumeMouseWheel: false,
          },

          // Disable all mouse‑wheel scrolling
          mouseWheelScrollSensitivity: 0,
        }}
      />
    </div>
  );
}

export default ChallengeArea;

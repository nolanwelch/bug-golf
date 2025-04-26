import { Kata } from "@/shared/schema/kata.schema";
import { Editor } from "@monaco-editor/react";
import { Dispatch, SetStateAction, useEffect } from "react";

export interface ChallengeAreaProps {
  submitted: boolean;
  kata: Kata | null;
  setKeystrokeCount: Dispatch<SetStateAction<number>>;
  setOriginalCode: Dispatch<SetStateAction<string>>;
  userCodeState: [string, Dispatch<SetStateAction<string>>];
}

function ChallengeArea({
  submitted,
  kata,
  setKeystrokeCount,
  setOriginalCode,
  userCodeState,
}: ChallengeAreaProps) {
  const [userCode, setUserCode] = userCodeState;

  useEffect(() => {
    if (kata) {
      setOriginalCode(kata.starterCode);
      setUserCode(kata.starterCode);
    }
  }, [kata, setOriginalCode, setUserCode]);

  if (!kata) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-6 text-gray-500 text-center">
        No kata assigned for today.
      </div>
    );
  }

  return (
    <div
      className="rounded-lg overflow-hidden shadow-md"
      tabIndex={0}
      autoFocus={true}
      // Count keystrokes
      onKeyDownCapture={() => {
        if (submitted) return;
        setKeystrokeCount((prev) => prev + 1);
      }}
    >
      <Editor
        value={userCode}
        // Capture user code
        onChange={(code) => {
          if (submitted) return;
          setUserCode(code ?? "");
        }}
        // Configure appearance
        height="200px"
        defaultLanguage="javascript"
        loading=""
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

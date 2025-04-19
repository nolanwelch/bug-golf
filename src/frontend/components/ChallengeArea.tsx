import Editor from "@monaco-editor/react";

function ChallengeArea() {
  const initialCode = `function add(a, b) {
  return a - b; // Fix this bug!
}`;

  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      <Editor
        height="200px"
        defaultLanguage="javascript"
        defaultValue={initialCode}
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

import Editor from "@monaco-editor/react";

function ChallengeArea() {
  const initialCode = `function add(a, b) {
  return a - b; // Fix this bug!
}`;

  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      <Editor
        height="320px"
        defaultLanguage="javascript"
        defaultValue={initialCode}
        theme="vs-light"
        options={{
          readOnly: false,
          fontSize: 14,
          minimap: { enabled: false },
        }}
      />
    </div>
  );
}

export default ChallengeArea;

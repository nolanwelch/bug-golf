function Instructions() {
  return (
    <section className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg shadow-sm">
      <h2 className="font-semibold text-xl text-green-700 mb-3">
        How to Play 🏌️
      </h2>
      <ul className="list-disc ml-5 space-y-1 text-gray-700">
        <li>
          <b>Minimize Keystrokes</b>: Every keypress counts!
        </li>
        <li>
          <b>Smallest Diff</b>: Only change what’s broken.
        </li>
        <li>
          <b>Fastest Solution</b>: Beat the clock.
        </li>
      </ul>
    </section>
  );
}

export default Instructions;

function Scoreboard() {
  return (
    <section className="bg-white p-4 shadow rounded text-gray-700">
      <h3 className="font-semibold">Your Stats</h3>
      <ul className="mt-2 space-y-1">
        <li>📝 Keystrokes: --</li>
        <li>🔍 Edit Distance: --</li>
        <li>⏱️ Time Taken: --</li>
      </ul>
    </section>
  );
}

export default Scoreboard;

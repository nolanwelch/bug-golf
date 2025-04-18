function Scoreboard() {
  const stats = [
    { label: "Keystrokes", value: "--", icon: "⌨️" },
    { label: "Edit Distance", value: "--", icon: "✂️" },
    { label: "Time Taken", value: "--", icon: "⏱️" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map(({ label, value, icon }) => (
        <div
          key={label}
          className="bg-white p-4 rounded-lg shadow-sm text-center"
        >
          <div className="text-2xl">{icon}</div>
          <div className="mt-1 text-xl font-semibold">{value}</div>
          <div className="text-gray-500 text-sm">{label}</div>
        </div>
      ))}
    </div>
  );
}

export default Scoreboard;

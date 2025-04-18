function ActionButtons() {
  return (
    <div className="flex justify-center gap-4 mb-8">
      <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
        Start Challenge
      </button>
      <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded">
        Reset Edits
      </button>
      <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
        Submit Solution
      </button>
    </div>
  );
}

export default ActionButtons;

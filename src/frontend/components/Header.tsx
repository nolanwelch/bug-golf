import { useEffect, useRef, useState } from "react";
import Instructions from "./Instructions";

export default function Header() {
  const [showHelp, setShowHelp] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside the card
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowHelp(false);
      }
    }
    if (showHelp) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showHelp]);

  return (
    <>
      <header className="relative text-center">
        <h1 className="text-6xl font-extrabold text-green-600 drop-shadow-md">
          Bug Golf ⛳
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Fix the code, minimize your moves, master the challenge.
        </p>

        {/* Help button */}
        {!showHelp && (
          <button
            onClick={() => setShowHelp(true)}
            aria-label="Show instructions"
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 text-green-700 font-bold text-xl focus:outline-none focus:ring-2 focus:ring-green-300 z-[1000]"
          >
            ?
          </button>
        )}
      </header>

      {/* Centered Modal */}
      {showHelp && (
        <div className="fixed inset-0 flex items-center justify-center z-[2000]">
          {/* 20% opaque backdrop */}
          <div className="absolute inset-0 bg-black opacity-20"></div>

          {/* Modal card */}
          <div
            ref={modalRef}
            className="relative bg-white rounded-2xl shadow-xl p-6 max-w-lg w-full mx-4 z-[2001]"
          >
            {/* Close button */}
            <button
              onClick={() => setShowHelp(false)}
              aria-label="Close instructions"
              className="absolute top-1 right-1 text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none"
            >
              &times;
            </button>

            <Instructions />
          </div>
        </div>
      )}
    </>
  );
}

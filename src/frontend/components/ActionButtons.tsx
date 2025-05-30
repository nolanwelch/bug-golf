import { Dispatch, SetStateAction } from "react";

export interface SubmitButtonProps {
  onClick: () => void;
}

function SubmitButton({ onClick }: SubmitButtonProps) {
  return (
    <button
      className="px-6 py-2 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 text-white font-medium rounded-lg transition"
      onClick={onClick}
    >
      Submit
    </button>
  );
}

export interface ResetButtonProps {
  onClick: () => void;
}

function ResetButton({ onClick }: ResetButtonProps) {
  return (
    <button
      className="px-6 py-2 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:ring-gray-100 text-gray-800 font-medium rounded-lg transition"
      onClick={onClick}
    >
      Reset
    </button>
  );
}

export interface ActionButtonsProps {
  submitted: boolean;
  setSubmitted: Dispatch<SetStateAction<boolean>>;
  setReset: Dispatch<SetStateAction<boolean>>;
}

function ActionButtons({
  submitted,
  setSubmitted,
  setReset,
}: ActionButtonsProps) {
  if (submitted) {
    return null;
  }

  return (
    <div className="flex justify-center gap-4">
      <ResetButton
        onClick={() => {
          setReset(true);
        }}
      />
      <SubmitButton
        onClick={() => {
          setSubmitted(true);
        }}
      />
    </div>
  );
}

export default ActionButtons;

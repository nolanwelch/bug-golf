import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActionButtons from "../components/ActionButtons";
import ChallengeArea from "../components/ChallengeArea";
import Header from "../components/Header";
import Scoreboard from "../components/Scoreboard";

export default function HomePage() {
  const [reset, setReset] = useState(false);
  const [resetKey, setResetKey] = useState(Date.now());
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (reset) {
      setReset(false);
      setResetKey(Date.now());
    }
  }, [reset]);

  const { id } = useParams<{ id?: string }>();
  const kataId = id ?? "today";

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <Header />
        <ChallengeArea kataId={kataId} resetKey={resetKey} />
        <ActionButtons
          setReset={setReset}
          submitted={submitted}
          setSubmitted={setSubmitted}
        />
        <Scoreboard />
      </div>
    </div>
  );
}

import { distance } from "fastest-levenshtein";
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
  const [keystrokeCount, setKeystrokeCount] = useState(0);
  const [editDistance, setEditDistance] = useState(0);
  const [originalCode, setOriginalCode] = useState("");
  const [userCode, setUserCode] = useState("");

  useEffect(() => {
    if (reset) {
      setReset(false);
      setResetKey(Date.now());
      setKeystrokeCount(0);
    }
    if (submitted) {
      const editDistance = distance(originalCode, userCode);
      setEditDistance(editDistance);
    }
  }, [reset, submitted, originalCode, userCode]);

  const { id } = useParams<{ id?: string }>();
  const kataId = id ?? "today";

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <Header />
        <ChallengeArea
          kataId={kataId}
          resetKey={resetKey}
          setKeystrokeCount={setKeystrokeCount}
          setOriginalCode={setOriginalCode}
          setUserCode={setUserCode}
        />
        <ActionButtons
          setReset={setReset}
          submitted={submitted}
          setSubmitted={setSubmitted}
        />
        <Scoreboard
          submitted={submitted}
          keystrokeCount={keystrokeCount}
          editDistance={editDistance}
        />
      </div>
    </div>
  );
}

import { Kata, kataSchema, TestCaseResult } from "@/shared/schema/kata.schema";
import { evaluateCode } from "@/shared/utils/scoring";
import { distance } from "fastest-levenshtein";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActionButtons from "../components/ActionButtons";
import ChallengeArea from "../components/ChallengeArea";
import Header from "../components/Header";
import Scoreboard from "../components/Scoreboard";
import TestCaseErrors from "../components/TestCaseErrors";

export default function HomePage() {
  const [reset, setReset] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [keystrokeCount, setKeystrokeCount] = useState(0);
  const [editDistance, setEditDistance] = useState(0);
  const [originalCode, setOriginalCode] = useState("");
  const [userCode, setUserCode] = useState("");
  const [kata, setKata] = useState<Kata | null>(null);
  const [failures, setFailures] = useState<Array<TestCaseResult>>([]);

  const { id } = useParams<{ id?: string }>();
  const kataId = id ?? "today";

  // Load Kata on kataId
  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(`/api/katas/${kataId}`);
        if (!resp.ok) {
          throw new Error(`Status ${resp.status}`);
        }
        const data = await resp.json();
        const parsed = kataSchema.safeParse(data.kata);
        if (!parsed.success) {
          console.error(`Kata parse error: ${parsed.error}`);
          throw new Error("Invalid kata payload");
        }
        setKata(parsed.data);
      } catch (err) {
        console.error("Error while fetching kata:", err);
      }
    })();
  }, [kataId]);

  // Handle submit and reset state
  useEffect(() => {
    if (reset) {
      setReset(false);
      setKeystrokeCount(0);
      setFailures([]);
    }
    if (submitted) {
      const editDistance = distance(originalCode, userCode);
      setEditDistance(editDistance);

      const results = evaluateCode(userCode, kata ? kata.testCases : []);

      if (!results) {
        console.error("Code could not be evaluated.");
        setSubmitted(false);
        return;
      }

      const allPassed = results.every((r) => r.pass);
      if (allPassed) {
        console.log("All test cases passed! Accepting solution.");
        setFailures([]);
      } else {
        console.log(
          "Some test cases failed:",
          results.filter((r) => !r.pass)
        );
        setFailures(results.filter((r) => !r.pass));
        setSubmitted(false);
      }
    }
  }, [reset, submitted, originalCode, userCode, kata, kataId]);

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <Header />
        <ChallengeArea
          submitted={submitted}
          kata={kata}
          setKeystrokeCount={setKeystrokeCount}
          setOriginalCode={setOriginalCode}
          userCodeState={[userCode, setUserCode]}
        />
        <ActionButtons
          setReset={setReset}
          submitted={submitted}
          setSubmitted={setSubmitted}
        />
        {failures.length > 0 && <TestCaseErrors failures={failures} />}
        <Scoreboard
          submitted={submitted}
          keystrokeCount={keystrokeCount}
          editDistance={editDistance}
        />
      </div>
    </div>
  );
}

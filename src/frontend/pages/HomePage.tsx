import {
  Kata,
  kataSchema,
  TestCaseResult,
} from "@/shared/api/schema/kata.schema";
import { calculateScore, evaluateCode } from "@/shared/utils/scoring";
import { distance } from "fastest-levenshtein";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActionButtons from "../components/ActionButtons";
import ChallengeArea from "../components/ChallengeArea";
import Header from "../components/Header";
import Scoreboard from "../components/Scoreboard";
import SolutionSummary from "../components/SolutionSummary";
import TestCaseErrors from "../components/TestCaseErrors";

export default function HomePage() {
  const [reset, setReset] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [keystrokeCount, setKeystrokeCount] = useState(0);
  const [editDistance, setEditDistance] = useState(0);
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
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

  // Start timer on Kata load
  useEffect(() => {
    if (kata) {
      setKeystrokeCount(0);
      setFailures([]);
      setAccepted(false);
      setScore(null);
      setTimeTaken(0);

      if (intervalId) {
        clearInterval(intervalId);
      }
      const start = Date.now();
      const newInterval = setInterval(() => {
        setTimeTaken(Math.floor((Date.now() - start) / 1000));
      }, 1000);
      setIntervalId(newInterval);
    }
  }, [kata]);

  // Handle reset state
  useEffect(() => {
    if (reset) {
      setReset(false);
      setKeystrokeCount(0);
      setFailures([]);
      setAccepted(false);
      setScore(null);
      setTimeTaken(0);
    }
  }, [reset]);

  // Handle submit state
  useEffect(() => {
    if (submitted) {
      const editDistanceResult = distance(originalCode, userCode);
      setEditDistance(editDistanceResult);

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
        setAccepted(true);
        setScore(calculateScore(keystrokeCount, editDistance, timeTaken));

        // Stop timer
        if (intervalId) {
          clearInterval(intervalId);
        }
      } else {
        console.log(
          "Some test cases failed:",
          results.filter((r) => !r.pass)
        );
        setFailures(results.filter((r) => !r.pass));
        setSubmitted(false);
      }
    }
  }, [
    submitted,
    userCode,
    originalCode,
    kata,
    intervalId,
    keystrokeCount,
    editDistance,
    timeTaken,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <Header />
        <ChallengeArea
          accepted={accepted}
          submitted={submitted}
          kata={kata}
          setKeystrokeCount={setKeystrokeCount}
          setOriginalCode={setOriginalCode}
          userCodeState={[userCode, setUserCode]}
        />
        {/* Description */}
        <div className="space-y-4">
          <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
            <span className="font-semibold">Challenge description: </span>
            {kata?.description}
          </p>
        </div>
        <ActionButtons
          setReset={setReset}
          submitted={submitted}
          setSubmitted={setSubmitted}
        />
        <hr className="border-t border-gray-300" />
        {failures.length > 0 && <TestCaseErrors failures={failures} />}
        <Scoreboard
          submitted={submitted}
          keystrokeCount={keystrokeCount}
          editDistance={editDistance}
          timeTaken={timeTaken}
          score={score ?? -1}
        />
        {accepted && (
          <SolutionSummary
            score={score ?? -1}
            keystrokeCount={keystrokeCount}
            editDistance={editDistance}
            timeTaken={timeTaken}
          />
        )}
      </div>
    </div>
  );
}

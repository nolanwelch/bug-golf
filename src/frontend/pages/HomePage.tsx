import { useParams } from "react-router-dom";
import ActionButtons from "../components/ActionButtons.tsx";
import ChallengeArea from "../components/ChallengeArea.tsx";
import Header from "../components/Header.tsx";
import Scoreboard from "../components/Scoreboard.tsx";

export default function HomePage() {
  const { id } = useParams<{ id?: string }>();
  const kataId = id ?? "today";

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <Header />
        <ChallengeArea kataId={kataId} />
        <ActionButtons />
        <Scoreboard />
      </div>
    </div>
  );
}

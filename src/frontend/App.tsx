import ActionButtons from "./components/ActionButtons";
import ChallengeArea from "./components/ChallengeArea";
import Header from "./components/Header";
import Instructions from "./components/Instructions";
import Scoreboard from "./components/Scoreboard";

function App() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <Header />
        <Instructions />
        <ChallengeArea />
        <ActionButtons />
        <Scoreboard />
      </div>
    </div>
  );
}

export default App;

import ActionButtons from "./components/ActionButtons";
import ChallengeArea from "./components/ChallengeArea";
import Header from "./components/Header";
import Instructions from "./components/Instructions";
import Scoreboard from "./components/Scoreboard";

function App() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <Header />
      <Instructions />
      <ChallengeArea />
      <ActionButtons />
      <Scoreboard />
    </div>
  );
}

export default App;

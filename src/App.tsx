import { useEffect, useState } from "react";
import { GameSetup } from "./components/GameSetup";
import { useGameSetup } from "./hooks/useGameSetup";
import { BalloonBoard } from "./components/BalloonBoard";
import { ScoreBoard } from "./components/ScoreBoard";
import { useGameLogic } from "./hooks/useGameLogic";
import { GameOver } from "./components/GameOver";
import { GameRefresh } from "./components/GameRefresh";
import { GameBoard } from "./types/game";
import { HelpModal } from "./components/HelpModal";

const App = () => {
  // 게임 설정 관련 커스텀 훅
  const { showSetup, board, handleSetupComplete, resetSetup } = useGameSetup();
  // 게임 로직 관련 커스텀 훅
  const { gameState, handleBalloonClick, initializeGrid, setGameState } =
    useGameLogic(board);
  // 도움말 모달 표시 상태
  const [showHelp, setShowHelp] = useState(false);

  // 설정 완료 후 게임 초기화
  useEffect(() => {
    if (!showSetup) {
      initializeGrid();
    }
  }, [showSetup, initializeGrid]);

  // 현재 설정으로 게임 다시 시작
  const handleRefresh = () => {
    initializeGrid();
  };

  // 완전히 새로운 게임 시작
  const handleRestart = () => {
    resetSetup();
    setGameState((prev) => ({
      ...prev,
      isGameOver: false,
      isCompleted: false,
    }));
  };

  // 게임 설정 완료 및 도움말 표시
  const setupComplete = (config: GameBoard) => {
    handleSetupComplete(config);
    setShowHelp(true); // 게임 시작 시 도움말 표시
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          풍선 터트리기 게임
        </h1>

        <GameSetup isOpen={showSetup} onComplete={setupComplete} />
        <GameOver
          isOpen={gameState.isGameOver}
          score={gameState.score}
          onRestart={handleRestart}
          onRefresh={handleRefresh}
          isCompleted={gameState.isCompleted}
        />
        <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
        {!showSetup && (
          <div className="space-y-6">
            <GameRefresh
              onRefresh={handleRefresh}
              onRestart={handleRestart}
              onHelp={() => setShowHelp(true)}
            />

            <div className="flex justify-center">
              <BalloonBoard
                balloons={gameState.balloons}
                gridSize={board.gridSize}
                onBalloonClick={handleBalloonClick}
                isGameOver={gameState.isGameOver}
              />
            </div>

            <ScoreBoard
              score={gameState.score}
              maxConnectedSize={gameState.maxConnected[0]?.size || 0}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

/**
 * 게임 시작 전 설정을 받는 모달 컴포넌트
 */
import { useState } from "react";
import { Modal } from "./Modal";
import { GameBoard } from "@/types/game";

interface GameSetupProps {
  isOpen: boolean; // 모달 표시 여부
  onComplete: (config: GameBoard) => void; // 설정 완료 핸들러
}

export const GameSetup = ({ isOpen, onComplete }: GameSetupProps) => {
  // 격자 크기와 풍선 개수 입력 상태 관리
  const [gridSize, setGridSize] = useState("5");
  const [balloonCount, setBalloonCount] = useState("12");
  const [error, setError] = useState("");

  // 설정 완료 처리
  const handleSubmit = () => {
    const size = parseInt(gridSize);
    const count = parseInt(balloonCount);
    const maxBalloons = size * size;

    // 입력값 유효성 검사
    if (size < 3 || size > 10) {
      setError("격자 크기는 3에서 10 사이여야 합니다.");
      return;
    }

    if (count < 1 || count > maxBalloons) {
      setError(`풍선 개수는 1에서 ${maxBalloons} 사이여야 합니다.`);
      return;
    }

    onComplete({ gridSize: size, balloonCount: count });
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">게임 설정</h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            격자판 크기 (3-10):
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded-md"
            value={gridSize}
            onChange={(e) => setGridSize(e.target.value)}
            min="3"
            max="10"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            풍선 개수 (최대: {parseInt(gridSize) * parseInt(gridSize)}개):
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded-md"
            value={balloonCount}
            onChange={(e) => setBalloonCount(e.target.value)}
            min="1"
            max={parseInt(gridSize) * parseInt(gridSize)}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          시작하기
        </button>
      </div>
    </Modal>
  );
};

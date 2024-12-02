/**
 * 풍선 게임 보드를 표시하는 컴포넌트
 */
import { useState } from "react";
import { Position } from "../types/game";
import { findConnected } from "../utils/balloonLogic";

interface BalloonBoardProps {
  balloons: number[][]; // 현재 격자판 상태
  gridSize: number; // 격자 크기
  onBalloonClick: (position: Position) => void; // 풍선 클릭 핸들러
  isGameOver: boolean; // 게임 오버 상태
}

export const BalloonBoard = ({
  balloons,
  gridSize,
  onBalloonClick,
  isGameOver,
}: BalloonBoardProps) => {
  // 현재 hover된 풍선들의 위치를 저장
  const [hoveredPositions, setHoveredPositions] = useState<Set<string>>(
    new Set()
  );

  // 마우스 enter 핸들러
  const handleMouseEnter = (position: Position) => {
    if (!balloons[position.y][position.x] || isGameOver) return;
    const connected = findConnected(balloons, position);
    setHoveredPositions(connected);
  };

  // 마우스 leave 핸들러
  const handleMouseLeave = () => {
    setHoveredPositions(new Set());
  };

  return (
    <div className="mx-auto">
      {/* 게임 보드 컨테이너 */}
      <div className="p-4 bg-gray-200 rounded-lg shadow-lg">
        {/* 격자 컨테이너 */}
        <div
          className="grid bg-gray-300 p-2 rounded border-4 border-gray-400"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          }}
        >
          {/* 각 셀을 순회하며 풍선 또는 빈 칸 렌더링 */}
          {balloons.map((row, y) =>
            row.map((cell, x) => {
              const isHovered = hoveredPositions.has(`${y},${x}`);
              return (
                <div
                  key={`${y}-${x}`}
                  className={`
                    aspect-square w-10 sm:w-14 md:w-16
                    flex items-center justify-center
                    text-2xl md:text-3xl
                    transition-all duration-200 relative
                    ${
                      cell
                        ? `bg-gray-100 border-t-2 border-l-2 border-r-2 border-b-2 border-gray-400 
                          ${
                            isHovered
                              ? "bg-blue-200 scale-110 z-10"
                              : "hover:bg-gray-100"
                          }`
                        : "bg-gray-200"
                    }
                    ${
                      !cell || isGameOver
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }
                    ${!cell ? "border border-gray-300" : ""}
                    m-0.5
                  `}
                  onClick={() => onBalloonClick({ x, y })}
                  onMouseEnter={() => handleMouseEnter({ x, y })}
                  onMouseLeave={handleMouseLeave}
                >
                  {cell ? "🎈" : ""}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

import React from "react";

/**
 * 현재 점수와 최대 연결 크기를 표시하는 컴포넌트
 */
interface ScoreBoardProps {
  score: number; // 현재 점수
  maxConnectedSize: number; // 현재 최대 연결 크기
}

export const ScoreBoard = React.memo(
  ({ score, maxConnectedSize }: ScoreBoardProps) => {
    return (
      <div className="text-center space-y-2">
        <p className="text-2xl font-bold">점수: {score}</p>
        <p className="text-lg">
          가장 많은 연결된 풍선: {maxConnectedSize}개의 풍선
        </p>
      </div>
    );
  }
);

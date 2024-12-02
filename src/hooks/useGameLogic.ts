// 게임 로직 커스텀 훅
import { useState, useCallback } from "react";
import { GameState, GameBoard, Connected, Position } from "../types/game";
import { findConnected } from "../utils/balloonLogic";

export const useGameLogic = (board: GameBoard) => {
  const [gameState, setGameState] = useState<GameState>({
    balloons: [],
    isGameOver: false,
    score: 0,
    maxConnected: [],
    isCompleted: false,
  }); // 게임의 전체 상태를 관리하는 state

  /**
   * 현재 격자판에서 모든 연결된 풍선 그룹을 찾는 함수
   * @param grid 현재 격자판 상태
   */
  const calculateAllConnected = useCallback(
    (grid: number[][]) => {
      const connected: Connected[] = [];
      const visited = new Set<string>();

      // 모든 격자판 위치를 순회
      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
          // 풍선이 있고 아직 방문하지 않은 위치에서 연결된 풍선들을 찾음
          if (grid[y][x] && !visited.has(`${y},${x}`)) {
            const connectedPositions = findConnected(grid, { x, y }, new Set());
            connected.push({
              size: connectedPositions.size,
              positions: connectedPositions,
            });
            // 찾은 위치들을 방문 처리
            connectedPositions.forEach((con) => visited.add(con));
          }
        }
      }

      // 크기 순으로 정렬하여 상태 업데이트
      const sortedConnected = connected.sort((a, b) => b.size - a.size);
      setGameState((prev) => ({
        ...prev,
        maxConnected: sortedConnected,
      }));
    },
    [findConnected]
  );

  /**
   * 게임 격자판을 초기화하는 함수
   */
  const initializeGrid = useCallback(() => {
    const { gridSize, balloonCount } = board;

    // 빈 격자판 생성
    const newGrid = Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill(0));

    // 지정된 개수만큼 랜덤하게 풍선 배치
    let remainingBalloons = balloonCount;
    while (remainingBalloons > 0) {
      const x = Math.floor(Math.random() * gridSize);
      const y = Math.floor(Math.random() * gridSize);
      if (!newGrid[y][x]) {
        newGrid[y][x] = 1;
        remainingBalloons--;
      }
    }

    // 게임 상태 초기화
    setGameState({
      balloons: newGrid,
      isGameOver: false,
      score: 0,
      maxConnected: [],
      isCompleted: false,
    });

    calculateAllConnected(newGrid);
  }, [board, calculateAllConnected]);

  /**
   * 풍선 클릭 처리 함수
   * @param position 클릭한 위치
   */
  const handleBalloonClick = useCallback(
    (position: Position) => {
      const { x, y } = position;

      // 게임 오버 상태거나 빈 칸이면 무시
      if (gameState.isGameOver || !gameState.balloons[y][x]) return;

      // 클릭한 위치에서 연결된 풍선들 찾기
      const clickedConnected = findConnected(gameState.balloons, position);
      const maxConnected = gameState.maxConnected[0];

      // 가장 큰 그룹이 아니면 게임 오버
      if (!maxConnected || clickedConnected.size < maxConnected.size) {
        setGameState((prev) => ({
          ...prev,
          isGameOver: true,
        }));
        return;
      }

      // 연결된 풍선들 제거
      const newBalloons = gameState.balloons.map((row) => [...row]);
      clickedConnected.forEach((con) => {
        const [py, px] = con.split(",").map(Number);
        newBalloons[py][px] = 0;
      });

      // 점수 추가 및 상태 업데이트
      setGameState((prev) => ({
        ...prev,
        balloons: newBalloons,
        score: prev.score + clickedConnected.size,
      }));

      // 게임 완료 체크 (모든 풍선이 제거되었는지)
      const isCompleted = newBalloons.every((row) =>
        row.every((cell) => cell === 0)
      );

      if (isCompleted) {
        setGameState((prev) => ({
          ...prev,
          isGameOver: true,
          isCompleted: true,
        }));
        return;
      }

      // 남은 풍선들의 연결 상태 다시 계산
      calculateAllConnected(newBalloons);
    },
    [gameState, findConnected, calculateAllConnected]
  );

  return {
    gameState,
    handleBalloonClick,
    initializeGrid,
    setGameState,
  };
};

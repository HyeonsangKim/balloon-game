// src/utils/balloonUtils.ts
import { Position } from "../types/game";

/**
 * 주어진 위치에서 연결된 모든 풍선을 찾는 함수 (DFS 알고리즘)
 * @param grid 현재 격자판 상태
 * @param start 시작 위치
 * @param visited 이미 방문한 위치들의 집합
 * @returns 연결된 풍선들의 위치 집합
 */
export const findConnected = (
  grid: number[][],
  start: Position,
  visited: Set<string> = new Set()
): Set<string> => {
  const stack: Position[] = [start];
  const connected = new Set<string>();
  const directions = [
    [0, 1], // 아래
    [0, -1], // 위
    [1, 0], // 오른쪽
    [-1, 0], // 왼쪽
  ];

  while (stack.length > 0) {
    const current = stack.pop()!;
    const key = `${current.y},${current.x}`;

    // 이미 방문했거나 유효하지 않은 위치면 스킵
    if (
      visited.has(key) ||
      current.y < 0 ||
      current.x < 0 ||
      current.y >= grid.length ||
      current.x >= grid[0].length ||
      !grid[current.y][current.x]
    ) {
      continue;
    }

    visited.add(key);
    connected.add(key);

    // 상하좌우 위치를 스택에 추가
    for (const [dy, dx] of directions) {
      stack.push({
        y: current.y + dy,
        x: current.x + dx,
      });
    }
  }

  return connected;
};

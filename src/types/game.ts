// 게임에서 사용되는 기본 타입들

// 격자판에서의 위치를 나타내는 인터페이스
export interface Position {
  x: number; // 가로
  y: number; // 세로
}

// 연결된 풍선들의 정보를 나타내는 인터페이스
export interface Connected {
  size: number; // 연결된 풍선의 개수
  positions: Set<string>; // 연결된 풍선들의 위치 집합 ("y,x" 형식의 문자열)
}

// 게임 설정 정보를 나타내는 인터페이스
export interface GameBoard {
  gridSize: number; // 격자판의 크기 (N x N)
  balloonCount: number; // 초기 풍선 개수
}

// 게임의 상태
export interface GameState {
  balloons: number[][]; // 현재 격자판 상태 (0: 빈칸, 1: 풍선)
  isGameOver: boolean; // 게임 오버 여부
  isCompleted: boolean; // 게임 완료 여부
  score: number; // 현재 점수
  maxConnected: Connected[]; // 현재 존재하는 연결된 풍선 그룹들(크기순)
}

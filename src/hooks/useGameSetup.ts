import { useState, useCallback } from "react";
import { GameBoard } from "../types/game";

/**
 * 게임 설정을 관리하는 커스텀 훅
 * 격자 크기와 풍선 개수 설정, 설정 화면의 표시 여부를 관리
 * @returns {Object} 게임 설정 상태와 관련 함수들
 */
export const useGameSetup = () => {
  const [showSetup, setShowSetup] = useState(true); // 설정 화면 표시 여부를 관리하는 state

  // 게임 보드 설정을 관리하는 state (격자 크기, 풍선 개수)
  const [board, setBoard] = useState<GameBoard>({
    gridSize: 5, // 기본 격자 크기
    balloonCount: 12, // 기본 풍선 개수
  });

  /**
   * 게임 설정이 완료되었을 때 호출되는 함수
   * 새로운 설정을 저장하고 설정 화면을 닫음
   * @param newBoard 새로운 게임 설정 (격자 크기, 풍선 개수)
   */
  const handleSetupComplete = useCallback((newBoard: GameBoard) => {
    setBoard(newBoard); // 새 설정 저장
    setShowSetup(false); // 설정 화면 닫기
  }, []);

  /**
   * 게임을 재시작할 때 호출되는 함수
   * 설정 화면을 다시 표시
   */
  const resetSetup = useCallback(() => {
    setShowSetup(true); // 설정 화면 다시 표시
  }, []);

  // 게임 설정 관련 상태와 함수들을 반환
  return {
    showSetup, // 설정 화면 표시 여부
    board, // 현재 게임 보드 설정
    handleSetupComplete, // 설정 완료 처리 함수
    resetSetup, // 재시작 처리 함수
  };
};

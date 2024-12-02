/**
 * 게임 오버/완료 모달을 표시하는 컴포넌트
 */

interface GameOverProps {
  isOpen: boolean; // 모달 표시 여부
  score: number; // 최종 점수
  onRestart: () => void; // 재시작 핸들러
  onRefresh: () => void; // 새로고침 핸들러
  isCompleted?: boolean; // 게임 완료 여부
}

export const GameOver = ({
  isOpen,
  score,
  onRestart,
  onRefresh,
  isCompleted,
}: GameOverProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4 text-center">
        <h2 className="text-2xl font-bold mb-4">
          {isCompleted ? "게임 완료! 🎉" : "게임 오버!"}
        </h2>
        <p className="text-gray-600 mb-4">
          {isCompleted
            ? "모든 풍선을 성공적으로 터트렸습니다!"
            : "가장 연속된 풍선을 선택하지 않았습니다."}
        </p>
        <p className="text-xl font-bold mb-6">최종 점수: {score}점</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onRefresh}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            같은 설정으로 시작
          </button>
          <button
            onClick={onRestart}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            새로운 게임
          </button>
        </div>
      </div>
    </div>
  );
};

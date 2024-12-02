/**
 * 게임 컨트롤 버튼들을 표시하는 컴포넌트
 */
interface GameRefreshProps {
  onRefresh: () => void; // 새로고침 핸들러
  onRestart: () => void; // 재시작 핸들러
  onHelp: () => void; // 도움말 핸들러
}

export const GameRefresh = ({
  onRefresh,
  onRestart,
  onHelp,
}: GameRefreshProps) => {
  return (
    <div className="flex gap-4 justify-center my-4">
      <button
        onClick={onRefresh}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
      >
        🔄 새로고침
      </button>
      <button
        onClick={onRestart}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
      >
        🎮 재시작
      </button>
      <button
        onClick={onHelp}
        className="w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center text-xl border-2 border-gray-300"
      >
        ❔
      </button>
    </div>
  );
};

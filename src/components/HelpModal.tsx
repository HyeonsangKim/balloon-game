/**
 * 게임 도움말을 표시하는 모달 컴포넌트
 */
interface HelpModalProps {
  isOpen: boolean; // 모달 표시 여부
  onClose: () => void; // 닫기 핸들러
}

export const HelpModal = ({ isOpen, onClose }: HelpModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">게임 설명</h2>
        <div className="space-y-3 text-gray-600 mb-6">
          <p className="flex gap-2 items-center">
            <span className="text-xl">🎈</span>
            <span>연결된 풍선들은 같이 터집니다.</span>
          </p>
          <p className="flex gap-2 items-center">
            <span className="text-xl">🎯</span>
            <span>
              가장 많은 풍선을 한 번에 터트릴 수 있는 곳을 찾아 순서대로
              클릭하세요!
            </span>
          </p>
          <p className="flex gap-2 items-center">
            <span className="text-xl">⚠️</span>
            <span>잘못된 선택을 하면 게임이 종료됩니다.</span>
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  );
};

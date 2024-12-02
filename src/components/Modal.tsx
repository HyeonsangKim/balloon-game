/* 모달창 */
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean; // 모달창 활성화 여부
  children: ReactNode;
}

export const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
        {children}
      </div>
    </div>
  );
};

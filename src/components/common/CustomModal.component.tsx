import { ReactNode } from "react";
import ReactModal from "react-modal";

export interface ICustomModal {
  isOpen: boolean;
  children?: ReactNode;
}

export const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "75%",
    height: "fit-content",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "20px",
    backgroundColor: "white",
    justifyContent: "center",
    overflow: "auto",
  },
};

export default function CustomModal({ isOpen, children }: ICustomModal) {
  return (
    <ReactModal ariaHideApp={false} isOpen={isOpen} style={customModalStyles}>
      {children}
    </ReactModal>
  );
}

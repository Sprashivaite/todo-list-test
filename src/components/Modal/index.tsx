import { Dispatch, FC, ReactNode, SetStateAction } from "react";

import "./styles.css";

interface Props {
  modalActive: boolean;
  setModalActive: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
}

export const Modal: FC<Props> = ({ modalActive, setModalActive, children }) => {
  return (
    <div
      className={modalActive ? "modal modal_active" : "modal"}
      onClick={() => setModalActive(false)}
    >
      <div
        className="modal__content"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

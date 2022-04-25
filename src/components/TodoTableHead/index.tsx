import { FC, ReactNode, useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import "./styles.css";

interface Props {
  onButtonClick?: () => void;
  withButton?: boolean;
  children: ReactNode;
}

export const TodoTableHead: FC<Props> = ({
  withButton = false,
  onButtonClick,
  children,
}) => {
  const [isArrowDirectionUp, setIsArrowDirectionUp] = useState(false);
  const [isArrowDisabled, setIsArrowDisabled] = useState(false);

  const handleButtonClick = () => {
    onButtonClick && onButtonClick();
    setIsArrowDirectionUp(!isArrowDirectionUp);
  };
  return (
    <th className="todo-table-head">
      {children}

      {withButton && (
        <button
          className={
            isArrowDirectionUp
              ? "todo-table-head__button"
              : "todo-table-head__button todo-table-head__button_active"
          }
          disabled={isArrowDisabled}
          onClick={handleButtonClick}
        >
          <ArrowDownwardIcon />
        </button>
      )}
    </th>
  );
};

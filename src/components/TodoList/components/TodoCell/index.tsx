import { FC, ReactNode } from "react";

import "./styles.css";

interface Props {
  children: ReactNode;
}

export const TodoCell: FC<Props> = (props) => {
  return (
    <td className="todo-cell" {...props}>
      {props.children}
    </td>
  );
};

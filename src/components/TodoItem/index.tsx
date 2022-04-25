import { ChangeEventHandler, FC, MouseEventHandler } from "react";
import ArchiveIcon from "@mui/icons-material/Archive";
import moment from "moment";

import { Task } from "../../types";
import { TodoCell } from "../TodoCell";
import "./styles.css";

type TodoItemProps = {
  task: Task;
  onClickArchive: MouseEventHandler<HTMLButtonElement>;
  onChangeComplete: ChangeEventHandler<HTMLInputElement>;
};

const TodoItem: FC<TodoItemProps> = ({
  task,
  onClickArchive,
  onChangeComplete,
}) => {
  const { title, createdAt, isComplete } = task;
  const fromNow = moment(createdAt).fromNow();

  return (
    <tr className="todo-item">
      <TodoCell>{title}</TodoCell>
      <TodoCell>{fromNow}</TodoCell>
      <TodoCell>
        <input
          className="todo-item__complete"
          type="checkbox"
          checked={isComplete}
          onChange={onChangeComplete}
        />
      </TodoCell>
      <TodoCell>
        <button className="todo-item__archive" onClick={onClickArchive}>
          <ArchiveIcon />
        </button>
      </TodoCell>
    </tr>
  );
};

export default TodoItem;

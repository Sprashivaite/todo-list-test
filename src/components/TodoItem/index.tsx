import React, { ChangeEventHandler, FC, MouseEventHandler } from "react";

import { Task } from "../../types";
import { TodoCell } from "../TodoCell";
import archive from "./img/archive.svg";
import "./styles.css";

type TodoItemProps = {
  task: Task;
  onClickArchive: MouseEventHandler<HTMLInputElement>;
  onChangeComplete: ChangeEventHandler<HTMLInputElement>;
};

const TodoItem: FC<TodoItemProps> = ({
  task,
  onClickArchive,
  onChangeComplete,
}) => {
  const { title, createdAt, isComplete } = task;

  return (
    <tr className="todo-item">
      <TodoCell>{title}</TodoCell>
      <TodoCell>{createdAt}</TodoCell>
      <TodoCell>
        <input
          className="todo-item__complete"
          type="checkbox"
          checked={isComplete}
          onChange={onChangeComplete}
        />
      </TodoCell>
      <TodoCell>
        <input
          className="todo-item__archive"
          type="image"
          src={archive}
          alt="archive"
          onClick={onClickArchive}
        />
      </TodoCell>
    </tr>
  );
};

export default TodoItem;

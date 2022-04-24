import React, { ChangeEventHandler, FC, MouseEventHandler } from "react";

import { Task } from "../../types";
import archive from "./img/archive.svg";
import "./styles.css";

type TodoItemProps = {
  task: Task;
  onClickArchive: MouseEventHandler<HTMLInputElement>;
  onChangeCheckbox: ChangeEventHandler<HTMLInputElement>;
};

const TodoItem: FC<TodoItemProps> = ({
  task,
  onClickArchive,
  onChangeCheckbox,
}) => {
  const { title, createdAt, isComplete } = task;

  return (
    <div className="todo-item">
      <div className="todo-item__cell">{title}</div>
      <div className="todo-item__cell">{createdAt}</div>
      <div className="todo-item__cell">
        <input
          className="todo-item__checkbox"
          type="checkbox"
          checked={isComplete}
          onChange={onChangeCheckbox}
        />
      </div>
      <div className="todo-item__cell">
        <input
          className="todo-item__archive"
          type="image"
          src={archive}
          alt="archive"
          onClick={onClickArchive}
        />
      </div>
    </div>
  );
};

export default TodoItem;

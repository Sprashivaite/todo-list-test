import { ChangeEventHandler, FC, MouseEventHandler, useState } from "react";
import ArchiveIcon from "@mui/icons-material/Archive";

import { dateFormat } from "../../../../consts";
import { Task } from "../../../../types";
import { Modal } from "../../../Modal";
import { TodoCell } from "../TodoCell";
import "./styles.css";
import { formatDistance, parse } from "date-fns";
import ruLocale from "date-fns/locale/ru";

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
  const [modalActive, setModalActive] = useState(false);
  const { title, createdAt, isComplete } = task;
  const date = parse(createdAt, dateFormat, new Date());
  const fromNow = formatDistance(date, new Date(), {
    addSuffix: true,
    locale: ruLocale,
  });

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
        <button
          className="todo-item__archive"
          onClick={() => setModalActive(true)}
        >
          <ArchiveIcon />
        </button>
        <Modal modalActive={modalActive} setModalActive={setModalActive}>
          <div className="todo-item__modal-container">
            <h4>Архивировать задачу</h4>
            <div className="todo-item__modal-button-container">
              <button
                className="todo-item__modal-button"
                onClick={() => setModalActive(false)}
              >
                Отмена
              </button>
              <button
                className="todo-item__modal-button"
                onClick={onClickArchive}
              >
                Подтвердить
              </button>
            </div>
          </div>
        </Modal>
      </TodoCell>
    </tr>
  );
};

export default TodoItem;

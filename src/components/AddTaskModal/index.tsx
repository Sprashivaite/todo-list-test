import { FC, SetStateAction, useState } from "react";
import { useSetRecoilState } from "recoil";
import * as yup from "yup";

import { tasksState } from "../../store/tasksStore";
import { MaskInput } from "../MaskInput";
import { Modal } from "../Modal";
import { TextField } from "../TextField";
import "./style.css";

const schema = yup.object().shape({
  title: yup.string().required(),
  date: yup.string().required(),
  createdOn: yup.date().default(function () {
    return new Date();
  }),
});

export const AddTaskModal: FC = () => {
  const setTasks = useSetRecoilState(tasksState);
  const [modalActive, setModalActive] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const createTask = () => {
    setTasks((oldState) => [
      ...oldState,
      {
        id: Date.now(),
        title,
        isComplete: false,
        isArchived: false,
        createdAt: date,
      },
    ]);
    setModalActive(false);
    setDate("");
    setTitle("");
  };

  return (
    <>
      <button
        className="task-modal__button"
        onClick={() => setModalActive(true)}
      >
        Новая задача
      </button>
      <Modal modalActive={modalActive} setModalActive={setModalActive}>
        <div className="task-modal__container">
          <h2>Добавить задачу</h2>
          <TextField
            placeholder="Название"
            onChange={(event: { target: { value: SetStateAction<string> } }) =>
              setTitle(event.target.value)
            }
          />
          <MaskInput value={date} onChange={(value) => setDate(value)} />
          <button className="task-modal__button" onClick={() => createTask()}>
            Создать
          </button>
        </div>
      </Modal>
    </>
  );
};

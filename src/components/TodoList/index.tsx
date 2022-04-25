import { ChangeEvent, FC, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { SortingType, Task } from "../../types";
import TodoItem from "../TodoItem";
import {
  tasksState,
  tasksFilterState,
  filteredTasksState,
  tasksStatsState,
} from "../../store/tasksStore";
import { Modal } from "../Modal";
import { TextField } from "../TextField";
import { MaskInput } from "../MaskInput";
import "./styles.css";
import { useInterval } from "../../hooks/useInterval";
import { TodoTableHead } from "../TodoTableHead";
import moment from "moment";

const TodoList: FC = () => {
  const setTasks = useSetRecoilState(tasksState);
  const [filter, setFilter] = useRecoilState(tasksFilterState);
  const filteredTasks = useRecoilValue(filteredTasksState);
  const { totalCompletedNum, totalNum } = useRecoilValue(tasksStatsState);
  const [title, setTitle] = useState("");
  const [titleSort, setTitleSort] = useState(SortingType.TitleDesc);
  const [dateSort, setDateSort] = useState(SortingType.DateDesc);
  const [modalActive, setModalActive] = useState(false);
  const [date, setDate] = useState("");
  const [timer, setTimer] = useState(false);

  const onChangeFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

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

  const handleArchiveClick = (task: Task) => {
    setTasks((oldState) =>
      oldState.map((element) =>
        element.id === task.id
          ? {
              ...element,
              isArchived: !element.isArchived,
            }
          : element
      )
    );
  };

  const handleCompleteClick = (task: Task) => {
    setTasks((oldState) =>
      oldState.map((element) =>
        element.id === task.id
          ? {
              ...element,
              isComplete: !element.isComplete,
            }
          : element
      )
    );
  };

  const handleTitleSort = () => {
    if (titleSort === SortingType.TitleAsc) {
      setTasks((oldState) =>
        oldState.slice().sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();
          if (titleA < titleB) return -1;
          if (titleA > titleB) return 1;
          return 0;
        })
      );
      setTitleSort(SortingType.TitleDesc);
    }
    if (titleSort === SortingType.TitleDesc) {
      setTasks((oldState) =>
        oldState.slice().sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();
          if (titleA < titleB) return 1;
          if (titleA > titleB) return -1;
          return 0;
        })
      );
      setTitleSort(SortingType.TitleAsc);
    }
  };

  const handleDateSort = () => {
    if (dateSort === SortingType.DateAsc) {
      setTasks((oldState) =>
        oldState.slice().sort((a, b) => {
          const dateA = moment(a.createdAt);
          const dateB = moment(b.createdAt);
          console.log(dateA, dateB);
          console.log(dateB.isAfter(dateA));

          if (dateB.isAfter(dateA)) return -1;
          if (dateA.isAfter(dateB)) return 1;
          if (dateA.isSame(dateB)) return 0;
          return 0;
        })
      );
      setDateSort(SortingType.DateDesc);
    }
    if (dateSort === SortingType.DateDesc) {
      setTasks((oldState) =>
        oldState.slice().sort((a, b) => {
          const dateA = moment(a.createdAt);
          const dateB = moment(b.createdAt);

          if (dateB.isAfter(dateA)) return 1;
          if (dateA.isAfter(dateB)) return -1;
          if (dateA.isSame(dateB)) return 0;
          return 0;
        })
      );
      setDateSort(SortingType.DateAsc);
    }
  };

  const tick = () => {
    setTimer(!timer);
  };

  const tenSeconds = 10 * 1000;

  useInterval(tick, tenSeconds);

  return (
    <div className="todo-list">
      <div className="todo-list__toolbar">
        <input
          className="todo-list__search"
          type="search"
          placeholder="search"
          value={filter}
          onChange={onChangeFilter}
        />
        <button
          className="todo-list__button"
          onClick={() => setModalActive(true)}
        >
          новая задача
        </button>

        <Modal modalActive={modalActive} setModalActive={setModalActive}>
          <div className="todo-list__modal-container">
            <h2>Добавить задачу</h2>
            <TextField
              placeholder="Название"
              onChange={(event) => setTitle(event.target.value)}
            />
            <MaskInput value={date} onChange={(value) => setDate(value)} />
            <button className="todo-list__button" onClick={() => createTask()}>
              создать
            </button>
          </div>
        </Modal>
      </div>
      <table className="todo-list__table">
        <thead>
          <tr className="todo-list__head">
            <TodoTableHead withButton onButtonClick={() => handleTitleSort()}>
              Название
            </TodoTableHead>
            <TodoTableHead withButton onButtonClick={() => handleDateSort()}>
              Дата
            </TodoTableHead>
            <TodoTableHead>Выполнено</TodoTableHead>
            <TodoTableHead>Архив</TodoTableHead>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task: any) => (
            <TodoItem
              task={task}
              key={task.id}
              onClickArchive={handleArchiveClick.bind(this, task)}
              onChangeComplete={handleCompleteClick.bind(this, task)}
            ></TodoItem>
          ))}
        </tbody>
        <tfoot className="todo-list__footer">
          <tr className="todo-list__complete">
            <td>
              {totalCompletedNum} из {totalNum} задач выполнены
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TodoList;

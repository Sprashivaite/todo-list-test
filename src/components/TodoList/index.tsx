import { ChangeEvent, FC, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { compareDesc } from "date-fns";

import { useInterval } from "../../hooks/useInterval";
import { SortingType, Task } from "../../types";
import {
  tasksState,
  tasksFilterState,
  filteredTasksState,
  tasksStatsState,
} from "../../store/tasksStore";
import { SearchInput } from "../SearchInput";
import TodoItem from "./components/TodoItem";
import { TodoTableHead } from "./components/TodoTableHead";
import { TableFooter } from "./components/TableFooter";
import { AddTaskModal } from "./components/AddTaskModal";
import "./styles.css";

const TodoList: FC = () => {
  const setTasks = useSetRecoilState(tasksState);
  const [filter, setFilter] = useRecoilState(tasksFilterState);
  const filteredTasks = useRecoilValue(filteredTasksState);
  const { totalCompletedNum, totalNum } = useRecoilValue(tasksStatsState);

  const [titleSortType, setTitleSortType] = useState(SortingType.Desc);
  const [dateSortType, setDateSortType] = useState(SortingType.Desc);
  const [timer, setTimer] = useState(false);

  const onChangeFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
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

  const handleTitleSortType = () => {
    if (titleSortType === SortingType.Asc) {
      setTasks((oldState) =>
        [...oldState].sort((a, b) => a.title.localeCompare(b.title))
      );
      setTitleSortType(SortingType.Desc);
    }
    if (titleSortType === SortingType.Desc) {
      setTasks((oldState) =>
        [...oldState].sort((a, b) => b.title.localeCompare(a.title))
      );
      setTitleSortType(SortingType.Asc);
    }
  };

  const handleDateSortType = () => {
    if (dateSortType === SortingType.Asc) {
      setTasks((oldState) =>
        [...oldState].sort((a, b) =>
          compareDesc(new Date(a.createdAt), new Date(b.createdAt))
        )
      );
      setDateSortType(SortingType.Desc);
    }
    if (dateSortType === SortingType.Desc) {
      setTasks((oldState) =>
        [...oldState].sort((a, b) =>
          compareDesc(new Date(b.createdAt), new Date(a.createdAt))
        )
      );
      setDateSortType(SortingType.Asc);
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
        <SearchInput value={filter} onChange={onChangeFilter} />
        <AddTaskModal />
      </div>
      <table className="todo-list__table">
        <thead>
          <tr className="todo-list__head">
            <TodoTableHead withButton onButtonClick={handleTitleSortType}>
              Название
            </TodoTableHead>
            <TodoTableHead withButton onButtonClick={handleDateSortType}>
              Дата
            </TodoTableHead>
            <TodoTableHead>Выполнено</TodoTableHead>
            <TodoTableHead>Архив</TodoTableHead>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task: Task) => (
            <TodoItem
              task={task}
              key={task.id}
              onClickArchive={() => handleArchiveClick(task)}
              onChangeComplete={() => handleCompleteClick(task)}
            ></TodoItem>
          ))}
        </tbody>
        <TableFooter
          totalCompletedNum={totalCompletedNum}
          totalNum={totalNum}
        />
      </table>
    </div>
  );
};

export default TodoList;

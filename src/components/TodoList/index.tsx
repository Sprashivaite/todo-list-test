import { ChangeEvent, FC, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import moment from "moment";

import { useInterval } from "../../hooks/useInterval";
import { TitleSortingType, DateSortingType, Task } from "../../types";
import {
  tasksState,
  tasksFilterState,
  filteredTasksState,
  tasksStatsState,
} from "../../store/tasksStore";
import TodoItem from "../TodoItem";
import { TodoTableHead } from "../TodoTableHead";
import { TableFooter } from "../TableFooter";
import { AddTaskModal } from "../AddTaskModal";
import { SearchInput } from "../SearchInput";
import "./styles.css";

const TodoList: FC = () => {
  const setTasks = useSetRecoilState(tasksState);
  const [filter, setFilter] = useRecoilState(tasksFilterState);
  const filteredTasks = useRecoilValue(filteredTasksState);
  const { totalCompletedNum, totalNum } = useRecoilValue(tasksStatsState);

  const [titleSort, setTitleSort] = useState(TitleSortingType.TitleDesc);
  const [dateSort, setDateSort] = useState(DateSortingType.DateDesc);
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

  const handleTitleSort = () => {
    if (titleSort === TitleSortingType.TitleAsc) {
      setTasks((oldState) =>
        oldState.slice().sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();
          if (titleA < titleB) return -1;
          if (titleA > titleB) return 1;
          return 0;
        })
      );
      setTitleSort(TitleSortingType.TitleDesc);
    }
    if (titleSort === TitleSortingType.TitleDesc) {
      setTasks((oldState) =>
        oldState.slice().sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();
          if (titleA < titleB) return 1;
          if (titleA > titleB) return -1;
          return 0;
        })
      );
      setTitleSort(TitleSortingType.TitleAsc);
    }
  };

  const handleDateSort = () => {
    if (dateSort === DateSortingType.DateAsc) {
      setTasks((oldState) =>
        oldState.slice().sort((a, b) => {
          const dateA = moment(a.createdAt);
          const dateB = moment(b.createdAt);
          console.log(dateA, dateB);
          console.log(dateB.isAfter(dateA));

          if (dateB.isAfter(dateA)) return -1;
          if (dateA.isAfter(dateB)) return 1;
          else {
            return 0;
          }
        })
      );
      setDateSort(DateSortingType.DateDesc);
    }
    if (dateSort === DateSortingType.DateDesc) {
      setTasks((oldState) =>
        oldState.slice().sort((a, b) => {
          const dateA = moment(a.createdAt);
          const dateB = moment(b.createdAt);

          if (dateB.isAfter(dateA)) return 1;
          if (dateA.isAfter(dateB)) return -1;
          else {
            return 0;
          }
        })
      );
      setDateSort(DateSortingType.DateAsc);
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

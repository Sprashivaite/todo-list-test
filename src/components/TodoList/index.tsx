import React, { FC, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { Task } from "../../types";
import formattedDate from "../../utils/formatDate";
import TodoItem from "../TodoItem";

import "./styles.css";
import {
  tasksState,
  tasksFilterState,
  filteredTasksState,
  tasksStatsState,
} from "../../store/tasksStore";

const TodoList: FC = () => {
  const [tasks, setTasks] = useRecoilState(tasksState);
  const [filter, setFilter] = useRecoilState(tasksFilterState);
  const filteredTasks = useRecoilValue(filteredTasksState);
  const { totalCompletedNum, totalNum } = useRecoilValue(tasksStatsState);

  const [timer, setTimer] = useState(false);

  const onChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const createTask = () => {
    const taskName = prompt("Введите название");
    setTasks((oldState) => [
      ...oldState,
      {
        id: 2,
        title: taskName ?? "",
        isComplete: false,
        isArchived: false,
        createdAt: formattedDate.dateNow(),
      },
    ]);
  };

  const onClickArchive = (task: Task) => {
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

  const onChangeCheckbox = (task: Task) => {
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

  const tick = () => {
    setTimer(!timer);
  };

  const minute = 60 * 1000;
  const setTimerInterval = setInterval(() => tick(), minute);

  useEffect(() => {
    return clearInterval(setTimerInterval);
  }, [setTimerInterval]);

  return (
    <div className="todo-list">
      <input
        className="todo-list__search"
        type="search"
        placeholder="search"
        value={filter}
        onChange={onChangeFilter}
      />
      <div className="todo-list__items">
        {filteredTasks.map((task: any) => (
          <TodoItem
            task={task}
            key={task.id}
            onClickArchive={onClickArchive.bind(this, task)}
            onChangeCheckbox={onChangeCheckbox.bind(this, task)}
          ></TodoItem>
        ))}
      </div>
      <div className="todo-list__footer">
        <button className="todo-list__button" onClick={createTask}>
          новая задача
        </button>
        <div className="todo-list__complete">
          {totalCompletedNum} из {totalNum} задач выполнены
        </div>
      </div>
    </div>
  );
};

export default TodoList;

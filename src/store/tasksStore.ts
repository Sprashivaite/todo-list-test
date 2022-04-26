import { atom, selector } from "recoil";

import data from "../data.json";

export const tasksState = atom({
  key: "Tasks",
  default: data,
});

export const tasksFilterState = atom({
  key: "TasksFilter",
  default: "",
});

export const filteredTasksState = selector({
  key: "FilteredTasks",
  get: ({ get }) => {
    const filter = get(tasksFilterState);
    const list = get(tasksState);

    const regexp = new RegExp(filter, "gi");

    return list
      .filter((item) => item.title.match(regexp))
      .filter((item) => !item.isArchived);
  },
});

export const tasksStatsState = selector({
  key: "TodoListStats",
  get: ({ get }) => {
    const tasks = get(tasksState).filter((item) => !item.isArchived);
    const totalNum = tasks.length;
    const totalCompletedNum = tasks.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
    };
  },
});

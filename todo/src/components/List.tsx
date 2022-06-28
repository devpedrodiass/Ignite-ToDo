import { PlusCircle } from "phosphor-react";
import React, { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./List.module.css";
import ListContent from "./ListContent";

export interface ITask {
  content: string;
  id: string;
  isDone: boolean;
}

const tasksRaw: ITask[] = [
  {
    content: "Wash the dishes",
    id: uuidv4(),
    isDone: false,
  },
  {
    content: "Pet my dog",
    id: uuidv4(),
    isDone: true,
  },
];

export function List() {
  const [tasks, setTasks] = useState<ITask[]>(tasksRaw);
  const [newTaskText, setNewTaskText] = useState<string>("");

  function sortByIsDone(newTasksArray: ITask[]) {
    const newTasksArraySorted = newTasksArray.sort((a, b) => {
      if (a.isDone === false) return -1;
      if (a.isDone === true) return 1;
      return 0;
    });
    return newTasksArraySorted;
  }

  function handleNewCommentInvalid(event: any) {
    event.target.setCustomValidity("This field is mandatory");
  }

  function handleTypeNewTaskText(event: React.ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTaskText(event.target.value);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    const newTask = {
      content: newTaskText,
      id: uuidv4(),
      isDone: false,
    };
    const newTasksArray = [...tasks, newTask];

    setTasks(sortByIsDone(newTasksArray));
    setNewTaskText("");
  }

  function deleteTask(taskId: string) {
    const newTasksArray = tasks.filter((task: ITask) => task.id !== taskId);

    setTasks(newTasksArray);
  }

  function selectTask(taskId: string) {
    const newTasksArray = tasks.map((task: ITask) => {
      if (task.id === taskId) task.isDone = !task.isDone;
      return task;
    });
    setTasks(sortByIsDone(newTasksArray));
  }

  return (
    <div className={styles.list}>
      <header className={styles.listHeader}>
        <form onSubmit={handleCreateNewTask}>
          <input
            placeholder="Add a new Task"
            type="text"
            id="newTask"
            value={newTaskText}
            required
            onInvalid={handleNewCommentInvalid}
            onChange={(e) => handleTypeNewTaskText(e)}
            className={styles.listInputNewTask}
          />
          <button type="submit" className={styles.listButtonNewTask}>
            Create <PlusCircle size={15}></PlusCircle>
          </button>
        </form>
      </header>
      <ListContent
        onDelete={deleteTask}
        onSelect={selectTask}
        tasks={tasks}
      ></ListContent>
    </div>
  );
}

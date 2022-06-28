import { Check, Trash } from "phosphor-react";
import React from "react";
import styles from "./ListItem.module.css";

export interface IListItemProps {
  content: string;
  taskId: string;
  isDone: boolean;
  onDelete: (taskId: string) => void;
  onSelect: (taskId: string) => void;
}

export default function ListItem({
  content,
  taskId,
  isDone,
  onDelete,
  onSelect,
}: IListItemProps) {
  function handleDeleteTask() {
    onDelete(taskId);
  }

  function handleSelectTask() {
    onSelect(taskId);
  }

  return (
    <div className={styles.listItem}>
      <button
        className={
          isDone ? styles.listItemToggleSelected : styles.listItemToggle
        }
        onClick={handleSelectTask}
      >
        {isDone ? <Check size={24}></Check> : null}
      </button>
      <p className={isDone ? styles.listItemTextSelected : styles.listItemText}>
        {content}
      </p>
      <button
        className={styles.listItemDeleteButton}
        onClick={handleDeleteTask}
      >
        <Trash size={24}></Trash>
      </button>
    </div>
  );
}

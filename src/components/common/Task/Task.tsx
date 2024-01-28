import React from "react";

interface TaskProps {
  task: {
    id: string;
    title: string;
    state: string;
  };
  onArchiveTask: (id: string) => void;
  onPinTask: (id: string) => void;
}
const Task = ({ task: { id, title, state }, onArchiveTask, onPinTask }: TaskProps) => {
  console.log(id, state, onArchiveTask, onPinTask);

  return (
    <div className={`list-item ${state}`}>
      <label htmlFor="checkbox">
        <input
          id="checkbox"
          type="checkbox"
          defaultChecked={state === "TASK_ARCHIVED"}
          disabled
          name="checked"
        />
        <button
          type="button"
          className="checkbox-custom"
          onClick={() => onArchiveTask(id)}
          id={`archiveTask-${id}`}
          aria-label={`archiveTask-${id}`}
        />
      </label>
      <div className="title">
        <input type="text" value={title} readOnly placeholder="Input title" />
      </div>
      <button type="button" className="actions" onClick={(event) => event.stopPropagation()}>
        {state !== "TASK_ARCHIVED" && (
          <button type="button" onClick={() => onPinTask(id)}>
            <span className="icon-star" id={`pinTask-${id}`} aria-label={`pinTask-${id}`} />
          </button>
        )}
      </button>
    </div>
  );
};

export default Task;

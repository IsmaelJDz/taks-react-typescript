import React, { useState, useRef } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [task, setTask] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormElement) => {
    event.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
  };

  const addTask = (name: string): void => {
    const newTask: ITask[] = [...task, { name, done: false }];
    setTask(newTask);
  };

  const toggleDoneTask = (index: number): void => {
    const newTask7: ITask[] = [...task];
    newTask7[index].done = !newTask7[index].done;
    setTask(newTask7);
  };

  const removeTask = (index: number): void => {
    const newTasks: ITask[] = [...task];
    newTasks.splice(index, 1);
    setTask(newTasks);
  };

  return (
    <>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="form-control"
                    autoFocus
                    onChange={event => setNewTask(event.target.value)}
                    ref={taskInput}
                    value={newTask}
                  />
                  <button className="btn btn-success btn-block mt-2">
                    Save
                  </button>
                </form>
                {task.map((item: ITask, index: number) => (
                  <div className="card card-body mt-2" key={index}>
                    {" "}
                    <h2
                      style={{
                        textDecoration: item.done ? "line-through" : ""
                      }}
                    >
                      {item.name}
                    </h2>
                    <div className="">
                      <button
                        onClick={() => toggleDoneTask(index)}
                        className="btn btn-secondary"
                      >
                        {item.done ? "✓" : "✘"}
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeTask(index)}
                      >
                        🛢
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

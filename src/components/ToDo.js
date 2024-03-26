import React, { useEffect, useState } from "react";

const ToDo = (props) => {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleToDo = () => {
    let newDoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedToDoArr = [...allTodos];
    updatedToDoArr.push(newDoItem);
    setTodos(updatedToDoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedToDoArr));
  };

  // ṣaving the data in local storage
  useEffect(() => {
    let saveToDo = JSON.parse(localStorage.getItem("todolist"));
    let saveCompletedToDo = JSON.parse(localStorage.getItem("completedTodos"));
    if (saveToDo) {
      setTodos(saveToDo);
    }
    if (saveCompletedToDo) {
      setCompletedTodos(saveCompletedToDo);
    }
  }, []);

  // for deleting
  const handleToDoDelete = (index) => {
    let reduceToDo = [...allTodos];
    reduceToDo.splice(index);

    localStorage.setItem("todolist", JSON.stringify(reduceToDo));
    setTodos(reduceToDo);
  };

  //  for saved delete operation
  const handleCompletedToDoDelete = (index) => {
    let reduceToDo = [...completedTodos];
    reduceToDo.splice(index);

    localStorage.setItem("todolist", JSON.stringify(reduceToDo));
    setTodos(reduceToDo);
  };

  // for complete
  const handleToDoComplete = (index) => {
    const now = new Date();
    const completedOn = `${now.getDate()}-${
      now.getMonth() + 1
    }-${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    const completedItem = allTodos[index];
    const updatedAllTodos = allTodos.filter((_, i) => i !== index); // Remove completed item from allTodos
    setTodos(updatedAllTodos);

    const updatedCompletedTodos = [...completedTodos, { ...completedItem, completedOn }];
    setCompletedTodos(updatedCompletedTodos);

    handleToDoDelete(index);

    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedTodos));
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-success">
              <h3 className="text-center m-2 text-uppercase text-white">To Do List</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-5">
                  <label className="form-label">Task</label>
                  <input
                    type="text"
                    className="form-control"
                    id="task"
                    value={newTitle}
                    placeholder="Enter Task"
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                <div className="col-md-5">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={newDescription}
                    placeholder="Enter Description"
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <br />
                  <button
                    type="button"
                    className="btn btn-outline-primary mt-2"
                    onClick={handleToDo}
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col">
                  <button
                    className={`btn ${!isCompleteScreen ? "btn-info" : "btn-outline-info"}`}
                    onClick={() => setIsCompleteScreen(false)}
                  >
                    All To DO
                  </button>
                  <button
                    className={`btn mx-2 ${
                      isCompleteScreen ? "btn-success" : "btn-outline-success"
                    }`}
                    onClick={() => setIsCompleteScreen(true)}
                  >
                    Completed
                  </button>
                </div>
              </div>

              <div className="row mt-3 p-2">
                <div className="card data-card">
                  {isCompleteScreen === false &&
                    allTodos.map((item, index) => {
                      return (
                        <div className="row p-2" key={index}>
                          <div className="col-md-10">
                            <h1 className="text-success">{item.title}</h1>
                            <p>{item.description}</p>
                            {/* <p>
                            <small>completed on : {item.completedOn}</small>
                          </p> */}
                          </div>
                          <div className="col-md-2">
                            <div className="mt-4 float-end">
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-success m-1"
                                onClick={() => handleToDoComplete(index)}
                              >
                                <i className="bi bi-check"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleToDoDelete(index)}
                                title="Complete ?"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </div>
                          <hr />
                        </div>
                      );
                    })}
                  {isCompleteScreen === true &&
                    completedTodos.map((item, index) => {
                      return (
                        <div className="row p-2" key={index}>
                          <div className="col-md-10">
                            <h1 className="text-success">{item.title}</h1>
                            <p>{item.description}</p>
                            <p>
                              <small>Completed on : {item.completedOn}</small>
                            </p>
                          </div>
                          <div className="col-md-2">
                            <div className="mt-4 float-end">
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleCompletedToDoDelete(index)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </div>
                          <hr />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDo;

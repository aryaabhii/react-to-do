import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";

const ToDo = (props) => {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleToDo = () => {
    if (!newTitle || !newDescription) {
      setErrorMessage("Please! Enter title and description. 😌");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    } else {
      let newDoItem = {
        title: newTitle,
        description: newDescription,
      };

      let updatedToDoArr = [...allTodos];
      updatedToDoArr.push(newDoItem);
      setTodos(updatedToDoArr);
      localStorage.setItem("todolist", JSON.stringify(updatedToDoArr));

      setNewTitle("");
      setNewDescription("");

      setSuccessMessage("Your task has been added! 😍");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    }
  };

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

  const handleToDoDelete = (index) => {
    let reduceToDo = [...allTodos];
    reduceToDo.splice(index);

    localStorage.setItem("todolist", JSON.stringify(reduceToDo));
    setTodos(reduceToDo);

    setSuccessMessage("Your task has been removed! 😳");
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };

  const handleCompletedToDoDelete = (index) => {
    let updatedCompletedTodos = [...completedTodos];
    updatedCompletedTodos.splice(index, 1);
    setCompletedTodos(updatedCompletedTodos);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedTodos));

    setSuccessMessage("Your task has been removed! 😳");
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };

  const handleToDoComplete = (index) => {
    const now = new Date();
    const completedOn = `${now.getDate()}-${
      now.getMonth() + 1
    }-${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    const completedItem = allTodos[index];
    const updatedAllTodos = allTodos.filter((_, i) => i !== index);
    setTodos(updatedAllTodos);

    const updatedCompletedTodos = [...completedTodos, { ...completedItem, completedOn }];
    setCompletedTodos(updatedCompletedTodos);

    handleToDoDelete(index);

    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedTodos));

    setSuccessMessage("Your task marked as completed! 🥰");
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <div className="container mt-2">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card mb-3 main-card">
            <div className="card-header bg-success">
              <h3 className="text-center m-2 text-white">Add Your Task Here</h3>
            </div>
            {successMessage && (
              <div className="row justify-content-center mt-3">
                <div className="col-md-4 text-center">
                  <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div>
                </div>
              </div>
            )}
            {errorMessage && (
              <div className="row justify-content-center mt-3">
                <div className="col-md-5 text-center">
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                </div>
              </div>
            )}
            <div className="card-body">
              <div className="row">
                <div className="col-md-5">
                  <label className="form-label">
                    Task <span className="text-danger fs-5">*</span>
                  </label>
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
                  <label className="form-label">
                    Description <span className="text-danger fs-5">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={newDescription}
                    placeholder="Enter Description"
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                </div>
                <div className="col-md-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-primary mt-3"
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
                    All Task
                  </button>
                  <button
                    className={`btn mx-2 ${
                      isCompleteScreen ? "btn-success" : "btn-outline-success"
                    }`}
                    onClick={() => setIsCompleteScreen(true)}
                  >
                    Completed Task
                  </button>
                </div>
              </div>
              <div className="row mt-3 p-2 task-table">
                <div className="card data-card">
                  {isCompleteScreen === false && allTodos.length > 0
                    ? allTodos.map((item, index) => (
                        <div className="row p-1" key={index}>
                          <div className="col-md-10">
                            <h1 className="task-title">{item.title}</h1>
                            <p>{item.description}</p>
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
                      ))
                    : isCompleteScreen === false && (
                        <div className="text-secondary p-3 text-center">
                          You do not added any task yet! 😢
                        </div>
                      )}
                  {isCompleteScreen === true && completedTodos.length > 0
                    ? completedTodos.map((item, index) => (
                        <div className="row p-1" key={index}>
                          <div className="col-md-10">
                            <h1 className="task-title">{item.title}</h1>
                            <p>{item.description}</p>
                            <p>
                              <small className="text-secondary">
                                Completed on : {item.completedOn}
                              </small>
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
                      ))
                    : isCompleteScreen === true && (
                        <div className="text-secondary p-3 text-center">
                          You do not marked any task as completed! 😢
                        </div>
                      )}
                </div>
              </div>
            </div>
            <div className="card-footer bg-success">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDo;

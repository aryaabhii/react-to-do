import "./App.css";
import Header from "./components/Header";
import ToDo from "./components/ToDo";

function App() {
  return (
    <>
      <Header title="To Do" searchBar={false} />
      <ToDo />
    </>
  );
}

export default App;

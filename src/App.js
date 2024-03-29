import "./App.css";
import Header from "./components/Header";
import ToDo from "./components/ToDo";

function App() {
  return (
    <>
      <Header title="ToDo App" searchBar={false} />
      <ToDo />
    </>
  );
}

export default App;

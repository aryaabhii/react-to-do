import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ToDo from "./components/ToDo";

function App() {
  return (
    <>
      <Header title="Abhijeet" searchBar={false} />
      <ToDo />
      <Footer />
    </>
  );
}

export default App;

import "./App.css";
import Button from "./components/ui/Button/Button";
import NavBar from "./components/ui/NavBar/NavBar";

function App() {
  return (
    <div className="relative flex justify-start">
      <NavBar />
      <div className="lg:m-l-52">
        <h1 className="text-3xl font-bold underline">Vite + React</h1>
        <Button>Клик</Button>
      </div>
    </div>
  );
}

export default App;

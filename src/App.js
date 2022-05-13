import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar";
import Countries from "./components/countries/countries";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <Countries />
      </div>
    </div>
  );
}

export default App;

// import logo from './logo.svg';
import './App.css';
import { Route, Redirect, Routes } from "react-router-dom";
import Generator from './components/Generator';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>

        <Route path="/generate" element={<Generator/>} />



      </Routes>
         

    </div>
  );
}

export default App;

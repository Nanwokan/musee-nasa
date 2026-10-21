import "./App.css";
import Home from "./pages/home";
import { Route, Routes } from "react-router";
import HeaderTop from "./components/header";


function App() {
  return (
    <>
      <HeaderTop/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </main>
    </>
  );
}

export default App;

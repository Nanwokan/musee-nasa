import "./App.css";
import Home from "./pages/home";
import { Route, Routes } from "react-router";
import HeaderTop from "./components/header";
import MediaDetails from "./pages/detail";


function App() {
  return (
    <>
      <HeaderTop/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/medias/:id"
            element={
              <MediaDetails
              />
            }/>
        </Routes>
      </main>
    </>
  );
}

export default App;

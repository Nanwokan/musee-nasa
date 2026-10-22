import "./App.css";
import Home from "./pages/home";
import { Route, Routes } from "react-router";
import HeaderTop from "./components/header";
import MediaDetails from "./pages/detail";
import Favoris from "./pages/favoris";
import ErrorPage from "./pages/errorPage";


function App() {
  return (
    <>
      <HeaderTop/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/favoris" element={<Favoris />} />
          <Route path="/medias/:id"
            element={
              <MediaDetails
              />
            }/>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

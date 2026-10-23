import "./App.css";
import Home from "./pages/home";
import { Route, Routes } from "react-router";
import HeaderTop from "./components/header";
import MediaDetails from "./pages/detail";
import Favoris from "./pages/favoris";
import ErrorPage from "./pages/errorPage";
import Salles from "./pages/salles";
import SalleDetail from "./pages/salleDetail";


function App() {
  return (
    <>
      <HeaderTop/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/favoris" element={<Favoris />} />
          <Route path="/salles" element={<Salles />} />
          <Route path="/salles/:id" element={<SalleDetail />} />
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

import "./App.css";
import Home from "./pages/home";
import { Route, Routes } from "react-router";
import HeaderTop from "./components/header";
import MediaDetails from "./pages/detail";
import Favoris from "./pages/favoris";
import ErrorPage from "./pages/errorPage";
import Salles from "./pages/salles";
import SalleDetail from "./pages/salleDetail";
import Expositions from "./pages/expositions";
import ExpositionDetail from "./pages/expositionDetail";
import CreateExposition from "./pages/createExposition";
import SharedExposition from "./pages/sharedExposition";


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
          <Route path="/expositions" element={<Expositions/>} />
          <Route path="/expositions/:id" element={<ExpositionDetail/>} />
          <Route path="/expositions/create" element={<CreateExposition/>} />
          <Route path="/expositions/partage" element={<SharedExposition/>} />
        </Routes>
      </main>
    </>
  );
}

export default App;

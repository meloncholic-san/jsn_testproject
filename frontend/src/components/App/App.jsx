import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-image-gallery/styles/css/image-gallery.css";
import Layout from "../Layout/Layout.jsx";
import NotFound from "../NotFound/NotFound.jsx";
const MainPage = lazy(() => import("../../pages/MainPage/MainPage.jsx"));
const HeroDetailPage = lazy(() => import("../../pages/HeroDetailPage/HeroDetailPage.jsx"));

function App() {
  return (
    <Suspense fallback={    
    <div className="flex justify-center items-center h-64">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='*' element={<NotFound />} />
            <Route index element={<MainPage />} />
            <Route path="/hero/:id" element={<HeroDetailPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Suspense>
  );
}

export default App;

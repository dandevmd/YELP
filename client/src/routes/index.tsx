import { FC, ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import NotFoundPage from "./pages/NotFoundPage";
import Updatepage from "./pages/Updatepage";

const AppRouter = () => {
  return (
    <Routes>
      {routes.map((r: { path: string; element: any }, index: number) => {
        return <Route key={index} path={r.path} element={<r.element />} />;
      })}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;

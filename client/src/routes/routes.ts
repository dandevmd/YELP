import DetailsPage from "./pages/DetailsPage";
import HomePage from "./pages/HomePage";
import Updatepage from "./pages/Updatepage";

export const routes = [
  {
    path: "/",
    element: HomePage,
  },
  {
    path: "/restaurants/:id",
    element: DetailsPage,
  },
  {
    path: "/restaurants/update/:id",
    element: Updatepage,
  }

];

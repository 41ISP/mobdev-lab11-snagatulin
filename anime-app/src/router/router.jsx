import { createBrowserRouter } from "react-router-dom";
import NekoImage from "../pages/AnimePage/AnimePage";
import AnimePage from "../pages/AnimePage/AnimePage";
import OtherPage from "../pages/OtherPage/OtherPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AnimePage />,
  },
  {
    path: "/art/:id",
    element: <OtherPage/>
  },
]);
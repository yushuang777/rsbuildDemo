import { createBrowserRouter, NonIndexRouteObject } from "react-router";
import Test from "../pages/test";
export interface CustomRouteObject extends NonIndexRouteObject {
  path: string;
  title?: string;
  element?: React.ReactNode | null;
}
export const routeList: CustomRouteObject[] = [
  {
    path: "/",
    element: <Test />,
  },
];

const globalRouter = createBrowserRouter([...routeList]);
export default globalRouter;

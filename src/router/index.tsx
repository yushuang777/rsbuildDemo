import { createBrowserRouter, NonIndexRouteObject } from 'react-router';
import Test from '../pages/test';
import ReduxTest from '../pages/reduxTest';
export interface CustomRouteObject extends NonIndexRouteObject {
  path: string;
  title?: string;
  element?: React.ReactNode | null;
}
export const routeList: CustomRouteObject[] = [
  {
    path: '/',
    element: <Test />,
  },
  {
    path: '/reduxTest',
    element: <ReduxTest />,
  },
];

const globalRouter = createBrowserRouter([...routeList]);
export default globalRouter;

import { createBrowserRouter, NonIndexRouteObject } from 'react-router';
import UserManagement from '../pages/userManagement';
export interface CustomRouteObject extends NonIndexRouteObject {
  path: string;
  title?: string;
  element?: React.ReactNode | null;
}
export const routeList: CustomRouteObject[] = [
  {
    path: '/',
    element: <UserManagement />,
  },
];

const globalRouter = createBrowserRouter([...routeList]);
export default globalRouter;

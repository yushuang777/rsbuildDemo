import { RouterProvider } from "react-router";
import "./App.css";
import globalRouter from "./router";

const App = () => {
  return <RouterProvider router={globalRouter} />;
};

export default App;

import { createBrowserRouter } from "react-router";
import Template from "../components/Template";
import Form from "../components/Form";

export const router = createBrowserRouter([
  { path: "/", Component: Form },
  { path: "/template", Component: Template },
]);

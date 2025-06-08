import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/routes";
import { FormProvider } from "./providers/FormProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FormProvider>
      <RouterProvider router={router} />
    </FormProvider>
  </StrictMode>
);

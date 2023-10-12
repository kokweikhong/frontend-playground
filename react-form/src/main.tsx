import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./root.tsx";
import MultiForm from "./multiForm.tsx";
import SingleForm from "./singleForm.tsx";
import Chart from "./chart.tsx";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/mutli-form",
        element: <MultiForm />
      },
      {
        path: "/single-form",
        element: <SingleForm />
      },
      {
        path: "/chart",
        element: <Chart />
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

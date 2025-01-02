import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home";
import Write from "./views/Write";
import Read from "./views/Read";
import Settings from "./views/Settings";
import LockWrapper from "./lib/LockWrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LockWrapper />,
    errorElement: <div> Something went wrong!</div>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "write",
        element: <Write />,
      },
      {
        path: "read",
        element: <Read />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      // {
      //   path: "test",
      //   action: todosAction,
      //   loader: todosLoader,
      //   Component: TodosList,
      //   ErrorBoundary: TodosBoundary,
      //   children: [
      //     {
      //       path: ":id",
      //       loader: todoLoader,
      //       Component: Todo,
      //     },
      //   ],
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import SourcePage from "./pages/SourcePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import KnowledgePage from "./pages/KnowledgePage";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <SourcePage />,
      },
      {
        path: "knowledge",
        element: <KnowledgePage />,
      },
      {
        path: "*",
        element: <div>Coming Soon</div>,
      },
    ],
  },
]);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

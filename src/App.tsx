import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import SourcePage from "./pages/SourcePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import KnowledgePage from "./pages/KnowledgePage";
import { ToastContainer } from "react-toastify";
import ChatsPage from "./pages/ChatsPage";
import AgentsPage from "./pages/AgentsPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "tools",
        element: <SourcePage />,
      },
      {
        path: "knowledge",
        element: <KnowledgePage />,
      },
      {
        path: "",
        element: <ChatsPage />,
      },
      {
        path: "agents",
        element: <AgentsPage />,
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

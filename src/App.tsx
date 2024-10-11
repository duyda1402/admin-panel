import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import WalletPage from "./pages/WalletPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <WalletPage />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

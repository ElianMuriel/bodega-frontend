import { createBrowserRouter } from "react-router-dom";
import MarketingPage from "./pages/Home";
import SignIn from "./pages/Login";
import SignUp from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import PrivateRoute from "./components/PrivateRoute"; // 👈 importa PrivateRoute
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Users from "./pages/Users";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MarketingPage />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/add-product",
    element: <AddProduct />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/categories",
    element: (
      <PrivateRoute>
        <Categories />
      </PrivateRoute>
    ),
  },
  {
    path: "/products",
    element: (
      <PrivateRoute>
        <Products />
      </PrivateRoute>
    ),
  },
  {
  path: "/add-product",
  element: (
    <PrivateRoute>
      <AddProduct />
    </PrivateRoute>
  ),
},
]);

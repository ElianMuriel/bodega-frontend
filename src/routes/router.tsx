import { createBrowserRouter } from "react-router-dom";
import MarketingPage from "../pages/Home";
import SignIn from "../pages/Login";
import SignUp from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Categories from "../pages/Categories";
import PrivateRoute from "./PrivateRoute";
import Products from "../pages/Products";
import AddProductDialog from "../pages/AddProduct";
import Users from "../pages/Users";
import Suppliers from "../pages/Suppliers";

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
    element: <AddProductDialog open={false} onClose={function (): void {
      throw new Error("Function not implemented.");
    } } />,
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
  path: "/suppliers",
  element: <Suppliers />,
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
      <AddProductDialog open={false} onClose={function (): void {
        throw new Error("Function not implemented.");
      } } />
    </PrivateRoute>
  ),
},
]);

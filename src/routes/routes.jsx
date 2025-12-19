import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../page/Home";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import Spinner from "../Components/Spinner/Spinner";
import DashboardLayout from "../Layout/DashboardLayout";
import ErrorPage from "../page/ErrorPage";
import AllContest from "../page/AllContest";
import AddContest from "../Components/Dashboard/AddContest";
import ManageContest from "../Components/Dashboard/ManageContest";
import ContestDetailes from "../page/ContestDetailes";
import PrivateRoute from "./PrivateRoute";
import Payment from "../Components/Dashboard/Payment/Payment";
import PaymentSuccess from "../Components/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../Components/Dashboard/Payment/PaymentCancelled";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    hydrateFallbackElement: <Spinner></Spinner>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: 'all-contest',
        element: <AllContest></AllContest>
      },
      {
        path: 'contest/:id',
        element: <PrivateRoute><ContestDetailes></ContestDetailes></PrivateRoute>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      }
    ]

  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [{
      index: true,
      element: <h3>Hellow to Dashboard</h3>
    },
    {
      path: 'add-contest',
      element: <AddContest></AddContest>
    },
    {
      path: 'manage-contest',
      element: <ManageContest></ManageContest>
    },
    {
      path: 'payment/:contestId',
      Component: Payment

    },
    {
      path: 'payment-success',
      element: <PaymentSuccess></PaymentSuccess>
    },
    {
      path: 'payment-cancelled',
      element: <PaymentCancelled></PaymentCancelled>
    }
    ]
  }
]);
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
import ManageUsers from "../Components/Dashboard/ManageUsers";
import MyContest from "../Components/Dashboard/MyContest";
import EditContest from "../Components/Dashboard/EditContest";
import ContestSubmission from "../Components/Dashboard/ContestSubmission";
import MySubmission from "../Components/Dashboard/MySubmission";
import MyTransaction from "../Components/Dashboard/MyTransaction";
import DashboardOverview from "../Components/Dashboard/DashboardOverview";
import CreatorRoute from "./CreatorRoute";
import AdminRoute from "./AdminRoute";


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
      element: <DashboardOverview></DashboardOverview>
    },
    {
      path: 'add-contest',
      element: <CreatorRoute><AddContest></AddContest></CreatorRoute>
    },
    {
      path: 'manage-contest',
      element: <AdminRoute><ManageContest></ManageContest></AdminRoute>
    },
    {
      path: 'manage-users',
      element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
    },
    {
      path: 'my-contest',
      element: <CreatorRoute><MyContest></MyContest></CreatorRoute>
    },
    {
      path: 'edit-contest/:id',
      element: <CreatorRoute><EditContest></EditContest></CreatorRoute>

    },
    {
      path: 'contest-submission/:id',
      element: <CreatorRoute><ContestSubmission></ContestSubmission></CreatorRoute>

    },
    {
      path: 'my-submission',
      element: <MySubmission></MySubmission>
    },
    {
      path: 'my-transaction',
      element: <MyTransaction></MyTransaction>
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
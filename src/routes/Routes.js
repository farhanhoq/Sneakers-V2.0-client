import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "../404/PageNotFound";
import AddProduct from "../dashboard/AddProduct";
import AllBuyer from "../dashboard/AllBuyer";
import AllSeller from "../dashboard/AllSeller";
import MyOrders from "../dashboard/MyOrders";
import MyProducts from "../dashboard/MyProducts";
import Home from "../home/Home";
import Main from "../layout/Main";
import Login from "../login/Login";
import Products from "../products/Products";
import SignUp from "../signup/SignUp";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <SignUp></SignUp>
            },
            {
                path: '/categories/:id',
                element: <PrivateRoute><Products></Products></PrivateRoute>,
                loader: ({params}) => fetch(`http://localhost:5001/products/${params.id}`)
            },
            {
                path: '/addproduct',
                element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path: '/myproducts',
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: '/allbuyers',
                element: <AllBuyer></AllBuyer>
            },
            {
                path: '/allsellers',
                element: <AllSeller></AllSeller>
            },
            {
                path: '/myorders',
                element: <MyOrders></MyOrders>
            },
            {
                path: '*',
                element: <PageNotFound></PageNotFound>
            },
        ]
    }
])

export default router;
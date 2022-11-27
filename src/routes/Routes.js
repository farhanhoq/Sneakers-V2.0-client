import { createBrowserRouter } from "react-router-dom";
import AddProduct from "../dashboard/AddProduct";
import MyProducts from "../dashboard/MyProducts";
import Home from "../home/Home";
import Main from "../layout/Main";
import Login from "../login/Login";
import Products from "../products/Products";
import SignUp from "../signup/SignUp";
import PrivateRoute from "./PrivateRoute";

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
                element: <AddProduct></AddProduct>
            },
            {
                path: '/myproducts',
                element: <MyProducts></MyProducts>
            },
        ]
    }
])

export default router;
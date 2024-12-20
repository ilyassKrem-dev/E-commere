import { createBrowserRouter } from "react-router-dom"
import LayoutHome from "../components/home/layoutHome"
import Home from "../components/home/Home"
import AuthLayout from "../components/auth/authLayout"
import Login from "../components/auth/login/Login"
import SignUp from "../components/auth/signup/signup"
import Layout from "../app/layout"
import Shop from "../components/(others)/shop/shop"
import Restore from "../components/auth/restore/restore"
import ProductPage from "../components/(others)/products/product"
import CartPage from "../components/(others)/cart/Cart"
import CheckOut from "../components/(others)/checkout/checkout"
import ProfileLayout from "../components/(others)/profile/profileLayout"
import ProfileHome from "../components/(others)/profile/home/profileHome"
import ProfileInfo from "../components/(others)/profile/info/profileInfo"
import ProfileOrders from "../components/(others)/profile/orders/profileOrders"
import ProfileFavorites from "../components/(others)/profile/favorites/profileFavorites"
import ProfileInfoLayout from "../components/(others)/profile/info/profileInfoLayout"
import ProfileName from "../components/(others)/profile/info/basic_info/name/profileName"
import ProfileNumber from "../components/(others)/profile/info/basic_info/number/profileNumber"
import ProfileEditAddress from "../components/(others)/profile/info/addresses/addressInfo/profileEditAddress"
import AllProducts from "../components/(others)/products/allProducts"
import AdminPage from "../components/admin/adminPage"
import NotFound from "../assets/shared/errors/404"
import InternalServer from "../assets/shared/errors/500"
import Dashboard from "../components/admin/dashboard/dashboard"
import DashOrders from "../components/admin/orders/dashOrders"
import HomeOrders from "../components/admin/orders/homeOrder/HomeOrders"
import OrdersById from "../components/admin/orders/ordersById/ordersById"
import AdminProductsTop from "../components/admin/products/assets/adminProductsTop"
import AdminProducts from "../components/admin/products/adminProducts"
import AdminProductHome from "../components/admin/products/home/adminProductsHome"
import AdminProductById from "../components/admin/products/id/adminProductById"
import EditProduct from "../components/admin/products/id/edit/adminEditProduct"
import ProductAdd from "../components/admin/products/add/productAdd"
import AdminDeals from "../components/admin/deals/adminDeals"
import AdminDealsHome from "../components/admin/deals/assets/home/AdminDealsHome"
import AdminAddDeal from "../components/admin/deals/add/adminAddDeal"
import AdminDealById from "../components/admin/deals/id/AdminDealById"
import AdminDealEdit from "../components/admin/deals/id/edit/AdminDealEdit"



const router = createBrowserRouter([
    {
        path:"/",
        element:<Layout />,
        errorElement:<InternalServer/>,
        children:[
            {
                path:"",
                element:<LayoutHome />,
                children:[
                    {
                        path:"",
                        element:<Home />,
                    },{
                        path:"shop",
                        element:<Shop />
                    },{
                        path:"/products",
                        element:<AllProducts />
                    },{
                        path:"products/:id",
                        element:<ProductPage />
                        
                    },{
                        path:"cart",
                        element:<CartPage />
                        
                    },{
                        path:"cart/checkout",
                        element:<CheckOut />
                    },{
                        path:"profile",
                        element:<ProfileLayout />,
                        children:[
                            {
                                path:"",
                                element:<ProfileHome />
                            },
                            {
                                path:"info",
                                element:<ProfileInfoLayout />,
                                children:[
                                    {
                                        path:"",
                                        element:<ProfileInfo />
                                    },
                                    {
                                        path:"name",
                                        element:<ProfileName/>

                                    },{
                                        path:"number",
                                        element:<ProfileNumber />
                                    },{
                                        path:"address",
                                        element:<ProfileEditAddress/>
                                    }
                                ]
                            },
                            {
                                path:"orders",
                                element:<ProfileOrders />
                            },
                            {
                                path:"favorites",
                                element:<ProfileFavorites />
                            }
                        ]
                    }
                ]
            }
            ,
            {
                path:"auth",
                element:<AuthLayout />,
                children:[
                    {
                        path:"login",
                        element:<Login />
                    },{
                        path:"signup",
                        element:<SignUp />
                    },{
                        path:"restore",
                        element:<Restore />
                    }
                ]
            },{
                path:"admin",
                element:<AdminPage />,
                children:[
                    {
                        path:"",
                        element:<Dashboard />
                    }
                    ,{
                        path:"orders",
                        element:<DashOrders />,
                        children:[
                            {
                                path:"",
                                element:<HomeOrders />
                            },
                            {
                                path:":id",
                                element:<OrdersById />
                            }
                        ]
                    },{
                        path:"products",
                        element:<AdminProducts />,
                        children:[
                            {
                                path:"",
                                element:<AdminProductHome />
                            },
                            {
                                path:":id",
                                element:<AdminProductById />
                            },{
                                path:":id/edit",
                                element:<EditProduct />
                            },{
                                path:"add",
                                element:<ProductAdd />
                            }
                        ]
                    },{
                        path:"deals",
                        element:<AdminDeals />,
                        children:[
                            {
                                path:"",
                                element:<AdminDealsHome />
                            },{
                                path:"add",
                                element:<AdminAddDeal />
                            },{
                                path:":id",
                                element:<AdminDealById />
                            },
                            {
                                path:":id/edit",
                                element:<AdminDealEdit />
                            }
                        ]
                    }
                ]
            }
        ]

    },{
        path:"*",
        element:<NotFound />
    }
    
])


export default router
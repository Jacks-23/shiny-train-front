import React, {useContext, useState} from "react";
import { useQuery } from "react-query";
import { GetAllOrdersWithProducts } from "../data/apiCalls";
import { GetAllProducts } from "../data/apiCalls";
import {AuthenticationContext} from "../context/authenticationContext";
import ListOfProducts from "./listOfProducts";
import ListOfOrders from "./listOfOrders";
import MyShop from "../assets/MyShop.png";
import Image from "next/image";
import Products from "./products";
import Cart from "./cart";
import ProductsManagement from "./productsManagement";

const Orders = () => {
    const {authentication} = useContext(AuthenticationContext);
    const [orderToShow, setOrderToShow] = useState({products:[]});
    const [shopChoice, setShopChoice] = useState(0);
    const [currentOrder, setCurrentOrder] = useState([]);

    const {data: ordersData , isLoading: isOrdersLoading} = useQuery("orders", () => GetAllOrdersWithProducts(authentication.token));
    const {data: productsData, isLoading: isProductsLoading} = useQuery("products", () => GetAllProducts(authentication.token));


    const initialValue = 0;
    const totalOrders = ordersData ? ordersData.reduce(
        (previousValue, currentValue) => previousValue + currentValue.total, initialValue
    ):0;
    
    const numberOfOrders = ordersData ? ordersData.length : 0;

    let shopHomeVisibility = "visible";
    let shopShopVisibility = "hidden"; 
    let shopManagementVisibility = "hidden";
    
    switch (shopChoice) {

        case 1:
            shopShopVisibility = "visible";
            shopHomeVisibility = "hidden";
            break;
        case 2 :
            shopManagementVisibility = "visible";
            shopHomeVisibility = "hidden";
            break;

        default:
            break;
    }

 
    if(isOrdersLoading) return (
      <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
              <span className="visually-hidden">Loading...</span>
          </div>
      </div>
    );

    const ShowProducts = (order) =>
    {
        let orderObject = new Object();

        orderObject = {
            dateCrea: order.dateCrea,
            name: order.name,
            numberOfProducts: order.numberOfProducts,
            products: order.products,
            total: order.total
        };
        setOrderToShow(orderObject);
 
    };

    const handleOnDeleteProduct = (index) => {
        let updatedCurrentOrder = currentOrder.filter((_, i) => i != index);
        setCurrentOrder(updatedCurrentOrder);
    };

    return (
       <>
        <div className="flex flex-col w-screen pl-10 h-screen">
            <div className="flex w-full mt-12 ml-52 mb-5">
                <Image src={MyShop} height={70} width={200} quality={100}/>
                <button className="w-auto h-auto bg-white py-1 px-4 text-center font-extralight 
                transition: duration-200 ease-out focus:border-b-2 focus:border-black"
                onClick={()=> setShopChoice(0)}> HOME </button>
                <button className="w-auto h-auto bg-white py-1 px-4 text-center font-extralight 
                transition: duration-200 ease-out focus:border-b-2 focus:border-black"
                onClick={()=> setShopChoice(1)}> SHOP </button>
                <button className="w-auto h-auto bg-white py-1 px-4 text-center font-extralight 
                transition: duration-200 ease-out focus:border-b-2 focus:border-black" 
                onClick={()=> setShopChoice(2)}> MANAGEMENT  </button>
            </div>
            <div className="absolute left-0 top-48 bg-green-900 opacity-50  w-screen h-10 overflow-auto "/>
            <div className={`${shopHomeVisibility}`}>
                <div className="flex flex-row w-full mt-10">
                    <div className="flex flex-shrink-0 w-40">
                        <p className="text-2xl font-light"> Your summary</p>
                    </div>
                    <div className="flex flex-row mt-12 mr-40 gap-72 w-full justify-center">
                        <div className="w-52 h-36 bg-green-600 rounded-lg ">
                            <div>
                                <p className="pt-4 pl-6 font-sans font-medium text-white">
                                    Total orders :
                                </p>
                            </div>
                            <div>
                                <p className="pt-5 pl-14 font-sans text-3xl text-white">
                                    {totalOrders} €
                                </p>
                            </div>                    
                        </div>
                        <div className="w-52 h-36 bg-blue-600 rounded-lg ">
                            <div>
                                <p className="pt-4 pl-6 font-sans font-medium text-white">
                                    Number of orders :
                                </p>
                            </div>
                            <div>
                                <p className="pt-5 pl-24 font-sans text-3xl text-white">
                                    {numberOfOrders}
                                </p>
                            </div>
                        </div>
                    </div>    
                </div>
                <div className="mt-8">
                    <p className="text-2xl font-light"> Orders</p>
                    <ListOfOrders ordersData={ordersData} ShowProducts={ShowProducts}/> 
                </div>
                <div className="flex flex-row w-full mt-4">
                    <div>
                        <p className="text-2xl font-light"> Products</p>
                    </div>
                    <div className="ml-24 mt-8">
                        <ListOfProducts orderToShow = {orderToShow}/>
                    </div>
                </div>
            </div>
            <div className={`flex flex-row mt-10 gap-10 ${shopShopVisibility}`}>
                <div className="shrink-0">
                    <p className="text-2xl font-light"> Products</p>
                    <div className="pt-6">
                        <Products setCurrentOrder={setCurrentOrder} productsData={productsData} isProductsLoading={isProductsLoading}/>
                    </div>
                </div>
                <div className=" flex flex-col w-full">
                    <p className="text-2xl font-light"> Current order</p>
                    <div className="pt-6 self-center">
                        <Cart currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} 
                        handleOnDeleteProduct={handleOnDeleteProduct} setShopChoice={setShopChoice}  />
                    </div>
                </div>
            </div>
            <div className={`flex flex-row mt-10 shrink-0 w-full ${shopManagementVisibility}`}>
                <ProductsManagement productsData={productsData} isProductsLoading={isProductsLoading}/>
            </div>
        </div>
        
       </>
      );
};
 
export default Orders;
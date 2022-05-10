import React, {useContext, useState} from "react";
import { useQuery } from "react-query";
import { GetAllOrdersWithProducts } from "../data/apiCalls";
import {AuthenticationContext} from "../context/authenticationContext";
import ListOfProducts from "./listOfProducts";

const Orders = ({SetTopic}) => {
    const {authentication} = useContext(AuthenticationContext);
    const [orderToShow, setOrderToShow] = useState({products:[]});

    const {data, isLoading} = useQuery("orders", () => GetAllOrdersWithProducts(authentication.token));
 
    if(isLoading) return (
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

    return (
        <div className="flex flex-col w-screen h-screen mx-10">
            <div className="flex w-full justify-center mt-12">
                <p className="font-serif text-green-700 text-2xl">{authentication.user.firstName} orders !</p>
            </div>
            <div className="flex flex-row w-full mt-8">
                    {data.map((order, index) => 
                        <button key={order.name + index.toString} 
                            className=" py-3 text-center grow hover:scale-105 focus:bg-green-300"
                            onClick={() => ShowProducts(order)}> 
                            {order.name}
                        </button>
                    )}
                </div>
            <div className="flex flex-row w-full mt-4">
                <p className="font-sans font-bold text-red-600 text-xl">
                    Summary :
                </p>
                <div className="mt-14 mx-52">
                    <div className="w-52 h-36 bg-green-600 rounded-lg ">
                        <div>
                            <p className="pt-4 pl-6 font-sans font-medium text-white">
                                Order total :
                            </p>
                        </div>
                        <div>
                            <p className="pt-5 pl-14 font-sans text-3xl text-white">
                                {orderToShow.total} €
                            </p>
                        </div>                    
                    </div>
                </div>
                <div className="mt-14 mr-52">
                    <div className="w-52 h-36 bg-blue-600 rounded-lg ">
                        <div>
                            <p className="pt-4 pl-6 font-sans font-medium text-white">
                                Number of products :
                            </p>
                        </div>
                        <div>
                            <p className="pt-5 pl-24 font-sans text-3xl text-white">
                                {orderToShow.numberOfProducts}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row w-full mt-4">
                <div>
                    <p className="font-sans font-bold text-red-600 text-xl">
                        Products :
                    </p>
                </div>
                <div>
                    <ListOfProducts orderToShow = {orderToShow}/>
                </div>
            </div>
        </div>
      );
};
 
export default Orders;

import React from "react";
import {AiOutlineClose} from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { AddOrder } from "../data/apiCalls";

const Cart = ({currentOrder, handleOnDeleteProduct, setShopChoice, setCurrentOrder}) => {

    const queryClient = useQueryClient();

    const {mutate, isLoading} = useMutation((newOrder) => AddOrder(newOrder), {
        onError: (error) => {console.log(error.message);},
        onSuccess: () => {
            queryClient.invalidateQueries("orders");
            console.log("POST success");
        }
    
    });
    
    const initialValue = 0;
    const totalCart = currentOrder ? currentOrder.reduce(
        (previousValue, currentValue) => parseFloat(parseFloat(previousValue).toFixed(2)) + parseFloat(parseFloat(currentValue.totalPrice).toFixed(2)), initialValue
    ):0;

    const totalQuantity = currentOrder ? currentOrder.reduce(
        (previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue.quantity), initialValue
    ):0;

    const handlePurchase = (async(event) => {

        
        let newOrder = {};
        let newProductOrders = [];

        currentOrder.map(p => {
            const product = {
                productId: p.productId,
                quantity: p.quantity
            };
            newProductOrders.push(product);
        
    });

        newOrder = {

                name: `newOrder`,
                total: totalQuantity,
                numberOfProducts: totalQuantity,
                productOrders: newProductOrders
              };
        
        mutate(newOrder);
        console.log(newOrder);
        setCurrentOrder([]);
        setShopChoice(0);
        event.preventDefault();
        

    });

    if(isLoading) return (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
              <span className="visually-hidden">Loading...</span>
          </div>
        </div>
    );
  
    const CartTable = currentOrder.length > 0 ? currentOrder.map((cartProduct, index) => 
        
        <tr key={index}>
            <td className="border-b pt-2">{cartProduct.name}</td>
            <td className="text-right border-b ">{cartProduct.quantity}</td>
            <td className="text-right border-b ">{cartProduct.totalPrice} €</td>
            <td className="pl-1 pt-2"> <button id={`${index}`} className="" onClick={(e) => handleOnDeleteProduct(e.target.id)}> 
            <AiOutlineClose color="red" size={"20"}/> </button></td>

        </tr>) : <tr/>;

    return (
        <div>
            <table className="table-auto shrink-0">
                <thead>
                    <tr className="bg-slate-200">
                        <th className="border-b py-3 px-6"> Title </th>
                        <th className="border-b py-3 px-6"> Quantity </th>
                        <th className="border-b py-3 px-6"> Price </th>
                    </tr>
                </thead>
                <tbody>
                    {CartTable}
                    <tr className="text-red-400 font-semibold">
                        <td className="border-b">Total</td>
                        <td className="text-right border-b">{totalQuantity}</td>
                        <td className="text-right border-b">{totalCart.toFixed(2)} €</td>

                    </tr>
                </tbody>
            </table>
            <div className="flex w-full pt-10 place-content-end">
                <button className="px-8 py-3 bg-green-200 rounded-full text-center font-semibold 
                hover:scale-105 focus:bg-green-500" type="submit" onClick={(event) => handlePurchase(event)}> 
                Purchase !
                </button>

            </div>
           

        </div>
      );
};
 
export default Cart;
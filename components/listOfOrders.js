import React from "react";

const ListOfOrders = ({ordersData, ShowProducts}) => {

    return ( 
        <div className="flex flex-nowrap h-44 overflow-x-auto">
         {ordersData.map((order, index) => 
                            <button key={order.name + index} className=""
                            onClick={() => ShowProducts(order)}>
                                <div className="w-64 h-36 ml-4 shrink-0 block rounded-lg shadow-lg border-2 border-dotted 
                                border-green-900 hover:scale-105">
                                    <div className="w-full h-full px-3 py-3">
                                        <div className="font-bold p-1 text-l break-words text-left">{order.name}</div>
                                        <p className=" p-1 text-2xl text-left font-thin">{order.total} €</p>
                                        <p className=" mt-5 text-md text-right font-light"> Number of products : {order.numberOfProducts}</p>
                                    </div> 
                                </div>
                            </button>
                        )}
        </div>
     );
};
 
export default ListOfOrders;
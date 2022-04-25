import React from "react";

const Orders = ({data}) => {
    return (
        <div>
            <ul>
                {data.map((order, index) =>
                    <li key={index}>{order.name}</li>
                )}      

            </ul>
            

        </div>
      );
};
 
export default Orders;

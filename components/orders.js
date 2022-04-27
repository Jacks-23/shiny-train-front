import React from "react";

const Orders = ({data, SetsTheChoiceOfTheTopic}) => {

    return (
        <div>
            <button onClick={() => SetsTheChoiceOfTheTopic(0)}> Reset button</button>
            <ul>
                {data.map((order, index) =>
                    <li key={index}>{order.name}</li>
                )}      

            </ul>
        </div>
      );
};
 
export default Orders;
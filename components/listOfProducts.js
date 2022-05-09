import React from "react";

const ListOfProducts = ({orderToShow}) => {

    return (
        <>
            {/* <ul>
    
                {orderToShow.products.map((product, index) =>
                    <li
                    className="px-6 py-2 border-b border-gray-200 w-full"
                        key={product.name + index.toString}> {product.name} {product.price}</li>
                )}
            </ul> */}
            <div className="">
                <table className="min-w-full">
                    <thead className="border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Description
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderToShow.products.map((product, index) =>
                            <tr key={product.name + index.toString} className="border-b">
                                <td className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    {product.name} 
                                    </td>
                                <td className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    {product.price} 
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
        </>
                    
    
      );
};
 
export default ListOfProducts;
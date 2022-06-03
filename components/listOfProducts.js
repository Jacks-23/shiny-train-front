import React from "react";

const ListOfProducts = ({orderToShow}) => {

    return (
        <>
            <table className="border-collapse table-auto w-full text-sm">
                <thead>
                    <tr className="bg-amber-500">
                       <th className="border-b font-medium pl-8 py-2 text-slate-100 text-left"> 
                        Title
                       </th> 
                       <th className="border-b font-medium pl-8 py-2 text-slate-100 text-left"> 
                        Price €
                       </th>
                       <th className="border-b font-medium pl-8 py-2 text-slate-100 text-left"> 
                        Picture
                       </th>
                       <th className="border-b font-medium pl-8 py-2 pr-8 text-slate-100 text-left"> 
                        Description
                       </th>
                    </tr>
                </thead>
                <tbody className="">
                    {orderToShow.products.map((product) =>
                                <tr key={`${product.name}_${product.productId}`} className="border-b border-slate-100 p-4 pl-8 text-slate-500">
                                    <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
                                        {product.name} 
                                        </td>
                                    <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
                                        {product.price} € 
                                    </td>
                                    <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
                                        {product.picture}
                                    </td>
                                    <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
                                        {product.description} 
                                    </td>
                                </tr>
                            )}
                </tbody>
            </table>
        </>

      );
};
 
export default ListOfProducts;
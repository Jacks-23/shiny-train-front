import React, { useState} from "react";
import { useQueryClient, useMutation } from "react-query";
import { UpdateProduct} from "../data/apiCalls";
import {FiTrash2} from "react-icons/fi";
import DeleteProductDialog from "./deleteProductDialog";
import AddProductDialog from "./addProductDialog";

const ProductsManagement = ({productsData, isProductsLoading}) => {

    const [productToDelete, setProductToDelete] = useState({});
    const [isDeleteProductOpen, setIsDeleteProductOpen] = useState(false);
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);

    const queryClient = useQueryClient();

    const {mutate, isLoading} = useMutation(updatedProduct => UpdateProduct(updatedProduct), {
        onError: (error) => {console.log(error.message);},
        onSuccess: () => {
            queryClient.invalidateQueries("products");
            console.log("PUT success");
        }
    
    });


    const handleChangeProducts = (event, product) => {
        
        const value = event.target.value;
        const name = event.target.name;
        const updatedProduct = {...product, [name]: value};
        console.log(updatedProduct);
        if(value != '')
        mutate(updatedProduct);
        
    };


    if(isProductsLoading || isLoading) return (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
              <span className="visually-hidden">Loading...</span>
          </div>
        </div>
    );
    

    return ( 
        <div className="w-full">
            <div className="flex flex-col pb-4">
                <p className="text-2xl font-light"> Products</p>
                <div className="flex w-full h-12 justify-center">
                    <button className=" bg-white py-1 px-4 text-center font-bold" 
                        onClick={() => setIsAddProductOpen(true)}> You want to add a product ?  
                    </button>
                </div>
            </div>
            <div className="flex justify-center">
                <table className="border-collapse table-auto w-full md:w-2/3 text-sm">
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
                        {productsData.map((product) =>
                                    <tr key={`${product.name}_${product.productId}`} className="border-b border-slate-100 p-4 pl-8 text-slate-500">

                                        <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
                                            <input className="focus:outline-none" type="text" name="name" placeholder={product.name}
                                                onBlur={(e) => handleChangeProducts(e, product)}/>
                                        </td>
                                        <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
                                            <input className="focus:outline-none" type="number" name="price" placeholder={`${product.price} €`} 
                                                onBlur={(e) => handleChangeProducts(e, product)}/>
                                        </td>
                                        <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
                                            <input className="focus:outline-none" type="text" name="picture" placeholder={product.picture}
                                                onBlur={(e) => handleChangeProducts(e, product)}/>
                                        </td>
                                        <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
                                            <input className="focus:outline-none" type="text" name="Description" placeholder={product.description}
                                                onBlur={(e) => handleChangeProducts(e, product)}/> 
                                        </td>
                                        <td className="pl-2">
                                            <button onClick={() => {setIsDeleteProductOpen(true); setProductToDelete(product);}}>
                                                <FiTrash2/>
                                            </button>
                                        </td>
                                    </tr>
                                )}
                    </tbody>
                </table>
            </div>
            <DeleteProductDialog isDeleteProductOpen={isDeleteProductOpen} setIsDeleteProductOpen={setIsDeleteProductOpen} 
            productToDelete={productToDelete} setProductToDelete={setProductToDelete}/>
            <AddProductDialog isAddProductOpen={isAddProductOpen} setIsAddProductOpen={setIsAddProductOpen}/>
        </div>
            
    
        
    );
};
 
export default ProductsManagement;
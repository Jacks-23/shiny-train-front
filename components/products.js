import React, {useState} from "react";
import {BiShoppingBag} from "react-icons/bi";
import ProductDialog from "./productDialog";


const Products = ({setCurrentOrder, isProductsLoading, productsData}) => {
    
    const [selectedProduct, setSelectedProduct] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    

    const SelectProduct = (product) => {
        setIsOpen(true);
        setSelectedProduct(product);
    };

    
    if(isProductsLoading) return (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
              <span className="visually-hidden">Loading...</span>
          </div>
        </div>
    );

    return (
            
        <>
            <ProductDialog selectedProduct={selectedProduct} isOpen={isOpen} setIsOpen={setIsOpen} setCurrentOrder={setCurrentOrder}/>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 ">
                
                {productsData.map((product) => (
                    <div key={`${product.name}_${product.productId}`} className="w-64 h-52 ml-4 mb-4 shrink-0 block rounded-lg 
                    shadow-lg hover:scale-105">
                        <div style={{backgroundImage: `url(https://picsum.photos/200)`,
                            backgroundSize: "cover",
                            backgroundRepeat:"no-repeat",
                            height:100, width:256
                        }}>
                            <div className="w-full h-full px-3 py-3">
                                <div className="flex flex-col pb-4">
                                    <button className="w-10 h-10 place-self-end" onClick={() => SelectProduct(product)}>
                                        <BiShoppingBag color="white" className="w-full h-full"/>
                                    </button>
                                    <div className="mt-16 font-bold text-l break-words self-center">{product.name}</div>
                                    <div className="font-base italic text-l h-8 break-words self-center">{product.description}</div>
                                    <p className=" p-1 text-2xl text-right font-thin"> {product.price} €</p>
                                </div>
                            </div>
                        </div>  
                    </div>
                ))}
            </div>
        </>

      );
};
 
export default Products;
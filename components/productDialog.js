import { Dialog, Transition } from "@headlessui/react";
import {React, Fragment, useState} from "react";

const ProductDialog = ({selectedProduct, isOpen, setIsOpen, setCurrentOrder}) => {

    const [selectedProductQuantity, setSelectedProductQuantity] = useState('1');
    
    let selectedProductPrice = selectedProductQuantity == ''? (0.00).toFixed(2) 
    : (selectedProduct.price * parseFloat(selectedProductQuantity)).toFixed(2);
    
    const handleQuantityChange = (event => {

        const quantity = event.target.validity.valid ? event.target.value : selectedProductQuantity;
        setSelectedProductQuantity(quantity);
    });

    const submitSelectedProduct = () =>
    {
        const productToAdd = {
            productId: selectedProduct.productId,
            name: selectedProduct.name,
            quantity: selectedProductQuantity,
            totalPrice: selectedProductPrice
        };

        setCurrentOrder(order => [...order, productToAdd]);
        setSelectedProductQuantity('1');
        setIsOpen(false);
        
    };


    return ( 
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog onClose={setIsOpen} className="fixed inset-0 p-4 pt-[25vh] overflow-y-auto">
                <Dialog.Panel>
                    <Transition.Child enter="duration-300 ease-out" enterFrom="opacity-0" enterTo="opacity-100"
                    leave="duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500/75"/>
                    </Transition.Child>

                    <Transition.Child enter="duration-300 ease-out" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                    leave="duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                        <div className="flex flex-row relative bg bg-white max-w-xl h-[40vh] mx-auto rounded-xl shadow-xl ring-1 ring-black/5">
                            <div className="rounded-l-xl w-1/2 h-full" style={{backgroundImage: `url(https://picsum.photos/200)`,
                                backgroundSize: "cover",
                                backgroundRepeat:"no-repeat",
                                
                            }}/>
                            <div className="w-1/2 h-full">
                                <p className="pt-6 text-center text-3xl font-thin">{selectedProduct.name}</p>
                                <p className="pt-10 pl-1 text-left text-xl italic"> {selectedProduct.description} Ici viendrait une description </p>
                                <div className="flex flex-row pt-16 gap-5">
                                    <div className="flex flex-row">
                                        <p className="pl-1 text-lg italic">Quantity : </p>
                                        <input className="ml-1 px-1 py-2 bg-white border shadow-sm border-slate-300
                                        placeholder-slate-400 focus:outline-none focus:border-sky-500
                                        focus:ring-sky-500 block w-16 h-7 rounded-sm sm:text-sm focus:ring-1" type="number" 
                                        onInput={handleQuantityChange} max={'10'} min={'1'}  value={selectedProductQuantity}>
                                        </input>
                                    </div>
                                    <p className="pr-1 text-right text-lg italic"> Total : {selectedProductPrice} € </p>
                                </div>
                                <div className="flex flex-row gap-2 pt-16 justify-center">
                                    <div className="flex place-content-end self-end">
                                        <button className="px-8 py-3 bg-green-200 rounded-full text-center font-semibold 
                                        hover:scale-105 focus:bg-green-500" onClick={() => submitSelectedProduct()}> Add ot cart</button>
                                    </div>
                                    <div className="flex">
                                        <button className="px-8 py-3 bg-sky-200 rounded-full text-center font-semibold 
                                        hover:scale-105 focus:bg-sky-500" onClick={() => setIsOpen(false)}> Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Transition.Child>
                </Dialog.Panel>

            </Dialog>
        </Transition.Root> 
        
    );
};
 
export default ProductDialog;
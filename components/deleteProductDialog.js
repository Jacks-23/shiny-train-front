import {React, Fragment, useState} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQueryClient } from "react-query";
import { DeleteProduct } from "../data/apiCalls";
import {FaRegCheckCircle} from "react-icons/fa";

const DeleteProductDialog = ({isDeleteProductOpen, setIsDeleteProductOpen, productToDelete, setProductToDelete}) => {

    const [errorDeleteProduct, setErrorDeleteProduct] = useState();
    const [deleteConfirmation, setDeleteConfirmation] = useState("visible");
    const [deleteFail, setDeleteFail] = useState("hidden");
    const [deleteSuccess, setDeleteSuccess] = useState("hidden");


    const queryClient = useQueryClient();

    const {mutate,  isLoading} = useMutation(productId => DeleteProduct(productId), {
        onSettled: (data) => DeleteTreatment(data)
    });

    const DeleteTreatment = (data) => {
        if(data)
        {
            setErrorDeleteProduct(data.detail);
            setDeleteConfirmation("hidden");
            setDeleteFail("visible");
            console.log(errorDeleteProduct);
        }
        else{
            setDeleteConfirmation("hidden");
            setDeleteSuccess("visible");
            setProductToDelete({});
            queryClient.invalidateQueries("products");

        }       
    };


    const handleDeleteProduct = (event => {
        const productId = event.target.value;
        mutate(productId);
        
    });

    const handleRogerThat = () => {
        setIsDeleteProductOpen(false);
        setTimeout(() => {
            setDeleteConfirmation("visible");
            setDeleteFail("hidden");
        }, 400);
        

    };

    const handleOkThanks = () => {
        setIsDeleteProductOpen(false);
        setTimeout(() => {
            setDeleteConfirmation("visible");
            setDeleteSuccess("hidden");
        }, 400);
        

    };

    if(isLoading) return (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
              <span className="visually-hidden">Loading...</span>
          </div>
        </div>
    );


    return (
        <Transition.Root show={isDeleteProductOpen} as={Fragment}>
            <Dialog onClose={setIsDeleteProductOpen} className="fixed inset-0 p-4 pt-[40vh] overflow-y-auto">
                <Dialog.Panel>
                    <Transition.Child enter="duration-300 ease-out" enterFrom="opacity-0" enterTo="opacity-100"
                    leave="duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500/75 -z-10"/>
                    </Transition.Child>

                    <Transition.Child enter="duration-300 ease-out" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                    leave="duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                        <div className="flex flex-col gap-8 bg bg-white max-w-xl h-[20vh] mx-auto rounded-xl shadow-xl ring-1 ring-black/5">
                            <div className={` ${deleteConfirmation}`}>
                                <p className="text-center text-xl pt-10">
                                Are you sure you want to delete <font className="text-red-600">{productToDelete.name}</font> ? 
                                </p>
                                <div className="flex flex-row justify-center pt-8">
                                    <div className="flex flex-row gap-32">
                                        <button className="px-8 py-3 h-16 bg-sky-400 rounded-md text-center font-semibold 
                                        hover:scale-105 focus:bg-sky-500" onClick={() => setIsDeleteProductOpen(false)}> 
                                        Cancel
                                        </button>
                                        <button className="px-8 py-3 h-16 bg-red-400 rounded-md text-center font-semibold 
                                        hover:scale-105 focus:bg-red-500" value={productToDelete.productId} onClick={handleDeleteProduct}> 
                                        Delete 
                                        </button>
                                        
                                    </div>
                                </div>
                            </div> 
                            <div className={` ${deleteFail}`}>
                                <p className="text-center text-xl pt-10">
                                Nope we need <font className="text-red-600">{productToDelete.name}</font> ! 
                                </p>
                                <p className=" text-lg font-semibold pl-6 pt-5">
                                    Reason :  <font className="text-red-600">{errorDeleteProduct} !</font> 
                                </p>
                                <div className="flex justify-end pr-6 pt-5">
                                <button className="bg-red-600 w-28 text-xs text-white rounded py-2 hover:bg-red-500
                                    hover:scale-105 ease-in-out duration-300" onClick={handleRogerThat}> Roger that ! </button>
                                </div> 
                            </div>
                            <div className={` ${deleteSuccess} pr-4`}>
                                <div className="flex pt-10 justify-center">
                                    <FaRegCheckCircle color="green" size={50}/>
                                </div>
                                <div className="text-center">
                                    <p className="text-xl"> <font className="text-green-700 font-semibold"> 
                                    {productToDelete.name}</font> has been deleted from to the product list !</p>
                                </div>
                                <div className="flex flex-row my-5 justify-end">
                                    <button className="bg-green-600 w-28 text-xs text-white rounded py-2 hover:bg-green-500
                                    hover:scale-105 ease-in-out duration-300" onClick={handleOkThanks}> Ok thanks ! </button>
                                </div>
                            </div>  
                        </div>
                    </Transition.Child>
                </Dialog.Panel>
            </Dialog>
        </Transition.Root> 
      );
};
 
export default DeleteProductDialog;
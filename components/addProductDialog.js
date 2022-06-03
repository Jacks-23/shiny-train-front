import React, {useState, Fragment} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQueryClient } from "react-query";
import { AddProduct } from "../data/apiCalls";
import InputText from "./inputText";
import {FaRegCheckCircle} from "react-icons/fa";
import {TbFaceIdError} from "react-icons/tb";

const AddProductDialog = ({isAddProductOpen, setIsAddProductOpen}) => {
    const [addProductInputs, setAddProductInputs] = useState({});
    const [addFormVisibility, setAddFormVisibility] = useState("visible");
    const [addErrorVisibility, setAddErrorVisibility] = useState("hidden");
    const [addSuccessVisibility, setAddSuccessVisibility] = useState("hidden");
    const [errorAddProduct, setErrorAddProduct] = useState();
    const [formValidations, setFormValidations] = useState({});


    const queryClient = useQueryClient();

    const {mutate, isLoading} = useMutation(newProduct => AddProduct(newProduct), {
        onSettled: (data) => AddTreatment(data)
    });

    const AddTreatment = (data) => {
        if(data){
            console.log(data);
            setErrorAddProduct(data.detail);
            setAddFormVisibility("hidden");
            setAddErrorVisibility("visible");
            
        }
        else{
            setAddFormVisibility("hidden");
            setAddSuccessVisibility("visible");
            queryClient.invalidateQueries("products");
        }
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        

        setAddProductInputs(values => ({...values, [name]: value}));

    };

    const handleSubmit = (async(event) => {
        let shouldSubmit = false;

        if(addProductInputs.name == null )
        {
            setFormValidations(errors =>({...errors, name: "A product needs a name !" }));
            shouldSubmit = false;
        }
        else{
            setFormValidations(errors =>({...errors, name: "" }));
            shouldSubmit = true;
        }

        if(addProductInputs.price == null)
        {
            setFormValidations(errors =>({...errors, price: "A product needs a price !" }));
            shouldSubmit = false;
        }
        else{
            setFormValidations(errors =>({...errors, price: "" }));
            shouldSubmit = true;
        }

        if(shouldSubmit){
            mutate(addProductInputs);
            event.preventDefault();
        }
        
        event.preventDefault();

    });

    const handleRogerThat = () => {
        setIsAddProductOpen(false);
        setTimeout(() => {
            setAddFormVisibility("visible");
            setAddErrorVisibility("hidden");
            setAddProductInputs({});
        }, 400);
    };

    const handleOkThanks = () => {
        setIsAddProductOpen(false);
        setTimeout(() => {
            setAddFormVisibility("visible");
            setAddSuccessVisibility("hidden");
            setAddProductInputs({});
        }, 400);
    };

    if(isLoading) return (
        <div className="">
          loading
        </div>
    );
    


    return (
        <Transition.Root show={isAddProductOpen} as={Fragment}>
            <Dialog onClose={setIsAddProductOpen} className="fixed inset-0 p-4 pt-[30vh] overflow-y-auto">
                <Dialog.Panel>
                    <Transition.Child enter="duration-300 ease-out" enterFrom="opacity-0" enterTo="opacity-100"
                    leave="duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500/75 -z-10"/>
                    </Transition.Child>

                    <Transition.Child enter="duration-300 ease-out" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                    leave="duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                        <div className={`flex flex-col gap-8 px-4 bg bg-white max-w-xl h-[35vh] mx-auto rounded-xl shadow-xl 
                        ring-1 ring-black/5 ${addFormVisibility}`}>
                            <div className="pt-8 text-center">
                                <p className="text-xl">Fill up this form to add a new product !</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-row gap-10 w-full h-14">
                                        <div className="flex flex-col w-1/2">
                                            <input type = "text" name={"name"} placeholder={"Name"} value={addProductInputs.name || ""} 
                                                onChange={handleChange} className="mt-1 px-1 py-2 bg-white border shadow-sm border-slate-300 
                                                placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block 
                                                w-full h-7 rounded-sm sm:text-sm focus:ring-1 placeholder:text-sm"/>
                                            <span className="text-sm pt-1 pl-1 font-semibold text-red-600">
                                                {formValidations.name ? formValidations.name : ""}
                                            </span>
                                        </div>
                                    
                                        <div className="flex flex-col w-1/2">
                                            <input className="px-2 h-8 rounded-sm border border-slate-300 text-sm
                                            placeholder:text-sm placeholder-slate-400 focus:outline-none 
                                            focus:ring-sky-500 focus:ring-1" placeholder="Price" 
                                            type="number" step="any" name="price" min={0.01} value={addProductInputs.price || ""}
                                            onChange={handleChange}/>
                                            <span className="text-sm pt-1 pl-1 font-semibold text-red-600">
                                                {formValidations.price ? formValidations.price : ""}
                                            </span>
                                        </div>

                                    </div>
                                    <InputText name={"picture"} placeholder={"Picture"} value={addProductInputs.picture || ""} 
                                        handleChange={handleChange}/> 

                                    <textarea className="rounded-sm mt-2 px-1 py-1 border border-slate-300 text-sm
                                    placeholder:text-sm placeholder-slate-400 focus:outline-none 
                                    focus:ring-sky-500 focus:ring-1" name={"description"} placeholder="Description" 
                                    value={addProductInputs.description || ""} onChange={handleChange}/>

                                    <div className="flex flex-row my-5 justify-end">
                                        <button className="bg-blue-500 w-20 text-xs text-white rounded-sm py-2 hover:bg-green-500
                                        hover:scale-105 ease-in-out duration-300" type = "submit"> Submit </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className={`flex flex-col gap-8 px-4 bg bg-white max-w-xl h-[25vh] mx-auto rounded-xl shadow-xl 
                        ring-1 ring-black/5 ${addSuccessVisibility}`}>
                            <div className="flex pt-10 justify-center">
                                <FaRegCheckCircle color="green" size={50}/>
                            </div>
                            <div className="text-center">
                                <p className="text-xl"> <font className="text-green-700 font-semibold"> {addProductInputs.name}</font> 
                                has been added to the product list !</p>
                            </div>
                            <div className="flex flex-row my-5 justify-end">
                                <button className="bg-green-600 w-28 text-xs text-white rounded py-2 hover:bg-green-500
                                hover:scale-105 ease-in-out duration-300" onClick={handleOkThanks}> Ok thanks ! </button>
                            </div>
                        </div>
                        <div className={`flex flex-col gap-5 px-4 bg bg-white max-w-xl h-[25vh] mx-auto rounded-xl shadow-xl 
                        ring-1 ring-black/5 ${addErrorVisibility}`}>
                            <div className="flex pt-5 justify-center">
                                <div className="group">
                                    <TbFaceIdError color="red" size={80}/>
                                    <span className="group-hover:scale-100 absolute top-44 w-52 p-2 m-2
                                    rounded-md shadow-md text-white bg-gray-900 text-xs font-bold transition-all 
                                    duration-100 scale-0">
                                        {errorAddProduct}
                                    </span>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-xl"> The product <font className="text-red-700 font-semibold"> 
                                {addProductInputs.name}</font> could not be added ! 
                                <br/> For more informations on the error check the sad face</p>
                            </div>
                            <div className="flex flex-row justify-end">
                                <button className="bg-red-600 w-28 text-xs text-white rounded py-2 hover:bg-red-500
                                hover:scale-105 ease-in-out duration-300" onClick={handleRogerThat}> Roger that ! </button>
                            </div>
                        </div>   
                    </Transition.Child>
                </Dialog.Panel>
            </Dialog>
        </Transition.Root> 

      );
};
 
export default AddProductDialog;
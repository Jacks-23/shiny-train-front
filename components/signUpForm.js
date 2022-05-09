import React, {useState, useContext} from "react";
import { useMutation} from "react-query";
import { SignUp } from "../data/apiCalls";
import { AuthenticationContext} from "../context/authenticationContext";
import InputText from "./inputText";
import Checkbox from "./checkbox";

const SignUpForm = ({number, setChoice}) => {
    const {setAuthentication} = useContext(AuthenticationContext);
    const [inputs, setInputs] = useState({});
    const [errorVisibility, setErrorVisibility] = useState("hidden");

    const {mutate, isLoading, } = useMutation((inputs) => SignUp(inputs), {
        onError: (error) => {console.log(error.message);},
        onSettled: (data) => SuccessTreatment(data)
    
    });
    const SuccessTreatment = (data) => {
        if(data.status == 500){
            setAuthentication(null);
            setChoice(1);
            setErrorVisibility("visible");
        }
        else{
            setAuthentication(data);
            console.log(data);
            setChoice(number);
            setErrorVisibility("hidden");
        }    

    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({...values, [name]: value}));

    };

    const handleSubmit = (async(event) => {

        mutate(inputs);
        console.log(inputs);
        setInputs({});
        event.preventDefault();

    });


    if(isLoading){

        return (
            <div>
                Is loading
            </div>
        );
    }

    return (  

        <div className="flex justify-center">
            <div className="flex flex-col mt-20 p-7 border shadow-md">
                <div className="flex flex-row">
                    <p className="font-bold text-blue-500">M</p>
                    <p className="font-bold text-red-500">y</p>
                    <p className="font-bold text-yellow-500">A</p>
                    <p className="font-bold text-blue-500">p</p>
                    <p className="font-bold text-green-500">p</p>
                </div>
                <div className="mt-2">
                    <p className="text-xl">Create an account MyApp </p>
                </div>
                <div className="mt-2">
                    <p className="text-sm">Access MyApp</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mt-5">
                        <div className="flex flex-row gap-2 ">
                            <InputText name={"firstName"} placeholder={"First name"} value={inputs.firstName || ""} 
                            handleChange={handleChange}/>

                            <InputText name={"lastName"} placeholder={"Last name"} value={inputs.lastName || ""} 
                            handleChange={handleChange}/> 
                        </div>

                        <div className="mt-5">
                            <InputText name={"email"} placeholder={"Email"} value={inputs.email || ""} 
                                handleChange={handleChange}/>
                        </div>

                        <div className="flex flex-row mt-5 gap-2 ">
                            <InputText name={"username"} placeholder={"Username"} value={inputs.username || ""} 
                            handleChange={handleChange}/>

                            <InputText name={"password"} placeholder={"Password"} value={inputs.password || ""} 
                            handleChange={handleChange}/> 
                        </div>
                        <div className="flex flex-row mt-5 gap-5 ">
                            <p className="text-sm"> Do you have administrator priviliege ?</p>
                            <Checkbox setInputs={setInputs}/>
                            
                        </div>

                        <div className="flex flex-row my-10 justify-end">
                            <button className="bg-blue-500 w-20 text-xs text-white rounded-sm py-2 hover:bg-green-500
                            hover:scale-105 ease-in-out duration-300" type = "submit"> Submit </button>
                        </div>
                        
                    </div>
                </form>
                <div className={` mt-5 ${errorVisibility}`}>
                    <p className="text-red-600 text-center"> SignUp Failed</p>
                </div>
            </div>
        </div>
        
    );
};
 
export default SignUpForm;
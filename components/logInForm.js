import React, {useState, useContext} from "react";
import { useMutation} from "react-query";
import { LogIn } from "../data/apiCalls";
import { AuthenticationContext} from "../context/authenticationContext";
import InputText from "./inputText";

const LogInForm = ({number, setChoice, needAccount, setNeedAccount}) => {
    const {setAuthentication} = useContext(AuthenticationContext);
    const [inputs, setInputs] = useState({});
    const [errorVisibility, setErrorVisibility] = useState("hidden");

    const {mutate, isLoading, } = useMutation((inputs) => LogIn(inputs), {
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
        setInputs({});
        event.preventDefault();

    });

    const handleOnClick = () => {
        setNeedAccount(!needAccount);

    };

    if(isLoading){

        return (
            <div>
                Is loading
            </div>
        );
    }

    return (  

        <div className="flex justify-center">
            <div className="shrink-0 h-80 w-80 mt-40 p-7 border shadow-md">
                <div className="flex flex-row">
                    <p className="font-bold text-blue-500">M</p>
                    <p className="font-bold text-red-500">y</p>
                    <p className="font-bold text-yellow-500">A</p>
                    <p className="font-bold text-blue-500">p</p>
                    <p className="font-bold text-green-500">p</p>
                </div>
                <div className="mt-2">
                    <p className="text-xl">Sign in to MyApp </p>
                </div>
                <form className="self-center mt-5" onSubmit={handleSubmit}>
                    <div className="w-3/4 mb-8 "> 
                        <InputText name={"login"} value={inputs.login || ""} placeholder={"Login"} handleChange={handleChange}/>
                    </div>
                    <div className="w-3/4 mb-8"> 
                        <InputText name={"password"} value={inputs.password || ""} placeholder={"Password"} handleChange={handleChange}/>
                    </div>
                    <div className="flex pt-4 place-content-end">
                        <button className="px-8 py-3 bg-green-200 rounded-full text-center font-semibold 
                    hover:scale-105 focus:bg-green-500" type = "submit"> Sign in</button>
                    </div>
                </form>
                <div className={` mt-5 ${errorVisibility}`}>
                    <p className="text-red-600 text-center"> Invalid authentication</p>
                </div>
            </div>
            <div className="flex flex-row self-center ml-10 mt-36">
                <div className="ml-4">
                    <p className="text-4xl"> Or </p>
                </div>
                <div className="pl-16">
                    <button className="p-3 bg-red-200 rounded-full text-center font-semibold 
                    hover:scale-105 focus:bg-red-500" onClick={handleOnClick}> Create an account </button>
                </div>

            </div>
        </div>
        
    );
};
 
export default LogInForm;
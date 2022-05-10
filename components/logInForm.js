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
                <form className="self-center" onSubmit={handleSubmit}>
                    <div className="w-3/4 mb-8 "> 
                        <InputText name={"login"} value={inputs.login || ""} placeholder={"Login"} handleChange={handleChange}/>
                    </div>
                    <div className="w-3/4 mb-8"> 
                        <InputText name={"password"} value={inputs.password || ""} placeholder={"Password"} handleChange={handleChange}/>
                    </div>
                    <div className="flex flex-row gap-10">
                        <div>
                            <button onClick={handleOnClick}> Create account </button>
                        </div>
                        <div className="">
                            <button type = "submit"> Submit</button>
                        </div>
                        
                    </div>
                </form>
                <div className={` mt-5 ${errorVisibility}`}>
                    <p className="text-red-600 text-center"> Invalid authentication</p>
                </div>
            </div>
        </div>
        
    );
};
 
export default LogInForm;
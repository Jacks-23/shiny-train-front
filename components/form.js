import React, {useState, useContext} from "react";
import { useMutation} from "react-query";
import { LogIn } from "../data/apiCalls";
import { AuthenticationContext} from "../context/authenticationContext";

const MyForm = ({number, setChoice}) => {
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

    if(isLoading){

        return (
            <div>
                Is loading
            </div>
        );
    }

    return (  

        <>
            <form onSubmit={handleSubmit}>
                <label> Login
                    <input type = "text" name="login" value={inputs.login || ""} onChange={handleChange}/>
                </label>
                <label> Password
                    <input type = "text" name="password" value={inputs.password || ""} onChange={handleChange}/>
                </label>
                <button type = "submit">
                    Submit
                </button>

            </form>
            <div className={` mt-5 ${errorVisibility}`}>
                <p className="text-red-600 text-center"> Invalid authentication</p>
            </div>
        </>
        
    );
};
 
export default MyForm;
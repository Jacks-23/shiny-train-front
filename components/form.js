import React, {useState, useContext} from "react";
import { useMutation} from "react-query";
import { FindUser } from "../data/apiCalls";
import { UserContext } from "../context/userContext";

const MyForm = ({number, setChoice}) => {
    const {user, setUser} = useContext(UserContext);
    const [inputs, setInputs] = useState({});
    const [errorVisibility, setErrorVisibility] = useState("hidden");

    const {mutate, isLoading, } = useMutation((inputs) => FindUser(inputs), {
        onError: (error) => {console.log(error.message);},
        onSettled: (data) => SuccessTreatment(data)
    
    });
    const SuccessTreatment = (data) => {
        if(data.status == 500){
            setUser(null);
            console.log("Fail");
            console.log(data);
            setChoice(1);
            setErrorVisibility("visible");
        }
        else{
            console.log(data);
            setUser(data);
            setChoice(number);
            setErrorVisibility("hidden");
        }    

    };
    console.log(user);

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
                <label> Username
                    <input type = "text" name="username" value={inputs.username || ""} onChange={handleChange}/>
                </label>
                <label> Login
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
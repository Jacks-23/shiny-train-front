import React from "react";

const Checkbox = ({setInputs}) => {

    const checkHandler = (e) => {

        setInputs(values => ({...values, admin: e.target.checked}));
        
    };

    return (  
        <input 
            className="place-self-center" 
            type = "checkbox" 
            name="admin"
            onChange={(e) => {checkHandler(e);}}/>
    );
};
 
export default Checkbox;
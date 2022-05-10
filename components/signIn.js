import React from "react";
import LogInForm from "./logInForm";
import SignUpForm from "./signUpForm";

const SignIn = ({number, setChoice, needAccount, setNeedAccount}) => {
    
    return ( 
        <>
        {needAccount ? 
        <>
            <div className="">
                <SignUpForm number = {number} setChoice = {setChoice}/>
            </div>
            
        </>
        :
        <>
            <div className="">
                <LogInForm number={number} setChoice={setChoice} 
                setNeedAccount={setNeedAccount} needAccount={needAccount}/>
            </div>
            
        </>
            
        }
        
        </>
     );
};
 
export default SignIn;
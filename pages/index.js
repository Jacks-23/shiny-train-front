import React, {useState, useEffect, useContext} from "react";
import Orders from "../components/orders";
import LogInForm from "../components/logInForm";
import SignUpForm from "../components/signUpForm";
import { AuthenticationContext} from "../context/authenticationContext";
import { useTranslation } from "react-i18next";
import SignIn from "../components/signIn";


const IndexPage = () => {
    const {t, i18n} = useTranslation();
    const {authentication, setAuthentication} = useContext(AuthenticationContext);
    const [choice, setChoice] = useState(0);
    const [connected, setConnected] = useState(false);
    const [number, setNumber] = useState(0);
    const [needAccount, setNeedAccount] = useState(false);

    useEffect(() => {    
        if(!authentication){
            authentication == null;
            setConnected(false);
        }
        else{
            setConnected(true);
           
        }
    }, [authentication]);

    let signInVisibility = "hidden";
    let shoppingVisibility = "hidden"; 
    let option2Visibility = "hidden";
    let option3Visibility = "hidden";
    let homeVisibility = "visible";
    
    switch (choice) {

        case 1:
            signInVisibility = "visible";
            homeVisibility = "hidden";
            break;
        case 2 :
            shoppingVisibility = "visible";
            homeVisibility = "hidden";
            break;
        case 3 :
            option2Visibility = "visible";
            homeVisibility = "visible";
            break;
        case 4 :
            option3Visibility = "visible";
            homeVisibility = "visible";
            break;
    
        default:
            break;
    }


    const SetTopic = (numb) => {
        if (connected)
        setChoice(numb);
        else{
            setChoice(1);
            setNeedAccount(false);
            setNumber(numb);
        }
    };

    const LogoutFunction = () => {
        setAuthentication(null);
        setChoice(0);
    };

    const selectLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    };

   
    return (
        <>
           <div className="flex flex-row bg-emerald-400 right justify-end pt-12 pr-32">
               { authentication != null ? <button onClick={LogoutFunction}> LogOut </button>
               : <>
                <button value="Sign in" onClick={() => SetTopic(1) }> Sign in</button>
               </>
               }
               
               <button className="pl-4" onClick={() => setChoice(0)}> Home </button> 
               <div className="pl-4">
                   <select id="selectedLanguage" className="w-35 text-gray-500" onChange={selectLanguage}>
                       <option value = "en" > EN </option>
                       <option value = "fr" > FR </option>
                   </select>
               </div>
           </div>
            <div className={`bg-emerald-400 w-full h-screen ${homeVisibility}`}>
                <div className="pt-8 pl-10"> <p className="text-4xl text-gray-50">Welcome to your app 
                {authentication ? `${authentication.user.firstName} ${authentication.user.lastName}` : ''} ! </p> </div>
                <div className=" flex flex-col">
                    <button onClick={() => SetTopic(2)}>{t('shoppingApp')}</button>
                    <button onClick={() => SetTopic(3)}>Option 2 is comming</button>
                    <button onClick={() => SetTopic(4)}>Option 3 is comming</button>
                </div>
            </div>
            <div className={`${signInVisibility}`}>
                <SignIn number={number} setChoice={setChoice} needAccount={needAccount} setNeedAccount={setNeedAccount}/>
            </div>
            <div className={`${shoppingVisibility}`}>
            { authentication ? <Orders SetTopic = {SetTopic}/>
               : <></> }
                
            </div>
            <div  className={`${option2Visibility}`}> Option 2 </div>
            <div  className={`${option3Visibility}`}> Option 3</div>
            
        </>
        
      );
};
 
export default IndexPage;
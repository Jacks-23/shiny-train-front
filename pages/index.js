import React, {useState, useEffect, useContext} from "react";
import Orders from "../components/orders";
import LogInForm from "../components/logInForm";
import SignUpForm from "../components/signUpForm";
import { AuthenticationContext} from "../context/authenticationContext";
import { useTranslation } from "react-i18next";


const IndexPage = () => {
    const {t, i18n} = useTranslation();
    const {authentication, setAuthentication} = useContext(AuthenticationContext);
    const [choice, setChoice] = useState(0);
    const [connected, setConnected] = useState(false);
    const [number, setNumber] = useState(0);

    useEffect(() => {    
        if(!authentication){
            authentication == null;
            setConnected(false);
            console.log(connected);
        }
        else{
            setConnected(true);
            console.log(connected);
        }
    }, [authentication, connected]);

    let logInVisibility = "hidden";
    let signUpVisibility = "hidden"; 
    let option1Visibility = "hidden"; 
    let option2Visibility = "hidden";
    let option3Visibility = "hidden";
    let defaultVisibility = "visible";
    
    switch (choice) {
        case 1:
            logInVisibility = "visible";
            defaultVisibility = "hidden";
            break;
        case 2 :
            option1Visibility = "visible";
            defaultVisibility = "hidden";
            break;
        case 3 :
            option2Visibility = "visible";
            defaultVisibility = "visible";
            break;
        case 4 :
            option3Visibility = "visible";
            defaultVisibility = "visible";
            break;
        case 5 :
            signUpVisibility = "visible";
            defaultVisibility = "hidden";
            break;
    
        default:
            break;
    }


  const SetsTheChoiceOfTheTopic = (numb) => {
      if (connected)
      setChoice(numb);
      else if(numb == 5){
          setChoice(numb);
      }
      else{
        setChoice(1);
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
                <button onClick={()=> SetsTheChoiceOfTheTopic(0)}> Sign in</button>
                <button onClick={() => SetsTheChoiceOfTheTopic(0)} > LogIn </button>
                <button className="pl-4" onClick={() => SetsTheChoiceOfTheTopic(5)} > SignUp </button>
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
            <div className={`bg-emerald-400 w-full h-screen ${defaultVisibility}`}>
                <div className="pt-8 pl-10"> <p className="text-4xl text-gray-50">Welcome to your app 
                {authentication ? `${authentication.user.firstName} ${authentication.user.lastName}` : ''} ! </p> </div>
                <div className=" flex flex-col">
                    <button onClick={() => SetsTheChoiceOfTheTopic(2)}>{t('shoppingApp')}</button>
                    <button onClick={() => SetsTheChoiceOfTheTopic(3)}>Option 2 is comming</button>
                    <button onClick={() => SetsTheChoiceOfTheTopic(4)}>Option 3 is comming</button>
                </div>
            </div>
            <div className={`${logInVisibility}`}>
                <LogInForm number = {number} setChoice = {setChoice}/>
            </div>
            <div className={`${signUpVisibility}`}>
                <SignUpForm number = {number} setChoice = {setChoice}/>
            </div>
            <div className={`${option1Visibility}`}>
            { authentication ? <Orders SetsTheChoiceOfTheTopic = {SetsTheChoiceOfTheTopic}/>
               : <div/> }
                
            </div>
            <div  className={`${option2Visibility}`}> Option 2 </div>
            <div  className={`${option3Visibility}`}> Option 3</div>
            
        </>
        
      );
};
 
export default IndexPage;
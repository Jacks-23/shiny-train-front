import React, {useState, useEffect, useContext} from "react";
import Orders from "../components/orders";
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
           <div className="flex flex-row bg-emerald-700 right justify-end pt-12 pr-32">
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
            <div className={`flex flex-row bg-emerald-700 w-screen h-screen ${homeVisibility}`}>
                <div className="flex flex-col h-full w-1/2 mt-14 pl-32">
                    <div className="w-80 h-80 pt-8 overflow-visible whitespace-nowrap bg-orange-700 bg-opacity-70 rounded"> 
                        <p className="p-5 text-4xl text-gray-50 text-center">Welcome to MyApp
                            <br/> {authentication ? `${authentication.user.firstName} ${authentication.user.lastName} !` : ''} 
                        </p> 
                    </div>
                    <div className="bg-red-900 w-52 h-52 rounded-full mt-20 animate-extendAndFade ">
                        <div className="bg-red-900 w-52 h-52 rounded-full animate-extendAndFade ">
                            <div className="bg-red-900 w-52 h-52 rounded-full animate-extendAndFade ">
                            </div>
                        </div>
                    </div>
                
                </div>
                <div className="flex w-1/2  mr-48 mt-28 justify-center">
                    <ul className="h-96 pr-1 border-l-2 border-dotted">
                        <li className="h-10 mb-28 mt-1 text-white"> .... </li>
                        <li className="mb-28 text-white"> .... </li>
                        <li className="h-10 pt-4 mb-28 text-white"> .... </li>
                    </ul>
                    <div className="flex flex-row">
                        <div className=" flex flex-col gap-28">
                            <button onClick={() => SetTopic(2)}>
                                <p className="text-4xl font-semibold text-white text-left">{t('shoppingApp')}</p>
                            </button>
                            <button onClick={() => SetTopic(3)}>
                                <p className="text-4xl font-semibold text-white text-left">Option 2 is comming</p>
                            </button>
                            <button onClick={() => SetTopic(4)}>
                                <p className="text-4xl font-semibold text-white text-left">Option 3 is comming</p>
                            </button>
                        </div>

                    </div>
                    
                </div>                
            </div>
            <div className={`${signInVisibility}`}>
                <SignIn number={number} setChoice={setChoice} needAccount={needAccount} setNeedAccount={setNeedAccount}/>
            </div>
            <div className={`${shoppingVisibility}`}>
            { authentication ? <Orders/>
               : <></> }
                
            </div>
            <div  className={`${option2Visibility}`}> Option 2 </div>
            <div  className={`${option3Visibility}`}> Option 3</div>
            
        </>
        
      );
};
 
export default IndexPage;
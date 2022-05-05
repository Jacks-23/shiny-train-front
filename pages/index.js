import React, {useState, useEffect, useContext} from "react";
import Orders from "../components/orders";
import MyForm from "../components/form";
import { AuthenticationContext} from "../context/authenticationContext";


const IndexPage = () => {
    const {authentication, setAuthentication} = useContext(AuthenticationContext);
    const [choice, setChoice] = useState(0);
    const [connected, setConnected] = useState(false);
    const [number, setNumber] = useState(0);

    useEffect(() => {

        if(!authentication){
            authentication == null;
            setConnected(false);
        }
        else{
            setConnected(true);
        }
    }, [authentication]);

    let formVisibility = "hidden"; 
    let option1Visibility = "hidden"; 
    let option2Visibility = "hidden";
    let option3Visibility = "hidden";
    let defaultVisibility = "visible";
    
    switch (choice) {
        case 1:
            formVisibility = "visible";
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
    
        default:
            break;
    }


  const SetsTheChoiceOfTheTopic = (numb) => {
      if (connected)
      setChoice(numb);
      else
      {
        setChoice(1);
        setNumber(numb);
      }
  };

  const LogoutFunction = () => {
      setAuthentication(null);
      setChoice(0);
  };
   
    return (
        <>
           <div className="flex flex-row bg-emerald-400 right justify-end pt-12 pr-32">
               { authentication != null ? <button onClick={LogoutFunction}> LogOut </button>
               : <button onClick={() => SetsTheChoiceOfTheTopic(0)} > LogIn </button> }
               <button className="pl-4" > SignUp </button> 
               <button className="pl-4" onClick={() => setChoice(0)}> Home </button> 
           </div>
            <div className={`bg-emerald-400 w-full h-screen ${defaultVisibility}`}>
                <div className="pt-8 pl-10"> <p className="text-4xl text-gray-50">Welcome to your app 
                {authentication ? `${authentication.user.firstName} ${authentication.user.lastName}` : ''} ! </p> </div>
                <div className=" flex flex-col">
                    <button onClick={() => SetsTheChoiceOfTheTopic(2)}>Button de choix 1</button>
                    <button onClick={() => SetsTheChoiceOfTheTopic(3)}>Button de choix 2</button>
                    <button onClick={() => SetsTheChoiceOfTheTopic(4)}>Button de choix 3</button>
                </div>
            </div>
            <div className={`${formVisibility}`}>
                <MyForm number = {number} setChoice = {setChoice}/>
            </div>
            <div className={`${option1Visibility}`}>
            { authentication != null ? <Orders SetsTheChoiceOfTheTopic = {SetsTheChoiceOfTheTopic}/>
               : <div/> }
                
            </div>
            <div  className={`${option2Visibility}`}> Option 2 </div>
            <div  className={`${option3Visibility}`}> Option 3</div>
            
        </>
        
      );
};
 
export default IndexPage;
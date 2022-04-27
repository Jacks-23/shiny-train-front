import React, {useState, useEffect, useContext} from "react";
import { useQuery} from "react-query";
import { GetAllOrdersWithProducts } from "../data/apiCalls";
import Orders from "../components/orders";
import MyForm from "../components/form";
import { UserContext } from "../context/userContext";


const IndexPage = () => {
    const {user, setUser} = useContext(UserContext);
    const [choice, setChoice] = useState(0);
    const [connected, setConnected] = useState(false);
    const [number, setNumber] = useState(0);

    useEffect(() => {

        if(!user){
            user == null;
            setConnected(false);
        }
        else{
            setConnected(true);
        }
    }, [user]);


    const {data, isLoading} = useQuery("orders", () => GetAllOrdersWithProducts());
 

   console.log(data);


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

    if(isLoading) return (
      <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
              <span className="visually-hidden">Loading...</span>
          </div>
      </div>
  );

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
      setUser(null);
      setChoice(0);
  };
  
   
    return (
        <>
           <div className="flex flex-row bg-emerald-400 right justify-end pr-6">
               { user != null ? <button onClick={LogoutFunction}> Logout </button>
               : <button onClick={() => SetsTheChoiceOfTheTopic(0)} > Login </button> }
           </div>
            <div className={`bg-emerald-400 w-full h-screen ${defaultVisibility}`}>
                <div className="pt-8 pl-10"> <p className="text-4xl text-gray-50">Welcome to your app {user ? `${user.firstName} ${user.lastName}` : ''} ! </p> </div>
                <div className=" flex flex-col">
                    <button onClick={() => SetsTheChoiceOfTheTopic(0)}> Reset button</button> 
                    <button onClick={() => SetsTheChoiceOfTheTopic(2)}>Button de choix 1</button>
                    <button onClick={() => SetsTheChoiceOfTheTopic(3)}>Button de choix 2</button>
                    <button onClick={() => SetsTheChoiceOfTheTopic(4)}>Button de choix 3</button>
                </div>
            </div>
            <div className={`${formVisibility}`}>
                <MyForm number = {number} setChoice = {setChoice}/>
            </div>
            <div className={`${option1Visibility}`}> Option 1
                <Orders data={data} SetsTheChoiceOfTheTopic = {SetsTheChoiceOfTheTopic}/>
            </div>
            <div  className={`${option2Visibility}`}> Option 2 </div>
            <div  className={`${option3Visibility}`}> Option 3</div>
            
        </>
        
      );
};
 
export default IndexPage;
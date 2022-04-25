import React from "react";
import { useState} from "react";
import { useQuery} from "react-query";
import Orders from "../components/orders";

async function fetchOrders(){

    return await (await fetch('https://localhost:7244/Orders')).json();
}

const IndexPage = () => {

    const [choice, setChoice] = useState(0);

    const {data, isLoading} = useQuery("orders", () => fetchOrders());

    

   console.log(data);


    let option1Visibility = "hidden"; 
    let option2Visibility = "hidden"; 
    let option3Visibility = "hidden";
    let defaultVisibility = "visible";
    
    switch (choice) {
        case 1:
            option1Visibility = "visible";
            defaultVisibility = "hidden";
            break;
        case 2 :
            option2Visibility = "visible";
            defaultVisibility = "visible";
            break;
        case 3 :
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


   
    return (
        <>
            <div className={`bg-emerald-400 w-full h-screen ${defaultVisibility}`}>
                <div className="pt-8 pl-10"> <p className="text-4xl text-gray-50">Welcome to your app !</p> </div>
                <div className=" flex flex-col">
                    <button onClick={() => setChoice(0)}> Reset button</button> 
                    <button onClick={() => setChoice(1)}>Button de choix 1</button>
                    <button onClick={() => setChoice(2)}>Button de choix 2</button>
                    <button onClick={() => setChoice(3)}>Button de choix 3</button>
                </div>
            </div>
            <div id="option1" className={`${option1Visibility}`}> Option 1
                <button onClick={() => setChoice(0)}> Reset button</button>
                <Orders data={data}/>
            </div>
            <div id="option2" className={`${option2Visibility}`}> Option 2 </div>
            <div id="option3" className={`${option3Visibility}`}> Option 3</div>
            
        </>
        
      );
};
 
export default IndexPage;
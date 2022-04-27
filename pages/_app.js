import React, {useState} from "react";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContext } from "../context/userContext";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps}) => {
    const [user, setUser] = useState(null);
    return (
        <QueryClientProvider client={queryClient}>
                <UserContext.Provider value={{user, setUser}}>
                    <Component {...pageProps} />
                </UserContext.Provider>
        </QueryClientProvider>
        
      );
};
 
export default MyApp;
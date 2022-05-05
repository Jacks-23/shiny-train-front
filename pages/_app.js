import React, {useState} from "react";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthenticationContext} from "../context/authenticationContext";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps}) => {
    const [authentication, setAuthentication] = useState(null);
    return (
        <QueryClientProvider client={queryClient}>
                <AuthenticationContext.Provider value={{authentication, setAuthentication}}>
                    <Component {...pageProps} />
                </AuthenticationContext.Provider>
        </QueryClientProvider>
        
      );
};
 
export default MyApp;
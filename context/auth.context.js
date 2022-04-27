import * as React from "react";

const AuthContext = React.createContext(null);



export const AuthenticationProvider = ({userData, children}) => {
    let [user, setUser] = React.useState(userData);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuthenticationContext = () => React.useContext(AuthContext);

export default useAuthenticationContext;





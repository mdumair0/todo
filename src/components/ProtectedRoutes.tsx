import {useContext} from "react";
import { AuthContext } from '../contexts/AuthContext';
import { LoginContextType } from '../Interfaces/Interfaces';
import { Navigate } from "react-router-dom";

function ProtectedRoute({  component: Component, ...routeProps }:any) {
    const {isLoggedIn} = useContext(AuthContext) as LoginContextType;
    // const isLoggedIn = true; // replace with your authentication logic
    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }
    return (
        <>
            {isLoggedIn ? <Component {...routeProps} /> : null}
        </>
    )
}
 
export default ProtectedRoute;
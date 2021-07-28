import React,{useContext,useEffect} from 'react';
import {Route,Redirect} from 'react-router-dom';

//Context
import AuthContext from '../../context/auth/authContext';

const RutaPrivada = ({component: Component,...props}) => {

    //Extraer propiedades y funciones del context
    const authContext = useContext(AuthContext);
    const {autenticado,cargando,usuarioAuth} = authContext;

    //Use Effect
    useEffect(() => {
        usuarioAuth();

        // eslint-disable-next-line
    },[])

    return ( 
        <Route {...props} render={props => !autenticado && !cargando?(
            <Redirect to = "/" />
        ) :(
            <Component {...props} />
        ) } 
        />
    );
}
 
export default RutaPrivada;
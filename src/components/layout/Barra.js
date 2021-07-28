import React,{useContext,useEffect} from 'react';
// Context
import AuthContext from '../../context/auth/authContext';

const Barra = () => {

    //Extraer propiedades y funciones de los context
    const authContext = useContext(AuthContext);
    const {usuario,usuarioAuth,cerrarSesion} = authContext;

    useEffect(() => {
        usuarioAuth();

        // eslint-disable-next-line
    },[])  

    return ( 
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p>: null}
            <nav className="nav-principal">
                {/* <a href="#!">Cerrar Sesion</a> */}
                <button
                    className="btn btn-blank btn-white"
                    onClick={()=> cerrarSesion()}
                >Cerrar Sesion</button>
            </nav>
        </header>
     );
}
 
export default Barra;
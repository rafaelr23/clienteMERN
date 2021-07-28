import React,{useContext,useEffect} from 'react';
import Sidebars from '../layout/Sidebars';
import Barra from '../layout/Barra';
import FormTarea from '../tareas/FormTarea';
import ListadoTareas from '../tareas/ListadoTareas';

// Context
import AuthContext from '../../context/auth/authContext';


const Proyectos = () => {

    //Extraer propiedades y funciones de los context
    const authContext = useContext(AuthContext);
    const {usuarioAuth} = authContext;

    useEffect(() => {
        usuarioAuth();

        // eslint-disable-next-line
    },[])

    return ( 
        <div className="contenedor-app">
            <Sidebars />
            <div className="seccion-principal">
                <Barra 

                />
                <main>
                    <FormTarea 

                    />
                    
                    <div className="contenedor-tareas">
                        <ListadoTareas />
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Proyectos;
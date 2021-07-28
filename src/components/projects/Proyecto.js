import React,{useContext} from 'react'

//Context
import proyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({proyecto}) => {

    //Obteniendo State de los distintos context
    const proyectContext = useContext(proyectoContext);
    const { proyectoActual} = proyectContext;
    const tareasContext = useContext(TareaContext);
    const { obtenerTareas} = tareasContext;

    //Funcion para agregar el proyecto actual y luego obtener sus tareas
    const seleccionarProyecto = id =>{
        proyectoActual(id); // Fija el proyecto que se selecciona
        obtenerTareas(id)//Obtiene las tareas del proyecto seleccionado;

    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-black"
                onClick={()=> seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;
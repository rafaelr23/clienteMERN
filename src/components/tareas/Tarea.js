import React,{useContext} from 'react'

//context
import proyectoContext from '../../context/proyectos/ProyectoContext'
import TareaContext from '../../context/tareas/tareaContext'


const Tarea = ({tarea}) => {

    //context
    const proyectContext = useContext(proyectoContext);
    const {proyectoSeleccionado} = proyectContext;
    const tareaContext = useContext(TareaContext);
    const {obtenerTareas,eliminarTarea,actualizarTarea,guardarTareaActual} = tareaContext;

    // Descomposicion de objetos{} o arrays[]


    //Funciones
    //Funcion eliminar Tarea
    const TareaAeliminar = id => {
        //Eliminar la tarea
        eliminarTarea(id,proyectoSeleccionado[0]._id);
        //Refrescar las tareas
        obtenerTareas(id);
    }
    //Funcion que modifica el estado de una tarea
    const cambiarEstado = tarea => {
        if(tarea.estado){
            tarea.estado = false;
        }else{
            tarea.estado = true;
        }

        actualizarTarea(tarea);
    }
    //Modifica una tarea actual
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }
    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado
                    ? (
                        <button 
                            type="button"
                            className="completo"
                            onClick={()=>cambiarEstado(tarea)}
                        >Completo</button>
                      )

                    : (
                        <button 
                            type="button"
                            className="incompleto"
                            onClick={()=>cambiarEstado(tarea)}
                        >Incompleto</button>
                      )
                }
            </div>
            <div className="acciones">
                <button 
                    type="button"
                    className="btn btn-primario"
                    onClick={()=>seleccionarTarea(tarea)}
                >Editar</button>

                <button 
                    type="button"
                    className="btn btn-secundario"
                    onClick={() =>TareaAeliminar(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea;
import React,{Fragment,useContext} from 'react'
import {CSSTransition,TransitionGroup}from 'react-transition-group';

//components
import Tarea from './Tarea';

//Context
import proyectoContext from '../../context/proyectos/ProyectoContext'
import TareaContext from '../../context/tareas/tareaContext'

const ListadoTareas = () => {

    //Extrayendo states de los context
    const proyectContext = useContext(proyectoContext);
    const {proyectoSeleccionado,eliminarProyecto} = proyectContext;
    const tareaContext = useContext(TareaContext);
    const {tareasProyecto} =tareaContext;

    //Descomposicion/destructuring de object o arrays
    if(!proyectoSeleccionado) return <h2>Selecciona un proyecto</h2>;
    const [proyecto] = proyectoSeleccionado;

   

    //Eliminar un proyecto onClickEliminar
    const onClickEliminar = ()=>{
        eliminarProyecto(proyecto._id);
    }

    return ( 

        <Fragment>
            <h2>Proyecto: {proyecto.nombre}</h2>

            <ul>
                {tareasProyecto.length === 0 
                    ? (<li className="tarea">No hay tareas</li>)

                    : <TransitionGroup>
                      {  tareasProyecto.map( tarea => (
                            <CSSTransition
                                key={tarea._id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Tarea 
                                    tarea={tarea}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup> 
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >Eliminar Proyecto &times;</button>

        </Fragment>
     );
}
 
export default ListadoTareas;
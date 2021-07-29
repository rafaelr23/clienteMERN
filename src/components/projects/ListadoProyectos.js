import React,{useContext,useEffect} from 'react';
import {CSSTransition,TransitionGroup}from 'react-transition-group';


//Components
import Proyecto from './Proyecto';

//Context
import proyectoContext from '../../context/proyectos/ProyectoContext'
import AlertaContext from '../../context/alertas/alertaContext';

const ListadoProyectos = () => {

    //Extrayendo proyectos del context
    const proyectContext = useContext(proyectoContext);
    const {msg,proyectos,obtenerProyectos} = proyectContext;
    const alertaContext = useContext(AlertaContext);
    const {alerta,mostrarAlerta}=alertaContext;

    //useEffect al inciar el componente
    useEffect(()=>{

        // Mostrar mensaje si hay error
        if(msg){
            mostrarAlerta(msg.msg,msg.categoria)
        }

        obtenerProyectos();
        // eslint-disable-next-line
    },[msg])

    //Revisar si proyecto tiene contenido
    if(proyectos.length === 0 ) return <p>No hay proyectos, crea uno nuevo</p>;


    return ( 

        <ul className="listado-proyectos">
            {alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ): null}
            <TransitionGroup>

                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id }
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto 

                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}

            </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;
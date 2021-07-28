import React,{Fragment,useState,useContext} from 'react';

//Context
import proyectoContext from '../../context/proyectos/ProyectoContext';

const NuevoProyecto = () => {

    //Obteniendo State del Formulario
    const proyectContext = useContext(proyectoContext);
    const { formulario,errorFormulario,mostrarFormulario,agregarProyecto,mostrarError } = proyectContext;

    //states
    const [proyecto,guardarProyecto] = useState({
        nombre: ''
    });

    // Descomposicion
    const {nombre} = proyecto;

    //Funciones
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        });
    }
        //Submit
    const onSubmitProyecto = e => {
        e.preventDefault();

        //Validar Proyecto
        if(nombre ===''){
            mostrarError();
            return;  
        } 
        //Agregar al state
        agregarProyecto(proyecto);
        //Limpiar/Reiniciar Form
        guardarProyecto({
            nombre:''
        });
    }
        // Onclick del button que cambia el estado del formulario
    const onClickButton = ()=>{
        mostrarFormulario();
    }
    
    return ( 
        <Fragment>

            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={onClickButton}
            >Nuevo Proyecto</button>
            {formulario
                ? (
                    <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmitProyecto}
                    >
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Nombre Proyecto"
                            name="nombre"
                            value={nombre}
                            onChange={onChangeProyecto}
                        ></input>

                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Agregar Proyecto"
                        ></input>
                    </form>
                  )

                : null
            }
            { errorFormulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null }
        </Fragment>
     );
}
 
export default NuevoProyecto;
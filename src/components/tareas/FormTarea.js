import React,{useContext,useState,useEffect} from 'react'
//Context
import proyectoContext from '../../context/proyectos/ProyectoContext'
import TareaContext from '../../context/tareas/tareaContext'

const FormTarea = () => {

    //Extrayendo proyectos del context
    const proyectContext = useContext(proyectoContext);
    const {proyectoSeleccionado} = proyectContext;
    const tareaContext = useContext(TareaContext);
    const {errorTarea,tareaSeleccionada,obtenerTareas,agregarTarea,validarTarea,actualizarTarea,limpiarTarea} = tareaContext;
    //State
    const [tarea,guardarTarea]= useState({
          nombre: ''
    })

    //use Effect
    // Revisando si una tarea ha sido seleccionada
    useEffect(() => {
        
        if(tareaSeleccionada !== null){
            guardarTarea(tareaSeleccionada);
        }else{
            guardarTarea({
                nombre: ''
            })
        }
        // eslint-disable-next-line
    }, [tareaSeleccionada])

    //Descomposicion/destructuring de object o arrays
    // Extraer el nombre de la tarea
    const {nombre} = tarea;
    
    //Si no hay proyecto seleccionado oculta el formulario
    if(!proyectoSeleccionado) return null;
        
    //Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        });
    }


    //Submit del form
    const onSubmit = e => {
        e.preventDefault();

        //validar
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }
        //Revisar si es una edicion o agregacion
        if(tareaSeleccionada === null){

            //agregar nueva tarea al state de tareas
            tarea.proyecto = proyectoSeleccionado[0]._id;
            agregarTarea(tarea);
        }else{
            //Actualizar tarea seleccionada
            actualizarTarea(tarea);
            //Luego de actualizar tarea limpia la tareaSeleccionada
            limpiarTarea();
        }

        //obtener tareas por ID de proyecto
        obtenerTareas(proyectoSeleccionado[0].id);
        //reiniciar el form
        guardarTarea({
            nombre:''
        });
    }
    return (
        
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="nombre tarea"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    ></input>

                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-block"
                        value={tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    ></input>
                </div>
            </form>
            {errorTarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
     );
}
 
export default FormTarea;
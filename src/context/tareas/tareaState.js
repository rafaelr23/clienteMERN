import React,{useReducer} from 'react'
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
// import { v4 as uuidv4 } from 'uuid';
import clienteAxios from '../../config/axios';
//types
import {
    TAREAS_PROYECTO,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from'../../types/index';

const TareaState = (props) => {

   
    const initialState = {
        // tareas:[
        //     {id:1,nombre: 'Elegir Plataforma', estado:true,proyectoID:1},
        //     {id:2,nombre: 'Elegir Colores', estado:false,proyectoID:2},
        //     {id:3,nombre: 'Elegir Plataforma de pago', estado:false,proyectoID:3},
        //     {id:4,nombre: 'Elegir Hosting', estado:true,proyectoID:1},
        //     {id:5,nombre: 'Elegir Plataforma', estado:true,proyectoID:2},
        //     {id:6,nombre: 'Elegir Colores', estado:false,proyectoID:1},
        //     {id:7,nombre: 'Elegir Plataforma de pago', estado:false,proyectoID:4},
        //     {id:8,nombre: 'Elegir Hosting', estado:true,proyectoID:3},
        //     {id:9,nombre: 'Elegir Plataforma', estado:true,proyectoID:3},
        //     {id:10,nombre: 'Elegir Colores', estado:false,proyectoID:3},
        //     {id:11,nombre: 'Elegir Plataforma de pago', estado:false,proyectoID:2},
        //     {id:12,nombre: 'Elegir Hosting', estado:true,proyectoID:4}
        // ],
        tareasProyecto:[],
        errorTarea:false,
        tareaSeleccionada: null
    }

    // Creando el dispatch y state que se comunican en el Reducer
    const [state,dispatch] = useReducer(TareaReducer,initialState);

    //Funciones
        //Obteniendo las tareas de un proyecto
    const obtenerTareas = async proyecto => {
        
        console.log(proyecto)
        try {
            
            //Obtener tareas de la BD
            const resultado = await clienteAxios.get(`http://localhost:4000/api/tareas`,{params:{proyecto}})
            console.log(resultado)
            dispatch({
                type:TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
         console.log(error.response)   
        }

    }
        //Agergar una tarea al priyecto seleccionado
    const agregarTarea = async tarea => {
        // tarea.id = uuidv4();
        console.log(tarea)
        try {

            //Agregar tarea en BD
            const resultado = await clienteAxios.post(`http://localhost:4000/api/tareas`,tarea)
            console.log(resultado);

            // dispatch({
            //     type:AGREGAR_TAREA,
            //     payload:tarea
            // })
            obtenerTareas(tarea.proyecto);
        } catch (error) {
            console.log(error)
        }
    }

    //Validar la nueva tarea y muestra error
    const validarTarea = () => {
        dispatch({
            type:VALIDAR_TAREA
        })
    }

    //Eliminar Tarea por ID
    const eliminarTarea = async (id,proyecto) => {
        try {
            await clienteAxios.delete(`http://localhost:4000/api/tareas/${id}`,{params:{proyecto}});
            dispatch({
                type:ELIMINAR_TAREA,
                payload:id
            })
        } catch (error) {
            console.log(error.response)
        }
    }

    //Cambia el estado de cada tarea
    // const cambiarEstadoTarea = tarea => {
    //     dispatch({
    //         type:ESTADO_TAREA,
    //         payload:tarea
    //     })
    // }

    //Extrae una tarea para editarla
    const guardarTareaActual = tarea => {
        dispatch({
            type:TAREA_ACTUAL,
            payload:tarea
        })
    }

    // Actualizar una tarea
    const actualizarTarea = async tarea => {
        console.log(tarea);
        try {
            //Actulizar tarea en BD
            const resultado = await clienteAxios.put(`http://localhost:4000/api/tareas/${tarea._id}`,tarea)
            console.log(resultado)
            dispatch({
                type:ACTUALIZAR_TAREA,
                payload:resultado.data.tareaExiste
            })
        } catch (error) {
            console.log(error)
        }
    }
    //Elimina la tareaSeleccionada para reiniciar el formulario
    const limpiarTarea = () => {
        dispatch({
            type:LIMPIAR_TAREA
        })
    }

    return (
        <TareaContext.Provider
            value={{
                // tareas: state.tareas,
                tareasProyecto:state.tareasProyecto,
                errorTarea:state.errorTarea,
                tareaSeleccionada:state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >


            {props.children}
        </TareaContext.Provider>
    )

}

export default TareaState;
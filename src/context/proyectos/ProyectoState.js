import React,{useReducer} from 'react';
import clienteAxios from '../../config/axios';
// UUID
// import {v4 as uuidv4} from 'uuid';

// Context
import proyectoContext from './ProyectoContext';
import proyectoReducer from './ProyectoReducer';
//Types
import 
{
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
                        } 
from '../../types/index';



const ProyectoState = props =>{

    // const proyectos = [
    //     {id: 1,nombre:'Tienda Virtual'},
    //     {id: 2,nombre:'Intranet'},
    //     {id: 3,nombre:'Diseño de Sitio Web'},
    //     {id: 4,nombre:'MERN'}
    // ]
    

    const initialState = {
        proyectos : [],
        formulario:false,
        errorFormulario:false,
        proyectoSeleccionado:null,
        msg: null
    };


    //Dispatch para ejecutar las acciones
    const [state,dispatch] = useReducer(proyectoReducer,initialState);

    //Funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //Obteniendo proyectos con Dispatch 
    const obtenerProyectos = async () => {

        //Obteniendo proyectos desde la BD
        try {
            const resultado = await clienteAxios.get('http://localhost:4000/api/proyectos');
            console.log(resultado)
            dispatch({
                type:OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
            
        } catch (error) {
            console.log(error);
            const alerta = {
                msg: 'Hubo un error al obtener proyectos',
                categoria: 'alerta-error'
            }

            dispatch({
                type:PROYECTO_ERROR,
                payload: alerta
            })

        }

    }

    //Agregar Nuevo Proyecto
    const agregarProyecto = async proyecto => {

        try {
            const resultado = await clienteAxios.post('http://localhost:4000/api/proyectos',proyecto)
            console.log(resultado)
            //Insertar el nuevo proyecto en el state
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data.nuevoProyecto 
            })
        } catch (error) {
            console.log(error);
            const alerta = {
                msg: 'Hubo un error al agregar proyecto',
                categoria: 'alerta-error'
            }

            dispatch({
                type:PROYECTO_ERROR,
                payload: alerta
            })
        }
    }
    //Eliminar un Proyecto
    const eliminarProyecto = async proyectoID => {

        try {
            //Eliminar de la base de datos
            await clienteAxios.delete(`http://localhost:4000/api/proyectos/${proyectoID}`);

            dispatch({
                type:ELIMINAR_PROYECTO,
                payload: proyectoID
            })  
        } catch (error) {
            console.log(error);
            const alerta = {
                msg: 'Hubo un error al eliminar proyecto',
                categoria: 'alerta-error'
            }

            dispatch({
                type:PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    //Valida el formulario para erroresp
    const mostrarError = () => {
        dispatch({
            type:VALIDAR_FORMULARIO
        });
    }

    //Selecciona el proyecto que el usuario dio click
    const proyectoActual = proyectoID => {
        dispatch({
            type:PROYECTO_ACTUAL,
            payload: proyectoID
        })
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorFormulario:state.errorFormulario,
                proyectoSeleccionado:state.proyectoSeleccionado,
                msg: state.msg,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    );

}

export default ProyectoState;
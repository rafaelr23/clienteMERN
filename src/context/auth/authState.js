import React,{useReducer} from 'react';

//context
import AuthContext from './authContext';
//Reducer
import AuthReducer from './authReducer';

//TYPES
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types/index';

// Token
import tokenAuth from '../../config/tokenAtuh';

//axios
import clienteAxios from '../../config/axios';
import https from 'https';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado:null,
        usuario:null,
        msg:null,
        cargando:true,
    }

    const [state,dispatch] = useReducer(AuthReducer,initialState);

    //Funciones
    const registrarUsuario = async datos =>{
        try {
            const agent = new https.Agent({  
                rejectUnauthorized: false
            });
            const respuesta = await clienteAxios.post('https://mernstack-server.herokuapp.com/api/usuarios',datos, { httpsAgent: agent });
            console.log(respuesta.data);
            dispatch({
                type:REGISTRO_EXITOSO,
                payload:respuesta.data
            })

            // Obtener el usuario
            usuarioAuth();
        } catch (error) {
            console.log(error.response);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type:REGISTRO_ERROR,
                payload: alerta
            })
        }
    }
    //retornar usuario autenticado
    const usuarioAuth = async () => {
        const token = localStorage.getItem('token');

        if(token){
            //TODO: Funcion para enviar el token por headers
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('https://mernstack-server.herokuapp.com/api/auth');
            console.log(respuesta);
            dispatch({
                type:OBTENER_USUARIO,
                payload: respuesta.data
            })
             
        } catch (error) {
            console.log(error.response)
            dispatch({
                type:LOGIN_ERROR

            })
        }
    }
    // Cuando el usuario inicia sesion
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('https://mernstack-server.herokuapp.com/api/auth',datos)
            console.log(respuesta);
            dispatch({
                type:LOGIN_EXITOSO,
                payload: respuesta.data
            })
            // Obtener el usuario
            usuarioAuth();
        } catch (error) {
            console.log(datos);
             console.log(error.response);
        
                const alerta = {
                    msg: error.response.data.msg,
                    categoria: 'alerta-error'
                }
                dispatch({
                    type:REGISTRO_ERROR,
                    payload: alerta
                })                   
            
        }
    }

    // Cerrar sesion del usuario
    const cerrarSesion = () => {
        dispatch({
            type:CERRAR_SESION
        })
    }
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado:state.autenticado,
                usuario:state.usuario,
                msg:state.msg,
                cargando:state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAuth,
                cerrarSesion
            }}
        >

            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
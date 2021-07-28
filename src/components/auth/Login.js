import React,{useState,useContext,useEffect} from 'react'
import {Link} from 'react-router-dom';
//Context
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/auth/authContext';
const Login = (props) => {
    //Extraer valores del context
        //Alerta Context
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;
        //Auth Context
    const authContext = useContext(AuthContext);
    const {msg,autenticado,iniciarSesion} = authContext;
    
    // useEffect
    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        }
        console.log(msg);
        if(msg){
            mostrarAlerta(msg.msg,msg.categoria)
        }
        // eslint-disable-next-line
    },[msg,autenticado,props.history])

    //States
    const [usuario,guardarUsuario] = useState({
        email: '',
        password: ''
    });

    //Extraer de usuario
    const {email, password} =usuario;


    // Funciones
    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        });
    }
        //Submit
    const onSubmit = e => {
        e.preventDefault();

        //Validar que no haya campos vacios
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios','alerta-error')
            return;
        }
        //Pasar el action
        iniciarSesion({email, password})
    }

    return ( 
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesion</h1>
                <form
                    onSubmit={onSubmit}
                >
                     { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                    <div className="campo-form">
                        <label htmlFor="email" className="">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value = {email}
                            onChange={onChange}
                        ></input>
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password" className="">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            value = {password}
                            onChange={onChange}
                        ></input>
                    </div>
                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesion"
                        ></input> 
                    </div>
                </form>
                <Link to={"/nueva-cuenta"} className="enlace-cuenta">Obtener Cuenta</Link>
            </div>
        </div>
     );
}
 
export default Login;
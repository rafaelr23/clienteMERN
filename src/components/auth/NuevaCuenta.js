import React,{useState,useContext,useEffect} from 'react'
import {Link} from 'react-router-dom';

//Context
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/auth/authContext';

const NuevaCuenta = (props) => {

    //Extraer valores del context
        //Alerta Context
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;
        //Auth Context
    const authContext = useContext(AuthContext);
    const {msg,autenticado,registrarUsuario} = authContext;

    //States
    const [usuario,guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    // useEffect
    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        }
        if(msg){
            mostrarAlerta(msg.msg,msg.categoria)
        }
        // eslint-disable-next-line
    },[msg,autenticado,props.history])
    //Extraer de usuario
    const {nombre,email, password,confirmar} =usuario;


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
        if(nombre.trim() === '' || 
           email.trim() === '' ||
           password.trim() === '' ||
           confirmar.trim() === '' ){
            mostrarAlerta('Todos los campos son obligatorios','alerta-error')
            return;
        }
        // Varlidar Longitud Password( min 6)
        if(password.length < 6){
            mostrarAlerta('El password debe ser almenos de 6 caracteres','alerta-error')
            return;
        }
        // Validar que los password sean iguales
        if(password !== confirmar){
            mostrarAlerta('Los password no son iguales','alerta-error')
            return;
        }
        //Pasar el action
        registrarUsuario({
            nombre,
            email, 
            password
        });

    }

    return ( 
        <div className="form-usuario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una Cuenta</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email" className="">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu Nombre"
                            value = {nombre}
                            onChange={onChange}
                        ></input>
                    </div>


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
                        <label htmlFor="confirmar" className="">Confirmar Password</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repite tu Password"
                            value = {confirmar}
                            onChange={onChange}
                        ></input>
                    </div>
                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrar"
                        ></input> 
                    </div>
                </form>
                <Link to={"/"} className="enlace-cuenta">Volver a Iniciar Sesion</Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;
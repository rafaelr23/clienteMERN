import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

//Components
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/projects/Proyectos';
//Context
import ProyectoState from './context/proyectos/ProyectoState';
import TareaState from './context/tareas/tareaState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/auth/authState';
//Config
import tokenAuth from './config/tokenAtuh';
// Routes Private
import RutaPrivada from './components/routes/routesPrivated';

// Revisar si hay token
const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}

function App() {
  
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
                <Switch>
                  {/* Definicion de las Rutas */}
                  <Route exact path="/" component={Login} />         
                  <Route exact path="/nueva-cuenta" component={NuevaCuenta} />         
                  <RutaPrivada exact path="/proyectos" component={Proyectos} />         

                </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
  
}

export default App;

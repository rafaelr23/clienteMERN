import React from 'react';
import NuevoProyecto from '../projects/NuevoProyecto';
import ListadoProyecto from '../projects/ListadoProyectos';

const Sidebars = () => {
    return ( 
        <aside>
            <h1>MERN<span>Task</span></h1>
            <NuevoProyecto />
            <div className="proyectos">
                <h2>Tus Proyectos</h2>
                <ListadoProyecto />
            </div>
        </aside>
     );
}
 
export default Sidebars;
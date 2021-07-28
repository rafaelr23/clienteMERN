import axios from 'axios';
import https from 'https';
// const instance = axios.create({
//     httpsAgent: new https.Agent({  
//       rejectUnauthorized: false
//     })
//   });
//   instance.get('https://something.com/foo');

const clienteAxios = axios.create({  
    baseURL: process.env.REACT_APP_BACKEND_URL,
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false
    })
    
});

export default clienteAxios;
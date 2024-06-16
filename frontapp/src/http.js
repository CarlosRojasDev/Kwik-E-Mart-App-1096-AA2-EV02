import axios from "axios";

export default axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        "Content-Type": "application/json"
    }
})
//*********************************************************************** */
// const http = axios.create({
//     baseURL: "http://127.0.0.1:8000",
//     headers:{
//         "Content-Type": "application/json",
//     }
// })
// // Interceptor para agregar el token CSRF a todas las solicitudes
// http.interceptors.request.use(async (config) => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/csrf_token', { withCredentials: true });
//       const csrfToken = response.data.csrf_token;
//       config.headers["X-XSRF-TOKEN"] = csrfToken;
//     } catch (error) {
//       console.log("Error al obtener el token CSRF");
//     }
//     return config;
//   });

// export default http

//********************************************************************* */

// const http = axios.create({
//     baseURL: 'http://127.0.0.1:8000',
//     //withCredentials: true,
//     headers: {
//         "Content-Type": "application/json"
//     }
// });

// http.interceptors.request.use(async (config) => {
//     const token = document.cookie
//         .split('; ')
//         .find(row => row.startsWith('XSRF-TOKEN'))
//         ?.split('=')[1];

//     if (token) {
//         console.log("token :",decodeURIComponent(token))
//         config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
//     } else {
//         // Obtén el token CSRF si no está disponible en las cookies
//         const response = await axios.get('http://127.0.0.1:8000/csrf_token');
//         const newToken = response.data.csrf_token;
//         console.log("newtoken :",newToken)
//         config.headers['X-XSRF-TOKEN'] = newToken;
//     }

//     return config;
// }, error => {
//     return Promise.reject(error);
// });

// export default http;
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";
import { useEffect } from "react";

import useSWR from 'swr'

export const useAuth=({middleware, url})=>{
    const token = localStorage.getItem('AUTH_TOKEN');
    const navigate= useNavigate();


    const {data: user, error, mutate}=useSWR('/api/user', ()=>
       
        clienteAxios('/api/user/',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        .then(res => res.data)
        .catch(error=>{
            throw Error(error?.response?.data?.errors);
        })
    );
    const login = async (datos, setErrores)=>{


        
    try {
        const {data} = await clienteAxios.post('/api/login', datos);
        localStorage.setItem('AUTH_TOKEN', data.token);
        // mi token de usuario 4|i6qj5K5mC4lgD1ETqWkd1Z0B5aIRphYyGhqNzfnR01db8bf0
        setErrores([]);
        await mutate()
      } catch (error) {
      
       console.log(error);
       
       setErrores(Object.values(error.response.data.errors) ); //muestra los errores de la vista
        
      }
    }



    const registro = async (datos, setErrores)=>{

    try {
        
        
        const {data} = await clienteAxios.post('/api/registro', datos);
        console.log(import.meta.env.VITE_API_URL);
        
        localStorage.setItem('AUTH_TOKEN', data.token);
        setErrores([]);
        await mutate()
        // mi token de usuario 4|i6qj5K5mC4lgD1ETqWkd1Z0B5aIRphYyGhqNzfnR01db8bf0
      } catch (error) {
        console.log(error);
        
        setErrores(Object.values(error.response.data.errors) );
        
      }
    }
    const logout = async ()=>{
        try {
            await clienteAxios.post('/api/logout', null,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN');
            await mutate(undefined) //si no eliminas el token y no marcas indefinido entra en bucle 
        } catch (error) {
            throw Error(error?.respose?.data?.errors)
        }
        
        
    }



useEffect( ()=>{
    if(middleware === 'guest' && url && user){
        navigate(url)
    }

    if(middleware === 'guest' && user && user.admin){
        navigate('/admin');
    }

    //si no es admin y quiere abrir la direccion a admin
    if(middleware==='admin' && user &&!user.admin){
        navigate('/');
    }

    if (middleware==='auth' && error) {
        navigate('/auth/login')
    }
}, [user, error])



    return{
        login, 
        registro,
        logout,
        user,
        error
    }
}
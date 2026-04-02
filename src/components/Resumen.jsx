import React from 'react'
import useQuiosco from "../hooks/useQuiosco"
import ResumenProducto from './ResumenProducto'
import {useAuth} from '../hooks/useAuth'
import { formatearDinero } from '../helpers'

export default function Resumen() {
  const {pedido, total, handleSubmitNuevaOrden}=useQuiosco()
  const {logout} = useAuth({})

  const comprobarPedido= ()=> pedido.length===0;

  const handleSubmit=(e)=>{
    e.preventDefault();

    handleSubmitNuevaOrden(logout);

  }
  return (
  <aside className='w-72 h-screen overflow-y-scroll p-5'>
    <h1 className='text-4xl font-black'>Mi pedido</h1>

    <p className="text-lg my-5">Aquí podras ver el resumen y total de tu pedido</p>
    

    <div className="py-10">
      {pedido.length ===0 ? (
        <p className="text-center text-2xl">
          No hay elementos aún
        </p>

      ) :(
       pedido.map(producto =>(
            <ResumenProducto
              producto={producto}
            />
       ))
      )}
    </div>


    <p className="text-xl mt-10">
      Total:{''} 
      {formatearDinero(total)}
    </p>

    <form onSubmit={handleSubmit} className="w-full">
      <div className="mt-5">
        <input 
        type="submit"
        className={`${comprobarPedido() ? 
          'bg-indigo-100' :  'bg-indigo-600 cursor-pointer hover:bg-indigo-800'} px-5 py-2 rounded uppercase font-bold text-white text-center w-full`}
        value="Confirmar pedido"

        disabled={comprobarPedido()}
        />
      </div>
    </form>
  </aside>
  )
}

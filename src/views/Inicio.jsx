import useSWR from 'swr'
import clienteAxios from '../config/axios';
import Producto from '../components/Producto';
import useQuiosco from '../hooks/useQuiosco';


export default function Inicio() {
  const { categoriaActual } = useQuiosco()
  const token = localStorage.getItem('AUTH_TOKEN')
  const fetcher = () => clienteAxios('/api/productos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(data => data.data)


  const { data, error, isLoading } = useSWR('/api/productos', fetcher, {  //fetcher a productos no user
    refreshInterval: 1000
  })

  if (isLoading) return 'Cargando.....';

  console.log(data);

  const productos = data.data.filter(producto => producto.categoria_id === categoriaActual.id)


  return (
    <>
      <div className="px-5">
        <h1 className="text-4xl font-black my-5">{categoriaActual.nombre}</h1>
        <p className="my-5 text-2xl">Elige la categoría y tu pedido a continuación</p>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-2 xl:grid-cols-3 ">
          {

            productos.map(producto => (
              <Producto
                key={producto.imagen}
                producto={producto}
                botonAgregar={true}
              />
            ))



          }


        </div>
      </div>
    </>
  )
}

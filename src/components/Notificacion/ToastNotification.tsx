import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export const ToastNotification = () => {
  const [active, setActive] = useState(false)
  return (
    <>
      <div className='w-2 m-auto'>
        <button
          onClick={() => {
            toast.success('Felicidades')
            setActive(!active)
          }}
        >
          {active ? 'Activado' : 'Desactivado'}
        </button>
        <ToastContainer
          position='bottom-right'
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  )
}

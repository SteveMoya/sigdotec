import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//funcion generica para llamar notificaciones
//primer parametro el tipo, digase success or warning , SEGUNDO parametro es el mensaje
export function notifications(message) {
  const showtoastMessage = () => {
    toast.success({ message }, { position: toast.POSITION.TOP_RIGHT })
  }
  return showtoastMessage
}

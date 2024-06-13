// import { useState } from "react";
import { useForm } from 'react-hook-form'
// import { SwichMood } from "./swichMood";
// import '../../MissPassword.css';
import '@styles/RegistroB.css'
import { EnviarCorreo } from '@data/EnvioCorreo'

// Inicializa la constante vacía

export function MissPassword() {
  // const [isDarkMode, setIsDarkMode] = useState(false);
  // const toggleDarkMode = () => {
  //   setIsDarkMode(!isDarkMode);
  // };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      contrasena: ''
    }
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data)
      const miConstante = Math.floor(1000 + Math.random() * 9000).toString() // Genera el código y asigna a miConstante
      await EnviarCorreo(data.email, miConstante)
      // Luego de generar el código, redirige a la vista VerificacionPassword
      //!TODO:  Cambiar el window.location a react-router-dom
      window.location.href = 'VerificacionPassword'
    } catch (error) {
      console.error('Error al enviar el correo:', error)
      // Puedes mostrar un mensaje de error al usuario aquí.
    }
  })

  return (
    <>
      <form className='body' id='root' onSubmit={onSubmit}>
        {/* <div className="swichMood">
          <SwichMood mood={toggleDarkMode} />
        </div> */}

        <div className='CT'>
          <div className='brand-logo'></div>
          <div className='brand-title'>Recupera tu cuenta</div>

          <div className='Inputs py-2 pl-10 w-full rounded-lg'>
            <label className='lb'>Correo</label>
            <input
              className={`${errors.email ? 'INP-error' : 'iNP'}`}
              type='email'
              placeholder='Ingresa el correo registrado'
              {...register('email', {
                required: { value: true, message: 'Correo requerido' },
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: 'Correo inválido'
                }
              })}
            />
            {errors.email && (
              <span className='messageError'>{errors.email.message}</span>
            )}
          </div>
          <button type='submit' className='btn'>
            Solicitar
          </button>
        </div>
      </form>
    </>
  )
}

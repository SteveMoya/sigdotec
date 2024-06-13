import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
// import '../../csslogin.css'
import '@styles/contact.css'
import SocialMedia from './socialMedias.tsx'
import { LinkIcon } from './Icons.tsx'
import { useForm } from 'react-hook-form'

import { Contacto } from '@data/EnvioCorreo.ts'
function contact() {
  const [showPassword, setShowPassword] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      NombreUsuario: '',
      email: '',
      description: ''
    }
  })
  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data)

      await Contacto(data.email, data.NombreUsuario, data.description)
    } catch (error) {
      console.error('Error al enviar el correo:', error)
    }
  })
  return (
    <>
      <ToastContainer />

      <form className='body' id='root' onSubmit={onSubmit}>
        {/* <div className="swichMood"> <SwichMood mood={toggleDarkMode} /> </div> */}
        <div className='CT'>
          <div className='brand-logo'></div>
          <div className='brand-title'>Contact US!</div>

          <div className='Inputs'>
            <label className='lb'>Nombre</label>
            <input
              className={`${errors.NombreUsuario ? 'INP-error' : 'iNP'}`}
              type='text'
              placeholder='Aqui Colocar su Nombre...'
              autoComplete='off'
              {...register('NombreUsuario', {
                required: { value: true, message: 'nombre requerido' },
                pattern: {
                  value: !null,
                  message: 'nombre invalido'
                }
              })}
            />
            {errors.NombreUsuario && (
              <span className='messageError'>
                {errors.NombreUsuario.message}
              </span>
            )}

            <label className='lb'>Correo</label>
            <input
              className={`${errors.email ? 'INP-error' : 'iNP'}`}
              type='email'
              placeholder='ejemplo@gmail.com'
              autoComplete='off'
              {...register('email', {
                required: { value: true, message: 'Correo requerido' },
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: 'Correo invalido'
                }
              })}
            />
            {errors.email && (
              <span className='messageError'>{errors.email.message}</span>
            )}

            <label className='lb'>Descripion</label>
            <textarea
              className={`${
                errors.description ? 'textarea-error' : 'textarea'
              }`}
              placeholder='Aqui colocar su mensaje...'
              autoComplete='off'
              {...register('description', {
                required: { value: true, message: 'Descripción requerida' }
              })}
            />
            {errors.description && (
              <span className='messageError'>{errors.description.message}</span>
            )}
          </div>
          <button type='submit' className='btn'>
            Send your message
          </button>

          <div className='w-full flex flex-row justify-center text-blue-600 mt-4'>
            <a href='/MissPassword' className=' text-custom-font'>
              !Contactanos atravez de nuestras Redes!
            </a>
          </div>
          <p className='textC'>
            ¿Alguna duda o inquietud ?{' '}
            <a
              href='/register'
              className=' text-custom-font inline-flex space-x-2 items-center'
            >
              <span className='textC'> Dejanos Saber!</span>
              <span>
                <LinkIcon />
              </span>
            </a>
          </p>
        </div>
      </form>
    </>
  )
}
export default contact

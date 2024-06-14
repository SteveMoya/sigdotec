import React, { useState } from 'react'
import '@styles/RegistroB.css'
import img from '@assets/images/SIGDO-Logo/SIGDO-32.svg'
import {
  Email,
  NotShow,
  Show,
  Lock,
  LoginIcon,
  RegisterIcon,
  LinkIcon
} from './Icons'
import { useForm } from 'react-hook-form'
import { SocialSign } from './SocialSign'
import SocialMedia from './socialMedias'
import CheckBox from './CheckBox'
import { SwichMood } from './swichMood'

export function RegisterB() {
  const [showPassword, setShowPassword] = useState(false)

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
      Nombre: '',
      email: '',
      contraseña: '',
      confirmarContraseña: '',
      institucion: '',
      terminos: false
    }
  })

  const contraseña = watch('contraseña')
  const confirmarContraseña = watch('confirmarContraseña')

  const passwordsMatch = (value) => {
    return value === contraseña || 'Las contraseñas no son iguales'
  }

  const onSubmit = handleSubmit((data) => {
    if (contraseña !== confirmarContraseña) {
      confirmarContraseña.errors
    }
    console.log(data)
  })
  return (
    <>
      <form className='body' id='root' onSubmit={onSubmit}>
        {/* <div className="swichMood"> <SwichMood mood={toggleDarkMode} /> </div> */}

        <div className='CT'>
          <div className='brand-logo'></div>
          <div className='brand-title'>SIGDOTEC</div>
          <div className='Inputs'>
            <label className='lb'>Nombre</label>
            <input
              className={`${errors.Nombre ? 'INP-error' : 'iNP'}`}
              type='text'
              id='Nombre'
              autoComplete='off'
              placeholder={` ${
                errors.Nombre ? 'Nombre requerido' : 'Nombre completo'
              }`}
              {...register('Nombre', {
                required: { value: true, message: 'Nombre requerido' },
                pattern: {
                  message: 'Nombre invalido'
                }
              })}
            />
            {errors.Nombre && (
              <span className='messageError'>{errors.Nombre.message}</span>
            )}
            <label className='lb'>Email</label>
            <input
              className={`${errors.email ? 'INP-error' : 'iNP'}`}
              type='email'
              id='email'
              placeholder={` ${
                errors.email ? 'Correo requerido' : 'example@gmail.com'
              }`}
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
            <label className='lb'>Contraseña</label>
            <input
              className={`${errors.contraseña ? 'INP-error' : 'iNP'}`}
              type={showPassword ? 'text' : 'password'}
              autoComplete='off'
              placeholder={` ${
                errors.contraseña
                  ? 'Contraseña requerida'
                  : 'Mínimo 6 caracteres'
              }`}
              {...register('contraseña', {
                required: {
                  value: true,
                  message: 'Contraseña requerida'
                },
                minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                maxLength: { value: 15, message: 'Máximo 15 caracteres' },
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: 'Solo letras y números'
                }
              })}
            />
            {errors.contraseña && (
              <span className='messageError'>{errors.contraseña.message}</span>
            )}
            <svg
              onClick={() => setShowPassword(!showPassword)}
              xmlns='http://www.w3.org/2000/svg'
              className='eyesP'
              fill='none'
              width='40px'
              stroke='currentColor'
            >
              {showPassword ? <NotShow /> : <Show />}
            </svg>

            <label className='lb'>Confirmar</label>

            <input
              className={`${errors.confirmarContraseña ? 'INP-error' : 'iNP'}`}
              type={showPassword ? 'text' : 'password'}
              autoComplete='off'
              placeholder={` ${
                errors.confirmarContraseña
                  ? `${errors.confirmarContraseña.message}`
                  : 'Repita su contraseña'
              }`}
              {...register('confirmarContraseña', {
                required: {
                  value: true,
                  message: 'Debe ser igual'
                },
                minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                maxLength: { value: 15, message: 'Máximo 15 caracteres' },
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: 'Debe ser igual a la contraseña'
                },
                validate: passwordsMatch // Validar que las contraseñas coincide
              })}
            />
            {errors.confirmarContraseña && (
              <span className='messageError'>
                {errors.confirmarContraseña.message}
              </span>
            )}

            <svg
              onClick={() => setShowPassword(!showPassword)}
              className='eyesP'
              fill='none'
              width='40px'
              stroke='currentColor'
            >
              {showPassword ? <NotShow /> : <Show />}
            </svg>
            <div className='CheckBox'>
              <CheckBox register={register} />
              {errors.terminos && (
                <span className='messageError'>
                  Debes aceptar los términos y condiciones.
                </span>
              )}
            </div>

            <button
              type='submit'
              className='btn'
              onClick={() => setAcceptedTerms(register.terminos)}
            >
              Registrarse
            </button>
            <SocialMedia />
          </div>
          <p className='textC'>
            Ya tengo una cuenta.{' '}
            <a
              href='/login'
              className='text-indigo-600 inline-flex space-x-1 items-center'
            >
              <span className='textC'> Iniciar Sección </span>
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

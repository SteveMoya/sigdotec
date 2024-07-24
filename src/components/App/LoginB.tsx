import { useState } from 'react'
import '@styles/RegistroB.css'
import { NotShow, Show } from './Icons'
import { useForm } from 'react-hook-form'
export function iniciar-sesionB() {
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
      email: '',
      contraseña: ''
    }
  })
  const onSubmit = handleSubmit((data) => {

  })
  return (
    <>
      <form className='Inputs' onSubmit={onSubmit}>
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

        <label className='lb'>Contraseña</label>

        <input
          className={`${errors.contraseña ? 'INP-error' : 'iNP'}`}
          type={showPassword ? 'text' : 'password'}
          placeholder='Mínimo 6 caracteres'
          autoComplete='off'
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
          <span className='flex items-center font-medium tracking-wide text-danger-500 text-xs mt-1 ml-1 messageError'>
            {errors.contraseña.message}
          </span>
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

        <button type='submit' className='btn w-full'>
          iniciar-sesion
        </button>
      </form>
    </>
  )
}

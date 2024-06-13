// import { SwichMood } from "./swichMood"
import '@styles/RegistroB.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  // const toggleDarkMode = () => {
  //     setIsDarkMode(!isDarkMode);
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      contraseña: '',
      confirmarContraseña: ''
    }
  })

  // type data = {
  //     contraseña: string;
  //     confirmarContraseña: string;
  //     errors:string;
  // }
  // Función para verificar que las contraseñas coincidan
  const contraseña = watch('contraseña') // Obtiene el valor del campo "contraseña".
  const confirmarContraseña = watch('confirmarContraseña') // Obtiene el valor del campo "confirmarContraseña".

  const passwordsMatch = (value) => {
    // Define una función para verificar que las contraseñas coincidan.
    return value === contraseña || 'Las contraseñas no son iguales'
  }

  const onSubmit = handleSubmit((data) => {
    // Define una función para manejar el envío del formulario.
    if (contraseña !== confirmarContraseña) {
      // Comprueba si las contraseñas no coinciden.
      confirmarContraseña.errors // Esto parece estar incompleto, es posible que desees mostrar un mensaje de error aquí.
    }
    console.log(data) // Muestra los datos del formulario en la consola.
  })

  return (
    <>
      <form className='body' method='post' id='root' onSubmit={onSubmit}>
        {/* <div className="swichMood"> <SwichMood mood={toggleDarkMode} /> </div> */}
        <div className='CT'>
          <div className='brand-logo'></div>
          <div className='brand-title'>SIGDOTEC</div>

          <div className='Inputs'>
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
              <span className=' messageError'>{errors.contraseña.message}</span>
            )}

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
                validate: passwordsMatch
              })}
            />
            {errors.confirmarContraseña && (
              <span className='messageError'>
                {errors.confirmarContraseña.message}
              </span>
            )}
          </div>
          <button type='submit' className='btn'>
            Login
          </button>
        </div>
      </form>
    </>
  )
}

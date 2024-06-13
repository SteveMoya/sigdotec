import '@styles/swichMood.css'
import '@styles/Verificacion.css'
import { useForm } from 'react-hook-form'
import { useRef } from 'react'
import { useEffect } from 'react'
//simulo que tengo el codigo(cambiar al futuro por el codigo traido del contexto)
const testcode = {
  code: '2345'
}
const DEFAULT_VALUES = {
  character1: '',
  character2: '',
  character3: '',
  character4: ''
}

const DEFAULT_VIEW_VALUES = Object.keys(DEFAULT_VALUES).map((i) => {
  return { name: i, key: crypto.randomUUID() }
})

/*Verifica porque el componente esta dando problemas al renderizar sus hijos.*/
export function Verificacion() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setFocus
  } = useForm({
    defaultValues: DEFAULT_VALUES
  })

  const onSubmit = handleSubmit(() => {
    console.log(watch())
    const value =
      watch().character1 +
      watch().character2 +
      watch().character3 +
      watch().character4
    console.log(value)

    if (value != testcode.code) {
      alert('El codigo no concide')
    } else {
      alert('Correcto')
    }
  })

  const handleFocus = (inputRef, index) => {
    useEffect(() => {
      const inputElement = inputRef.current
      if (inputElement) {
        const handleInput = () => {
          const watchedValue = watch(inputElement.name) // Get the watched value

          // try to Check if the watched value has a value
          if (watchedValue) {
            let nextIndex = index + 1
            focus(nextIndex)
            while (
              DEFAULT_VIEW_VALUES[nextIndex] &&
              !watch(DEFAULT_VIEW_VALUES[nextIndex].name)
            ) {
              nextIndex++
            }
            const nextAction = DEFAULT_VIEW_VALUES[nextIndex]
            nextAction.focus()
          }
        }
      }
    }, [inputRef, index, watch, setFocus])
  }

  return (
    <div className='body'>
      <form method='post' className='form' onSubmit={onSubmit}>
        <p className='heading'>Verify</p>
        <svg
          className='check'
          version='1.1'
          id='Layer_1'
          x='0px'
          y='0px'
          width='60px'
          height='60px'
          viewBox='0 0 60 60'
        >
          {/*Este conponente esta exigiendo una key. Verificar*/}
          <image
            key={crypto.randomUUID()}
            id='image0'
            width='60'
            height='60'
            x='0'
            y='0'
            href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAQAAACQ9RH5AAAABGdBTUEAALGPC/xhBQAAACBjSFJN
        AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZ
        cwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0NDzN/r+StAAACR0lEQVRYw+3Yy2sTURTH8W+bNgVf
        aGhFaxNiAoJou3FVEUQE1yL031BEROjCnf4PLlxILZSGYncuiiC48AEKxghaNGiliAojiBWZNnNd
        xDza3pl77jyCyPzO8ubcT85wmUkG0qT539In+MwgoxQoUqDAKDn2kSNLlp3AGi4uDt9xWOUTK3xg
        hVU2wsIZSkxwnHHGKZOxHKfBe6rUqFGlTkPaVmKGn6iYao1ZyhK2zJfY0FZ9ldBzsbMKxZwZjn/e
        5szGw6UsD5I0W6T+hBhjUjiF7bNInjz37Ruj3igGABjbtpIo3GIh30u4ww5wr3fwfJvNcFeznhBs
        YgXw70TYX2bY/ulkZhWfzfBbTdtrzjPFsvFI+T/L35jhp5q2owDs51VIVvHYDM9sa/LY8XdtKy1l
        FXfM8FVN2/X2ajctZxVXzPA5TZvHpfb6CFXxkerUWTOcY11LX9w0tc20inX2mmF4qG3upnNWrOKB
        hIXLPu3dF1x+kRWq6ysHpkjDl+7eQjatYoOCDIZF3006U0unVSxIWTgTsI3HNP3soSJkFaflMDwL
        3OoHrph9YsPCJJ5466DyOGUHY3Epg2rWloUxnMjsNw7aw3AhMjwVhgW4HYm9FZaFQZ/bp6QeMRQe
        hhHehWKXGY7CAuSpW7MfKUZlAUqWdJ3DcbAAB3guZl9yKC4WYLfmT4muFtgVJwvQx7T2t0mnXK6J
        XlGGyAQvfNkaJ5JBmxnipubJ5HKDbJJsM0eY38QucSx5tJWTVHBwqDDZOzRNmn87fwDoyM4J2hRz
        NgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wMi0xM1QxMzoxNTo1MCswMDowMKC8JaoAAAAldEVY
        dGRhdGU6bW9kaWZ5ADIwMjMtMDItMTNUMTM6MTU6NTArMDA6MDDR4Z0WAAAAKHRFWHRkYXRlOnRp
        bWVzdGFtcAAyMDIzLTAyLTEzVDEzOjE1OjUxKzAwOjAwIIO3fQAAAABJRU5ErkJggg=='
          ></image>
        </svg>
        <div className='box'>
          {DEFAULT_VIEW_VALUES.map(({ name: item, key }, indexMap) => {
            const inputRef = useRef(null)
            handleFocus(inputRef, indexMap)
            const inputComp = (
              <input
                ref={inputRef}
                id={key}
                key={key}
                className={`${errors[item] ? 'INP-error' : 'input'}`}
                type='password'
                name={item}
                maxLength='1'
                {...register(item)}
                defaultValue={watch()[item]}
                {...register(item, {
                  required: 'Este campo es requerido',
                  pattern: {
                    message: 'Código no registrado'
                  }
                })}
              />
            )
            return <>{inputComp}</>
          })}
        </div>
        <button className='btn1' type='submit' id='button'>
          Submit
        </button>
      </form>
    </div>
  )
}

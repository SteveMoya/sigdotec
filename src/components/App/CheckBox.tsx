import '@styles/CheckBox.css'

function Checkbox({ register }) {
  return (
    <>
      <div className='checkbox-wrapper'>
        <input
          id='terms-checkbox-37'
          type='checkbox'
          name='terminos'
          {...register('terminos', {
            value: true,
            required: 'Debes aceptar los términos y condiciones'
          })}
        />
        <label className='terms-label' htmlFor='terms-checkbox-37'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 200 200'
            className='checkbox-svg'
          >
            <mask fill='white' id='path-1-inside-1_476_5-37'>
              <rect height='200' width='200'></rect>
            </mask>
            <rect
              mask='url(#path-1-inside-1_476_5-37)'
              stroke-width='40'
              className='checkbox-box'
              height='200'
              width='200'
            ></rect>
            <path
              stroke-width='15'
              d='M52 111.018L76.9867 136L149 64'
              className='checkbox-tick'
            ></path>
          </svg>
          <span className='text'>
            Acepto los{' '}
            <a href='#' className='textA'>
              términos del servicio{' '}
            </a>
            y{' '}
            <a href='#' className='textA'>
              políticas de privacidad.
            </a>
          </span>
        </label>
      </div>
    </>
  )
}

export default Checkbox

export const Loading = () => {
  return (
      <div className='flex justify-center items-center my-10'>
          <span className='sr-only'>Cargando...</span>
          <div className='h-8 w-8 bg-black dark:bg-white rounded-full animate-vertical-bounce  [animation-delay:-0.3s] '></div>
          <div className='h-8 w-8 bg-black dark:bg-white rounded-full animate-vertical-bounce [animation-delay:-0.15s]'></div>
          <div className='h-8 w-8 bg-black rounded-full dark:bg-white animate-vertical-bounce'></div>
      </div>
  )
}

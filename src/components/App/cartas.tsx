import '@styles/sobreNosotros.css'
interface Props {
  title: string
  text: string
}

export function Cartas({ title, text }: Props) {
  return (
    <>
      <div className='carta group hover:text-white'>
        <div className='carta_content'>
          <p className='heading text-blue-600 dark:text-white group-hover:text-white'>
            {title}
          </p>
          <p className='para  text-black dark:text-white group-hover:text-white'>
            {text}
          </p>
        </div>
      </div>
    </>
  )
}

import '@styles/sobreNosotros.css'

export function Cartas({ title, text }) {
  return (
    <>
      {/*  <div className="carta_container">
        <div className="carta">
            <div className="face back">
                <div className="content">
                    <span className="stars"></span>
                    <b className="desc">{title}</b>
                    <p className="desc">
                        {text}
                    </p>
                </div>
            </div>
            <div className="face front">
                <b></b>
            </div>
        </div>
    </div>
*/}
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

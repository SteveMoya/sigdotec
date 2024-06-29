import '@styles/sobreNosotros.css'

interface Props {
  text: string
  img: string
  title: string
  subtitle: string
  type: string
}

export function Card({ text, img, title, subtitle, type }: Props) {
  return (
    <>
      <article className='card'>
        <img
          src={img}
          alt=''
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        <div className={type}>
          <span className='card_title'>{title}</span>
          <span className='card_subtitle'>{subtitle}</span>
          <p className='card_description'>{text}</p>
        </div>
      </article>
    </>
  )
}

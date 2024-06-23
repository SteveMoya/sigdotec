import React, { useState, useEffect, useRef } from 'react'

import '@styles/sobreNosotros.css'

import { Card } from './card'
import { Cartas } from './cartas.tsx'
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll'


function SobreNosotros() {
  const text1 =
    'José, un joven apasionado de la República Dominicana, soñaba con aprovechar la tecnología para transformar la educación. Convocó a un grupo de amigos y conocidos que compartían ese mismo sueño: jóvenes unidos por una visión compartida. Sin recursos económicos, pero con una determinación inquebrantable, lograron sentar las bases de lo que hoy conocemos como SIDGOTEC'
  const Text_Mision =
    'Facilitar y mejorar la calidad de la educación en la República Dominicana mediante el uso innovador de la tecnología. En SIDGOTEC, nos dedicamos a proporcionar herramientas y soluciones tecnológicas que potencien el proceso de enseñanza, con un enfoque especial en apoyar a los profesores en la planificación de clases, haciéndolas más efectivas y rentables. Nuestra misión es empoderar a los educadores a través de la inteligencia artificial y el uso de datos actualizados del Ministerio de Educación, MECTY, para transformar la educación y brindar experiencias de aprendizaje excepcionales.'
  const Text_Vision =
    'Convertirnos en líderes destacados en el ámbito educativo, siendo reconocidos por la excelencia y la innovación en la mejora de los procesos educativos a través de la tecnología. En SIDGOTEC, visualizamos un futuro donde cada docente cuenta con herramientas inteligentes que optimizan su tiempo y recursos, permitiéndoles ofrecer una educación de calidad y relevante para cada estudiante. Aspiramos a ser la opción preferida de los profesores y centros educativos en la transformación digital de la enseñanza, contribuyendo así al desarrollo continuo de la educación en la República Dominicana y más allá'
  const text_valor_pasion =
    'SIDGOTEC se destaca por su enfoque en aprovechar la tecnología para transformar la educación, indicando un valor fundamental de innovación y búsqueda de soluciones tecnológicas.'
  const [isAnimated, setIsAnimated] = useState(false)
  const [isAnimatedvalue, setisAnimatedvalue] = useState(false)
  const [isAnimatedhistoria, setIsAnimatedHistoria] = useState(false)
  const valoresTitleRef = useRef<React.RefObject<HTMLElement> | null>(null)
  const HistoriaValoresRef = useRef<React.RefObject<HTMLElement> | null>(null)
  const HistoriaRef = useRef<React.RefObject<HTMLElement> | null>(null)

  // useEffect(() => {
  //   valoresTitleRef.current = document.getElementById('valoresTitle')
  //   HistoriaValoresRef.current = document.getElementById('Historia_valores')
  //   HistoriaRef.current = document.getElementById('Historia')

  // }, [])
  // const handleScroll = () => {
  //   const valoresTitlePosition =
  //     valoresTitleRef.current.getBoundingClientRect().top
  //   const Historia_valore =
  //     HistoriaValoresRef.current.getBoundingClientRect().top
  //   const Historia = HistoriaRef.current.getBoundingClientRect().top
  //   if (valoresTitlePosition <= window.innerHeight * 0.5 && !isAnimated) {
  //     setIsAnimated(true)
  //   }
  //   if (Historia_valore <= window.innerHeight * 0.5 && !isAnimatedvalue) {
  //     setisAnimatedvalue(true)
  //   }
  //   if (Historia <= window.innerHeight * 0.5 && !isAnimatedvalue) {
  //     setIsAnimatedHistoria(true)
  //   }
  // }
  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll)

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [isAnimated])

  return (
    <>
 
   
        <form className='body' id='root'>
          
        </form>
   
    
      <ScrollLink to='Historia' smooth={true} duration={9000}>
        {/*Colocar el web component de youtube para video de presentacicon de sigdotec*/}
        <form
          className={`Historia ${isAnimatedhistoria ? 'active' : ''}`}
          id='Historia'
        >
          <Card
            text={text1}
            img='/Historia-SIGDOTEC-Imagen.webp'
            title='Historia'
            subtitle='Republica Dominicana'
            type='card_content '
          />
          <Card
            text={Text_Mision}
            img='/Mision-SIGDOTEC-Imagen.webp'
            title='Misión'
            subtitle='Objectivo'
            type='card_content bg-gradient-to-tr from-[#007FFF] to-[#17E9E1]'
          />
          <Card
            text={Text_Vision}
            img='/Vision-SIGDOTEC-Imagen.webp'
            title='Visión'
            subtitle='Nuestra Metas'
            type='card_content bg-gradient-to-tr from-[#007FFF] to-[#17E9E1]'
          />
        </form>
      </ScrollLink>

      <ScrollLink to='valoresTitle' smooth={true} duration={9000}>
        <section
          className={`Valores_title ${isAnimated ? 'active' : ''}`}
          id='valoresTitle'
        >
          <div className='textvalues'>
            <h1 className='text-white '>
              En{' '}
              <span className=' text-[#007FFF] uppercase font-bold'>
                SIDGOTEC
              </span>{' '}
            </h1>
            <h6 className='text-white'>Los valores nos mueven</h6>
          </div>

          <video
            className='video max-md:h-72 object-cover '
            src='/Aboutvideo.webm'
            autoPlay={true}
            
          ></video>
        </section>
      </ScrollLink>
      <ScrollLink to='Historia_valores' smooth={true} duration={9000}>
        <form
          className={`Historia_valores ${isAnimatedvalue ? 'active' : ''}`}
          id='Historia_valores'
        >
          <Cartas title='Innovación Tecnológica' text={text_valor_pasion} />
          <Cartas
            title='Visión Compartida'
            text='El grupo de jóvenes se unió por una visión compartida de transformar la educación. Este valor resalta la importancia de tener una visión común y objetivos compartidos dentro de la empresa.'
          />
          <Cartas
            title='Determinación'
            text='A pesar de las limitaciones económicas, la empresa se fundamenta en una determinación inquebrantable. Este valor destaca la perseverancia y la capacidad de superar obstáculos para lograr los objetivos establecidos.'
          />
        </form>
      </ScrollLink>
    </>
  )
}
export default SobreNosotros

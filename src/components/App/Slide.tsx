import React, { useRef, useEffect, useState } from 'react';
import '@styles/ofertas.css';
import ofertas from '../../data/ofertas.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Slide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const mainCanvas = document.getElementById("myCanvas");
    const mainContext = mainCanvas.getContext('2d');

    const circles: any[] = [];

    const requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

    function Circle(radius, speed, width, xPos, yPos) {
      this.radius = radius;
      this.speed = speed;
      this.width = width;
      this.xPos = xPos;
      this.yPos = yPos;
      this.opacity = .01 + Math.random() * .2;
      this.counter = 0;
      const signHelper = Math.floor(Math.random() * 2);
      this.sign = signHelper === 1 ? -1 : 1;
    }
 
    Circle.prototype.update = function () {
      this.counter += this.sign * this.speed;
 
      mainContext.beginPath();
      mainContext.arc(
        this.xPos + Math.cos(this.counter / 100) * this.radius, 
        this.yPos + Math.sin(this.counter / 100) * this.radius, 
        this.width, 
        0, 
        Math.PI * 2,
        false
      );
      mainContext.closePath();
 
      mainContext.fillStyle = 'rgba(235, 245, 251,' + this.opacity + ')';
      mainContext.fill();
    };
 
    function drawCircles() {
      const canvasWidth = mainCanvas.width;
      const canvasHeight = mainCanvas.height;
      for (let i = 0; i < 150; i++) {
        const randomX = Math.round(Math.random() * canvasWidth);
        const randomY = Math.round(Math.random() * canvasHeight);
        const speed = .2 + Math.random() * 3;
        const size = 1 + Math.random() * 40;
 
        const circle = new Circle(40, speed, size, randomX, randomY);
        circles.push(circle);
      }
      draw();
    }

    function draw() {
      const canvasWidth = mainCanvas.width;
      const canvasHeight = mainCanvas.height;
      mainContext.clearRect(0, 0, canvasWidth, canvasHeight);
      circles.forEach(circle => circle.update());
      requestAnimationFrame(draw);
    }

    drawCircles();

    return () => {
      // Limpiar cualquier recurso (por ejemplo, listeners) aquí si es necesario
    };
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <>
    <div className="slide-container bg-gradient-to-br from-cyan-400 to-blue-500 dark:from-cyan-400 dark:to-blue-950 relative overflow-hidden">
      <div className='t-Title '><p className=''>Desliza</p> <p>nuestras</p>ofertas!</div>
      <div className="custom-shape-divider-bottom-1712067135">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill fill-white dark:fill-gray-900"></path>
        </svg>
      </div>
      <canvas id="myCanvas" className='absolute top-0 left-0' width="2500" height="600"></canvas>
      <Swiper
        spaceBetween={40}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        initialSlide={currentIndex}
      >
        {ofertas.map((oferta, index) => (
          <SwiperSlide key={index}>
            <div className='bg-slide'>
              <div className="slide">
                <img src={oferta.imagen} alt={oferta.name} />
                <div className="text-container ">
                  <h3 className='nametitle text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 from-20% via-[#007FFF] via-30% to-[#17E9E1]' >{oferta.name}</h3>
                  <p className="text descripcion">{oferta.descripcion}</p>
                  <p className="text Precio">Desde: {oferta.precio}</p>
                  <p className="text duracion">Hasta: {oferta.duracion}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    <div className='photo'>
    <img src="../src/assets/images/SIGDO-Logo/SIGDO-32.svg" alt="Hero image" className="lg:w-full lg:h-full rounded-3xl object-contain max-h-96" data-astro-cid-d7gmtskn="" data-astro-source-file="C:/Users/MSI/Documents/SIGDO/src/components/sections/AboutA.astro" data-astro-source-loc="51:8"/>
  </div>
  </>
  );
};

export default Slide;

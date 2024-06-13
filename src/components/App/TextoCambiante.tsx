import React, { useState, useEffect } from 'react';
import Typed from 'typed.js';


export function textoCambiante({ texts }) {
    const [index, setIndex] = useState(0);

 useEffect(() => {
   const typed = new Typed('.text', {
     strings: texts,
     typeSpeed: 157,
     backSpeed: 150,
     startDelay: 100,
     loop: true,
     onComplete: () => {
       setIndex((prevIndex) => (prevIndex + 1) % texts.length);
     }
   });

   return () => {
     typed.destroy();
   };
 }, [texts]);

 return <span className="text"></span>;
 
}

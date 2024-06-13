
import '@styles/ofertas.css';


function Site (){
    return(<>
   
   <div className='main-container-shadow  relative w-full  lg:w-1/2 inset-y-0 lg:right-0'> 
   
   
      <span
        class='absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 skew-x-12 rounded-3xl dark:bg-[#007FFF] bg-[#23357e] blur-xl opacity-60 lg:opacity-95 lg:block'
      ></span>
      <span
        class='absolute right-4 bottom-12 w-24 h-24 rounded-3xl bg-[#007FFF] blur-xl opacity-80'
      ></span>



    <div className='flex items-center justify-center'> <div className="wrapper ">
    
    <div>
            <a href="#" data-tooltip-content="Plan Basico" className="data-tooltip">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"


                    
                    height="40"
                    viewBox="0 0 528.8 599.1" // Ajusta el viewBox según las dimensiones de tu SVG
                    fill="currentColor" // O el color que desees
                    className="custom-svg-icon" // Puedes agregar una clase para estilizar el SVG si es necesario
                >
                    {/* Aquí pega el contenido de tu SVG */}
                    <path
                        d="M499.7,5.3H358.5c-35.5,0-68.2,12.1-94.1,32.4c-26-20.3-58.7-32.4-94.2-32.4H29C16,5.3,5.5,15.9,5.5,28.9
                        v397.1c0,21.1,11.1,39.6,27.8,50l1.4,0.8L35,477l17.5,10.6l24.1,14.5c0.9,0.5,2.1,0.6,3.2,0.3c1.2-0.4,2.1-1.4,2.5-2.6
                        c0.3-1.3,0-2.6-0.8-3.6c-3.1-3.8-6-7.8-8.7-12c-12.3-19.2-19.7-41.9-20.3-66.4c0-1.1,0-2.2,0-3.3s0-2.2,0-3.3V60
                        c0-4.2,3.4-7.6,7.6-7.6h86.5c30.3,0,58.4,9.6,81.4,25.8c13.2,9.3,24.7,20.8,34,34c1.1,1.6,3.5,1.6,4.6,0c9.3-13.2,20.8-24.7,34-34
                        c23-16.3,51.1-25.8,81.4-25.8h86.5c4.2,0,7.6,3.4,7.6,7.6v353.3c0,0.4,0,0.7,0,1.1s0,0.7,0,1.1c-0.2,25.2-7.6,48.8-20.3,68.6
                        c-2.7,4.1-5.5,8.1-8.6,11.9c0,0.1-0.1,0.1-0.1,0.2c-0.6,0.9-0.9,2-0.7,3.1c0.3,1.7,1.8,3.1,3.6,3.2c0.8,0.1,1.5-0.1,2.2-0.5
                        c0.1-0.1,0.2-0.1,0.3-0.2l23.7-14.3l18.7-11.3c17-10.3,28.3-29,28.3-50.3v-397C523.3,15.9,512.7,5.3,499.7,5.3z"
                    />
                </svg>
            </a>
            <p className='text-base'> Uso de inteligencia artificial &amp; Organiza tus programas de clases</p>
        </div>

        <div>
            <a href="#" className="span-tooltip">
                
            <i>
              <img 
                src="../src/assets/images/SIGDO-Logo/SIGDO-32.svg" 
                alt="Hero image" 
                className="lg:w-full lg:h-full object-cover max-h-96" 
                style={{ maxWidth: '60%', height: 'auto' }} 
                data-astro-cid-d7gmtskn="" 
                data-astro-source-file="C:/Users/MSI/Documents/SIGDO/src/components/sections/AboutA.astro" 
                data-astro-source-loc="51:8"
            />
            </i>
            <span>Plan Completo</span>
            </a>
            <p className='text-base'>Uso completo ilimitado de la IA y seguimiento personal de tus planes</p>
        </div>
</div>
</div>
    <div className="flex items-center justify-center  pt-16  ">
        <h1 className="  justify-start font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 from-20% via-[#007FFF] via-30% to-[#17E9E1]">
            Nos limitamos a tus necesidades</h1>
    </div>
</div>


   
    
    </>)

}
export default Site
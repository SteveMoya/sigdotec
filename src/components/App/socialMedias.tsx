// import { signIn } from "auth-astro/client"
// import '@styles/socialMedia.css'
// import type { BuiltInProviderType } from "@auth/core/providers"
// interface SignInOptions extends Record<string, unknown> {
//   callbackUrl?: string;
//   redirect?: boolean;
// }

// function SocialMedia() {
//   const handleSignIn = async (provider: BuiltInProviderType, options: SignInOptions) => {
//     try {
//       await signIn(provider, { redirect: true, ...options })
//     } catch (error) {
//       console.error(error)
//     }
//   }
//   return (
//     <>
//       <div className='social-buttons'>
//         <a href='#' onClick={() => handleSignIn('github', { redirect: true, callbackUrl: "/api/roles"})} className='social-button github hover:text-[#333]'>
//           <span className="icon-[mdi--github] cf-icon-svg text-3xl"></span>
          
//         </a>
//         <a href='#' onClick={() => handleSignIn('linkedin', { redirect: true, callbackUrl: "/app/" })} className='social-button linkedin hover:text-[#0077b5]'>
//           <span className="icon-[mdi--linkedin] text-3xl"></span>
//         </a>
//         <a href='#' onClick={() => handleSignIn('facebook', { redirect: true, callbackUrl: "/app/" })} className='social-button facebook hover:text-[#3b5998]'>
//           <span className="icon-[mdi--facebook] text-3xl"></span>
//         </a>
//         <a onClick={() => handleSignIn('instagram', { redirect: true, callbackUrl: "/app/" })}
//           href='#'
//           className='social-button instagram hover:text-[#c13584]'
//         > 
//           <span className="icon-[mdi--instagram] text-3xl"></span>
//         </a>
//         <a href='#' onClick={() => handleSignIn('google', { redirect: true, callbackUrl: "/app/" })} className='social-button google hover:text-[#db4437]'>
//           <span className="icon-[mdi--google] text-3xl"></span>
//         </a>
//       </div>
//     </>
//   )
// }
// export default SocialMedia

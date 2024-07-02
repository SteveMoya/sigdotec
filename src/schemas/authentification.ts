import { z } from "astro/zod"

export const SignUpSchema = z
    .object({
        username: z.string({message: "el nombre del usuario tiene que tener letras"}).min(2, {
            message: "El nombre del usuario tiene que tener un minimo de 2 caracteres",
        }).max(50, {
            message: "El nombre del usuario tiene que tener un maximo de 50 caracteres",
        
        }),
        email: z.string().email({ message: "El email tiene que ser valido"}),
        password: z
            .string()
            .min(8, { message: "La contraseña tiene que ser de un minimo de 8 caracteres" }),
        confirmPassword: z
            .string()
            .min(8, { message: "La contraseña tiene que ser de un minimo de 8 caracteres" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no son iguales",
        path: ["confirmPassword"],
    })

export const SignInSchema = z.object({
    username: z.string({ message: "el nombre del usuario tiene que tener letras" }).min(2, {
        message: "El nombre del usuario tiene que tener un minimo de 2 caracteres",
    }).max(50, {
        message: "El nombre del usuario tiene que tener un maximo de 50 caracteres",
    }),
    password: z
        .string()
        .min(8, { message: "La contraseña tiene que ser de un minimo de 8 caracteres" })
        // Aqui hacemos que no se pueda ser una sucesion de numeros
        .refine((data) => !/^\d+$/.test(data), {
            message: "La contraseña no puede ser una sucesion de numeros",
        }),
})


// !TODO: Terminar Schema

export const DemographicSchema = z.object({
    age: z.number().int().min(18, { message: "Tienes que ser mayor de 18 años" }).max(120, { message: "Tienes que ser menor de 120 años" })
        .refine((data) => data % 1 === 0, {
            message: "La edad tiene que ser un numero entero",
        })
        .refine((data) => new Date().getFullYear() - data >= 18, {
            message: "Tienes que ser mayor de 18 años",
        })
        .refine((data) => new Date().getFullYear() - data < 120, {
            message: "Tienes que ser menor de 120 años",
        }),
    country: z.string(),
    province: z.string(),
    gender: z.enum(["hombre", "mujer"]),
})
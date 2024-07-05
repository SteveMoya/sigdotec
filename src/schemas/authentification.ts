import { z } from "astro/zod"

export const SignUpSchema = z
    .object({
        username: z.string({ message: "el nombre del usuario tiene que tener letras" }).min(2, {
            message: "El nombre del usuario tiene que tener un minimo de 2 caracteres",
        }).max(50, {
            message: "El nombre del usuario tiene que tener un maximo de 50 caracteres",

        }),
        email: z.string().email({ message: "El email tiene que ser valido" }),
        password: z
            .string()
            .min(8, { message: "La contraseña tiene que ser de un minimo de 8 caracteres" }),
        confirmPassword: z
            .string()
            .min(8, { message: "La contraseña tiene que ser de un minimo de 8 caracteres" })
            
    }).refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "Las contraseñas no son iguales",
        }
    )

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

export const ResetPasswordSchema = z.object({
    email: z.string().email({ message: "El email tiene que ser valido" }),
})

export const ChangePasswordSchema = z.object({
    lastPassword: z.string().min(8, { message: "La contraseña tiene que ser de un minimo de 8 caracteres" }),
    newPassword: z
        .string()
        .min(8, { message: "La contraseña tiene que ser de un minimo de 8 caracteres" })
        .refine((data) => !/^\d+$/.test(data), {
            message: "La contraseña no puede ser una sucesion de numeros",
        }),
    confirmPassword: z
        .string()
        .min(8, { message: "La contraseña tiene que ser de un minimo de 8 caracteres" }),
       
        logoutFromOtherDevices: z.boolean(),
}).refine(
    (data) => data.newPassword === data.confirmPassword,
    {
        message: "Las contraseñas no son iguales",
    }
).refine((data) => data.lastPassword !== data.newPassword, {
    message: "La nueva contraseña no puede ser igual a la anterior",
})


export const provinces = [
    'Azua', 'Baoruco', 'Barahona', 'Dajabón', 'Distrito Nacional', 'Duarte', 'Elías Pina', 'El Seibo', 'Espaillat', 'Hato Mayor', 'Independencia', 'La Altagracia', 'La Romana', 'La Vega', 'Maria Trinidad Sanchez', 'Monseñor Nouel', 'Monte Cristi', 'Monte Plata', 'Pedernales', 'Peravia', 'Puerto Plata', 'Salcedo', 'Samana', 'Sánchez Ramírez', 'San Cristobal', 'San Jose de Ocoa', 'San Juan', 'San Pedro de Macorís','Santiago', 'Santiago Rodríguez', 'Santo Domingo', 'Valverde'
] as const

export const subjects = [
    'Matemática Primaria', 'Matemática Secundaria', 'Lengua Española Primaria', 'Lengua Española Secundaria', 'Ciencias Naturales Primaria', 'Ciencias Naturales Secundaria', 'Ciencias Sociales Primaria', 'Ciencias Sociales Secundaria', 'Formación Humana', 'Ingles Primaria', 'Ingles Secundaria', 'Frances Primaria', 'Frances Secundaria', 'Educación Informatica Primaria', 'Educación Informatica Secundaria', 'Educación Artística Primaria', 'Educación Artística Secundaria', 'Educación Física Primaria', 'Educación Física Secundaria'
] as const

export const gender = [
    'Masculino', 'Femenino', 'Otro'
] as const

export const DemographicSchema = z.object({
    age: z.number({
        message: "La edad tiene que ser un numero",
    }).int({message:
        "La edad tiene que ser un numero entero"
    }).min(18, { message: "Tienes que ser mayor de 18 años" }).max(120, { message: "Tienes que ser menor de 120 años" })
        .refine((data) => data >= 0, {
            message: "La edad no puede ser un numero negativo",
        }),
    province: z.enum(provinces, { message: "La provincia tiene que ser una de las provincias de la lista" }),
    gender: z.enum(["Masculino", "Femenino","Otro"],{
        message: "El genero tiene que ser uno de los generos de la lista"
    }),
    workingPlace: z.string().min(2, { message: "El lugar de trabajo tiene que tener un minimo de 2 caracteres" }).max(50, { message: "El lugar de trabajo tiene que tener un maximo de 50 caracteres" }),
    subject: z.enum(subjects, { message: "La materia tiene que ser una de las materias de la lista" }),
})
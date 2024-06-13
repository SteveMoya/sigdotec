import { z } from "astro:content";

export const TeamSchema = ({ image }) => z.object({
    name: z.string({ required_error: "Nombre es requerido" }),
    description: z.string({ required_error: "Descripción es requerida" }),
    role: z.string({ required_error: "Rol es requerido" }),
    image: image().refine((img) => img.width >= 200, {
        message: "Cover image must be at least 200 pixels wide!",
    }),
    socials: z.array(SocialSchema).default([]),
});



export const SocialSchema = z.object({
    name: z.string({ required_error: "Nombre de la red social requerido" }),
    url: z.string().url({ message: "URL de la red social tiene que ser valida y es requerida" }),
    icon: z.string().startsWith("mdi", { message: "Icono tiene que empezar con mdi" }),
})
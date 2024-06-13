import { reference, z } from "astro:content";

const CATEGORIES = [
     'technology',
     'Tecnologia',
     'education',
     'Programación',
     'Marketing',
     'Productividad',
] as const

export const BlogSchema = z.object({
     title: z.string().max(80),
     updateDate: z.string().or(z.date())
          .transform((val) => new Date(val)).optional(),
     tags: z.array(z.string()),
     category: z.enum(CATEGORIES),
     image: z.string().optional(),
     description: z.string(),
     author: reference("team"),
     relatedPosts: z.array(reference("blog")).optional(),
     pubDate: z
          .string()
          .or(z.date())
          .transform((val) => new Date(val)),
     draft: z.boolean().default(false)
});
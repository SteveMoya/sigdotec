import { defineCollection, } from 'astro:content';
import { BlogSchema, TeamSchema, } from '@src/schemas';

export const collections = {
    blog: defineCollection({
        type: "content",
        schema: BlogSchema,
    }),
    team: defineCollection({
        type: "data",
        schema: TeamSchema,
    }),
}


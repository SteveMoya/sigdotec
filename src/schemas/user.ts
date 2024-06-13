import { z } from "astro/zod";

export const roles = ["admin", "user", "school"] as const;

export const UserSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email('Invalid email'),
    image: z.string(),
    access_token: z.string(),
    refress_token: z.string(),
    role: z.enum(roles).default("user"),
    wallet: z.number().min(0).default(0),
});

export type User = z.infer<typeof UserSchema>;

export interface UserAuth extends Pick<User, "email" | "access_token" | "refress_token"> {}

export interface Role extends Pick<User, "role"> {}

export interface Wallet extends Pick<User, "wallet"> {}

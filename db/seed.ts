import { hasherPassword } from '@/utils';
import { User, db } from 'astro:db';
import { generateId } from 'lucia';

// https://astro.build/db/seed

export default async function seed() {
	const seedsUsers = [
		{
			id: generateId(15),
			username: 'Jose',
			email: 'jose@gmail.com',
			hashedPassword: await hasherPassword('jose12345678'),
			role: 'admin',
			emailVerificated: true,
			userimage: 'https://avatars.githubusercontent.com/u/126265778?v=4',
			provider: "email",
			balance: 40000,
		},
		{
			id: generateId(15),
			username: 'steve',
			email: 'steve@gmail.com',
			hashedPassword: await hasherPassword('steve12345678'),
			emailVerificated: true,
			role: 'user',
			userimage: 'https://avatars.githubusercontent.com/u/114698709?v=4',
			provider: "email",
			balance: 0,
		},
		{
			id: generateId(15),
			username: 'saiyan',
			email: 'saiyan@gmail.com',
			hashedPassword: await hasherPassword('saiyan12345678'),
			emailVerificated: false,
			role: 'user',
			userimage: 'https://avatars.githubusercontent.com/u/114698709?v=4',
			provider: "email",
			balance: 1000,
		},
	]

	await db.insert(User).values(seedsUsers)
	// await db.insert(Comment).values([
	// 	{ authorId: 1, body: 'Hope you like Astro DB!' },
	// 	{ authorId: 2, body: 'Enjoy!' },
	// ])
}

import { hasherPassword } from '@/utils';
import { User, db, Demographic } from 'astro:db';
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
			username: 'riki ricon',
			email: 'riki@gmail.com',
			hashedPassword: await hasherPassword('riki12345678'),
			emailVerificated: true,
			role: 'user',
			provider: "email",
			balance: 1000,
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
			username: 'Verification',
			email: 'stevemc201666@gmail.com',
			hashedPassword: await hasherPassword('verification12345678'),
			emailVerificated: true,
			role: 'user',
			userimage: 'https://avatars.githubusercontent.com/u/114698709?v=4',
			provider: "email",
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
	// const DemographycUsers = [
	// 	{
	// 		id: generateId(15),
	// 		userId: seedsUsers[0].id,
	// 		age: 25,
	// 		gender: "Masculino",
	// 		province: "Santo Domingo",
	// 		workingPlace: "Universidad Autonoma de Santo Domingo",
	// 		subject: "Matemática Secundaria",
	// 	},
	// 	{
	// 		id: generateId(15),
	// 		userId: seedsUsers[1].id,
	// 		age: 30,
	// 		gender: "Masculino",
	// 		province: "Azua",
	// 		workingPlace: "Universidad Autonoma de Santo Domingo",
	// 		subject: "Matemática Primaria",
	// 	},
	// ]
	await db.insert(User).values(seedsUsers)
	// await db.insert(Demography).values(DemographyUsers)
}

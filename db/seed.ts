
import { hasherPassword } from '@/utils';
import { User, db, Demography, WalletTransaction } from 'astro:db';
import { create } from 'domain';
import { generateId } from 'lucia';

// https://astro.build/db/seed

function generateCreatedAt() {
	const date = new Date();
	date.setMonth(date.getMonth() - 1);
	return date;
}
function generateCreatedAt2() {
	const date = new Date();
	date.setMonth(date.getMonth() - 2);
	return date;
}
function generateCreateAtThisMonth() {
	const date = new Date();
	date.setMonth(date.getMonth());
	return date;
}

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
			emailVerificated: false,
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
	const DemographycUsers = [
		{
			id: generateId(15),
			userId: seedsUsers[0].id,
			birthdate: new Date(1999, 1, 1),
			gender: "Masculino",
			province: "Santo Domingo",
			workingPlace: "Universidad Autonoma de Santo Domingo",
			subject: "Matemática Secundaria",
		},
		{
			id: generateId(15),
			userId: seedsUsers[1].id,
			birthdate: new Date(1999, 1, 1),
			gender: "Masculino",
			province: "Azua",
			workingPlace: "Universidad Autonoma de Santo Domingo",
			subject: "Matemática Primaria",
		},
		{
			id: generateId(15),
			userId: seedsUsers[2].id,
			birthdate: new Date(2002, 1, 1),
			gender: "Femenino",
			province: "Santiago",
			workingPlace: "Universidad Autonoma de Santo Domingo",
			subject: "Matemática Secundaria",
		},
		{
			id: generateId(15),
			userId: seedsUsers[3].id,
			birthdate: new Date(2003, 1, 1),
			gender: "Femenino",
			province: "Santiago",
			workingPlace: "Universidad Autonoma de Santo Domingo",
			subject: "Matemática Secundaria",
		},
		{
			id: generateId(15),
			userId: seedsUsers[4].id,
			birthdate: new Date(2003, 2, 1),
			gender: "Masculino",
			province: "Santo Domingo",
			workingPlace: "Universidad Autonoma de Santo Domingo",
			subject: "Matemática Secundaria",
		},
		{
			id: generateId(15),
			userId: seedsUsers[4].id,
			birthdate: new Date(2003, 2, 1),
			gender: "Masculino",
			province: "Santo Domingo",
			workingPlace: "Universidad Autonoma de Santo Domingo",
			subject: "Matemática Secundaria",
		}
	]
	const WalletTransactionSeeds = [
		{
			id: generateId(15),
			transactionid: generateId(15),
			userId: seedsUsers[0].id,
			amount: 100,
			type: "Paypal",
			createAt: generateCreatedAt(),
		},
		{
			id: generateId(15),
			transactionid: generateId(15),
			userId: seedsUsers[1].id,
			amount: 10,
			type: "ACH",
			createAt: new Date(),
		},
		{
			id: generateId(15),
			transactionid: generateId(15),
			userId: seedsUsers[2].id,
			amount: 1500,
			type: "ACH",
			createAt: generateCreatedAt(),
		},
		{
			id: generateId(15),
			transactionid: generateId(15),
			userId: seedsUsers[0].id,
			amount: 500,
			type: "ACH",
			createAt: generateCreatedAt2(),
		},
		{
			id: generateId(15),
			transactionid: generateId(15),
			userId: seedsUsers[4].id,
			amount: 550,
			type: "ACH",
			createAt: generateCreatedAt2(),
		},
		{
			id: generateId(15),
			transactionid: generateId(15),
			userId: seedsUsers[3].id,
			amount: 300,
			type: "ACH",
			createAt: generateCreatedAt(),
		},
		{
			id: generateId(15),
			transactionid: generateId(15),
			userId: seedsUsers[1].id,
			amount: 350,
			type: "Paypal",
			createAt: generateCreateAtThisMonth(),
		},
		{
			id: generateId(15),
			transactionid: generateId(15),
			userId: seedsUsers[1].id,
			amount: 10,
			type: "Paypal",
			createAt: generateCreateAtThisMonth(),
		}
	]

	await db.insert(User).values(seedsUsers)
	await db.insert(Demography).values(DemographycUsers)
	await db.insert(WalletTransaction).values(WalletTransactionSeeds)
}

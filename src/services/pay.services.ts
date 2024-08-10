import { db, WalletTransaction, eq, User } from "astro:db";
import { generateId } from "lucia";


export const Pay = {
    async getTransactions(userId:string){
        try {
            const transactions = await db.select().from(WalletTransaction).where(eq(
                WalletTransaction.userId, userId
            )).all();
            return transactions
        } catch (error) {
            console.log(error)
        }
    },
    async updateUserBalance(userId:string, amount:number){
        try {
            const user = (await db.select().from(User).where(eq(User.id, userId))).at(0);
            const newBalance = user?.balance! + amount;
            await db.update(User).set({
                balance: newBalance
            }).where(eq(User.id, userId));
        } catch (error) {
            console.log(error)
    }
    },
    async createTransaction(userId:string, amount:number, type:string, transactionId:string, createdAt?:Date){
        try {
            const transaction = await db.insert(WalletTransaction).values({
                id: generateId(15),
                userId: userId,
                transactionid: transactionId,
                amount: amount,
                type: type,
                createdAt: createdAt || new Date()
            });
        await Pay.updateUserBalance(userId, amount);
        return transaction;
            
        } catch (error) {
            console.log(error)
        }
    },
}
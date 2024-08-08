import { db, WalletTransaction, eq, User, Session, gte, lt, and } from "astro:db";

export const DB = {
    async getAllTransactions(){
        try {
            const transactions = await db.select().from(WalletTransaction).all();
            return transactions
        } catch (error) {
            console.log(error)
        }
    },
    async getTotalBalance(){
        try {
            const transactions = await db.select().from(WalletTransaction).all();
            let total = 0;
            transactions.forEach((transaction) => {
                total += transaction.amount;
            });
            return total;
        } catch (error) {
            console.log(error)
        }
    },
    async getAllUser(){
        try {
            const users = await db.select().from(User).all();
            return users
        } catch (error) {
            console.log(error)
        }
    },
    // Aqui creamos un servicio para obtener en numeros la cantidad recargadas de este mes de todos los usuarios
    async getBalanceThisMonth(){
        try {
            const transactions = await db.select().from(WalletTransaction).where(eq(WalletTransaction.createdAt, 
                new Date(new Date().getFullYear(), new Date().getMonth(), 1))).all();
            let total = 0;
            transactions.forEach((transaction) => {
                total += transaction.amount;
            });
            return total;
        } catch (error) {
            console.log(error)
        }
    },
    // Aqui creamos un servicio para obtener la cantidad de usuarios registrados en el mes actual
    async getUsersThisMonth(){
        try {
            const users = await db.select().from(User).where(eq(User.createdAt, 
                new Date(new Date().getFullYear(), new Date().getMonth(), 1))).all();
            return users.length;
        } catch (error) {
            console.log(error)
        }
    },
    async getUserCount(){
        try {
            const users = await db.select().from(User).all();
            return users.length;
        } catch (error) {
            console.log(error)
        }
    },
    async getUnverifiedUsersCount(){
        try {
            const users = await db.select().from(User).where(eq(User.emailVerificated, false)).all();
            return users.length;
        } catch (error) {
            console.log(error)
        }
    },
    // Aqui colocamos la cantidad de sesiones activas
    async getActiveSessions(){
        try {
            const sessions = await db.select().from(Session).all();
            return sessions.length;
        } catch (error) {
            console.log(error)
        }
    },
    async getRecentTransactions(){
        try {
            const transactions = await db.select().from(WalletTransaction).orderBy(WalletTransaction.createdAt,
                "asc"
            ).limit(4).all();
            return transactions;
        } catch (error) {
            console.log(error)
        }
    },
}
import { db, WalletTransaction, eq, User, Session, gte, lt, and } from "astro:db";

export const Charts = {
    async getChartTransactions() {
        try {
            const transactions = await db.select().from(WalletTransaction).all();

            // Obtener la fecha más antigua
            const earliestDate = new Date(Math.min(...transactions.map(t => new Date(t.createdAt).getTime())));

            // Obtener el total de transacciones
            const totalTransactions = transactions.length;

            return transactions.map((transaction) => {
                const date = transaction.createdAt.toISOString().split("T")[0];
                const total = transactions.filter(t => t.createdAt.toISOString().split("T")[0] === date).length;
                const newTransactionsPercentage = (total / totalTransactions) * 100;

                return {
                    date,
                    total,
                    newTransactionsPercentage
                };
            });
        } catch (error) {
            console.error("Error fetching transactions:", error);
            return [];
        }
    },
    async getThisMonthChartTransactions() {
        try {
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

            const transactions = await db.select().from(WalletTransaction)
                .where(
                    and(
                        gte(WalletTransaction.createdAt, startOfMonth),
                        lt(WalletTransaction.createdAt, startOfNextMonth)
                    )
                )
                .all();

            let chartData = transactions.map((transaction: { createdAt: Date, amount: number }) => ({
                label: new Date(transaction.createdAt).toLocaleDateString(),
                amount: transaction.amount
            }));

            return chartData;
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    // cremos un servicio para la diferencia de transacciones de este mes con el mes anterior y lo colocamos en porcentaje
    async getDifferenceThisMonth() {
        try {
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

            // Obtener las transacciones del mes actual
            const transactionsThisMonth = await db.select().from(WalletTransaction)
                .where(
                    and(
                        gte(WalletTransaction.createdAt, startOfMonth),
                        lt(WalletTransaction.createdAt, new Date(now.getFullYear(), now.getMonth() + 1, 1))
                    )
                )
                .all();

            // Obtener las transacciones del mes pasado
            const transactionsLastMonth = await db.select().from(WalletTransaction)
                .where(
                    and(
                        gte(WalletTransaction.createdAt, startOfLastMonth),
                        lt(WalletTransaction.createdAt, startOfMonth)
                    )
                )
                .all();

            // Calcular el total para el mes actual
            let totalThisMonth = 0;
            transactionsThisMonth.forEach((transaction: { amount: number }) => {
                totalThisMonth += transaction.amount;
            });

            // Calcular el total para el mes pasado
            let totalLastMonth = 0;
            transactionsLastMonth.forEach((transaction: { amount: number }) => {
                totalLastMonth += transaction.amount;
            });

            // Manejar el caso en que totalLastMonth sea cero
            if (totalLastMonth === 0) {
                return totalThisMonth === 0 ? 0 : 100; // Si no hay transacciones en ninguno de los meses, el cambio es 0%
            }

            // Calcular el cambio porcentual
            const percentageChange = ((totalThisMonth - totalLastMonth) / totalLastMonth) * 100;
            return percentageChange;
        } catch (error) {
            console.log(error);
            return 'Error';
        }
    },
    async getChartUsers() {
        try {
            const users = await db.select().from(User).all();

            // Obtener la fecha más antigua
            const earliestDate = new Date(Math.min(...users.map(u => new Date(u.createdAt).getTime())));

            // Obtener el total de usuarios
            const totalUsers = users.length;

            return users.map((user) => {
                const date = user.createdAt.toISOString().split("T")[0];
                const total = users.filter(u => u.createdAt.toISOString().split("T")[0] === date).length;
                const newUsersPercentage = (total / totalUsers) * 100;

                return {
                    date,
                    total,
                    newUsersPercentage
                };
            });
        } catch (error) {
            console.error("Error fetching users:", error);
            return [];
        }
    }
}
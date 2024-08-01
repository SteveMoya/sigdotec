import { defineDb, defineTable, column } from "astro:db";

// https://astro.build/db/config

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    username: column.text({ unique: true, optional: false }),
    createdAt: column.date({ optional: false, default: new Date() }),
    userimage: column.text({
      optional: true
    }),
    email: column.text({ optional: true, unique: false }),
    emailVerificated: column.boolean({ optional: true, default: false }),
    hashedPassword: column.text({ optional: true }),
    role: column.text({ optional: false, default: "user" }),
    provider: column.text({ optional: false, default: "email" }),
    providerID: column.text({ optional: true, unique: true }),
    balance: column.number({ optional: false, default: 0 }),
  },
});

const Demography = defineTable({
  columns: {
    id: column.text({ optional: false, unique: true, primaryKey: true}),
    userId: column.text({ optional: false, references: () => User.columns.id }),
    birthdate: column.date({ optional: false }),
    gender: column.text({
      optional: false,
    }),
    province: column.text({ optional: false}),
    workingPlace: column.text({optional: false}),
    subject: column.text({optional: false}),
  }
})

const Session = defineTable({
  columns: {
    id: column.text({ optional: false, unique: true }),
    userId: column.text({ optional: false, references: () => User.columns.id }),
    createdAt: column.date({ optional: false, default: new Date() }),
    expiresAt: column.number({ optional: false }),
    //     device: column.text({ optional: false,})
  },
});

const WalletTransaction = defineTable({
  columns: {
    id: column.text({ optional: false, unique: true }),
    transactionid: column.text({ optional: false}),
    userId: column.text({ optional: false, references: () => User.columns.id }),
    amount: column.number({ optional: false }),
    createdAt: column.date({ optional: false, default: new Date()}),
    type: column.text({ optional: false }),
  },
})

export default defineDb({
  tables: {
    User,
    Session,
    Demography,
    WalletTransaction,
  },
});
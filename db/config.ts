import { defineDb, defineTable, column } from "astro:db";

// https://astro.build/db/config

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    username: column.text({ unique: true, optional: false }),
    userimage: column.text({
      unique: true, optional: true
    })
    email: column.text({ optional: true, unique: true }),
    emailVerificated: column.boolean({ optional: true, default: false}),
    hashedPassword: column.text({ optional: false }),
    role: column.text({ optional: false, default: "user" }),
    provider: column.text({ optional: false, default: "email" }),
    providerID: column.text({ optional: true, unique: true })
  },
});

const Session = defineTable({
  columns: {
    id: column.text({ optional: false, unique: true, primaryKey: true}),
    userId: column.text({ optional: false, references: () => User.columns.id }),
    expiresAt: column.number({ optional: false,}),
    device: column.text({ optional: false,})
  },
});

const Wallet = defineTable({
  columns: {
    id: column.text({ optional: false, unique: true, primaryKey: true}),
    userId: column.text({ optional: false, references: () => User.columns.id }),
    balance: column.number({ optional: false, default: 0}),
  },
});

export default defineDb({
  tables: {
    User,
    Session,
    Wallet,
  },
});
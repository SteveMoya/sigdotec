import { defineDb, defineTable, column } from "astro:db";

// https://astro.build/db/config

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    username: column.text({ unique: true, optional: false }),
    userimage: column.text({
      unique: true, optional: true
    }),
    email: column.text({ optional: true, unique: false }),
    emailVerificated: column.boolean({ optional: true, default: false }),
    hashedPassword: column.text({ optional: true }),
    role: column.text({ optional: false, default: "user" }),
    provider: column.text({ optional: false, default: "email" }),
    providerID: column.text({ optional: true, unique: true }),
    github_id: column.text({ optional: true, unique: true }),
    balance: column.number({ optional: false, default: 0 }),
  },
});
// const Demographic = defineTable({
//   columns: {
//     id: column.text({ optional: false, unique: true, primaryKey: true}),
//     userId: column.text({ optional: false, references: () => User.columns.id }),
//     age: column.number({ optional: false }),
//     gender: column.text({
//       optional: false,
//     }),
//     province: column.text({ optional: false}),
//     country: column.text({ optional: false}),
//     workingPlace: column.text({optional: false}),
//     subject: column.text({optional: false}),
//   }
// })

const Session = defineTable({
  columns: {
    id: column.text({ optional: false, unique: true }),
    userId: column.text({ optional: false, references: () => User.columns.id }),
    expiresAt: column.number({ optional: false }),
    //     device: column.text({ optional: false,})
  },
});

export default defineDb({
  tables: {
    User,
    Session,
  },
});
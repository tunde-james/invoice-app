import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  date,
  pgEnum,
  varchar,
  numeric,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const billFrom = pgTable("billFrom", {
  id: text("id").notNull().primaryKey(),
  city: varchar("city").notNull(),
  postCode: varchar("postCode").notNull(),
  country: varchar("country").notNull(),
});

export const paymentTermsEnum = pgEnum("paymentTerms", [
  "Net 1 Day",
  "Net 7 Day",
  "Net 14 Day",
  "Net 20 Day",
]);

export const billTo = pgTable("billTo", {
  id: text("id").notNull().primaryKey(),
  clientName: varchar("clientName").notNull(),
  clientEmail: varchar("clientEmail").notNull(),
  streetAddress: varchar("streetAddress").notNull(),
  city: varchar("city").notNull(),
  postCode: varchar("postCode").notNull(),
  country: varchar("country").notNull(),
  invoiceDate: date("invoice").notNull(),
  paymentTerms: paymentTermsEnum("paymentTerms").notNull(),
  projectDescription: text("projectDescription").notNull(),
});

export const itemList = pgTable("itemList", {
  id: text("id").notNull().primaryKey(),
  itemName: varchar("itemName").notNull(),
  quantity: integer("quantity").notNull(),
  price: numeric("price").notNull(),
  total: numeric("total").notNull(),
});

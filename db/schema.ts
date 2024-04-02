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

export const paymentTermsEnum = pgEnum("paymentTerms", [
  "Net 1 Day",
  "Net 7 Day",
  "Net 14 Day",
  "Net 20 Day",
]);

export const invoice = pgTable("invoice", {
  id: text("id").notNull().primaryKey(),
  billFromCity: varchar("bill_from_city").notNull(),
  billFromPostCode: varchar("bill_from_post_code").notNull(),
  billFromCountry: varchar("bill_from_country").notNull(),
  clientName: varchar("client_name").notNull(),
  clientEmail: varchar("client_email").notNull(),
  clientStreetAddress: varchar("client_street_address").notNull(),
  clientCity: varchar("client_city").notNull(),
  clientPostCode: varchar("client_post_code").notNull(),
  clientCountry: varchar("client_country").notNull(),
  invoiceDate: date("invoice_date").notNull(),
  paymentTerms: paymentTermsEnum("payment_terms").notNull(),
  projectDescription: text("project_description").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const itemList = pgTable("item_list", {
  id: text("id").notNull().primaryKey(),
  itemName: varchar("item_name").notNull(),
  itemQuantity: integer("item_quantity").notNull(),
  itemPrice: numeric("item_price").notNull(),
  itemTotal: numeric("item_total").notNull(),
  ItemInvoice: text("item_invoice")
    .notNull()
    .references(() => invoice.id),
});

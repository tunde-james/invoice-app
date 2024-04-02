import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { invoice } from "@/db/schema";

const schema = z.object({
  billFromCity: z.string({ required_error: "Bill from city is required" }),
  billFromPostCode: z
    .string({ required_error: "Bill from post code is required" })
    .min(5)
    .max(20),
  billFromCountry: z.string({
    required_error: "Bill from counrty is required",
  }),
  clientName: z
    .string({ required_error: "Client name is required" })
    .min(3, { message: "Client name cannot be less than 3 characters" }),
  clientEmail: z
    .string({ required_error: "Client email is required" })
    .email("Invalid email address")
    .trim(),
  clientStreetAddress: z
    .string({ required_error: "Client address is required" })
    .min(10, { message: "Client address cannot be less than 10 characers" }),
  clientCity: z.string({ required_error: "Client city is required" }),
  clientPostCode: z
    .string({ required_error: "Client post code is required" })
    .min(3, { message: "Post code cannot be less than 3 characters" }),
  clientCountry: z.string({ required_error: "Client country is required" }),
  invoiceDate: z.coerce.date({ required_error: "Date is required" }),
  description: z.string().min(10).max(255),
  itemList: z.array(
    z.object({
      itemName: z.string({ required_error: "Field is required" }),
      itemQuantity: z.coerce
        .number({
          required_error: "Field is required",
          invalid_type_error: "Field must be a number",
        })
        .int()
        .positive()
        .min(1, { message: "Field should be at least 1" }),
      itemPrice: z.coerce
        .number({
          required_error: "Field is required",
          invalid_type_error: "Field must be a number",
        })
        .int()
        .positive()
        .min(1, { message: "Field should be at least 1" }),
      itemTotal: z.coerce
        .number({
          required_error: "Field is required",
          invalid_type_error: "Field must be a number",
        })
        .int()
        .positive()
        .min(1, { message: "Field should be at least 1" }),
    }),
  ),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

//    
}

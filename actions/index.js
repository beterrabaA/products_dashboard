"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const revalidate = async () => {
  revalidatePath("/dashboard");
};

export const setCookie = async (token, email) => {
  cookies().set("token", token);
};

export const removeCookie = async () => {
  cookies().delete("token");
};

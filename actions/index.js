"use server";

import { revalidatePath } from "next/cache";

export const revalidate = async () => {
  revalidatePath("/dashboard");
};

import { createServerFn } from "@tanstack/react-start";

export const recordForgiveness = createServerFn({ method: "POST" }).handler(
  async () => {
    // Log the forgiveness event - can be wired to a webhook later
    console.log(
      `[💙] Apsara clicked forgive at ${new Date().toISOString()}`
    );
    return { success: true, message: "Forgiveness recorded 💙" };
  }
);

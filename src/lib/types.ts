import { z } from "zod";

export const EditUserProfileSchema = z.object({
  email: z.string().email("Required"),
  name: z.string().min(1, "Required"),
});

// ✅ Add this type to match constant.ts
export type Connection = {
  title: string;
  description: string;
  image: string;
  connectionKey: string;
  accessTokenKey?: string;
  alwaysTrue?: boolean;
  slackSpecial?: boolean;
};

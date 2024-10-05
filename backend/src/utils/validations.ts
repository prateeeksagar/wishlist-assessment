import { z } from 'zod';

// Define Zod schema for signup and login
export const signupSchema = z.object({
    username: z.string()
      .min(5, { message: "Username must be at least 5 characters long." })
      .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/, {
        message: "Username must contain both letters and numbers."
      }),
    password: z.string()
      .min(6, { message: "Password must be at least 6 characters long." })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      })
  });
  
  export const loginSchema = z.object({
    username: z.string()
      .min(5, { message: "Username must be at least 5 characters long." })
      .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/, {
        message: "Username must contain both letters and numbers."
      }),
    password: z.string()
      .min(6, { message: "Password must be at least 6 characters long." })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      })
  });
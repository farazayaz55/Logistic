import UserModel from '@/Models/UserModel';
import { z } from 'zod';
import { publicProcedure, createTRPCRouter } from '../trpc';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
export const firstRouter=createTRPCRouter({
      Signup:  publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          password: z.string()
          .min(8, { message: 'Password must be at least 8 characters long' })
          .regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$@#&])[A-Za-z\d!%^*($@#&)]{8,}/, {
            message:
              'Password must contain at least 1 number, 1 uppercase letter, and 1 lowercase letter'
          }),
          name:z.string()
        }),
      )
      .mutation(async({ input }) => {
        //perform signup
        const user=await UserModel.findOne({email:input.email})
        if(user)
        {
          return {
            "id": null,
            "error": {
              "message": "User already exist",
              "code": -32600,
              "data": {
                "code": "BAD_REQUEST",
                "httpStatus": httpStatus.CONFLICT,
                "stack": "...",
                "path": "auth.SignUp"
              }
            }
          }
        }
        else{
          const saltRounds = 10; // number of salt rounds to use for the hash

          const hashedPassword = await bcrypt.hash(input.password, saltRounds);
          const user = new UserModel({
            name:input.name,
            password:hashedPassword,
            email:input.email
          })
          await user.save()
          return {
            msg:"USER CREATED"
          }
        }
      }),
  });
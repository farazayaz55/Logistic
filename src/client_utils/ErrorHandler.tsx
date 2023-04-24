import { TRPCClientError } from "@trpc/client";

interface zodErrorType {
    [x: string]: string[] | undefined;
    [x: number]: string[] | undefined;
    [x: symbol]: string[] | undefined;
} 

export const ErrorHandler=(error:any )=>{
    const zodErrors:zodErrorType = error.data?.zodError?.fieldErrors;
    if(zodErrors)
    {
    const fieldErrors = Object.entries(zodErrors).map(([field, errors = []]) => ({
        field,
        messages: errors.map((error) => error),
      }));
      fieldErrors.map((object)=>{
        object.messages.map((message)=>alert(message))
      })
    }
    else{
        alert(error.message)
    }
}
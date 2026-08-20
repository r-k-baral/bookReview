import { title } from "process"
import z from "zod"

// register data check
export const UserSchemaZod = z.object({
    username: z.string()
    .trim()
    .min(3, {message:"username must have three"})
    .max(100,{message:"name not more then 100"}),
    
    email: z
    .string()
    .trim()
    .email({message:"enter a valid email "})
    .max(100,{message:"not more ten 100"}),

    password: z
    .string()
    .min(6,{message:"password should be 6 digits "})
    .max(12, {message:" password not more then 12 digits"}),

    role: z
    .string()
    .trim()
    .min(5,{message:' wrong role '})
    .max(8,{message:'wrong role '})

})  
// login check 
export const loginSchemaZod = z.object({
    email: z
    .string()
    .trim()
    .email()
    .max(100,{message:"use a real email"}),

    password: z
    .string()
    .min(6,{message:'password should be  6 digits'})
    .max(13,{message:'password not more then 13'})
})

// check add book  
     

export const AddBookSchema = z.object({
    isbn: z
    .string()
    .trim()
    .min(3,{message:"isbn can not be less then 3"})
    .max(30,{message:"enter a valid isbn "}),
     
    title: z
    .string()
    .trim()
    .min(1,{message:'you have enter any title '})
    .max(100,{message:'the titles cannot be that long'}),
    
    author: z
    .string()
    .trim()
    .min(3,{message:'author name can not be less then 3'})
    .max(100,{message:'can not reach to 100'}),

    description: z
    .string()
    .trim()
    .min(2,{message:' should have more description'})
    .max(100,{message:" not more then 100"})
})

export const isbnSchema = z.object({
    isbn: z
    .string()
    .trim()
    .min(3,{message:"isbn can not be less then 3"})
    .max(30,{message:"enter a valid isbn "})
})

export const  titleSchema = z.object({
     title: z
    .string()
    .trim()
    .min(3,{message:"isbn can not be less then 3"})
    .max(30,{message:"enter a valid title "})
}) 
export const authorSchema = z.object({
     
    author: z
    .string()
    .trim()
    .min(3,{message:'author name can not be less then 3'})
    .max(100,{message:' less then 100'}),
})
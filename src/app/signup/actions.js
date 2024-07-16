'use server'

import { SignupFormSchema } from '@/lib/definitions'
import bcrypt from 'bcrypt'
import { createSession } from '@/lib/session'
import prisma from '@/lib/prisma'

export async function signup(state, formData) {
  //validate
  const validationResult = SignupFormSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    }
  }

  const {firstName, lastName, email, password} = validationResult.data

  // create user
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.User.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword
    }
  })
  console.log(user);

  //create session
  await createSession(user.id)
}
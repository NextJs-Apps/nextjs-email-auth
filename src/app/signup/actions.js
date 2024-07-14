'use server'

import { SignupFormSchema } from '@/lib/definitions'
import bcrypt from bcrypt
import { createSession } from '@/lib/session'

export async function signup(state, formData) {
  //validate
  console.log(formData.get('firstName'));
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

  const data = await db
    .insert(users)
    .values({firstName, lastName, email, password: hashedPassword})
    returning({id: users.id})

  const user = data[0]

  //create session
  await createSession(user.id)
}
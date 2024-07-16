'use server'

import bcrypt from 'bcrypt'
import prisma from '@/lib/prisma'
import { createSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export async function login(state, formData) {

  //validate
  const email = formData.get('email')
  const password = formData.get('password')
  if (!email) {
    return {
      errors: { email: ['Empty email field'] },
    }
  }
  if (!password) {
    return {
      errors: { password: ['Empty password field'] },
    }
  }

  // get email user
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      email: true,
      id: true,
      password: true,
    },
  })
  // User not found
  if (!user) {
    return {
      errors: { email: 'Invalid email id' },
    }
  }
  const isPasswordValid = await bcrypt.compare(password, user.password)
  // Verify user
  if (!isPasswordValid) {
    // Incorrect password
    return {
      errors: {password: 'Incorrect password' },
    }
  }
  //create session
  await createSession(user.id)
}

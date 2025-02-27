'use server'

import { verifySession } from '@/lib/session'
// import { taintUniqueValue } from 'next/dist/server/app-render/rsc/taint'
import prisma from '@/lib/prisma'
import { cache } from 'react'
import { redirect } from 'next/navigation'

export const getUser = cache(async () => {
  // Verify user's session
  const {userId} = await verifySession()

  if(!userId) {
    redirect('/login')
  }

  // Fetch user data
  const user = await prisma.User.findUnique({
    where: {
      id: userId,
    },
  })

  // console.log(user)

  // return user
  // filter user data
  const filteredUser = userDTO(user)
  return filteredUser
})

function userDTO(user) {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    // session: user.session,
    // auditTrail: canViewAudit(user.auditTrail, user.role)
  }
}

// function canViewAudit(auditTrail, role) {
//   return role === 'admin' ? auditTrail : null
// }

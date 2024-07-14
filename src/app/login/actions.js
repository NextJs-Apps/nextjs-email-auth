import { verifySession } from '@/lib/session'
import { taintUniqueValue } from 'next/dist/server/app-render/rsc/taint'
//import {db}
// import {users} from '/schema
import { cache } from 'react'

export const getUser = cache(async () => {
  // Verify user's session
  const session = await verifySession()

  // Fetch user data
  const data = await db.query.users.findMany({
    where: eq(users.id, session.userId),
    // columns: {firstName: true, lastName: true, email: true}
  })
  const user = data[0]

  return user
  // filter user data
  // const filteredUser = userDTO(user)
  // return filteredUser
})

function userDTO(user) {
  taintUniqueValue(
    'Do not pass a user session token to the client.',
    user,
    user.session.token
  )
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    session: user.session,
    auditTrail: canViewAudit(user.auditTrail, user.role)
  }
}

function canViewAudit(auditTrail, role) {
  return role === 'admin' ? auditTrail : null
}
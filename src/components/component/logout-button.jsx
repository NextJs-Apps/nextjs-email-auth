'use client'

import { Button } from '@/components/ui/button'
import { logout } from '@/app/logout/actions'
import { useFormStatus } from 'react-dom'

export function LogoutButton() {
  return (
    <form action={logout}>
      <Button size='sm' className='flex items-center gap-2'>
        Logout
      </Button>
    </form>
  )
}

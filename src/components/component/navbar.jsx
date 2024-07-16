import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LogoutButton } from './logout-button'
import { verifySession } from '@/lib/session'


export default async function Navbar() {
  const session = await verifySession()
  

}
function DefaultNavbar() {}
function LoggenInNavbar() {
  return (
    <header className='flex items-center justify-between px-20 py-3 bg-background border-b'>
      <div className='flex items-center justify-center gap-2 text-sm font-medium text-foreground'>
        <Button size='sm' className='flex items-center gap-2'>
          <Link
            href='/'
            className='inline-flex items-center gap-2'
            prefetch={false}
          >
            Home
          </Link>
        </Button>
        <Button size='sm' className='flex items-center gap-2'>
          <Link
            href='/profile'
            className='inline-flex items-center gap-2'
            prefetch={false}
          >
            Profile
          </Link>
        </Button>
        <LogoutButton />
        
      </div>
      <div className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
          <UserIcon className='w-5 h-5' />
          John Doe
        </div>
    </header>
  )
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
      <circle cx='12' cy='7' r='4' />
    </svg>
  )
}

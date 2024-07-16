'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { signup } from './actions'
import { useFormState, useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type='submit' className='w-full' aria-disabled={pending}>
      {pending ? 'Loading...' : 'Log In'}
    </Button>
  )
}
export function SignUpForm() {
  const [state, action] = useFormState(signup)
  // console.log(state);
  return (
    <form className='mx-auto max-w-sm space-y-6' action={action}>
      <div className='space-y-2 text-center'>
        <h1 className='text-3xl font-bold'>Sign Up</h1>
        <p className='text-muted-foreground'>
          Create your account to get started.
        </p>
      </div>
      <div className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='firstName'>First Name</Label>
            <Input id='firstName' name='firstName' placeholder='John' />
            {state?.errors?.firstName && (
              <p className='destructive text-xs'>{state.errors.firstName}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='lastName' className='blue'>
              Last Name
            </Label>
            <Input id='lastName' name='lastName' placeholder='Doe' />
            {state?.errors?.lastName && (
              <p className='destructive text-xs'>{state.errors.lastName}</p>
            )}
          </div>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='example@email.com'
          />
          {state?.errors?.email && (
            <p className='destructive text-xs'>{state.errors.email}</p>
          )}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='password'>Password</Label>
          <Input id='password' name='password' type='password' />
          {state?.errors?.password && (
            <p className='destructive text-xs'>{state.errors.password}</p>
          )}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='confirmPassword'>Confirm Password</Label>
          <Input id='confirmPassword' name='confirmPassword' type='password' />
          {state?.errors?.confirmPassword && (
            <p className='destructive text-xs'>
              {state.errors.confirmPassword}
            </p>
          )}
        </div>
        <SubmitButton />
      </div>
    </form>
  )
}

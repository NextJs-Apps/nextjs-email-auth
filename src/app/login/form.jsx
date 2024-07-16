'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

import { login } from './actions'
import { useFormState, useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type='submit' className='w-full' aria-disabled={pending}>
      {pending ? 'Loading...' : 'Log In'}
    </Button>
  )
}

export function LoginForm() {
  const [state, action] = useFormState(login)
  return (
    <div className='flex min-h-[100dvh]  justify-center bg-background px-4 py-5 sm:px-6 lg:px-8'>
      <form className='w-full max-w-md' action={action}>
        <Card>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl font-bold'>
              Sign in to your account
            </CardTitle>
            <CardDescription>
              Enter your email and password below to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                name='email'
                placeholder='m@example.com'
              />
              {state?.errors?.email && (
                <p className='destructive text-xs'>{state.errors.email}</p>
              )}
            </div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='password'>Password</Label>
                <Link href='#' className='text-sm underline' prefetch={false}>
                  Forgot password?
                </Link>
              </div>
              <Input
                id='password'
                name='password'
                placeholder='********'
                type='password'
              />
              {state?.errors?.password && (
                <p className='destructive text-xs'>{state.errors.password}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"


export function LoginForm () {
  return(
<div
      className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <form className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign in to your account</CardTitle>
            <CardDescription>Enter your email and password below to access your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-sm underline" prefetch={false}>
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

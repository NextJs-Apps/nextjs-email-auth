import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getUser } from '@/data/user'
import { format } from "date-fns"

export async function UserProfile() {
  const {firstName, lastName, email, createdAt, updatedAt} = await getUser()
  return (
    (<Card className="w-full max-w-lg mx-auto mt-5">
      <CardHeader className="bg-primary p-6 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div className="grid gap-1">
            <h2 className="text-2xl font-bold">{firstName} {lastName}</h2>
            <p className="text-sm">{email}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 grid gap-5">
        <div className="grid gap-2">
          <h3 className="text-lg font-semibold">Account Details</h3>
          <div className="grid grid-cols-2 gap-4 text-muted-foreground">
            <div>
              <span className="font-medium">Created at:</span>
              <p>{format(createdAt, "MMMM dd, yyyy 'at' h:m a")}</p>
            </div>
            <div>
              <span className="font-medium">Updated at:</span>
              <p>{format(updatedAt, "MMMM dd, yyyy 'at' h:m a")}</p>
            </div>
          </div>
        </div>
        <Separator />
        <div className="grid gap-2">
          <h3 className="text-lg font-semibold">Personal Details</h3>
          <div className="grid grid-cols-2 gap-4 text-muted-foreground">
            <div>
              <span className="font-medium">First Name:</span>
              <p>{firstName}</p>
            </div>
            <div>
              <span className="font-medium">Last Name:</span>
              <p>{lastName}</p>
            </div>
            <div>
              <span className="font-medium">Email:</span>
              <p>{email}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>)
  );
}

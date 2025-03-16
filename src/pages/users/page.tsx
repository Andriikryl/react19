// import { use, useState } from "react"

import { Suspense, use, useState, useTransition } from "react";
import { createUser, fetchUsers } from "../../shared/api";

type User = {
  id: string;
  email: string;
};

const deafaulUsersPromise = fetchUsers()

export function UsersPage() {
  const [usersPromise, setUsersPromise] = useState(deafaulUsersPromise)
  const refetchUsers = () => {
    setUsersPromise(fetchUsers())
  }
  return (
    <section className="">
      <div>
        <h1 className="">Users page</h1>
        <hr />
      </div>
      <div className="flex flex-col">
        <CreateUserForm refetchUsers={refetchUsers} />
        <hr />
        <div>
          <Suspense fallback={<div>Loading....</div>}>
          <UserList
          refetchUsers={refetchUsers}
          usersPromise={usersPromise}
          />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export function CreateUserForm({refetchUsers} : {refetchUsers: () => void}) {
  const [email, setEmail] = useState("")
  const [isPending, startTransition] = useTransition()

  const hendeleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await createUser({
         email,
         id: crypto.randomUUID()
       })
       startTransition(() => {
         refetchUsers()
         setEmail("")
       })
    })
  }

  return (
    <form action="" onSubmit={hendeleSubmit}>
      <input type="email" 
        value={email} 
        disabled={isPending}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button disabled={isPending} className="disabled:bg-gray-400">submit</button>
    </form>
  );
}

export function UserList({ usersPromise, refetchUsers }: { usersPromise: Promise<User[]>, refetchUsers: () => void  }) {
  const users = use(usersPromise)
  return (
    <ul>
      {users.map((user) => {
        return <UserCard user={user} key={user.id} refetchUsers={refetchUsers} />;
      })}
    </ul>
  );
}

export function UserCard({ user }: { user: User, refetchUsers: () => void }) {
  return (
    <li>
      <span>{user.email}</span>
      <button type="button">delete</button>
    </li>
  );
}

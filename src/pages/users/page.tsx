// import { use, useState } from "react"

import { Suspense, use, useState } from "react";
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
    <section>
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

  const hendeleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   await createUser({
      email,
      id: crypto.randomUUID()
    })
    refetchUsers()
    setEmail("")
  }

  return (
    <form action="" onSubmit={hendeleSubmit}>
      <input type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
      />
      <button>submit</button>
    </form>
  );
}

export function UserList({ usersPromise }: { usersPromise: Promise<User[]> }) {
  const users = use(usersPromise)
  return (
    <ul>
      {users.map((user) => {
        return <UserCard user={user} key={user.id} />;
      })}
    </ul>
  );
}

export function UserCard({ user }: { user: User }) {
  return (
    <li>
      <span>{user.email}</span>
      <button type="button">delete</button>
    </li>
  );
}

import { useState } from "react"

type User = {
  id: string,
  email: string,
}

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [email, setEmail] = useState("")

  const heandelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setUsers([...users, {id: crypto.randomUUID(), email}]);
    setEmail("")
  }


  return (
    <section>
      <div>
        <h1 className="">Users page</h1>
        <hr />
      </div>
      <div className="flex flex-col">
        <form onSubmit={heandelSubmit} action="">
          <input type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          />
          <button>submit</button>
        </form>
        <hr />
      </div>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>{user.email}</li>
          )
        })}
      </ul>
    </section>
  )
}

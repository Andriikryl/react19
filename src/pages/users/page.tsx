// import { use, useState } from "react"

type User = {
  id: string;
  email: string;
};

export function UsersPage() {
  return (
    <section>
      <div>
        <h1 className="">Users page</h1>
        <hr />
      </div>
      <div className="flex flex-col">
        <CreateUserForm />
        <hr />
        <div>
          <UserList
            users={[
              {
                id: "1",
                email: "1@example.com",
              },
              {
                id: "2",
                email: "2@example.com",
              },
              {
                id: "3",
                email: "3@example.com",
              },
              {
                id: "4",
                email: "4@example.com",
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

export function CreateUserForm() {
  return (
    <form action="">
      <input type="email" />
      <button>submit</button>
    </form>
  );
}

export function UserList({ users }: { users: User[] }) {
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

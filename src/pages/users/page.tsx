// import { use, useState } from "react"
import { startTransition, Suspense, use, useActionState, useState, useTransition } from "react";
import { createUser, deleteUser, fetchUsers } from "../../shared/api";
import {ErrorBoundary} from "react-error-boundary"
import { createUserAction } from "./actions";

type User = {
  id: string;
  email: string;
};

const deafaulUsersPromise = fetchUsers();

export function UsersPage() {
  const [usersPromise, setUsersPromise] = useState(deafaulUsersPromise);
  const refetchUsers = () =>
    startTransition(() => setUsersPromise(fetchUsers()));
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
          <ErrorBoundary fallback={<div>Somthing vent vrong</div>}>
            <Suspense fallback={<div>Loading....</div>}>
              <UserList
                refetchUsers={refetchUsers}
                usersPromise={usersPromise}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </section>
  );
}

export function CreateUserForm({ refetchUsers }: { refetchUsers: () => void }) {
  const [email, setEmail] = useState("");

  const [state, dispatch, isPending] = useActionState(createUserAction({refetchUsers, setEmail}),{})

  const hendeleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      dispatch({email})
    });
  };

  return (
    <form action="" onSubmit={hendeleSubmit}>
      <input
        type="email"
        value={email}
        disabled={isPending}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button disabled={isPending} className="disabled:bg-gray-400">
        submit
      </button>
      {state.error && <div>{state.error}</div>}
    </form>
  );
}

export function UserList({
  usersPromise,
  refetchUsers,
}: {
  usersPromise: Promise<User[]>;
  refetchUsers: () => void;
}) {
  const users = use(usersPromise);
  return (
    <ul>
      {users.map((user) => {
        return (
          <UserCard user={user} key={user.id} refetchUsers={refetchUsers} />
        );
      })}
    </ul>
  );
}

export function UserCard({
  user,
  refetchUsers,
}: {
  user: User;
  refetchUsers: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  const hendeleDelete = async () => {
    startTransition(async () => {
      await deleteUser(user.id);
      refetchUsers();
    });
  };
  return (
    <li>
      <span>{user.email}</span>
      <button onClick={hendeleDelete} type="button" disabled={isPending}>
        delete
      </button>
    </li>
  );
}

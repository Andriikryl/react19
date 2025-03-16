
export type User = {
    id: string;
    email: string;
  };

export function fetchUsers(){
    return fetch("http://localhost:3001/users").then((res) => res.json() as Promise<User[]>)
}

export function CreateUserForm(user: User){
    return fetch("http://localhost:3001/users",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    }).then((res) => res.json())
}

export function DeleteUserForm(user: User){
    return fetch("http://localhost:3001/users",{
        method: "DELETE",
    }).then((res) => res.json()));
}
import { createUser } from "../../shared/api";

type CrateActionState = {
    // defaultEmail: string
    error?: string
};

export const createUserAction = ({
    refetchUsers,
    setEmail
}:{
    refetchUsers: () => void,
    setEmail: (email: string) => void
}) => async(
    prevState: CrateActionState,
    formData: {email: string}
): Promise<CrateActionState> => {
    try{
        await createUser({
            email: formData.email,
            id: crypto.randomUUID(),
          });
    
          refetchUsers();
          setEmail("");
          return {
            // defaultEmail: '',
          }
    }catch{
        return {
            // defaultEmail: formData.email,
            error: "Error creating user"
        }
    }
 
}
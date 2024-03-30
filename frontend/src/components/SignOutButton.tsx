import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-clients"
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
    const {showToast} = useAppContext();
    const queryClient = useQueryClient();
    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async()=>{
            await queryClient.invalidateQueries("validateToken");
            // show toast
            showToast({message: "Signed out!", type:"Success"});
        },
        onError: (error: Error)=>{
            // show toast
            showToast({message: error.message, type:"Error"});
        }
    })

    const handleClick = ()=>{
        mutation.mutate();
    }

    return (
        <button
            className="flex bg-white items-center text-green-600 px-3 font-bold rounded-md hover:bg-gray-100 hover:text-green-900"
            onClick={handleClick}>
            Sign Out
        </button>
    )
}

export default SignOutButton;
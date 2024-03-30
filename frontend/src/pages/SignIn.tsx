import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-clients";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
    email: string;
    password: string;
}

const SignIn = () => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm<SignInFormData>();

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            // 1. show the toast
            showToast({ message: "Sign in Successful!", type: "Success" });
            await queryClient.invalidateQueries("validateToken")
            // 2. navigate to the home page
            navigate("/");
        }, onError: (error: Error) => {
            //show the toast
            showToast({ message: error.message, type: "Error" });
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    })

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Sign In</h2>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input type="email"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("email", { required: "This field is required" })}
                />
                {errors.email && (
                    <span className="text-red-500">{`${errors.email.message}`}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input type="password"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("password", {
                        required: "This field is required",
                        minLength: { value: 6, message: "Password must be atleast 8 characters" }
                    })}
                />
                {errors.password && (
                    <span className="text-red-500">{`${errors.password.message}`}</span>
                )}
            </label>
            <span className="flex items-center justify-between">
                <span className="text-sm">
                    Not Registered? {" "}
                    <Link to="/register" className="underline">
                        Create an account here
                    </Link>
                </span>
                <button type="submit" className="bg-bgColor text-white p-2 font-bold rounded-md hover:bg-green-950">
                    Login
                </button>
            </span>
        </form>
    )
}

export default SignIn;
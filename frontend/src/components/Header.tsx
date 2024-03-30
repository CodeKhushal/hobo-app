import { Link } from "react-router-dom"
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
    const { isLoggedIn } = useAppContext();
    return (
        <div className="bg-bgColor bg-opacity-x py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white front-bold tracking-tight">
                    <Link to="/">HOBO</Link>
                </span>
                <span className="flex space-x-2">
                    {isLoggedIn ? <>
                        <Link to="/my-bookings" className="flex items-center text-white px-3 font-bold hover:text-green-950">My Bookings</Link>
                        <Link to="/my-hotels" className="flex items-center text-white px-3 font-bold hover:text-green-950">My Hotels</Link>
                        <SignOutButton/>
                    </>
                        :
                        (<Link
                            to="/sign-in"
                            className="flex bg-white items-center text-green-600 px-3 font-bold rounded-md hover:bg-gray-100 hover:text-green-900"
                        >
                            Sign In
                        </Link>)
                    }
                </span>
            </div>
        </div >
    )
}

export default Header;
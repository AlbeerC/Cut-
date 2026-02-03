import Login from "./pages/Login"
import UserProfile from "./pages/UserProfile"

export default [
    {
        path: "login",
        index: true,
        element: <Login />
    },
    {
        path: "profile/:username",
        element: <UserProfile />
    }
]
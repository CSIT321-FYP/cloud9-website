import { Outlet } from "react-router"

const AuthLayout = () => {
    return (
        <div>
            <div>Auth</div>
            <Outlet></Outlet>
        </div>
    )
}

export default AuthLayout

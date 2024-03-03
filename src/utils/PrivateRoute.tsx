import Cookies from 'js-cookie'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const PrivateRoute = () => {
    const location = useLocation()
    const auth = Cookies.get('authToken')

    if (!auth) {
        return <Navigate to="/" state={{ from: location.pathname }} />
    }
    return <Outlet />
}

export default PrivateRoute

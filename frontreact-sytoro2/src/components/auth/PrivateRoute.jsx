
import { Navigate } from 'react-router-dom'
import useStoreContext from '../../context/StoreProvider'

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {

    const {state} = useStoreContext()
    const {userInfo} = state

  return (
    userInfo?.name ? children : <Navigate to={'/'} replace/>
  )
}

export default PrivateRoute
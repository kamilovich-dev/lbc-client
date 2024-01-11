import { SessionStore } from 'entities/session'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { SessionStoreContext } from 'entities/session';

const useCheckSession = () => {
    // const sessionStore = useContext(SessionStoreContext)
    // const navigate = useNavigate();

    // useEffect( () => {
    //     sessionStore?.session.isAuth ? navigate('/modules') : navigate('/main')
    // }, [])
}

export const withAuth = (component: JSX.Element) => {
    const sessionStore = new SessionStore()
    useCheckSession()

    return(
        <SessionStoreContext.Provider value={sessionStore}>
            {component}
        </SessionStoreContext.Provider>
    )
}
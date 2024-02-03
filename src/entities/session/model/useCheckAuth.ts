import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { SessionStoreContext } from 'entities/session';
import { routePaths } from 'shared/config';

export const useCheckAuth = () => {
    const navigate = useNavigate()
    const sessionStore = useContext(SessionStoreContext)
    if (!sessionStore) return

    useEffect(() => {
        if (sessionStore.session.isAuth === false) navigate(routePaths.LOGIN)
    }, [sessionStore.session.isAuth])

    return sessionStore.session.isAuth
}
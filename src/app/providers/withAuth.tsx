import { SessionStore } from 'entities/session'
import { SessionStoreContext } from 'entities/session';

export const withAuth = (component: JSX.Element) => {
    const sessionStore = new SessionStore()

    return(
        <SessionStoreContext.Provider value={sessionStore}>
            {component}
        </SessionStoreContext.Provider>
    )
}
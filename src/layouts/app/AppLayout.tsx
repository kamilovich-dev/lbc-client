import { Outlet } from "react-router-dom";
import { SessionStoreContext } from "entities/session";
import { SessionStore } from "entities/session";

const AppLayout = () => {
    const sessionStore: any = new SessionStore();

    return (
        <SessionStoreContext.Provider value={sessionStore}>
                <Outlet/>
        </SessionStoreContext.Provider>
    )
}

export { AppLayout }
import { Outlet } from "react-router-dom";
import { ModuleStoreContext } from "entities/module";
import { SessionStoreContext } from "entities/session";
import { ModuleStore } from "entities/module";
import { SessionStore } from "entities/session";

const AppLayout = () => {
    const moduleStore: any = new ModuleStore();
    const sessionStore: any = new SessionStore();

    return (
        <ModuleStoreContext.Provider value={moduleStore}>
            <SessionStoreContext.Provider value={sessionStore}>
                    <Outlet/>
            </SessionStoreContext.Provider>
        </ModuleStoreContext.Provider>
    )
}

export { AppLayout }
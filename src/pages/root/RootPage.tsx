import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppHeader } from 'widgets/app-header/AppHeader'
import { UserProfileLayout} from "layouts/user-profile/UserProfileLayout";
import { useSessionStore } from 'entities/session';


const RootPage = ( ) => {
    const navigate = useNavigate();
    const sessionStore: any = useSessionStore();

    useEffect( () => {
        sessionStore.user.token ? navigate('/modules') : navigate('/auth')
    }, [] )

    return (
        <>
            <AppHeader />
            <UserProfileLayout>
                <Outlet/>
            </UserProfileLayout>
        </>
    );
}

export { RootPage }
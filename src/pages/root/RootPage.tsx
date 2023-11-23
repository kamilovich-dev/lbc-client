import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppHeader } from 'widgets/app-header/AppHeader'
import { useSessionStore } from 'entities/session';


const RootPage = ( ) => {
    const navigate = useNavigate();
    const sessionStore = useSessionStore();

    useEffect( () => {
        sessionStore?.session.token ? navigate('/modules') : navigate('/main')
    }, [])

    return (
        <>
            <AppHeader />
            <div className='bg-blue-50 flex-auto p-0 h-full'>
                <Outlet/>
            </div>
        </>
    );
}

export { RootPage }
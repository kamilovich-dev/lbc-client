import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppHeader } from 'widgets/app-header/AppHeader'
import { useSessionStore } from 'entities/session';


const RootPage = ( ) => {
    const navigate = useNavigate();
    const sessionStore = useSessionStore();

    useEffect( () => {
        sessionStore?.session.token ? navigate('/modules') : navigate('/login')
    }, [] )

    return (
        <>
            <AppHeader />
            <div className='bg-blue-50 flex-auto p-4 h-full'>
                <div className='w-3/5 m-auto'>
                    <Outlet/>
                </div>
            </div>
        </>
    );
}

export { RootPage }
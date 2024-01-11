import { Outlet } from 'react-router-dom';
import { AppHeader } from 'widgets/app-header/AppHeader'

const ProtectedRoot = ( ) => {

    return (
        <>
            <AppHeader />
            <div className='bg-blue-50 flex-auto p-0 h-full'>
                <Outlet/>
            </div>
        </>
    );
}

export { ProtectedRoot }
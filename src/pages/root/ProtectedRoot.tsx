import { Outlet } from 'react-router-dom';
import { AppHeader } from 'widgets/app-header/AppHeader'
import { useCheckAuth } from 'entities/session'

const ProtectedRoot = ( ) => {
    const isAuth = useCheckAuth()
    if (!isAuth) {
        alert('Не авторизован')
        return
    }

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
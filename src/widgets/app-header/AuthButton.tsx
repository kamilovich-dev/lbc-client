import Button from '@mui/material/Button';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { SessionStore, SessionStoreContext } from 'entities/session';
import { useContext } from 'react';
import { routePaths } from 'shared/config';

const AuthButton = observer(() => {
    const sessionStore: SessionStore | null = useContext(SessionStoreContext);
    const navigate = useNavigate();

    if (!sessionStore) return

    const handleLogout = async () => {
        await sessionStore.logout()
        navigate(routePaths.LOGIN)
    }

    return (
        <>
            {sessionStore.session.isAuth ?
                <Button
                    color='warning'
                    onClick={handleLogout}>
                    Выйти
                </Button> :
                <Button
                    variant='contained'
                    onClick={() => navigate(routePaths.LOGIN)}>
                    Авторизация
                </Button>
            }
        </>

    );
});

export { AuthButton };
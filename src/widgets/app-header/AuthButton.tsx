import Button from '@mui/material/Button';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { SessionStoreContext } from 'entities/session';
import { useContext } from 'react';

const AuthButton = observer(() => {
    const sessionStore: any = useContext(SessionStoreContext);
    const navigate = useNavigate();

    return (
        <>
            {sessionStore.session.isAuth ?
                <Button
                    color='warning'
                    onClick={() => sessionStore.logout(navigate)}>
                    Выйти
                </Button> :
                <Button
                    variant='contained'
                    onClick={() => navigate('/login')}>
                    Авторизация
                </Button>
            }
        </>

    );
});

export { AuthButton };
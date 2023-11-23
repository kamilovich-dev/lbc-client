import Button from '@mui/material/Button';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from 'entities/session';

const AuthButton = observer(() => {
    const sessionStore: any = useSessionStore();
    const navigate = useNavigate();

    return (
        <>
            {sessionStore.session.token ?
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
import Button from '@mui/material/Button';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from 'entities/session';

const Logout = observer(() => {
    const sessionStore: any = useSessionStore();
    const navigate = useNavigate();

    return (
        <>
            {sessionStore.user.token &&
                <Button
                    onClick={() => sessionStore.logout(navigate)}>
                    Выйти
                </Button>
            }
        </>

    );
});

export { Logout };
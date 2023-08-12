import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from 'entities/session';

const Login = () => {
    const sessionStore: any = useSessionStore();
    const navigate = useNavigate();

    return (
        <>
            <Button variant="outlined" onClick={ () => sessionStore.login(navigate)}>Войти</Button>
        </>
    );
};

export { Login };
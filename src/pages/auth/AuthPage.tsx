import Button from '@mui/material/Button';
import { Login } from 'features/login/Login';

const AuthPage = () => {
    return (
        <>
            <Login />
            <Button variant="contained">Регистрация</Button>
        </>
    );
};

export { AuthPage };
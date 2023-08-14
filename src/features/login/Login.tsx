import Button from '@mui/material/Button';
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from 'entities/session';

const Login = () => {
    const sessionStore: any = useSessionStore();
    const navigate = useNavigate();

    const emailRef = useRef<any>()
    const passwordRef = useRef<any>()

    const handleClick = () => {
        sessionStore.login(navigate, emailRef.current.value, passwordRef.current.value)
    }

    return (
        <>
            <form>
                <div>Логин:</div>
                <input type='email' name='email' ref={emailRef}></input>
                <div>Пароль:</div>
                <input type='password' name='password' ref={passwordRef}></input>
                <Button variant="outlined" onClick={ handleClick }>Войти</Button>
            </form>
        </>
    );
};

export { Login };
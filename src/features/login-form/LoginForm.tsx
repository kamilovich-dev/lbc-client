import { useState } from 'react'
import { InputLabel, Input, FormControl, Button, Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from 'entities/session';


const LoginForm = () => {
    const sessionStore = useSessionStore();
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isEmailError, setIsEmailError] = useState(false)
    const [isPasswordError, setIsPasswordError] = useState(false)
    const [isLoginActionError, setIsLoginActionError] = useState(false)

    const validateFields = async () => {
        if (!email) {
            setIsEmailError(true)
        }

        if (!password) {
            setIsPasswordError(true)
        }

        if (!email || !password) return

        await sessionStore?.login(navigate, email, password)
        if (!sessionStore?.user.token) setIsLoginActionError(true)
    }

    const handleChange = (e: any) => {
        if (e.target.id == 'email') {
            setIsEmailError(false)
            setEmail(e.target.value)
        }

        if (e.target.id == 'password') {
            setIsPasswordError(false)
            setPassword(e.target.value)
        }
    }

    return (
        <>
            <div className='bg-slate-100 flex justify-center p-5'>
                <form className='flex flex-col p-10 border-2 rounded-md border-blue-100 shadow-sm' onChange={e => handleChange(e)}>
                    <div className='mb-12 flex items-center'>
                        <FormControl variant="standard" sx={{width: '250px'}}>
                            <InputLabel shrink htmlFor="email">
                                Email
                            </InputLabel>
                            <Input type='email' id="email" value={email} size='small' error={isEmailError}/>
                            {isEmailError && <Alert severity="error" sx={{height: '40px', padding: '0 5px 0px 5px'}}>
                                Поле не должно быть пустым
                            </Alert>}
                        </FormControl>
                    </div>
                    <div className='mb-12 flex items-center'>
                        <FormControl variant="standard" sx={{width: '250px'}}>
                            <InputLabel shrink htmlFor="password">
                                Пароль
                            </InputLabel>
                            <Input type='text' id="password" value={password} size='small' error={isPasswordError}/>
                            {isPasswordError && <Alert severity="error" sx={{height: '40px', padding: '0 5px 0px 5px'}}>
                                Поле не должно быть пустым
                            </Alert>}
                        </FormControl>
                    </div>
                    <div className='mb-4'>
                        <Button variant="outlined" onClick={ validateFields }>Войти</Button>
                    </div>
                    <div>
                        <Button variant="contained" onClick={ () => navigate('/register') }>Регистрация</Button>
                    </div>
                </form>
                <Snackbar open={isLoginActionError} autoHideDuration={3000} onClose={() => setIsLoginActionError(false)}>
                    <Alert severity="error" sx={{ width: '100%' }}>
                        Ошибка при авторизации! Проверьте корректность введенных данных!
                    </Alert>
                </Snackbar>
            </div>

        </>
    );
};

export { LoginForm };
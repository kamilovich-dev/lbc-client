import { LoginForm } from 'features/login-form/LoginForm';

const LoginPage = () => {
    return (
        <>
            <div className='bg-slate-100 h-screen flex justify-center items-center'>
                <LoginForm />
            </div>
        </>
    );
};

export { LoginPage };
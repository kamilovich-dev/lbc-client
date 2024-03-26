import { LoginForm } from 'features/login-form/LoginForm';

const LoginPage = () => {

    const appName:string = import.meta.env.VITE_APPLICATION_NAME?.toUpperCase()

    return (
        <>
            <div className='bg-slate-100 flex justify-center items-center flex-auto'>
                <LoginForm appName={appName} />
            </div>
        </>
    );
};

export { LoginPage };
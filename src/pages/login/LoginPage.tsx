import { AppHeader } from "widgets/app-header/AppHeader"
import { LoginForm } from 'features/login-form/LoginForm';

const LoginPage = () => {
    return (
        <>
            <div className='bg-slate-100 flex justify-center items-center flex-auto'>
                <LoginForm />
            </div>
        </>
    );
};

export { LoginPage };
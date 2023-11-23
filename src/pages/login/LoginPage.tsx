import { AppHeader } from "widgets/app-header/AppHeader"
import { LoginForm } from 'features/login-form/LoginForm';

const LoginPage = () => {
    return (
        <>
            <AppHeader/>
            <div className='bg-slate-100 flex justify-center items-center'>
                <LoginForm />
            </div>
        </>
    );
};

export { LoginPage };
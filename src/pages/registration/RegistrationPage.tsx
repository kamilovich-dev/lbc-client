import { RegistrationForm } from 'features/registration-form/RegistrationForm';

const RegistrationPage = () => {

    const appName:string = import.meta.env.VITE_APPLICATION_NAME?.toUpperCase()

    return (
        <>
            <div className='bg-slate-100 h-screen flex justify-center items-center'>
                <RegistrationForm appName={appName}/>
            </div>
        </>
    );
};

export { RegistrationPage };
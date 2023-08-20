import { RegistrationForm } from 'features/registration-form/RegistrationForm';

const RegistrationPage = () => {
    return (
        <>
            <div className='bg-slate-100 h-screen flex justify-center items-center'>
                <RegistrationForm />
            </div>
        </>
    );
};

export { RegistrationPage };
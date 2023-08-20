import { useLocation } from "react-router-dom";

const RegistrationLetterSentPage = (  ) => {
    const { state } = useLocation()
    const { email } = state

    return (
        <>
          <div className="bg-slate-100 h-screen flex flex-col justify-center items-center  p-5 text-4xl leading-loose">
                <div>
                    Письмо для регистрации отправлено по адресу:
                </div>
               <div className="italic text-blue-400">
                    {email}
                </div>
          </div>
        </>
    );
};

export { RegistrationLetterSentPage };
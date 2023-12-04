import { useLocation, useNavigate } from "react-router-dom";

const RegistrationLetterSentPage = (  ) => {
    const navigate = useNavigate()
    const { state } = useLocation()
    const { email } = state

    return (
        <>
          <div className="bg-gray-100 h-screen w-screen">
                <div className="flex flex-col w-[440px] m-auto p-2 pt-20 relative">
                <div className='left-[-75px] top-[180px] absolute -rotate-90 text-3xl font-bold text-gray-700 drop-shadow-md'>Picturize</div>
                <div className="mb-2 flex justify-center">
                    <img className="w-[50px] h-[50px]" src="/static/landing/registration.png"></img>
                </div>
                <div className="h-[4px] w-full bg-blue-300"></div>
                <div className="bg-white flex flex-col">
                    <div className="pt-4 text-center font-bold text-2xl text-[#4F81BD] drop-shadow-sm mb-8"><span>Подтверждение отправлено</span></div>
                    <div className="text-center mb-4 font-bold text-lg text-gray-700">{email || 'XXX@XXX.XXX'},</div>
                    <div className="text-center leading-5 mb-8 font-medium w-4/6 m-auto text-lg">перейдите по ссылке в письме и аккаунт активируется</div>
                </div>
                <div className="bg-[#4F81BD] h-[100px]">
                    <div className="mb-2 flex justify-center relative top-10">
                        <img className="w-[240px] h-[140px]" src="/static/landing/registration-letter-sent.png"></img>
                    </div>
                </div>
                <div className="bg-white flex flex-col pt-24 pb-8 rounded-b-xl shadow-md">
                    <div className="w-2/4 m-auto mb-10">
                        <span className="text-lg font-medium text-justify block leading-6">После активации вам станут доступны все возможности Picturize.</span>
                    </div>
                    <div className="flex justify-center">
                        <button className='bg-[#4F81BD] hover:bg-sky-700 active:bg-sky-800 w-3/4 h-[40px] text-white text-sm py-[5px] font-semibold rounded-lg shadow-md'
                                onClick={() => navigate('/main')}    >
                                Перейти на главную</button>
                    </div>
                </div>
            </div>
          </div>
        </>
    );
};

export { RegistrationLetterSentPage };
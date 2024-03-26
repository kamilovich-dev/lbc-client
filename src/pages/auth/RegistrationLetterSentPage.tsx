import { useLocation, useNavigate } from "react-router-dom";
import { routePaths } from "shared/config";

const RegistrationLetterSentPage = (  ) => {
    const navigate = useNavigate()
    const { state } = useLocation()
    const { email } = state

    const appName:string = import.meta.env.VITE_APPLICATION_NAME?.toUpperCase()

    return (
        <>
            <div className='bg-slate-100 flex flex-auto'>
                <div className="flex flex-col w-[440px] m-auto p-2 pt-20 relative md-max:w-[300px] md-max:pt-5">
                    <div className="mb-2 flex justify-center">
                        <img className="w-[50px] h-[50px]" src="/static/landing/registration.png"></img>
                    </div>
                    <div className="h-[4px] w-full bg-blue-300"></div>
                    <div className="bg-white flex flex-col">
                        <div className="pt-4 text-center font-bold text-2xl text-[#4F81BD] drop-shadow-sm mb-8 md-max:mb-2 md-max:text-sm"><span>Подтверждение отправлено</span></div>
                        <div className="text-center mb-4 font-bold text-lg text-gray-700 md-max:text-sm md-max:mb-2">{email || 'XXX@XXX.XXX'},</div>
                        <div className="text-center leading-5 mb-8 font-medium w-4/6 m-auto text-lg md-max:text-sm md-max:mb-2 md-max:w-5/6">перейдите по ссылке в письме и аккаунт активируется</div>
                    </div>
                    <div className="bg-[#4F81BD] h-[100px] md-max:h-[70px]">
                        <div className="mb-2 flex justify-center relative top-10">
                            <img className="w-[240px] h-[140px] md-max:w-[180px] md-max:h-[80px]" src="/static/landing/registration-letter-sent.png"></img>
                        </div>
                    </div>
                    <div className="bg-white flex flex-col pt-24 pb-8 rounded-b-xl shadow-md md-max:pt-14">
                        <div className="w-2/4 m-auto mb-10 md-max:mb-2 md-max:w-3/4">
                            <span className="text-lg font-medium text-justify block leading-6 md-max:text-sm">После активации вам станут доступны все возможности {appName}.</span>
                        </div>
                        <div className="flex justify-center">
                            <button className='bg-[#4F81BD] hover:bg-sky-700 active:bg-sky-800 w-3/4 h-[40px] text-white text-sm py-[5px] font-semibold rounded-lg shadow-md'
                                    onClick={() => navigate(routePaths.MAIN)}    >
                                    Перейти на главную</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export { RegistrationLetterSentPage };
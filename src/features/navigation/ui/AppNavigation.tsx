import { useNavigate, useLocation } from "react-router-dom"

const AppNavigation = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const pathname = location.pathname

    return (
        <>
            <div className="flex items-center text-lg font-semibold h-full justify-center w-full">
                <div role="tablist" className="tabs tabs-boxed h-full flex items-center w-full gap-4 bg-transparent">
                    <a role="tab"
                        className={`tab text-lg text-gray-500 transition-all duration-300 active:text-[#2B44F6] ${pathname.match('/main') ? 'tab-active' : 'hover:bg-[#1E263A] hover:text-[#2B4489]'}`}
                        onClick={() => navigate('/main')}>Главная</a>
                    <a role="tab"
                        className={`tab text-lg text-gray-500 transition-all duration-300 active:text-[#2B44B8] ${pathname.match('/modules') ? 'tab-active' : 'hover:bg-[#1E263A] hover:text-[#2B4489]'}`}
                        onClick={() => navigate('/modules')}>Модули</a>
                </div>
            </div>
        </>
    )
}

export { AppNavigation }
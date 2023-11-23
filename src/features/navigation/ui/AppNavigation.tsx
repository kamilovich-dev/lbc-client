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
                        className={`tab text-lg text-white transition-all duration-300 active:text-gray-800 ${pathname.match('/main') ? 'tab-active' : 'hover:ring-2 hover:ring-white'}`}
                        onClick={() => navigate('/main')}>Главная</a>
                    <a role="tab"
                        className={`tab text-lg text-white  active:text-gray-800 ${pathname.match('/modules') ? 'tab-active' : 'hover:ring-2 hover:ring-white'}`}
                        onClick={() => navigate('/modules')}>Модули</a>
                </div>
            </div>
        </>
    )
}

export { AppNavigation }
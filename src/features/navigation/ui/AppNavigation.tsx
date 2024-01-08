import { useNavigate, useLocation } from "react-router-dom"

const AppNavigation = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const pathname = location.pathname

    const normal_cn = `h-full text-lg text-gray-500 transition-all duration-300 active:text-white active:bg-[#4A6CFF] block p-2 px-4 text-lg font-medium flex items-center justify-center`
    const hover_cn = `hover:bg-[#4A6CBD] hover:text-white hover:cursor-pointer hover:opacity-80`
    const active_cn = `bg-[#4A6CBD] text-white pointer-events-none	`

    const links = [
        { link: '/main',
          isActive: pathname.match('/main'),
          text: 'Главная'
        },
        { link: '/modules',
          isActive: pathname.match('/modules'),
          text: 'Модули'
        },
    ]

    return (
        <>
            <div className="h-full flex items-center w-full bg-transparent">
                { links.map( (item, index) =>
                    <a
                    key={index}
                    className={`${normal_cn} ${hover_cn} ${item.isActive ? active_cn : ''}`}
                    onClick={() => navigate(item.link)}>
                        {item.text}
                    </a>)
                    }
            </div>
        </>
    )
}

export { AppNavigation }
import { useNavigate, useLocation, matchPath } from "react-router-dom"
import { useState } from "react";
import { AuthButton } from 'entities/session';
import { routePaths } from "shared/config"
import { ModuleStore } from "entities/module";

import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';
import { useMobile } from "shared/mobile/useMobile";
import { SvgIcon } from "@mui/material";
import { AddItemModal } from "features/add-item/AddItemModal";

const AppNavigation = () => {
    const isMobile = useMobile()
    return <MobileNavigation/>
}

type TNavigationDataElement = {
    action: () => void,
    isActive: boolean,
    iconComponent: JSX.Element
}

const MobileNavigation = () => {

    const [isShowAddModuleModal, setIsShowAddModuleModal] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()
    const pathname = location.pathname

    const normal_cn = `h-full transition-all duration-300 block p-2 px-4 flex items-center justify-center`
    const hover_cn = ``
    const active_cn = `h-[3px] w-14 bg-blue-400 pointer-events-none absolute bottom-0`

    const navigationData: TNavigationDataElement[] = [
        {
            action: () => {
                navigate(routePaths.GLOBAL_SEARCH)
            },
            isActive:  matchPath(routePaths.GLOBAL_SEARCH, pathname) ? true : false,
            iconComponent: <SearchIcon/>
        },
        {
            action: () => {
                navigate(routePaths.MAIN)
            },
            isActive: matchPath(routePaths.MAIN, pathname) ? true : false,
            iconComponent: <HomeIcon/>
        },
        {
            action: () => setIsShowAddModuleModal(true),
            isActive: isShowAddModuleModal,
            iconComponent: <AddCircleOutlineIcon/>
        },
        {
            action: () => {
                navigate(routePaths.MODULES)
            },
            isActive: matchPath(routePaths.MODULES, pathname) ? true : false,
            iconComponent: <FolderIcon/>
        },
        {
            action: () => {
                navigate(routePaths.PROFILE)
            },
            isActive: matchPath(routePaths.PROFILE, pathname) ? true : false,
            iconComponent: <PersonIcon/>
        },
    ]

    const exclude_navigation_paths = [routePaths.CARDS_MODE]
    const is_exclude_navigation = exclude_navigation_paths.find(item => matchPath(item, pathname) ? item : null) ? true : false
    if (is_exclude_navigation) return null

    return (
        <>
            <div className="h-[40px] flex justify-center items-center p-5 pb-6 bg-white fixed bottom-0 w-full z-50 border-t-[1px] border-gray-100 gap-2">
                    { navigationData.map( (item, index) =>
                        <div
                        key={index}
                        className={`${normal_cn} ${hover_cn} }`}
                        onClick={item.action}>
                            <SvgIcon sx={{
                                            color: item.isActive ? '#60A5FA' : '#94A3B8',
                                            height: index == Math.floor(navigationData.length / 2) ? '40px' : '25px',
                                            width: index == Math.floor(navigationData.length / 2) ? '40px' : '25px',
                                        }}>
                                {item.iconComponent}
                            </SvgIcon>
                            {item.isActive ? <div className={active_cn}></div> : undefined}
                        </div>)}
            </div>
            <AddItemModal
                isShowModal={isShowAddModuleModal}
                setIsShowModal={setIsShowAddModuleModal}/>
        </>
    )
}

const DesktopNavigation = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const pathname = location.pathname

    const normal_cn = `h-full text-lg text-gray-500 transition-all duration-300 active:text-white active:bg-[#4A6CFF] block p-2 px-4 text-lg font-medium flex items-center justify-center`
    const hover_cn = `hover:bg-[#4A6CBD] hover:text-white hover:cursor-pointer hover:opacity-80`
    const active_cn = `bg-[#4A6CBD] text-white pointer-events-none	`

    const links = [
        { link: routePaths.MAIN,
          isActive: pathname.match(routePaths.MAIN),
          text: 'Главная'
        },
        { link: routePaths.MODULES,
          isActive: pathname.match(routePaths.MODULES),
          text: 'Модули'
        },
    ]

    return (
        <>
            <div className='flex h-16 items-center bg-white border-b-[1px] border-gray-200 '>
                <div className='flex justify-start h-full w-4/6 mx-auto'>
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
                </div>
                <div className='absolute right-4'>
                    <AuthButton />
                </div>
            </div>
        </>
    )
}

export { AppNavigation }
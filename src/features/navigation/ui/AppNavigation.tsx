import { useNavigate, useLocation, matchPath } from "react-router-dom"
import { useState } from "react";
import { routePaths } from "shared/config"

import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';
import { SvgIcon } from "@mui/material";
import { AddItemModal } from "features/add-item/AddItemModal";

const AppNavigation = () => {
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

export { AppNavigation }
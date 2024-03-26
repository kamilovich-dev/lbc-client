import { ModuleStore } from "entities/module"
import { TModule } from "entities/module";
import { useNavigate } from "react-router-dom"
import Drawer from '@mui/material/Drawer';

interface IDrawerProps {
    drawerData: TDrawerData
    setDrawerData: React.Dispatch<React.SetStateAction<TDrawerData>>
    moduleStore: ModuleStore
}

export type TDrawerData = {
    isShowModal: boolean,
    module?: TModule
}

const GoToModuleDrawer = ( {drawerData, setDrawerData, moduleStore}: IDrawerProps) => {
    const navigate = useNavigate();

    const handleButtonEditClick = ( moduleId: number) => {
        navigate(`/${moduleId}/edit`)
    }

    const handleRemoveModule = (moduleId: number) => {
        moduleStore.deleteModuleById(moduleId)
        setDrawerData({
            ...drawerData,
            isShowModal: false
        })
    }

    const handleRemoveBookmark = (moduleId: number) => {
        moduleStore.deleteBookmarkByModuleId(moduleId)
        setDrawerData({
            ...drawerData,
            isShowModal: false
        })
    }

    const handleTransitionClick = (moduleId: number) => {
        navigate(`/${moduleId}`)
    }

    return (
        <div>
            <Drawer
                open={drawerData.isShowModal}
                onClose={() => setDrawerData({
                    ...drawerData,
                    isShowModal: false
                })}
                anchor="bottom"
            >
                <div className="bg-white p-4">
                    {drawerData.module?.options.isOwner ?
                        <div className="flex items-center mb-2">
                        <button className="text-md text-gray-500 flex-auto text-center"
                            onClick={() => handleRemoveModule(drawerData.module?.id)}>Удалить</button>
                        </div> :
                        <div className="flex items-center mb-2">
                            <button className="text-md text-gray-500 flex-auto text-center"
                                onClick={() => handleRemoveBookmark(drawerData.module?.id)}>Исключить из сохраненных</button>
                        </div>
                    }
                    <div className="border-b-2 border-gray-200 w-full mb-4"></div>
                    <div className="flex items-center mb-2">
                        <button className="text-md text-gray-500 flex-auto text-center"
                            onClick={() => handleButtonEditClick(drawerData.module?.id)}>Редактировать</button>
                    </div>
                    <div className="border-b-2 border-gray-200 w-full mb-4"></div>
                    <div className="flex items-center mb-2">
                        <button className="text-md text-blue-400 flex-auto text-center"
                            onClick={() => handleTransitionClick(drawerData.module?.id)}>Перейти</button>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export {  GoToModuleDrawer }
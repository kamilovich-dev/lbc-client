import { ModuleStore } from "entities/module"
import { FolderStore } from 'entities/folder'
import { useNavigate, generatePath, useLocation } from "react-router-dom"
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import Drawer from '@mui/material/Drawer';
import { observer } from "mobx-react-lite";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { routePaths } from "shared/config";

interface IOuterProps {
    isShowModal: boolean,
    setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

interface IProps {
    folderStore: FolderStore,
    moduleStore: ModuleStore,
}

export const AddItemModal = ({isShowModal, setIsShowModal}: IOuterProps) => {
    const moduleStore = new ModuleStore()
    const folderStore = new FolderStore()
    return <ObservedAddItemModal moduleStore={moduleStore} folderStore={folderStore} isShowModal={isShowModal} setIsShowModal={setIsShowModal}/>
}

const ObservedAddItemModal = observer(( {isShowModal, moduleStore, folderStore, setIsShowModal}: IProps & IOuterProps) => {
    const navigate = useNavigate();
    const location = useLocation()
    const pathname = location.pathname

    useEffect(() => {
        setName(DEFAULT_VALUES.name)
        setDescription(DEFAULT_VALUES.description)
    }, [isShowModal])

    const DEFAULT_VALUES = {
        name: 'Новое имя',
        description: 'Новое описание',
    }

    const [whatToAdd, setWhatToAdd] = useState('module')
    const [name, setName] = useState<string | undefined>(DEFAULT_VALUES.name)
    const [description, setDescription] = useState<string | undefined>(DEFAULT_VALUES.description)

    const handleAddClick = async () => {

        if (whatToAdd === 'module') {
            await moduleStore.addModule(name ?? '', description)
            .then(result => {
                if (result?.isError === false) {
                    navigate(generatePath(routePaths.MODULE_EDIT, { moduleId: String(result?.module.id) ?? '' }))
                    setIsShowModal(false)
                }
            })
        } else {
            await folderStore.createFolder(name ?? '', description ?? '')
            .then(result => {
                if (result?.isError === false) {
                    navigate(generatePath(routePaths.FOLDER, { folderId: String(result?.folder.id) ?? '' }))
                    setIsShowModal(false)
                }
            })
        }

    }

    return (
        <div>
            <Drawer
                open={isShowModal}
                onClose={() => setIsShowModal(false)}
                anchor="bottom"
            >
                <div className="bg-white p-4">
                    <div className="flex items-center mb-4">
                        <div className="font-bold text-lg text-gray-600 flex-auto">Добавить</div>
                        <Select
                            style={{ padding: '0px' }}
                            onChange={e => setWhatToAdd(e.target.value)}
                            value={whatToAdd}
                        >
                            <MenuItem value='module'>Модуль</MenuItem>
                            <MenuItem value='folder'>Папка</MenuItem>
                        </Select>
                    </div>
                    <div className="flex items-center mb-10">
                        <TextField
                            fullWidth
                            multiline
                            name='name'
                            label="Название"
                            variant="standard"
                            value={name}
                            onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="flex items-center mb-12">
                        <TextField
                            fullWidth
                            multiline
                            name='description'
                            label="Описание"
                            variant="standard"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className='bg-blue-400 drop-shadow-sm rounded-lg p-2 w-32 text-center text-white hover:bg-blue-500 active:bg-blue-600' onClick={handleAddClick}>
                            Добавить
                        </button>
                    </div>

                </div>
            </Drawer>
        </div>
    )
})
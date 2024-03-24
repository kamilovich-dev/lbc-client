import { ModuleStore } from "entities/module"
import { useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import Drawer from '@mui/material/Drawer';

interface IDrawerProps {
    isShowModal: boolean,
    moduleStore: ModuleStore,
    setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateModuleDrawer = ( {isShowModal, moduleStore, setIsShowModal}: IDrawerProps) => {
    const navigate = useNavigate();
    const DEFAULT_VALUES = {
        name: 'Модуль',
        description: '',
        isNameError: false,
    }
    const [name, setName] = useState<string | undefined>(DEFAULT_VALUES.name)
    const [isNameError, setIsNameError] = useState(DEFAULT_VALUES.isNameError)
    const [description, setDescription] = useState<string | undefined>(DEFAULT_VALUES.description)

    useEffect(() => {
        setName(DEFAULT_VALUES.name)
        setIsNameError(DEFAULT_VALUES.isNameError)
        setDescription(DEFAULT_VALUES.description)
    }, [isShowModal])

    const handleNameChange = (value: string | undefined) => {
        setIsNameError(value ? false : true)
        setName(value)
    }

    const handeDescriptionChange = (value: string | undefined) => {
        setDescription(value)
    }

    const handleAddClick = async () => {
        if (name) {
            await moduleStore.addModule(name, description)
            .then(result => {
                navigate(`/${result?.module.id}/edit`)
                setIsShowModal(false)
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
                        <div className="font-bold text-lg text-gray-600 flex-auto">Добавить модуль</div>
                    </div>
                    <div className="flex items-center mb-10">
                        <TextField
                            fullWidth
                            error={isNameError}
                            helperText={isNameError ? 'Обязательное поле' : ''}
                            multiline
                            name='name'
                            label="Название"
                            variant="standard"
                            value={name}
                            onChange={(e) => handleNameChange(e.target.value)}/>
                    </div>
                    <div className="flex items-center mb-12">
                        <TextField
                            fullWidth
                            multiline
                            name='description'
                            label="Описание"
                            variant="standard"
                            value={description}
                            onChange={(e) => handeDescriptionChange(e.target.value)}/>
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
}

export {  CreateModuleDrawer }
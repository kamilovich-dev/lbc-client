import { observer } from "mobx-react-lite"
import { useEffect, useState } from 'react'
import { Drawer } from '@mui/material'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { TFolder } from "shared/api/lbc-server/endpoints/types/folder";
import { FolderStore } from "entities/folder";

interface IProps {
    folder: TFolder
    folderStore: FolderStore,
    isShowModal: boolean,
    setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const FolderEditModal = observer(( {folder, folderStore, isShowModal, setIsShowModal}: IProps ) => {

    useEffect(() => {
        setName(folder.name ?? '')
        setDescription(folder.description ?? '')
    }, [isShowModal])

    const [name, setName] = useState(folder.name)
    const [description, setDescription] = useState(folder.description)

    const handleSave = () => {
        folderStore.updateFolder({ folder, field: 'name', value: name  } )
        .then(() => {
            folderStore.updateFolder({ folder, field: 'description', value: description  } )
            setIsShowModal(false)
        })
    }

    return (
            <Drawer
                anchor="bottom"
                open={isShowModal}
                onClose={() => setIsShowModal(false)}
            >
                <div className="rounded-2xl bg-white overflow-auto">
                    <div className='p-4 flex flex-col relative overflow-y-auto'>
                        <div className='mb-10'>
                            <h1 className='text-lg font-semibold text-gray-600'>Редактировать</h1>
                        </div>
                        <div className="mb-20 flex-auto">
                            <TextField
                                inputProps={{style: { fontSize: 16 }}}
                                multiline
                                fullWidth
                                name='name'
                                variant="standard"
                                value={name}
                                onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="mb-10 flex-auto">
                            <TextField
                                inputProps={{style: { fontSize: 16 }}}
                                multiline
                                fullWidth
                                name='description'
                                variant="standard"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}/>
                        </div>

                        <div className="flex flex-row gap-6 p-4 justify-center">
                            <Button sx={{backgroundColor: '#60A5FA', borderRadius: 3}} variant='contained' onClick={handleSave}>Сохранить</Button>
                            <Button sx={{borderRadius: 3}} variant='outlined' onClick={() => setIsShowModal(false)}>Отмена</Button>
                        </div>
                    </div>
                </div>

            </Drawer>
    )
})
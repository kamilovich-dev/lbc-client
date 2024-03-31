import { observer } from 'mobx-react-lite'
import { FolderItem } from 'entities/folder';
import { FolderStore } from 'entities/folder';


import { TFolder } from 'shared/api/lbc-server/endpoints/types/folder';
import { useNavigate, generatePath } from 'react-router-dom';

import { routePaths } from 'shared/config';

interface IProps {
    folderStore: FolderStore
}

export const ListFolders = observer(( { folderStore }: IProps ) => {
    const navigate = useNavigate()

    const handleItemClick = (folder: TFolder) => {
        navigate(generatePath(routePaths.FOLDER, { folderId: String(folder.id) ?? '' }))
    }

    const logins = [...new Set(folderStore.folders.map(item => item.options.createdByLogin))]
    const myLogin = folderStore.folders.find(item => item.options.isOwner === true)?.options.createdByLogin

    return (
        <>
            {logins.map( login => (
                <div key={login} className={`mb-4 grid ${folderStore.view.isListed ? 'grid-cols-1' : 'grid-cols-2'} gap-2`}>
                    <div className={`text-gray-400 ${folderStore.view.isListed ? '' : 'col-span-2'}`}>{myLogin === login ? 'Свои' : login}</div>
                    {folderStore.folders.filter(folder => folder.options.createdByLogin === login).map(folder => (
                        <div key={folder.id} onClick={ () => handleItemClick(folder) }>
                            <FolderItem
                            folder={folder}/>
                        </div>
                    ))}
                </div>
            ) )}

        </>
    );
});
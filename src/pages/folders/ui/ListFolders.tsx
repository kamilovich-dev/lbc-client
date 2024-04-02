import { observer } from 'mobx-react-lite'
import { FolderItem } from 'entities/folder';

import { TFolder } from 'shared/api/lbc-server/endpoints/types/folder';
import { useNavigate, generatePath } from 'react-router-dom';

import { routePaths } from 'shared/config';

type TView = {
    isListed: boolean,
    isFiltered: boolean,
}

interface IProps {
    folders: TFolder[],
    view: TView,
    isHidePublicIcon?: boolean,
    isHideBookmarkIcon?: boolean
}

export const ListFolders = observer(( { folders, view, isHidePublicIcon, isHideBookmarkIcon }: IProps ) => {
    const navigate = useNavigate()

    const handleItemClick = (folder: TFolder) => {
        navigate(generatePath(routePaths.FOLDER, { folderId: String(folder.id) ?? '' }))
    }

    const logins = [...new Set(folders.map(item => item.options.createdByLogin))]
    const myLogin = folders.find(item => item.options.isOwner === true)?.options.createdByLogin

    return (
        <>
            <div className='text-gray-400'>Всего: {folders.length}</div>
            {logins.map( login => (
                <div key={login} className={`mb-4 grid ${view.isListed ? 'grid-cols-1' : 'grid-cols-2'} gap-2`}>
                    <div className={`text-gray-400 ${view.isListed ? '' : 'col-span-2'}`}>{myLogin === login ? 'Свои' : login}</div>
                    {folders.filter(folder => folder.options.createdByLogin === login).map(folder => (
                        <div key={folder.id} onClick={ () => handleItemClick(folder) }>
                            <FolderItem
                            isHidePublicIcon={isHidePublicIcon}
                            isHideBookmarkIcon={isHideBookmarkIcon}
                            folder={folder}/>
                        </div>
                    ))}
                </div>
            ) )}

        </>
    );
});
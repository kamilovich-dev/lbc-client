import type { TFolder } from "shared/api/lbc-server/endpoints/types/folder"
import PublicIcon from '@mui/icons-material/Public';
import BookmarkIcon from '@mui/icons-material/Bookmark';

interface IProps {
    folder: TFolder,
    isHidePublicIcon?: boolean,
    isHideBookmarkIcon?: boolean,
}

export const FolderItem = ( {folder, isHidePublicIcon, isHideBookmarkIcon} : IProps) => {

    const updatedAt = folder.updatedAt ? new Date(folder.updatedAt).toLocaleString() : ''

    return (
        <>
            <div className='rounded-lg hover:cursor-pointer shadow-md flex flex-col overflow-hidden w-full h-full group relative'>
                    <div>
                        <div className="flex ">
                            <div className="bg-white w-[40px] h-[10px]">
                            </div>
                            <div className="w-0 h-0
                                border-b-[10px] border-b-white
                                border-r-[20px] border-b-transparent border-r-transparent border-l-transparent">
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-2 flex-auto flex flex-col">
                        {isHidePublicIcon ? null :
                        <div className='text-[10px] text-gray-300 absolute right-2 top-4'>
                            <div className={`text-blue-300 text-right ${folder.isPublished ? 'text-blue-300' : 'text-gray-300'}`}><PublicIcon sx={{ width: 20, height: 20}}/></div>
                        </div>}

                        {isHideBookmarkIcon ? null :
                        <div className='text-[10px] text-gray-300 absolute right-2 top-6'>
                            <div className={`text-blue-300 text-right ${folder.options.isBookmarked ? 'text-blue-300' : 'text-gray-300'}`}><BookmarkIcon sx={{ width: 20, height: 20}}/></div>
                        </div>}

                        <div className='overflow-hidden flex-auto flex flex-col'>
                            <div className='text-sm text-gray-400'>{folder.options.modulesCount} модулей</div>
                            <div className='font-semibold text-sm text-slate-800 py-1 mb-2 flex-auto'>
                                {folder.name.length > 64 ? `${folder.name.slice(64)}...` : folder.name}
                            </div>
                            <div className='text-xs text-gray-300'>Изменен: {updatedAt}</div>
                        </div>
                    </div>
            </div>
        </>
    )
}
import { observer } from 'mobx-react-lite';
import { TModule } from 'shared/api/lbc-server/endpoints/types/modules';
import PublicIcon from '@mui/icons-material/Public';

interface IProps {
    module: TModule,
}

const ModuleItem = observer(( { module }: IProps ) => {

    const updatedAt = module.updatedAt ? new Date(module.updatedAt).toLocaleString() : ''

    return (
        <>
            <div className='bg-white p-2 rounded-lg shadow-md hover:cursor-pointer flex gap-2 overflow-hidden w-full h-full group relative'>
                    <div className='text-[10px] text-gray-300 absolute right-2 top-3'>
                        <div className={`text-blue-300 text-right ${module.isPublished ? 'text-blue-300' : 'text-gray-300'}`}><PublicIcon sx={{ width: 20, height: 20}}/></div>
                    </div>
                    <div className='overflow-hidden flex-auto flex flex-col'>
                        <div className='text-sm text-gray-400'>{module.options.cardsCount} терминов</div>
                        <div className='font-semibold text-md text-slate-800 py-1 mb-2 flex-auto'>
                            {module.name.length > 64 ? `${module.name.slice(64)}...` : module.name}
                        </div>
                        <div className='text-xs text-gray-300'>Изменен: {updatedAt}</div>
                    </div>
                    <div className='absolute left-0 bottom-0 h-[4px] bg-indigo-200 w-full invisible group-hover:visible'></div>
            </div>
        </>
    );
});

export { ModuleItem };
import { observer } from 'mobx-react-lite';
import { TModule } from 'entities/module/model/ModuleStore';

interface IProps {
    module: TModule,
    ButtonStar: JSX.Element,
}

const ModuleRow = observer(( { module, ButtonStar }: IProps ) => {

    const createdAtString = module.createdAt ? new Date(module.createdAt).toLocaleString() : ''

    return (
        <>
            <div className='bg-white p-2 rounded-lg shadow-md hover:cursor-pointer flex gap-2 relative overflow-hidden w-full h-full group'>
                    <div className='overflow-hidden flex-auto flex flex-col'>
                        <div className='text-sm text-gray-400'>{module.cardsCount} терминов</div>
                        <div className='font-semibold text-md text-slate-800 py-1 mb-2 flex-auto'>
                            {module.name.length > 64 ? `${module.name.slice(64)}...` : module.name}
                        </div>
                        <div className='text-xs text-gray-300'>Создан: {createdAtString}</div>
                    </div>
                    <div className='flex items-center'>
                        {ButtonStar}
                    </div>
                    <div className='absolute left-0 bottom-0 h-[4px] bg-indigo-200 w-full invisible group-hover:visible'></div>
            </div>
        </>
    );
});

export { ModuleRow };
import { observer } from 'mobx-react-lite'
import { ModuleItem } from 'entities/module';

import { TModule } from 'shared/api/lbc-server/endpoints/types/modules';
import { useNavigate, generatePath } from 'react-router-dom';

import { routePaths } from 'shared/config';

type TView = {
    isListed: boolean,
    isFiltered: boolean,
}

interface IProps {
    modules: TModule[]
    view: TView,
    isHidePublicIcon?: boolean,
    isHideBookmarkIcon?: boolean
}

const ListModules = observer(( { modules, view, isHidePublicIcon, isHideBookmarkIcon }: IProps ) => {
    const navigate = useNavigate()

    const handleModuleRowClick = (module: TModule) => {
        navigate(generatePath(routePaths.MODULE, { moduleId: String(module.id) ?? '' }))
    }

    const logins = [...new Set(modules.map(item => item.options.createdByLogin))]
    const myLogin = modules.find(item => item.options.isOwner === true)?.options.createdByLogin

    return (
        <>
            <div className='text-gray-400'>Всего: {modules.length}</div>
            {logins.map( login => (
                <div key={login} className={`mb-4 grid ${view.isListed ? 'grid-cols-1' : 'grid-cols-2'} gap-2`}>
                    <div className={`text-gray-400 ${view.isListed ? '' : 'col-span-2'}`}>{myLogin === login ? 'Свои' : login}</div>
                    {modules.filter(module => module.options.createdByLogin === login).map(module => (
                        <div key={module.id} onClick={ () => handleModuleRowClick(module) }>
                            <ModuleItem
                            isHidePublicIcon={isHidePublicIcon}
                            isHideBookmarkIcon={isHideBookmarkIcon}
                            module={module}/>
                        </div>
                    ))}
                </div>
            ) )}

        </>
    );
});





export { ListModules };
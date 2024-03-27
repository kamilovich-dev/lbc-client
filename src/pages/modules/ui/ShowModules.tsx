import { observer } from 'mobx-react-lite'
import { ModuleRow } from 'entities/module';
import { ModuleStore } from 'entities/module';


import { TModule } from 'shared/api/lbc-server/endpoints/types/modules';
import { useNavigate } from 'react-router-dom';

interface IProps {
    moduleStore: ModuleStore
}

const ShowModules = observer(( { moduleStore }: IProps ) => {
    const navigate = useNavigate()

    const handleModuleRowClick = (module: TModule) => {
        navigate(`/${module.id}`)
    }

    const logins = [...new Set(moduleStore.modules.map(item => item.options.createdByLogin))]
    const myLogin = moduleStore.modules.find(item => item.options.isOwner === true)?.options.createdByLogin

    return (
        <>
            {logins.map( login => (
                <div key={login} className={`mb-4 grid ${moduleStore.view.isListed ? 'grid-cols-1' : 'grid-cols-2'} gap-2`}>
                    <div className={`text-gray-400 ${moduleStore.view.isListed ? '' : 'col-span-2'}`}>{myLogin === login ? 'Свои' : login}</div>
                    {moduleStore.modules.filter(module => module.options.createdByLogin === login).map(module => (
                        <div key={module.id} onClick={ () => handleModuleRowClick(module) }>
                            <ModuleRow
                            module={module}/>
                        </div>
                    ))}
                </div>
            ) )}

        </>
    );
});





export { ShowModules };
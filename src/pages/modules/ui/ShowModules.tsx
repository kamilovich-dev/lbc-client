import { observer } from 'mobx-react-lite'
import { ModuleRow } from 'entities/module';
import { ModuleStore } from 'entities/module';
import { useState } from 'react';

import { GoToModuleDrawer } from './GoToModuleDrawer';
import type { TDrawerData } from './GoToModuleDrawer';
import { TModule } from 'shared/api/lbc-server/endpoints/types/modules';

interface IProps {
    moduleStore: ModuleStore
}

const ShowModules = observer(( { moduleStore }: IProps ) => {
    const [drawerData, setDrawerData] = useState<TDrawerData>({
        isShowModal: false,
    })

    const handleModuleRowClick = (module: TModule) => {
        setDrawerData({
            isShowModal: true,
            module
        })
    }

    const logins = [...new Set(moduleStore.modules.map(item => item.options.createdBy))]
    const myLogin = moduleStore.modules.find(item => item.options.isOwner === true)?.options.createdBy

    return (
        <>
            {logins.map( login => (
                <div key={login} className={`mb-4 grid ${moduleStore.view.isListed ? 'grid-cols-1' : 'grid-cols-2'} gap-2`}>
                    <div className={`text-gray-400 ${moduleStore.view.isListed ? '' : 'col-span-2'}`}>{myLogin === login ? 'Свои' : login}</div>
                    {moduleStore.modules.filter(module => module.options.createdBy === login).map(module => (
                        <div key={module.id} onClick={ () => handleModuleRowClick(module) }>
                            <ModuleRow
                            module={module}/>
                        </div>
                    ))}
                </div>
            ) )}
            <GoToModuleDrawer
                drawerData={drawerData}
                setDrawerData={setDrawerData}
                moduleStore={moduleStore}/>
        </>
    );
});





export { ShowModules };
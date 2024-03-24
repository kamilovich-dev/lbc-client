import { observer } from 'mobx-react-lite'
import { ModuleRow } from 'entities/module';
import { ButtonFavoriteStar } from 'shared/ui/buttons';
import { TModule, ModuleStore } from 'entities/module';
import { useState } from 'react';

import { GoToModuleDrawer } from './GoToModuleDrawer';
import type { TDrawerData } from './GoToModuleDrawer';

interface IProps {
    modules: TModule[],
    moduleStore: ModuleStore
}

const ShowModules = observer(( { modules, moduleStore }: IProps ) => {
    const [drawerData, setDrawerData] = useState<TDrawerData>({
        isShowModal: false,
        moduleId: -1
    })

    const handleSwitchFavorite = ( e: React.SyntheticEvent, id: number, name: string, value: string) => {
        e.stopPropagation()
        moduleStore.editModule({
            id, name, value
        })
    }

    const handleModuleRowClick = (moduleId: number) => {
        if (moduleId && moduleId !== -1) {
            setDrawerData({
                isShowModal: true,
                moduleId
            })
        }
    }

    return (
        <>
            <div className={`grid ${moduleStore.view.isListed ? 'grid-cols-1' : 'grid-cols-2'} gap-2`}>
                { modules.map( module => (
                    <div key={module.id} onClick={() => handleModuleRowClick(module.id)}>
                        <ModuleRow
                        module={module}
                        ButtonStar={ <ButtonFavoriteStar
                                        isFavorite={module.isFavorite}
                                        onClick={(e) => handleSwitchFavorite(e, module.id, 'isFavorite', '')}/> }
                                    />
                    </div>

                ))}
            </div>
            <GoToModuleDrawer
                drawerData={drawerData}
                setDrawerData={setDrawerData}
                moduleStore={moduleStore}/>
        </>
    );
});





export { ShowModules };
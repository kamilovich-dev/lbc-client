import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom';
import { ModuleRow } from 'entities/module';
import { ButtonEdit } from 'shared/ui/button-edit/ButtonEdit';
import { ButtonDelete } from 'shared/ui/button-delete/ButtonDelete'
import { TModule, IModuleStore } from 'entities/module';

interface IProps {
    modules: TModule[],
    moduleStore: IModuleStore
}

const ShowModules = observer(( { modules, moduleStore }: IProps ) => {
    const navigate = useNavigate();

    const handleButtonEditClick = ( e:React.SyntheticEvent, moduleId: number ) => {
        e.stopPropagation()
        navigate(`/${moduleId}/edit`)
    }

    const handleButtonDeleteClick = (e: React.SyntheticEvent, moduleId: number) => {
        e.stopPropagation()
        moduleStore.deleteModuleById(moduleId)
    }

    const handleModuleRowClick = (moduleId: number) => {
        navigate(`/${moduleId}`)
    }

    return (
        <>
            { modules.map( module => (
                <div className='mb-2' key={module.id} onClick={() => handleModuleRowClick(module.id)}>
                    <ModuleRow
                        moduleName={module.name}
                        cardsCount={module.cardsCount}
                        ButtonDelete={ <ButtonDelete
                                        onClick={(e) => handleButtonDeleteClick(e, module.id)}/> }
                        ButtonEdit={ <ButtonEdit
                                        onClick={(e) => handleButtonEditClick(e, module.id)}/>}
                    />
                </div>
            ))}
        </>
    );
});

export { ShowModules };
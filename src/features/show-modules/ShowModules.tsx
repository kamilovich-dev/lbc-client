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

    const handleButtonEditClick = ( moduleId: number ) => {
        navigate(`/${moduleId}/edit`)
    }

    const handleButtonDeleteClick = (moduleId: number) => {
        moduleStore.deleteModuleById(moduleId)
    }

    return (
        <>
            { modules.map( module => (
                <div className='mb-2' key={module.id}>
                    <ModuleRow
                        moduleName={module.name}
                        cardsCount={module.cardsCount}
                        ButtonDelete={ <ButtonDelete
                                        onClick={() => handleButtonDeleteClick(module.id)}/> }
                        ButtonEdit={ <ButtonEdit
                                        onClick={() => handleButtonEditClick(module.id)}/>}
                    />
                </div>
            ))}
        </>
    );
});

export { ShowModules };
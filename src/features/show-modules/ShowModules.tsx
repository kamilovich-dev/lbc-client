import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom';
import { ModuleRow } from 'entities/module';
import { ButtonEdit } from 'shared/ui/buttons/button-edit/ButtonEdit';
import { TModule } from 'entities/module/model/types';

interface IProps {
    modules: TModule[],
}

const ShowModules = observer(( { modules }: IProps ) => {
    const navigate = useNavigate();

    const handleButtonEditClick = ( moduleId: number ) => {
        navigate(`/${moduleId}/edit`)
    }

    return (
        <>
            { modules.map( module => (
                <div className='mb-2' key={module.id}>
                    <ModuleRow
                        moduleName={module.name}
                        cardsCount={module.cardsCount}
                        ButtonEdit={ <ButtonEdit
                                        onClick={() => handleButtonEditClick(module.id)}/>}
                    />
                </div>
            ))}
        </>
    );
});

export { ShowModules };
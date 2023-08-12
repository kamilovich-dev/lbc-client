import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
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
                <div className={styles.row} key={module.id}>
                    <ModuleRow
                        moduleName={module.name}
                        cardsCount={module.cardStore.cards.length}
                        ButtonEdit={ <ButtonEdit
                                        onClick={() => handleButtonEditClick(module.id)}/>}
                    />
                </div>
            ))}
        </>
    );
});

export { ShowModules };
import { useParams } from 'react-router-dom';
import { ModuleEditForm } from 'features/module-edit-form/ModuleEditForm';

const ModuleEditPage = () => {

    const { moduleId } = useParams();
    if (!moduleId) return;

    return (
        <>
            <div>
                <ModuleEditForm moduleId={parseInt(moduleId)}/>
            </div>
        </>
    );

};

export { ModuleEditPage };
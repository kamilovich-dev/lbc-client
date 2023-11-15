import { useParams } from 'react-router-dom';
import { ModuleEditForm } from 'features/module-edit-form';

const ModuleEditPage = () => {

    const { moduleId } = useParams();
    if (!moduleId) return;

    return (
        <>
            <div className='w-3/5 m-auto p-4'>
                <ModuleEditForm moduleId={parseInt(moduleId)}/>
            </div>
        </>
    );

};

export { ModuleEditPage };
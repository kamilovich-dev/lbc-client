import { observer } from 'mobx-react-lite'
import Button from '@mui/material/Button';
import { IModuleStore } from 'entities/module/model/types';

interface IProps {
    moduleStore: IModuleStore,
}

const AddModule = observer(( { moduleStore }: IProps ) => {
    return (
        <>
            <Button
                variant="contained"
                onClick={moduleStore.addModule}>
            + ДОБАВИТЬ МОДУЛЬ</Button>
        </>
    );
});

export { AddModule };
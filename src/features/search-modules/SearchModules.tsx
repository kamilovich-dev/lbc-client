import TextField from '@mui/material/TextField';
import { observer } from 'mobx-react-lite';
import { IModuleViewStore, TModulesFilter } from 'entities/module/model/types';

interface IProps {
    moduleViewStore: IModuleViewStore,
    byNameValue: TModulesFilter['byName'],
}

const SearchModules = observer(( { moduleViewStore, byNameValue }: IProps ) => {

    return (
        <TextField
            onChange={e => moduleViewStore.setFilter('byName',e.target.value)}
            label="Поиск модулей"
            variant="outlined"
            value={byNameValue}
            size={"small"}
        />
    );
});

export { SearchModules };
import { observer } from 'mobx-react-lite'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { IModuleViewStore, TModulesFilter } from 'entities/module/model/types';

interface IProps {
    moduleViewStore: IModuleViewStore,
    byOrderValue: TModulesFilter['byOrder'],
}

const FilterModules = observer(( { moduleViewStore, byOrderValue }: IProps ) => {
    return (
        <>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={byOrderValue}
                label="Age"
                onChange={e => moduleViewStore.setFilter('byOrder', e.target.value)}
                size={"small"}
            >
                <MenuItem value={'asc'}>По возрастанию</MenuItem>
                <MenuItem value={'desc'}>По убыванию</MenuItem>
            </Select>
        </>
    );
});

export { FilterModules };
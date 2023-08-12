import Grid from '@mui/material/Grid';
import { observer} from 'mobx-react-lite'
import styles from './styles.module.css';
import { AddModule } from 'features/add-module/AddModule';
import { FilterModules } from 'features/filter-modules/FilterModules';
import { SearchModules } from 'features/search-modules/SearchModules';
import { ShowModules } from 'features/show-modules/ShowModules';
import { useModuleStore } from 'entities/module';

const ModulesPage = observer(() => {
    const moduleStore = useModuleStore();
    if (!moduleStore) return;

    return (
        <>
            <div className={styles.containerOuter}>
            <Grid container className={styles.containerInner}>
                <Grid item xs={12} className={styles.firstRow} >
                    <AddModule
                        moduleStore={moduleStore}/>
                    <FilterModules
                        moduleViewStore={moduleStore.view}
                        byOrderValue={moduleStore.view.filters.byOrder}/>
                    <SearchModules
                        moduleViewStore={moduleStore.view}
                        byNameValue={moduleStore.view.filters.byName}/>
                </Grid>
                <Grid item xs={12}>
                    <ShowModules
                        modules={moduleStore.view.filteredModules} />
                </Grid>
            </Grid>
        </div>
        </>
    );
});

export { ModulesPage };
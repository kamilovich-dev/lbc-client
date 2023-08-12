import { observer } from 'mobx-react-lite';
import styles from './styles.module.css'
import { Logout } from 'features/logout/Logout';

const AppHeader = observer(() => {

    return (
        <div className={styles.header}>
            <Logout />
        </div>
    );
});

export { AppHeader };
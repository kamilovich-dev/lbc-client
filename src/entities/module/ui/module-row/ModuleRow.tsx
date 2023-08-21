import { observer } from 'mobx-react-lite';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import styles from './styles.module.css';

interface IProps {
    moduleName: string,
    cardsCount: number,
    ButtonDelete: JSX.Element,
    ButtonEdit: JSX.Element,
}

const ModuleRow = observer(( { moduleName, cardsCount, ButtonDelete, ButtonEdit }: IProps ) => {

    return (
        <>
            <Paper elevation={1} className={styles.row}>
                <Stack spacing={2} direction="row">
                    <div>
                        <Typography
                            variant="subtitle1">{cardsCount} терминов</Typography>
                        <Typography
                            variant="h6">{moduleName}</Typography>
                    </div>
                    <div className={styles.rightSide}>
                        {ButtonDelete}
                        {ButtonEdit}
                    </div>
                </Stack>
            </Paper>
        </>
    );
});

export { ModuleRow };
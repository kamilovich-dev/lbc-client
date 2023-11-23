import { observer } from 'mobx-react-lite';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TextString } from 'shared/ui/texts/TextString';
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
                    <div className='overflow-hidden'>
                        <Typography
                            variant="subtitle1">{cardsCount} терминов</Typography>
                        <TextString
                            customClassName='font-semibold text-xl text-slate-800 py-1'
                            maxLength={64}
                            text={moduleName}
                        />
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
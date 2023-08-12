import SvgIcon from '@mui/material/SvgIcon';
import EditIcon from '@mui/icons-material/Edit';
import styles from './styles.module.css';

interface IProps {
    onClick: ( params: any ) => any;
}

const ButtonEdit = ( { onClick }: IProps ) => {
    return (
        <div className={styles.edit} onClick={onClick}>
            <SvgIcon
                     className={styles.icon}>
                <EditIcon/>
            </SvgIcon>
        </div>
    );
};

export { ButtonEdit }


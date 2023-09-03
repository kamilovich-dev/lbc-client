import SvgIcon from '@mui/material/SvgIcon';
import EditIcon from '@mui/icons-material/Edit';

interface IProps {
    isEdit?: boolean,
    onClick: ( params: any ) => any;
}

const ButtonEdit = ( { onClick, isEdit}: IProps ) => {
    return (
        <button className='w-10 h-10 flex rounded-full justify-center items-center hover:bg-slate-200 active:bg-slate-300'
             onClick={onClick}>
            <SvgIcon
                     className={isEdit ?  'text-yellow-500' : 'text-slate-500'}>
                <EditIcon/>
            </SvgIcon>
        </button>
    );
};

export { ButtonEdit }


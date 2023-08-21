import SvgIcon from '@mui/material/SvgIcon';
import EditIcon from '@mui/icons-material/Edit';

interface IProps {
    onClick: ( params: any ) => any;
}

const ButtonEdit = ( { onClick }: IProps ) => {
    return (
        <div className='w-10 h-10 flex rounded-full justify-center items-center hover:bg-slate-200 active:bg-slate-300'
             onClick={onClick}>
            <SvgIcon
                     className='text-slate-500'>
                <EditIcon/>
            </SvgIcon>
        </div>
    );
};

export { ButtonEdit }


import SvgIcon from '@mui/material/SvgIcon';
import DeleteIcon from '@mui/icons-material/Delete';

interface IProps {
    onClick: ( params: any ) => any;
}

const ButtonDelete = ( { onClick }: IProps ) => {
    return (
        <button className='w-10 h-10 flex rounded-full justify-center items-center hover:bg-slate-200 active:bg-slate-300'
              onClick={onClick}>
            <SvgIcon
                     className='text-red-500'>
                <DeleteIcon/>
            </SvgIcon>
        </button>
    );
};

export { ButtonDelete }
import SvgIcon from '@mui/material/SvgIcon';
import GradeIcon from '@mui/icons-material/Grade';

interface IProps {
    isFavorite: boolean | undefined,
    onClick: ( params: any ) => any;
}

const ButtonFavoriteStar = ( { isFavorite, onClick }: IProps ) => {
    return (
        <button className='w-10 h-10 flex rounded-full justify-center items-center hover:bg-slate-200 active:bg-slate-300'
              onClick={onClick}>
            <SvgIcon
                     className={ isFavorite ? 'text-yellow-400' : 'text-slate-300'}>
                <GradeIcon/>
            </SvgIcon>
        </button>
    );
};

export { ButtonFavoriteStar }
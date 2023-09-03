import SvgIcon from '@mui/material/SvgIcon';
import GradeIcon from '@mui/icons-material/Grade';

interface IProps {
    isFavorite: boolean | undefined,
    onClick: ( params: any ) => any;
}

const FavoriteStar = ( { isFavorite, onClick }: IProps ) => {
    return (
        <button className='w-10 h-10 flex rounded-full justify-center items-center hover:bg-slate-200 active:bg-slate-300'
              onClick={onClick}>
            <SvgIcon
                     className={ isFavorite ? 'text-yellow-500' : 'text-slate-500'}>
                <GradeIcon/>
            </SvgIcon>
        </button>
    );
};

export { FavoriteStar }
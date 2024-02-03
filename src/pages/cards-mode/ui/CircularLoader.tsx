import CircularProgress from '@mui/material/CircularProgress';

export const CircularLoader = () => {
    return (
        <div className="w-3/4 p-10 m-auto">
            <div className='flex justify-center'>
                <CircularProgress size={250}/>
            </div>
        </div>)
}
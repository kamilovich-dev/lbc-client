import CircularProgress from '@mui/material/CircularProgress';

export const CircularLoader = () => {
    return (
        <div className="top-0 left-0 bottom-0 right-0 m-auto absolute flex items-center justify-center">
            <div>
                <CircularProgress
                    sx={{color: '#60A5FA'}}
                    size={150}/>
            </div>
        </div>)
}
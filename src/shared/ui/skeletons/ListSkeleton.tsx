import { Skeleton } from '@mui/material';

export function ListSkeleton() {
    return <div className='flex justify-center flex-col gap-2'>
                <div className='flex gap-2'>
                {Array.from(new Array(3)).map((item, index) => {
                    return <div key={index}><Skeleton  variant="rounded" width={210} height={60} /></div>
                })}
            </div>
            {Array.from(new Array(7)).map((item, index) => {
                return <div key={index}><Skeleton  variant="rounded" width={'100%'} height={'100px'} /></div>
            })}
        </div>
}
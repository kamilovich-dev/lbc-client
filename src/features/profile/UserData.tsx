import Avatar from '@mui/material/Avatar';

interface IProps {
    avatarUrl: string | undefined,
    login: string | undefined
}

export const UserData = ( {avatarUrl, login}: IProps) => {

    return (
        <div className='flex gap-2 p-1 items-center'>
            <div>
            {avatarUrl ?
                <div className='w-[50px] h-[50px] rounded-full overflow-hidden border-blue-200 border-[1px] '>
                    <img className='w-full h-full object-cover' src={avatarUrl} />
                </div>
                :
                <div>
                    <Avatar alt="User's avatar" sx={{ width: 50, height: 50, fontSize: 40}}>
                        {login ? login[0] : '?'}
                    </Avatar>
                </div>}
            </div>
            <div className='text-lg font-semibold text-gray-600'>
                {login ?? 'noname'}
            </div>
        </div>

    )
}
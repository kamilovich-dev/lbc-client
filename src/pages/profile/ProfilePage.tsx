import Avatar from '@mui/material/Avatar';
import { AuthButton } from 'entities/session';

export function ProfilePage() {

    const profileData = [
        {
            email: 'togawahandsome@gmail.com',
            firstName: 'Данияр',
            lastName: 'Салихов',
            fatherName: 'Камилович',
            birthDate: '07.06.1997',
        }
    ]

    const dataArray = Object.entries(profileData[0]).map(item => {
        const rusNames: any = {
            email: 'E-mail',
            firstName: 'Имя',
            lastName: 'Фамилия',
            fatherName: 'Отчество',
            birthDate: 'Дата рождения'
        }
        return [rusNames[item[0]] ?? '', item[1]]
    })

    return(
        <>
            <div className='p-4 md:w-[768px] md:self-center'>
                <div className='flex items-center gap-2 mb-2'>
                    <div className='text-md font-bold text-gray-500 flex-auto'>Данные пользователя</div>
                    <div className=''>
                        <AuthButton/>
                    </div>
                </div>
                <div className='mb-8'>
                    <Avatar alt="User's avatar" sx={{ width: 130, height: 130, fontSize: 50}}>T</Avatar>
                </div>
                <div className='flex flex-col gap-4 mb-6'>
                    {dataArray.map( (item, index) =>
                        <div className='flex items-center gap-2' key={index}>
                            <div className='text-gray-500 text-md min-w-[25%] max-w-[25%]'>
                               {item[0]}
                            </div>
                            <div className='bg-gray-200 text-gray-500 flex items-center p-3 rounded-lg flex-auto'>
                                {item[1]}
                            </div>
                        </div>
                    )}
                </div>
                <button className='bg-blue-400 drop-shadow-sm rounded-lg p-2 w-32 text-center text-white hover:bg-blue-500 active:bg-blue-600'>Изменить</button>
            </div>

        </>
    )
}
import { observer } from 'mobx-react-lite';
import { AuthButton } from 'widgets/app-header/AuthButton';
import { AppNavigation } from 'features/navigation';


const AppHeader = observer(() => {

    return (
        <div className='flex h-16 items-center p-2 bg-[#191722] border-b-2 border-gray-300'>
            <div className='flex justify-start h-full w-4/6 mx-auto'>
                <AppNavigation/>
            </div>
            <div className='absolute right-4'>
                <AuthButton />
            </div>
        </div>
    );
});

export { AppHeader };
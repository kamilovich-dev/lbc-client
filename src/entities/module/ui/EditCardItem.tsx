import { observer } from 'mobx-react-lite';

interface IProps {
    cardIdx: number,
    Term: JSX.Element,
    Definition: JSX.Element,
    Image: JSX.Element,
    DeleteCard: JSX.Element,
}

const EditCardItem = observer(( { cardIdx, DeleteCard, Term, Definition, Image }: IProps ) => {

    return (
        <>
            <div className='bg-white shadow-md p-3 rounded-md '>
                <div className='flex border-b-2 border-gray-100 pb-2 items-center mb-3'>
                    <div className='w-full font-semibold text-gray-400 text-sm'>
                        {cardIdx + 1}
                    </div>
                    <div>
                        {DeleteCard}
                    </div>
                </div>
                <div className='flex gap-20 md-max:gap-4 mb-2 h-full '>
                    <div className='w-1/2 flex flex-col '>
                        <div className='mb-2 flex-auto'>
                            {Term}
                        </div>
                        <div className='h-24 rounded-md overflow-hidden'>
                            {Image}
                        </div>
                    </div>
                    <div className='w-1/2'>
                        {Definition}
                    </div>
                </div>
            </div>
        </>
    );
});

export { EditCardItem };
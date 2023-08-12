import { observer } from 'mobx-react-lite';

interface IProps {
    cardIdx: number,
    Term: JSX.Element,
    Definition: JSX.Element,
    DeleteCard: JSX.Element,
}

const CardRow = observer(( { cardIdx, DeleteCard, Term, Definition }: IProps ) => {
    return (
        <>
            <div className='bg-white shadow-md p-4 rounded-md '>
                <div className='flex border-b-2 border-gray-100 pb-2 items-center mb-5'>
                    <div className='w-full font-bold font text-gray-400'>
                        {cardIdx + 1}
                    </div>
                    <div>
                        {DeleteCard}
                    </div>
                </div>
                <div className='flex gap-20'>
                    <div className='w-1/2'>
                        {Term}
                    </div>
                    <div className='w-1/2'>
                        {Definition}
                    </div>
                </div>
            </div>
        </>
    );
});

export { CardRow };
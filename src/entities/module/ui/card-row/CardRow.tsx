import { observer } from 'mobx-react-lite';

interface IProps {
    cardIdx: number,
    Term: JSX.Element,
    Definition: JSX.Element,
    Image: JSX.Element,
    DeleteCard: JSX.Element,
}

const CardRow = observer(( { cardIdx, DeleteCard, Term, Definition, Image }: IProps ) => {
    return (
        <>
            <div className='bg-white shadow-md p-3 rounded-md '>
                <div className='flex border-b-2 border-gray-100 pb-2 items-center mb-3'>
                    <div className='w-full font-bold font text-gray-400'>
                        {cardIdx + 1}
                    </div>
                    <div>
                        {DeleteCard}
                    </div>
                </div>
                <div className='flex gap-20'>
                    <div className='w-2/5'>
                        {Term}
                    </div>
                    <div className='w-2/5'>
                        {Definition}
                    </div>
                    <div className='w-1/5'>
                        {Image}
                    </div>
                </div>
            </div>
        </>
    );
});

export { CardRow };
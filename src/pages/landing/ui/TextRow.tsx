
interface IProps {
    number: string,
    text: string,
    backgroundColor: string,
}

const TextRow = ( {number, text, backgroundColor}: IProps ) => {

    return (
        <div
             className={`flex items-center gap-6 ${backgroundColor} p-2 w-full border-white mb-4 last:mb-0 rounded-md select-none shadow-md border-l-8 border-2
                duration-100 hover:bg-emerald-500 hover:translate-x-2 hover:shadow-emerald-300 hover:shadow-lg`}>
            <div className="text-4xl text-white md-max:text-2xl">
                {number}
            </div>
            <div className="text-2xl text-white md-max:text-xl">
                {text}
            </div>
        </div>
    )
}

export { TextRow }
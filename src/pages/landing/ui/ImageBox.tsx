
interface IProps {
    src: string
}

const ImageBox = ( { src }: IProps ) => {

    return (
        <>
            <div className="w-full h-full rounded-3xl overflow-hidden shadow-lg">
                <img className="w-full h-full object-cover" src={src}></img>
            </div>
        </>
    )
}

export { ImageBox }
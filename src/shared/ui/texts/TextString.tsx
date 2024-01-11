interface IProps {
    text: string,
    maxLength?: number,
    customClassName?: string
}

const TextString = ( { text, maxLength = 32, customClassName }: IProps ) => {

    let isMaxLength = false

    if (text && maxLength) {
        if (text.length > maxLength) isMaxLength = true
            else isMaxLength = false
    }

    return(
        <div className={customClassName}>
            {isMaxLength ? `${text.slice(0, maxLength - 1)}...` : text}
        </div>
    )
}

export { TextString }
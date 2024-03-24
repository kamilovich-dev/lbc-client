interface IProps {
    text: string | undefined,
    maxLength?: number,
    customClassName?: string
}

const TextString = ( { text, maxLength = 32, customClassName }: IProps ) => {

    let isMaxLength = false
    let processedText = text ?? ''

    if (processedText && maxLength) {
        isMaxLength = processedText.length > maxLength ? true : false
    }

    return(
        <div className={customClassName}>
            {isMaxLength ? `${processedText.slice(0, maxLength - 1)}...` : text}
        </div>
    )
}

export { TextString }
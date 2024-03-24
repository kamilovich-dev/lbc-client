import SvgIcon from '@mui/material/SvgIcon';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';

interface IProps {
    helpText: string,
    showHelp: boolean,
    handleClick: (args: any) => void
}

const Help = ( {handleClick, helpText, showHelp}: IProps) => {

    return (
        <>
            <div className={'flex font-semibold w-fit gap-2 items-center rounded-full pl-2 pr-3 py-1 ' + (showHelp ? 'bg-gray-100' : '') } onClick={handleClick}>
                <div>
                    <SvgIcon
                        fontSize='medium'
                        htmlColor='#586380'>
                        <EmojiObjectsOutlinedIcon/>
                    </SvgIcon>
                </div>
                <div>
                    <span className='text-sm text-gray-500'>{ helpText }</span>
                </div>
            </div>
        </>
    )
}

export { Help }
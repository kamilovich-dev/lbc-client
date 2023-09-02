import SvgIcon from '@mui/material/SvgIcon';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';

interface IProps {

}

const Help = () => {

    return (
        <>
            <div className=''>
                <SvgIcon
                    fontSize='medium'
                    htmlColor='#586380'>
                    <EmojiObjectsOutlinedIcon/>
                </SvgIcon>
                <span className=''>{ showHelp ? helpText[0] + '_'.repeat(words[0].length - 1) : 'Показать подсказку'}</span>
            </div>
        </>
    )
}

export { Help }
import { createUseStyles } from 'react-jss';

//hightlightKnowsStage: -1:no highlight; 0:doesnt know -1; 1:know -1; 2:doesnt know +1; 3:know +1
const useStyles = createUseStyles({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    text: props => ({
        display: 'flex',
        alignItems: 'center',
        color: '#D05700',
        fontWeight: 'bold',
        fontSize: '16px',
    }),
    count: props => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '16px',
        color: (props.hightlightKnowsStage == 0 || props.hightlightKnowsStage == 2) ? 'white' : '#D05700',
        backgroundColor: (props.hightlightKnowsStage == 0 || props.hightlightKnowsStage == 2) ? '#D05700' : '#FFF6EF',
        width: '50px',
        border: (props.hightlightKnowsStage == 0 || props.hightlightKnowsStage == 2) ? '1px solid #D05700' : '1px solid #FECB9D',
        borderRadius: '20px',
        height: '30px'
    }),
})

export default useStyles;
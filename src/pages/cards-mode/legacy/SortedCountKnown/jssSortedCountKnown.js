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
        color: '#18AE79',
        fontWeight: 'bold',
        fontSize: '16px',
    }),
    count: props => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '16px',
        color: (props.hightlightKnowsStage == 1 || props.hightlightKnowsStage == 3) ? 'white' : '#18AE79',
        backgroundColor: (props.hightlightKnowsStage == 1 || props.hightlightKnowsStage == 3) ? '#18AE79' : '#E6FCF4',
        width: '50px',
        border: (props.hightlightKnowsStage == 1 || props.hightlightKnowsStage == 3) ? '1px solid #18AE79' : '1px solid #98F1D1',
        borderRadius: '20px',
        height: '30px'
    }),
})

export default useStyles;
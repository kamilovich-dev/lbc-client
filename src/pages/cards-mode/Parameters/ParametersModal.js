import React from 'react';
import useStyles from './jssParameters';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';

export default function ParametersModal( {isSorted, handleSortedChange, isOnlyStars, handleOnlyStarChange, answerType, handleAnswerTypeChange, handleCloseParametersModalClick, handleRestartClick, cards }) {
    const jss = useStyles();
    const calculatedOnlyStarDisabled = calculateOnlyStarDisabled();

    function calculateOnlyStarDisabled() {
        let isDisabled = true;
        cards.forEach( item => {
            if (item.starFilled) isDisabled = false;
        })
        return isDisabled;
    }

    function _handleRestartClick() {
        handleRestartClick();
        handleCloseParametersModalClick();
    }

    return(
        <>
            <div className={jss.parametersModal}>
                <DialogTitle >
                Параметры
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseParametersModalClick}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: 'gray',
                        }}
                        >
                        <CloseIcon />
                    </IconButton>
                 </DialogTitle>
                 <div className={jss.sort}>
                    <div className={jss.sortHead}>Сортировка карточек</div>
                    <div className={jss.sortSwitch}>
                        <Switch
                            checked={isSorted}
                            onChange={handleSortedChange} />
                    </div>
                 </div>
                 <div className={jss.sortExplain}>
                    <div className={jss.sortExplainText}>Рассортируйте карточки, чтобы сосредоточиться на терминах, которые вам нужно повторить. <br/>
                    Выключите сортировку, если хотите быстро просмотреть карточки.</div>
                 </div>
                 <div className={jss.star}>
                    <div className={jss.starHead}>Изучать только термины с ★</div>
                    <div className={jss.starSwitch}>
                        <Switch
                            checked={isOnlyStars}
                            onChange={handleOnlyStarChange}
                            disabled={calculatedOnlyStarDisabled}/>
                    </div>
                 </div>
                 <div className={jss.answer}>
                    <div className={jss.answerhead}>Ответ</div>
                    <div className={jss.annswerSelect}>
                        <Select
                            onChange={handleAnswerTypeChange}
                            value={answerType}
                        >
                            <MenuItem value={0}>Термины</MenuItem>
                            <MenuItem value={1}>Определения</MenuItem>
                            <MenuItem value={2}>Термины и определения</MenuItem>
                        </Select>
                    </div>
                 </div>
                 <div className={jss.keys}>
                    <div className={jss.keysHead}>Сочетания клавиш</div>
                    <div className={jss.keysList}><List /></div>
                 </div>
                 <div className={jss.restart} onClick={_handleRestartClick}>
                    <div className={jss.restartHead}>Пройти карточки заново</div>
                 </div>
            </div>
        </>
    )
}
import React from 'react';
import useStyles from './jssResult';
import ResultChart from 'routes/moduleId/cards/components/ResultChart/ResultChart';

export default function Result( {isSorted, knownCount, cardsCount, setShowResult, handleRestartClick} ) {
    const jss = useStyles();
    return(
        <>
            <div className={jss.wrapper}>
                <div className={jss.head}>
                    <div className={jss.headText}>Поздравляем! Вы повторили все карточки</div>
                </div>
                <div className={jss.grid}>
                    <div className={jss.resultHeadText}>Ваши результаты</div>
                    <div className={jss.nextStepsText}>Следующие шаги</div>
                    <div className={jss.result}>
                        <div className={jss.resultDiagram}>
                            <ResultChart
                                knownCount={knownCount}
                                cardsCount={cardsCount}/>
                            <div className={jss.resultDiagramText}>{Math.round(knownCount/cardsCount*100)} %</div>
                        </div>
                        <div className={jss.resultPassed}>{isSorted ? 'Знаю' : 'Пройдено'}</div>
                        <div className={jss.resultPassedCount}>
                            <div className={jss.resultPassedCountBack}>
                                <div className={jss.resultPassedCountText}>{knownCount}</div>
                            </div>
                        </div>
                        <div className={jss.resultLeft}>{isSorted ? 'Еще изучаю' : 'Осталось терминов'}</div>
                        <div className={jss.resultLeftCount}>
                            <div className={jss.resultLeftCountBack}>
                                <div className={jss.resultLeftCountText}>{cardsCount-knownCount}</div>
                            </div>
                        </div>
                    </div>
                    <div className={jss.nextMode}>
                        <div className={jss.nextModeItemImage}>
                            <div className={jss.nextModeImage}></div>
                        </div>
                        <div className={jss.nextModeHeadText}>Выучите эти термины</div>
                        <div className={jss.nextModeText}>Ответьте на вопросы по этим терминам, чтобы закрепить знания</div>
                    </div>
                    <div className={jss.returnToLastQuestion} onClick={() => setShowResult(false)}>{'<-'} Вернуться к последнему вопросу</div>
                    <div className={jss.restart} onClick={handleRestartClick}>
                        <div className={jss.nextModeItemImage}>
                            <div className={jss.nextModeImage}></div>
                        </div>
                        <div className={jss.nextModeHeadText}>Пройти карточки заново</div>
                        <div className={jss.nextModeText}>Изучите эти термины заново с начала</div>
                    </div>
                </div>
            </div>
        </>
    )
}
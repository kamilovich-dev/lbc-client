import React, { useState, useEffect } from 'react';
import useStyles from './jssCard';
import Dialog from '@mui/material/Dialog';
import { useSpring, animated, config } from 'react-spring';

import FastEdit from 'routes/moduleId/cards/components/FastEdit/FastEdit';
import FastEditModal from 'routes/moduleId/cards/components/FastEdit/FastEditModal';
import Star from 'routes/moduleId/cards/components/Star/Star';
import Help from 'routes/moduleId/cards/components/Help/Help';

export default function Card( { card, module, setModule, showHelp, setShowHelp, autoplayRef, handleStarClick, answerType,
    cardsNavigationStage, // -1: no animation; 0: only reset card; 1: prev; 2: next;
    sortedCardsNavigationStage, // -1: no animation; 0: only reset; 1: sorted cancel; 2: sorted doesnt know; 3: sorted know
    setCardsNavigationStage,
    setSortedCardsNavigationStage,
 } ) {
    const [showFastEditModal, setShowFastEditModal] = useState(false);
    const [flipAngle, setFlipAngle] = useState(0);
    const jss = useStyles();

    const mainAnimations = {

        prev: { /* 1 */
            from: { transform: `translateX(-80px) rotateY(20deg)`},
            to: { transform: `translateX(0px) rotateY(0deg)'}`},
        },
        next: { /* 2 */
            from: { transform: 'translateX(80px) rotateY(-20deg)' },
            to: { transform: 'translateX(0px) rotateY(0deg)'},
        },

        sortedCanceled: { /* 1 */
            from: { transform: 'translateX(100px)', opacity: '0' },
            to: { transform: 'translateX(0px)', opacity: '1'},
        },
        sortedUnknown: { /* 2 */
            from: { transform: 'translateZ(20px) rotateZ(2deg)' },
            to: { transform: 'translateZ(0px) rotateZ(0deg)'},
        },
        sortedKnown: { /* 3 */
            from: { transform: 'translateZ(20px) rotateZ(-2deg)' },
            to: { transform: 'translateZ(0px) rotateZ(0deg)'},
        },

        flip: {
            from: { transform : `rotateX(${flipAngle == 0 ? 0 : flipAngle - 180}deg)`},
            to: { transform : `rotateX(${flipAngle}deg)` },
        },
    }

    useEffect(() => {
        const interval = 300;

        if (cardsNavigationStage !== -1 || sortedCardsNavigationStage !== -1) {
            setFlipAngle(0);
        }

        if (cardsNavigationStage == 0) {
            setCardsNavigationStage(-1);
        }

        if (sortedCardsNavigationStage == 0) {
            setSortedCardsNavigationStage(-1);
        }

        //Animations for unsorted navigation
        if (cardsNavigationStage >= 1) {
            apiMain.start({
                ...mainAnimations.flip,
                config: {duration: 0}
            });
            apiMain.start({
                ...mainAnimations[cardsNavigationStage == 1 ? 'prev' : 'next'],
                config: {duration: interval}
            });
            const timerID = setTimeout(() => {
                setCardsNavigationStage(-1);
            }, interval);
            return () => clearTimeout(timerID);
        }

        //Animations for sorted navigation
        if (sortedCardsNavigationStage >= 1) {
            apiMain.start({
                ...mainAnimations.flip,
                config: {duration: 0}
            });
            apiMain.start({
                ...mainAnimations[sortedCardsNavigationStage == 1 ? 'sortedCanceled' :
                                    sortedCardsNavigationStage == 2 ? 'sortedUnknown' : 'sortedKnown'],
                config: {duration: interval}
            });
            const timerID = setTimeout(() => {
                setSortedCardsNavigationStage(-1);
            }, interval);
            return () => clearTimeout(timerID);
        }

        //Standart flip animation
        apiMain.start({
            ...mainAnimations.flip,
            config: {duration: interval}
        });

    }, [cardsNavigationStage, sortedCardsNavigationStage, flipAngle])

    const [mainAnimation, apiMain] = useSpring(() => ({
    }));

    function handleCardClick() {
        setFlipAngle(flipAngle + 180);
    }

    function handleFastEditClick(e) {
        setShowFastEditModal(true);
        e.stopPropagation();
    }

    function handleCloseFastEditModalClick(e) {
        setShowFastEditModal(false);
        e.stopPropagation();
    }

    function handleClickShowHelp(e) {
        setShowHelp(!showHelp);
        e.stopPropagation();
    }

    const headRow = (
        <div className={jss.headRow}>
            <div className={jss.headRowItemsLeft}>
                {answerType == 2 ? ''
                    : (
                        <Help
                        showHelp={showHelp}
                        handleClickShowHelp={handleClickShowHelp}
                        helpText={card.definition}/>)}
            </div>
            <div className={jss.headRowItemsRight}>
                <FastEdit
                    handleFastEditClick={handleFastEditClick}/>
                <Star
                    card={card}
                    module={module}
                    setModule={setModule}
                    handleStarClick={handleStarClick}/>
            </div>
        </div>
    )

    const flipCard = (
        <div className={jss.wrapper}>
            <animated.div className={jss.flipCard} style={{...mainAnimation}} onClick={handleCardClick} ref={autoplayRef}> {/*data-autoplay необходим для автовоспроизведения*/}
                <div className={jss.front}>
                    {headRow}
                    <div className={jss.text}>
                        {answerType == 0 ? card.term : card.definition}
                    </div>
                </div>
                <div className={jss.back}>
                    {headRow}
                    <div className={jss.text}>
                        {answerType == 0 ? card.definition : card.term}
                    </div>
                </div>
            </animated.div>
        </div>
    )

    const dividedCard = (
        <div className={jss.divided}>
            <div className={jss.dividedFront}>
                {headRow}
                <div className={jss.text}>
                    {card.term}
                </div>
            </div>
            <div className={jss.dividedBack}>
                <div className={jss.text}>
                    {card.definition}
                </div>
            </div>
        </div>
    )

    const cardBody = (answerType == 0 || answerType == 1) ? flipCard : dividedCard;

    return (
        <>
            {cardBody}
            <Dialog
                open={showFastEditModal}
                onClose={() =>handleCloseFastEditModalClick(false)}>
                    <FastEditModal
                        card={card}
                        module={module}
                        setModule={setModule}
                        handleCloseFastEditModalClick={handleCloseFastEditModalClick}/>
            </Dialog>
        </>
    )
}
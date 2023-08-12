import React, { useState, useEffect } from 'react';
import useStyles from './jssView';
import { useParams } from 'react-router-dom';
import { getModules } from 'data/module-row';
import Dialog from '@mui/material/Dialog';

import ModesNavigation from 'routes/moduleId/cards/components/ModesNavigation/ModesNavigation';
import CardsCounter from 'routes/moduleId/cards/components/CardsCounter/CardsCounter';
import Parameters from 'routes/moduleId/cards/components/Parameters/Parameters';
import ReturnToModule from 'routes/moduleId/cards/components/ReturnToModule/ReturnToModule';
import ProgressLine from 'routes/moduleId/cards/components/ProgressLine/ProgressLine';
import Card from 'routes/moduleId/cards/components/Card/Card';
import CardsNavigation from 'routes/moduleId/cards/components/CardsNavigation/CardsNavigation';
import Autoplay from 'routes/moduleId/cards/components/Autoplay/Autoplay';
import MixCards from 'routes/moduleId/cards/components/MixCards/MixCards';
import Result from 'routes/moduleId/cards/components/Result/Result';
import ParametersModal from 'routes/moduleId/cards/components/Parameters/ParametersModal';
import SortedCancel from 'routes/moduleId/cards/components/SortedCancel/SortedCancel';
import SortedCardsNavigation from 'routes/moduleId/cards/components/SortedCardsNavigation/SortedCardsNavigation';
import SortedCountKnown from 'routes/moduleId/cards/components/SortedCountKnown/SortedCountKnown';
import SortedCountUnknown from 'routes/moduleId/cards/components/SortedCountUnknown/SortedCountUnknown';

export default function View() {
    const jss = useStyles();
    const params = useParams();
    const [originModule, setOriginModule] = useState(getModules().find( item => item.id == params.moduleId));
    const [module, setModule] = useState(originModule);
    const [knows, setKnows] = useState(module.cards.map( item => null));
    const [cardIndex, setCardIndex] = useState(0);
    const [isSorted, setIsSorted] = useState(false);
    const [isMixed, setIsMixed] = useState(false);
    const [isOnlyStars, setIsOnlyStars] = useState(false);
    const [cardsNavigationStage, setCardsNavigationStage] = useState(-1);// -1: no animation; 0: only reset card; 1: prev; 2: next;
    const [sortedCardsNavigationStage, setSortedCardsNavigationStage] = useState(-1); // -1: no animation; 0: only reset; 1: sorted cancel; 2: sorted doesnt know; 3: sorted know
    const [autoplayStage, setAutoplayStage] = useState(-1);// -1:stopped; >-1:autoplaying
    const [hightlightKnowsStage, setHighlightKnowsStage] = useState(-1); // -1:no highlight; 0:doesnt know -1; 1:know -1; 2:doesnt know +1; 3:know +1
    const [showResult, setShowResult] = useState(false);
    const [showParametersModal, setShowParametersModal] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [answerType, setAnswerType] = useState(0); // 0 - termins; 1 - definitions; 2 - termins and definitions
    const autoplayStageRef = React.useRef(autoplayStage); //To get actual autoplayStage value in timer
    const cardIndexRef = React.useRef(cardIndex); //To get actual cardIndex value in timer
    const cardAutoplayRef = React.useRef(null);
    const navigationAutoplayNextRef = React.useRef(null);


    useEffect(() => {
        cardIndexRef.current = cardIndex;
        autoplayStageRef.current = autoplayStage;
    }, [cardIndex, autoplayStage]);

    useEffect( () => {
        if (isSorted && cardIndex < module.cards.length - 1) {
            const _knows = [...knows];
            _knows[cardIndex] = null;
            setKnows(_knows);
        }
    }, [cardIndex, showResult]);

    useEffect(() => {
        if (isMixed) { //mixing module-row cards
            const _module = {...module};
            const _cards = [..._module.cards]
            for (let i = _cards.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [_cards[i], _cards[j]] = [_cards[j], _cards[i]];
            }
            _module.cards = _cards;
            setModule(_module);
        } else {
            setModule(originModule); //to show original module-row cards
        }

        if (isOnlyStars) {
            const _module = {...module};
            const _cards = [..._module.cards];
            const onlyStarCards = [];
            _cards.forEach( item => {
                if (item.starFilled == true) onlyStarCards.push(item)
            });
            _module.cards = onlyStarCards;
            setModule(_module);
        }
    }, [isOnlyStars, isMixed])

    useEffect(() => {
        if (autoplayStage != -1) { //Autoplaying of cards with selected interval
            const intervalTime = 2000;
            const cardAutoplayElement = cardAutoplayRef.current;
            const navigationAutoplayElement = navigationAutoplayNextRef.current;

            const timerId = setTimeout( () => {
                if (autoplayStageRef.current == -1) return; //getting latest value of autoplayStage
                if (cardIndex == module.cards.length - 1 && autoplayStage == 1) { //show result after last definition
                    setShowResult(true);
                    return;
                }
                if (autoplayStage == 0) {
                    cardAutoplayElement?.click();
                    setAutoplayStage(1);
                }
                if (autoplayStage == 1) {
                    navigationAutoplayElement?.click();
                    setAutoplayStage(0);
                }
            }, intervalTime);

            return () => clearTimeout(timerId);
        }
    }, [autoplayStage]);

    useEffect(() => {
        if (hightlightKnowsStage != -1) { //Highliting of known/unknown counters
            const intervalTime = 500;
            const timerId = setTimeout( () => setHighlightKnowsStage(-1), intervalTime);
            return () => clearTimeout(timerId);
        }
    }, [hightlightKnowsStage, cardIndex])

    const handleCardsNavigationClick = (where) => {
        if (where == 'prev') {
            setCardIndex(cardIndex > 0 ? cardIndex - 1 : cardIndex);
            setCardsNavigationStage(1);
        }
        if (where == 'next') {
            setCardIndex(cardIndex < module.cards.length - 1 ? cardIndex + 1 : cardIndex);
            setCardsNavigationStage(2);
            if (cardIndex == module.cards.length - 1) setShowResult(true);
        }
        setShowHelp(false);
    }

    const handleSortedCardsNavigationClick = (know) => {
        const _knows = [...knows];
        _knows[cardIndex] = know;
        setCardIndex(cardIndex < module.cards.length - 1 ? cardIndex + 1 : cardIndex);
        setSortedCardsNavigationStage(know ? 3 : 2);
        if (cardIndex == module.cards.length - 1) setShowResult(true);
        setKnows(_knows);
        setShowHelp(false);
        setHighlightKnowsStage(know ? 3 : 2);
    }

    const handleAutoplayClick = () => {
        let newAutoplayStage = autoplayStage == -1 ? 0 : -1;
        if (newAutoplayStage == 0) setCardsNavigationStage(0);
        setAutoplayStage(newAutoplayStage);
    }

    const handleMixedClick = () => {
        const newIsMixed = !isMixed;
        if (isSorted) handleRestartClick();
        setIsMixed(newIsMixed);
    }

    const handleRestartClick = () => {
        setCardIndex(0);
        setShowResult(false);
        setAutoplayStage(-1);
        setCardsNavigationStage(0);
        setSortedCardsNavigationStage(0);
        const _knows = [...knows];
        setKnows(_knows.map(item => null));
    }

    const handleCloseParametersModalClick = () => {
        setShowParametersModal(false);
    }

    const handleSortedChange = () => {
        const newIsSorted = !isSorted;
        if (newIsSorted) handleRestartClick();
        setIsSorted(newIsSorted)
    }

    const handleOnlyStarChange = () => {
        const newIsOnlyStars = !isOnlyStars;
        if (newIsOnlyStars) handleRestartClick();
        setIsOnlyStars(newIsOnlyStars);
    }

    const handleAnswerTypeChange = (e) => {
        setAnswerType(e.target.value);
    }

    const handleSortedCancelClick = () => {
        setCardIndex(cardIndex > 0 ? cardIndex - 1 : cardIndex);
        const _knows = [...knows];
        const prevKnow = _knows[cardIndex - 1];
        setHighlightKnowsStage(prevKnow == true ? 1 :
                                prevKnow == false ? 0 : -1);
        setSortedCardsNavigationStage(1);
    }

    const handleStarClick = () => {
        if (isOnlyStars) {
            const _cards = [...module.cards];
            let isHereCardWithStar = false;
            _cards.forEach( item => {
                if (item.starFilled == true) isHereCardWithStar = true;
            })
            if (!isHereCardWithStar) {
                setIsOnlyStars(false);
                setModule(originModule);
            }
        }
    }

    function calculateKnownCount() {
        const _knows = [...knows];
        const result = {
            unknownCount: 0,
            knownCount: 0
        };
        _knows.forEach(item => {
            if (item == false) result.unknownCount++;
            if (item == true) result.knownCount++;
        })
        return result;
    }

    const calculatedKnowCounts = calculateKnownCount();

    return (
        <>
        <div className={jss.wrapper}>
            <div className={jss.headWrapper}>
                <div className={jss.headWrapperItem}> <ModesNavigation /></div>
                <div className={jss.headWrapperItem}>
                    <CardsCounter
                        cardIndex={cardIndex}
                        cardsCount={module.cards.length}
                        moduleName={module.name} />
                </div>
                <div className={jss.headWrapperItem}>
                    <Parameters
                        setShowParametersModal={setShowParametersModal}/>
                    <ReturnToModule />
                </div>
            </div>
            <div className={jss.centerWrapper}>
                <div className={jss.progressLine}>
                    <ProgressLine
                        currentCount={showResult ? cardIndex + 1 : cardIndex - 1}
                        cardsCount={module.cards.length}
                    />
                </div>
                {showResult ? (
                        <Result
                            isSorted={isSorted}
                            knownCount={isSorted ? calculatedKnowCounts.knownCount : module.cards.length}
                            cardsCount={module.cards.length}
                            setShowResult={setShowResult}
                            handleRestartClick={handleRestartClick}/>
                    ) :
                    (
                        <>
                            {isSorted ? (<div className={jss.top}>
                                    <div className={jss.topItem}>
                                        <SortedCountUnknown
                                                count={calculatedKnowCounts.unknownCount}
                                                hightlightKnowsStage={hightlightKnowsStage}/>
                                    </div>
                                    <div className={jss.topItem}>
                                        <SortedCountKnown
                                                count={calculatedKnowCounts.knownCount}
                                                hightlightKnowsStage={hightlightKnowsStage}/>
                                    </div>
                                </div>) :
                                ('')}
                            <div className={jss.card}>
                                <Card
                                    card={module.cards[cardIndex]}
                                    module={module}
                                    setModule={setModule}
                                    showHelp={showHelp}
                                    setShowHelp={setShowHelp}
                                    autoplayRef={cardAutoplayRef}
                                    handleStarClick={handleStarClick}
                                    answerType={answerType}
                                    cardsNavigationStage={cardsNavigationStage}
                                    setCardsNavigationStage={setCardsNavigationStage}
                                    sortedCardsNavigationStage={sortedCardsNavigationStage}
                                    setSortedCardsNavigationStage={setSortedCardsNavigationStage}
                                />
                            </div>
                            <div className={jss.bottom}>
                                 {isSorted ?
                                        (<>
                                            <div className={jss.bottomColumn}>
                                                <SortedCancel
                                                    cardIndex={cardIndex}
                                                    handleSortedCancelClick={handleSortedCancelClick}/>
                                            </div>
                                            <div className={jss.bottomColumn}>
                                                <SortedCardsNavigation
                                                    know={false}
                                                    handleClick={handleSortedCardsNavigationClick}/>
                                                <SortedCardsNavigation
                                                    know={true}
                                                    handleClick={handleSortedCardsNavigationClick}/>
                                            </div>
                                            <div className={jss.bottomColumn}>
                                                <MixCards
                                                    isMixed={isMixed}
                                                    handleMixedClick={handleMixedClick}/>
                                            </div>
                                        </>) :
                                        (<>
                                            <div className={jss.bottomColumn} >
                                                <Autoplay
                                                    autoplayStage={autoplayStage}
                                                    handleAutoplayClick={handleAutoplayClick}/>
                                            </div>
                                            <div className={jss.bottomColumn} >
                                                <CardsNavigation
                                                    cardIndex={cardIndex}
                                                    where={'prev'}
                                                    handleCardsNavigationClick={handleCardsNavigationClick}/>
                                                <CardsNavigation
                                                    cardIndex={cardIndex}
                                                    where={'next'}
                                                    handleCardsNavigationClick={handleCardsNavigationClick}
                                                    autoplayRef={navigationAutoplayNextRef}/>
                                            </div>
                                            <div className={jss.bottomColumn} >
                                                <MixCards
                                                        isMixed={isMixed}
                                                        handleMixedClick={handleMixedClick}/>
                                            </div>
                                        </>)}
                            </div>
                        </>
                    )
                }
            </div>

        </div>
            <Dialog
                open={showParametersModal}
                onClose={handleCloseParametersModalClick}
                fullWidth={true}
                maxWidth='md'>
                    <ParametersModal
                        handleCloseParametersModalClick={handleCloseParametersModalClick}
                        isSorted={isSorted}
                        handleSortedChange={handleSortedChange}
                        isOnlyStars={isOnlyStars}
                        handleOnlyStarChange={handleOnlyStarChange}
                        answerType={answerType}
                        handleAnswerTypeChange={handleAnswerTypeChange}
                        handleRestartClick={handleRestartClick}
                        cards={module.cards}/>
            </Dialog>
        </>
    )
}
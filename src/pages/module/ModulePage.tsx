import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from "react-router-dom";

import SvgIcon from '@mui/material/SvgIcon';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Button } from '@mui/material'

import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import RepeatIcon from '@mui/icons-material/Repeat';
import QuizIcon from '@mui/icons-material/Quiz';
import FactCheckIcon from '@mui/icons-material/FactCheck';

import { useParams } from "react-router-dom"
import { ICardStore, IModuleStore, ModuleStore, CardStore } from 'entities/module'
import { ToSelectedMode, CardShowRow } from './ui'

interface IProps {
    moduleStore: IModuleStore
    cardStore: ICardStore
}

const ModulePage = () => {
    const moduleStore = new ModuleStore()
    const cardStore = new CardStore();
    return <_ModulePage moduleStore={moduleStore} cardStore={cardStore}/>
}

const _ModulePage = observer(( { moduleStore, cardStore }: IProps ) => {
    const routeParams = useParams();
    const navigate = useNavigate();
    const moduleId = routeParams.moduleId ? parseInt(routeParams.moduleId) : null

    if (!moduleId) return

    useEffect( () => {
        moduleStore.refreshModules()
        cardStore.refreshCards(moduleId)
    }, [])

    const module = moduleStore.getModuleById(moduleId)
    if (!module) return

    const cards = cardStore.cards
    if (!cards) return


    const handleCardsClick = () => {

    }

    const handleEditCardClick = () => {

    }

    const handleFavoriteCardClick = () => {

    }

    return(
        <>
            <div className='mb-4'>
                <Button variant='outlined' onClick={ () => navigate('/modules') } size='small' sx={{fontSize: '14px'}}>
                        <SvgIcon className='mr-2'>
                            <FormatListBulletedIcon></FormatListBulletedIcon>
                        </SvgIcon>
                        К списку модулей
                </Button>
            </div>
            <h1 className='font-bold text-xl text-slate-800 mb-5'>{module.name}</h1>
            <div className='flex items-center gap-2 mb-5'>
                <ToSelectedMode
                    Icon={<ViewCarouselIcon/>}
                    text='Карточки'
                    handleClick={handleCardsClick}/>
                <ToSelectedMode
                    Icon={<RepeatIcon/>}
                    text='Заучивание'
                    handleClick={handleCardsClick}/>
                <ToSelectedMode
                    Icon={<QuizIcon/>}
                    text='Тест'
                    handleClick={handleCardsClick}/>
                <ToSelectedMode
                    Icon={<FactCheckIcon/>}
                    text='Подбор'
                    handleClick={handleCardsClick}/>
            </div>

            <h2 className='font-semibold text-xl text-slate-800 mb-5'>Термины в модуле: {cards.length}</h2>
            { cards.map(card => (
                <div className='mb-2' key={card.id}>
                    <CardShowRow
                        termin={card.term || ''}
                        definition={card.definition || ''}
                        imgUrl={card.imgUrl || ''}
                        handleEditClick={handleEditCardClick}
                        handleFavoriteClick={handleFavoriteCardClick}
                        isFavorite={card.isFavorite || false}
                    />
                </div>

            )) }
        </>
    )
})

export { ModulePage }


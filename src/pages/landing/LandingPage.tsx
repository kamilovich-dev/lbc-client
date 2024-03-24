import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { AppHeader } from "widgets/app-header/AppHeader"
import { TextRow } from './ui'
import { ImageBox } from './ui'

const LandingPage = () => {

    const navigate = useNavigate()
    const appName:string = import.meta.env.VITE_APPLICATION_NAME?.toUpperCase()

    return (
        <>
            <AppHeader/>
                    <div className="bg-gray-50 p-4 pt-14">
                        <div className="w-4/6 mx-auto">
                            <div className="flex justify-center text-6xl font-bold mb-20 text-gray-600 drop-shadow-xl md-max:text-2xl md-max:mb-10">
                                {appName}
                            </div>
                            <div className="text-center mb-20 text-gray-500 text-3xl italic md-max:text-md md-max:mb-10">
                                УЧИ АНГЛИЙСКИЙ ПО КАРТИНКАМ
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-100 p-4 pt-12 pb-20 md-max:pt-4 md-max:pb-8">
                        <div className="w-4/6 mx-auto md-max:w-full">
                            <div className="grid grid-cols-[1fr_1fr] grid-rows-[50px_auto_auto] gap-4 md-max:grid-rows-[40px_auto_auto_auto] md-max:grid-cols-[1fr]">
                                <div className="text-gray-600 font-bold text-3xl flex justify-start mb-4 row-start-1 md-max:text-2xl">Зачем</div>
                                <div className="w-1/2 leading-6 mb-4 text-gray-500 row-start-2 md-max:text-sm md-max:w-full">
                                    Английский язык широко распространен. Тысячи фильмов, сериалов, книг выходят каждый год. Тонны документации
                                    пишутся на английском. Во многих профессиях английский является обязательным. Так подтянем же его!
                                </div>
                                <div className="row-start-3 row-end-4 md-max:row-start-4 md-max:row-end-5">
                                { [ {text: 'Быстро'},
                                    {text: 'Просто'},
                                    {text: 'Бесплатно'} ].map( (item, index) =>
                                    <TextRow
                                        key={index}
                                        text={item.text}
                                        number={String(index + 1)}
                                        backgroundColor={'bg-blue-400'}/>
                                    ) }
                                </div>
                                <div className="row-start-1 row-end-4 col-start-2 flex justify-end items-center md-max:row-start-3 md-max:row-end-4 md-max:col-start-1">
                                    <div className="h-80">
                                        <ImageBox src="/static/landing/1.avif"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 pt-12 md-max:pt-4 md-max:pb-8">
                        <div className="w-4/6 mx-auto md-max:w-full">
                        <div className="grid grid-cols-[1fr_1fr] grid-rows-[50px_auto_auto] gap-4 mb-4 md-max:grid-rows-[40px_auto_auto_auto] md-max:grid-cols-[1fr]">
                            <div className="text-gray-600 font-bold text-3xl col-start-2 text-right md-max:text-2xl md-max:col-start-1">
                                Режимы
                            </div>
                            <div className="flex justify-end col-start-2 md-max:col-start-1">
                                <div className="w-1/2 leading-6 text-gray-500 text-right  mb-4 md-max:text-sm md-max:w-full">
                                    Учиться всегда сложно. Школа, институт, работа. Ты учишься без остановки. И как найти время, чтобы выучить
                                    что-то дополнительно? Попробуй игры.
                                </div>
                            </div>
                            <div className="col-start-2 md-max:row-start-4 md-max:row-end-5 md-max:col-start-1 ">
                            { [ {text: 'Карточки'},
                                {text: 'Заучивание'},
                                {text: 'Тест'},
                                {text: 'Подбор'} ].map( (item, index) =>
                                <TextRow
                                    key={index}
                                    text={item.text}
                                    number={String(index + 1)}
                                    backgroundColor={'bg-indigo-400'}/>
                                ) }
                            </div>
                            <div className="row-start-1 row-end-4 col-start-1 flex justify-start items-center md-max:row-start-3 md-max:row-end-4 md-max:col-start-1">
                                <div className="h-80">
                                    <ImageBox src="/static/landing/2.avif"/>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-100 p-4 pt-12 pb-20 md-max:pt-4 md-max:pb-8">
                        <div className="w-4/6 mx-auto md-max:w-full">
                            <div className="grid grid-cols-[1fr_1fr] grid-rows-[50px_auto_auto] gap-4 md-max:grid-rows-[40px_auto_auto_auto] md-max:grid-cols-[1fr]">
                            <div className="text-gray-600 font-bold text-3xl flex justify-start mb-4 md-max:text-2xl">Функционал</div>
                            <div className="w-1/2 leading-6 mb-4 text-gray-500 col-start-1 md-max:text-sm md-max:w-full">
                                    Хочу, чтобы эта штука могла делать то, о чем я думаю. Хочу, чтобы мне было комфортно пользоваться ею. Хочу, чтобы зашел и сразу понял, как она работает. Мы знаем, и сделали именно так, как хочешь ТЫ.
                            </div>
                            <div className="col-start-1 md-max:row-start-4 md-max:row-end-5">
                                { [ {text: 'Загрузка изображений'},
                                    {text: 'Избранные карточки'},
                                    {text: 'Быстрое редактирование'},
                                    {text: 'Управление горячими клавишами'},
                                    {text: 'Персональные настройки'},
                                    {text: 'Доступно в любой точке мира'} ].map( (item, index) =>
                                    <TextRow
                                        key={index}
                                        text={item.text}
                                        number={String(index + 1)}
                                        backgroundColor={'bg-violet-400'}/>
                                    ) }
                            </div>
                            <div className="row-start-1 row-end-4 col-start-2 flex justify-end items-center md-max:row-start-3 md-max:row-end-4 md-max:col-start-1">
                                <div className="h-[450px]">
                                    <ImageBox src="/static/landing/3.avif"/>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-200 p-4 pt-12 pb-20">
                        <div className="w-4/6 mx-auto">
                            <div className="flex items-center flex-col gap-4">
                                <div className="text-4xl font-bold text-gray-700 md-max:text-2xl text-center">Не знаешь с чего начать?</div>
                                <div className="text-xl text-gray-500 mb-20 w-1/2 text-center md-max:text-sm md-max:w-full md-max:mb-10">Зарегестрируйся и 10 000 слов из всемирного стандарта (Oxford dictionary) сразу станут доступны для тебя</div>
                                <Button variant="contained" size="large" onClick={() => navigate('/login')}>
                                    Зарегестрироваться
                                </Button>
                            </div>
                        </div>
                    </div>


        </>
    )
}

export { LandingPage }
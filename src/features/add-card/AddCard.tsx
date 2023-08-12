import Button from '@mui/material/Button';
import { ICardStore } from 'entities/module/model/types';


interface IProps {
  cardStore: ICardStore,
}

const AddCard = ( { cardStore }: IProps ) => {
  return (
    <>
        <Button
            variant="contained"
            onClick={cardStore.addCard}>+Добавить карточку</Button>
    </>
  )
}

export { AddCard }

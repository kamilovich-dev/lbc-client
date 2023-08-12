import Button from '@mui/material/Button';
import { ICardStore, TCard} from 'entities/module/model/types';

interface IProps {
  cardStore: ICardStore,
  cardId: TCard['id'],
}

const DeleteCard = ( { cardStore, cardId }: IProps ) => {
  return (
    <>
        <Button
            color='error'
            variant="contained"
            onClick={() => cardStore.deleteCardById(cardId)}>Удалить</Button>
    </>
  )
}

export { DeleteCard }

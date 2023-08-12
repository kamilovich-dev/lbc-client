import TextField from '@mui/material/TextField';
import { TCard, ICardStore } from 'entities/module/model/types';

interface IProps {
  cardStore: ICardStore,
  card: TCard,
  term: TCard['term'],
}

const CardTerm = ( { cardStore, card, term }: IProps ) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    cardStore.editCard({
        ...card,
        term: e.target.value,
    })
  }

  return (
    <>
        <TextField
            fullWidth
            name='term'
            label="ТЕРМИН"
            variant="standard"
            value={term}
            onChange={(e) => handleChange(e)}/>
    </>
  )
}

export { CardTerm }
import TextField from '@mui/material/TextField';
import { TCard, ICardStore } from 'entities/module/model/types';

interface IProps {
  cardStore: ICardStore,
  card: TCard,
  definition: TCard['definition'],
}

const CardDefinition = ( { cardStore, card, definition }: IProps ) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    cardStore.editCard({
        ...card,
        definition: e.target.value,
    })
  }

  return (
    <>
        <TextField
            fullWidth
            name='definition'
            label="ОПРЕДЕЛЕНИЕ"
            variant="standard"
            value={definition}
            onChange={(e) => handleChange(e)}/>
    </>
  )
}

export { CardDefinition }
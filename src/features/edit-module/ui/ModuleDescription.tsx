import TextField from '@mui/material/TextField';
import { TModule, IModuleStore } from 'entities/module/model/types';

interface IProps {
  moduleStore: IModuleStore,
  module: TModule,
  description: TModule['description'],
}

const ModuleDescription = ( { moduleStore, module, description }: IProps ) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    moduleStore.editModule({
        ...module,
        description: e.target.value
    })
  }

  return (
    <>
        <TextField
            fullWidth
            name='description'
            label="Описание"
            variant="standard"
            value={description}
            onChange={(e) => handleChange(e)}/>
    </>
  )
}

export { ModuleDescription }
import TextField from '@mui/material/TextField';
import { TModule, IModuleStore } from 'entities/module/model/types';

interface IProps {
  moduleStore: IModuleStore,
  module: TModule,
  name: TModule['name'],
}

const ModuleName = ( { moduleStore, module, name }: IProps ) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    moduleStore.editModule({
        ...module,
        name: e.target.value
    })
  }

  return (
    <>
        <TextField
            fullWidth
            name='name'
            label="Название"
            variant="standard"
            value={name}
            onChange={(e) => handleChange(e)}/>
    </>
  )
}

export { ModuleName }
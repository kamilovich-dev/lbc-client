import { SvgIcon } from "@mui/material"
import { useState, useRef } from "react";
import { Alert, Button, Select, MenuItem, TextField } from '@mui/material';
import { observer} from 'mobx-react-lite'
import GridViewIcon from '@mui/icons-material/GridView';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import InputAdornment from '@mui/material/InputAdornment';
import { ModuleStore } from "entities/module";
import Drawer from '@mui/material/Drawer';
import Switch from '@mui/material/Switch';
import { TModulesFilter } from "entities/module";

interface IModuleFilterLocal extends Omit<TModulesFilter, 'by_search'> {}

interface IProps {
    moduleStore: ModuleStore
}

const ModulesMenu = observer(( { moduleStore }: IProps) => {

    const [isShowFiltersModal, setIsShowFiltersModal] = useState(false)
    const [isFindFocused, setIsFindFocused] = useState(false)

    const [filters, setFilters] = useState<IModuleFilterLocal>({
        by_favorite: moduleStore.filters.by_favorite,
        by_alphabet:  moduleStore.filters.by_alphabet
    })

    const handleFavoriteSwitch = () => {
        setFilters({
            ...filters,
            by_favorite: filters.by_favorite === 'true' ? '' : 'true',
        })
    }

    const handleAlphabetSwitch = (value: 'asc' | 'desc' | '') => {
        setFilters({
            ...filters,
            by_alphabet: value,
        })
    }

    const handleAccept = async () => {
        moduleStore.setFilter('byFavorite', filters.by_favorite)
        moduleStore.setFilter('byAlphabet', filters.by_alphabet)
        setIsShowFiltersModal(false)
    }

    const resetFilters = () => {
        setFilters({
            by_alphabet: '',
            by_favorite: ''
        })
    }

    const colors = {
        active: '#60A5FA',
        inactive: '#94A3B8'
    }

    return (
        <>
            <div className=" bg-white pb-2 fixed top-0 left-0 p-2 z-50 border-gray-200 border-b-[1px] w-full">
                <div className="md:w-3/5  flex gap-2 items-center mx-auto">
                    <div className="flex items-center p-2 gap-2 flex-auto rounded-md shadow-md">
                        <div className="flex items-center">
                            <TextField
                                onBlur={() => setIsFindFocused(false)}
                                onFocus={() => setIsFindFocused(true)}
                                label='Найти'
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <SvgIcon sx={{
                                            color: isFindFocused ? colors.active : colors.inactive
                                        }}>
                                            <SearchIcon/>
                                        </SvgIcon>
                                    </InputAdornment>
                                    ),
                                    sx: {
                                        height: '35px',
                                        paddingLeft: '5px'
                                    }
                                }}
                            onChange={e => moduleStore.setFilter('bySearch',e.target.value) }
                            defaultValue={moduleStore.filters.by_search}/>
                        </div>
                    </div>
                    <div className="flex gap-2 bg-white p-3 rounded-md shadow-md">
                        <button onClick={() => moduleStore.setListed(false)}>
                            <SvgIcon sx={{
                                color: moduleStore.view.isListed ? colors.inactive : colors.active
                            }}>
                                <GridViewIcon/>
                            </SvgIcon>
                        </button>
                        <button onClick={() => moduleStore.setListed(true)}>
                            <SvgIcon sx={{
                                color: moduleStore.view.isListed ? colors.active : colors.inactive
                            }}>
                                <ViewStreamIcon/>
                            </SvgIcon>
                        </button>
                    </div>
                    <button className="bg-white p-3 rounded-md shadow-md" onClick={() => setIsShowFiltersModal(true)}>
                        <SvgIcon sx={{
                            color: moduleStore.view.isFilter ? colors.active : colors.inactive
                        }}>
                            <TuneIcon/>
                        </SvgIcon>
                    </button>
                </div>

            </div>
            <div>
                <Drawer
                    open={isShowFiltersModal}
                    onClose={() => setIsShowFiltersModal(false)}
                    anchor="bottom"
                >
                    <div className="bg-white p-4">
                        <div className="flex items-center mb-2">
                            <div className="font-bold text-lg text-gray-600 flex-auto">Фильтры</div>
                            <div>
                                <button className="text-blue-400 font-semibold" onClick={resetFilters}>Сбросить всё</button>
                            </div>
                        </div>
                        <div className="flex items-center mb-2">
                            <div className="text-md text-gray-500 flex-auto">Избранное</div>
                            <div>
                                <Switch size="medium"
                                    checked={filters.by_favorite ? true : false}
                                    onChange={handleFavoriteSwitch}
                                />
                            </div>
                        </div>
                        <div className="border-b-2 border-gray-200 w-full mb-8"></div>
                        <div className="flex items-center mb-2">
                            <div className="font-bold text-lg text-gray-600 flex-auto">Сортировка</div>
                        </div>
                        <div className="flex items-center mb-2">
                            <div className="text-md text-gray-500 flex-auto">По алфавиту</div>
                            <div>
                                <Select
                                    labelId="simple-select-label"
                                    id="simple-select"
                                    value={filters.by_alphabet}
                                    label="Age"
                                    onChange={e => handleAlphabetSwitch(e.target.value as 'asc' | 'desc' | '')}
                                    size='small'
                                >
                                    <MenuItem  value={''}>не выбрано</MenuItem>
                                    <MenuItem  value={'asc'}>A..Z</MenuItem>
                                    <MenuItem  value={'desc'}>Z..A</MenuItem>
                                </Select>
                            </div>
                        </div>
                        <div className="border-b-2 border-gray-200 w-full mb-12"></div>
                        <div className="flex justify-center">
                            <button
                                className='bg-blue-400 drop-shadow-sm rounded-lg p-2 w-32 text-center text-white hover:bg-blue-500 active:bg-blue-600' onClick={handleAccept}>
                                Применить
                            </button>
                        </div>
                    </div>
                </Drawer>
            </div>
        </>
    )
})

export { ModulesMenu }
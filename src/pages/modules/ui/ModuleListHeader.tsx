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

import { ModuleListSettings } from "./ModuleListSettings";

import type { TMduleSearchParams } from 'shared/api/lbc-server/endpoints/types/modules'

interface IModuleFilterLocal extends Omit<TMduleSearchParams, 'by_search'> {}

interface IProps {
    moduleStore: ModuleStore
}

export const ModuleListHeader = observer(( { moduleStore }: IProps) => {

    const [isShowModal, setIsShowModal] = useState(false)
    const [isFindFocused, setIsFindFocused] = useState(false)

    const handleSearchChange = async (value: TMduleSearchParams['by_search']) => {
        moduleStore.setSearchFilter(value === '' ? undefined : value)
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
                            onChange={e => handleSearchChange(e.target.value) }
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
                    <button className="bg-white p-3 rounded-md shadow-md" onClick={() => setIsShowModal(true)}>
                        <SvgIcon sx={{
                            color: moduleStore.view.isFiltered ? colors.active : colors.inactive
                        }}>
                            <TuneIcon/>
                        </SvgIcon>
                    </button>
                </div>
            </div>
            <ModuleListSettings
                moduleStore={moduleStore}
                isShowModal={isShowModal}
                setIsShowModal={setIsShowModal}
                />
        </>
    )
})
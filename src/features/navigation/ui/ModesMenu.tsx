import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { routePaths } from 'shared/config';

import { useNavigate, useParams, useLocation, generatePath, matchPath } from 'react-router-dom'
import { SvgIcon } from '@mui/material';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import RepeatIcon from '@mui/icons-material/Repeat';
import QuizIcon from '@mui/icons-material/Quiz';
import FactCheckIcon from '@mui/icons-material/FactCheck';

const ModesMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname
  const params = useParams()

  const mainTextIdx = calculateMainTextIdx()
  if (mainTextIdx == -1) return

  const navigations = [
    {
        icon: <ViewCarouselIcon />,
        text: 'Карточки',
        handleClick: () => navigate(generatePath(routePaths.CARDS_MODE, { moduleId: params.moduleId ?? '' }))
    },
    {
        icon: <RepeatIcon />,
        text: 'Заучивание',
        handleClick: () => navigate(generatePath(routePaths.CARDS_MODE, { moduleId: params.moduleId ?? '' }))
    },
    {
        icon: <QuizIcon />,
        text: 'Тест',
        handleClick: () => navigate(generatePath(routePaths.CARDS_MODE, { moduleId: params.moduleId ?? '' }))
    },
    {
        icon: <FactCheckIcon />,
        text: 'Подбор',
        handleClick: () => navigate(generatePath(routePaths.CARDS_MODE, { moduleId: params.moduleId ?? '' }))
    }
  ]

  function calculateMainTextIdx() {
    if (matchPath(routePaths.CARDS_MODE, pathname)) return 0
    return -1
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant='outlined'
        endIcon={<KeyboardArrowDownIcon/>}
      >
        <div className='flex gap-2 items-center'>
          <SvgIcon>
            {navigations[mainTextIdx].icon}
          </SvgIcon>
          <div className='text-sm'>
            {navigations[mainTextIdx].text}
          </div>
        </div>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        variant='selectedMenu'
      >
        {navigations.map( (navigation, idx) => {
            if (mainTextIdx !== idx) return (
              <MenuItem key={idx} onClick={navigation.handleClick} sx={{padding: '10px', width: 'auto'}}>
                  <div className='flex justify-center gap-2 items-center'>
                      <SvgIcon className='text-blue-600'>
                        {navigation.icon}
                      </SvgIcon>
                      <div className='text-sm'>
                        {navigation.text}
                      </div>
                  </div>
              </MenuItem>
            )
          })}
      </Menu>
    </div>
  );
}

export { ModesMenu }



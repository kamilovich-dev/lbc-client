import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { SvgIcon } from '@mui/material';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import RepeatIcon from '@mui/icons-material/Repeat';
import QuizIcon from '@mui/icons-material/Quiz';
import FactCheckIcon from '@mui/icons-material/FactCheck';

const ModesMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate()
  const params = useParams()
  const location = useLocation()

  const mainTextIdx = calculateMainTextIdx()
  if (mainTextIdx == -1) return

  const navigations = [
    {
        icon: <ViewCarouselIcon />,
        text: 'Карточки',
        handleClick: () => navigate(`/${params.moduleId}/cards-mode`)
    },
    {
        icon: <RepeatIcon />,
        text: 'Заучивание',
        handleClick: () => navigate(`/${params.moduleId}/cards-mode`)
    },
    {
        icon: <QuizIcon />,
        text: 'Тест',
        handleClick: () => navigate(`/${params.moduleId}/cards-mode`)
    },
    {
        icon: <FactCheckIcon />,
        text: 'Подбор',
        handleClick: () => navigate(`/${params.moduleId}/cards-mode`)
    }
  ]

  function calculateMainTextIdx() {
    if (location.pathname.includes('cards-mode')) return 0
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
        <div className='flex gap-2'>
          <SvgIcon>
            {navigations[mainTextIdx].icon}
          </SvgIcon>
          {navigations[mainTextIdx].text}
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
              <MenuItem key={idx} onClick={navigation.handleClick}>
                  <div className='flex justify-center gap-4'>
                      <SvgIcon className='text-blue-600'>
                        {navigation.icon}
                      </SvgIcon>
                      {navigation.text}
                  </div>
              </MenuItem>
            )
          })}
      </Menu>
    </div>
  );
}

export { ModesMenu }



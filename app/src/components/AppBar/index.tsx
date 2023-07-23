import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  alpha,
  Box,
} from '@mui/material';
import {
  MailOutline as MailIcon,
  AccountCircle as AccountCircleIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  MoreVert as MoreIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logoutRequest } from '../../reducers/account';
import AlertDialog from '../Modal/ConfirmDialog';
// import routes from '../../pages/routes';

const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
};

const profileName = "fares";
const LINK_NAMES = {
  app: "DealApp",
  profile: "Profil",
  login: "Connexion",
  logout: "Déconnexion",
  account: "Mon compte",
  register: "Inscription",
}

const MENU_ITEMS = [
  {
    name: "DealApp",
    link: "/",

  },
  {
    name: "Bons plans",
    link: "/",
  },
  {
    name: "Gratuit",
    link: "/",
  },
];

interface Props {
  openLoginModal: () => void;
}

const PrimarySearchAppBar: React.FC<Props> = ({ openLoginModal }) => {
  const accessToken = useAppSelector(state => state.account.token);
  const dispatch = useAppDispatch();

  const classes = {
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: 2,
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: 2,
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${2}px)`,
      transition: 'width',
      width: '100%',
    },
    boxIcons: {
      sx: {
        display: {
          xs: 'none',
          md: 'flex',
        },
      },
    },
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false);

  const handleProfileMenuOpen = (event: any) => {
    // open login page or login modal
    if (!accessToken) return openLoginModal();

    // else open menu
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    dispatch(logoutRequest());
    handleMenuClose();
    setOpenLogoutDialog(false);
  }

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to={"/profile/" + profileName} style={linkStyle}>
        <MenuItem onClick={handleMenuClose}>
          {LINK_NAMES.profile}
        </MenuItem>
      </Link>
      <MenuItem onClick={handleMenuClose}>
        {LINK_NAMES.account}
      </MenuItem>
      <MenuItem onClick={() => {
        handleMenuClose();
        setOpenLogoutDialog(true);
      }}>
        {LINK_NAMES.logout}
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircleIcon />
        </IconButton>
        <p>{LINK_NAMES.profile}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box style={classes.grow}>
      <AlertDialog
        title='Déconnexion'
        description='Êtes-vous sûr de vouloir vous déconnecter ?'
        open={openLogoutDialog}
        onConfirm={handleLogout}
        onClose={() => setOpenLogoutDialog(false)}
      />
      <AppBar position="static">
        <Toolbar>

          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <IconButton
              edge="start"
              style={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', sm: 'none' },
              }}
            >
              {/* Liste des pages */}

              {MENU_ITEMS.map((item, index) => (
                <Link to={item.link} style={linkStyle} key={index}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{item.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          {MENU_ITEMS.map((item, index) => (
            <Link to={item.link} style={linkStyle} key={index}>
              <Typography
                sx={{ display: { xs: 'none', sm: 'block' } }}
                variant="h6"
                mr={2}
                noWrap
              >
                {item.name}
              </Typography>
            </Link>
          ))}

          <Box
            position="relative"
            borderRadius={4}
            sx={{
              backgroundColor: {
                xs: alpha('#fff', 0.15),
                "&:hover": alpha('#fff', 0.25),
              },
              marginLeft: { xs: 2, sm: 4 },
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            <Box sx={{
              padding: 2,
              height: '100%',
              position: 'absolute',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="Search…"
              sx={{
                color: 'inherit',
                '& .MuiInputBase-input': {
                  paddingLeft: 6,
                },
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Box>
          <Box style={classes.grow} />
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
            }}
          >

            {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton> */}

            {/* <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>

          </Box>

          {/* Voir plus icon */}
          <Box
            sx={{
              display: { xs: 'flex', sm: 'none' },
            }}
          >
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            {/* <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton> */}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );

}

export default PrimarySearchAppBar;

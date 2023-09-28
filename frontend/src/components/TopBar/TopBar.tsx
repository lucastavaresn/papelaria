import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Drawer, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import LogoImage from '../../assets/images/logoipsum.svg';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import CalculateIcon from '@mui/icons-material/Calculate';
import { Link } from 'react-router-dom';
import { Props } from '../../utils/ChildProps';

export const TopBar = ({title, ... props}: Props) => {
  
    const [openSidebar, setOpenSidebar] = useState(false);

    const toggleSidebar = () => {
      setOpenSidebar(!openSidebar);
    };
   
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Grid container spacing={2}>
              <Grid item xs={1}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleSidebar}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item xs={3}>
                <img src={LogoImage} alt="Logo" width="202" height="56" />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, alignContent: 'center' }}>
                  {title}
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={openSidebar}
          onClose={toggleSidebar}
          variant="temporary"
          style={{ flexShrink: 0, maxWidth: '80vw' }}
        >
          <List>
            <ListItem>
              <Link to={"/"}>
                <ListItemIcon>
                  <PointOfSaleIcon fontSize="small" />
                  
                </ListItemIcon>
                <ListItemText>Vendas</ListItemText>
              </Link>
            </ListItem>
            <ListItem >
              <Link to={"/sale"}>
                <ListItemIcon>
                    <CalculateIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Comissões</ListItemText>
              </Link>
            </ListItem>
          
          </List>
        </Drawer>
        <main>
          {/* Conteúdo da página aqui */}
        </main>
      </div>
    );
}
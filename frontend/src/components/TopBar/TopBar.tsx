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
import { Link, useLocation } from 'react-router-dom';
import { Props } from '../../utils/ChildProps';
import './TopBar.css';
import { pageTitle } from '../../utils/PageName';

export const TopBar = ({title, ... props}: Props) => {
    const location = useLocation();
    const [openSidebar, setOpenSidebar] = useState(false);

    const toggleSidebar = () => {
      setOpenSidebar(!openSidebar);
    };
   
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Grid container spacing={2}>
              <Grid item xs={3} >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleSidebar}
                >
                  <MenuIcon sx={{fontSize: "40px", marginTop: "-40px"}} />
                </IconButton>
                <><img src={LogoImage} alt="Logo" className='logo' /></>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, alignContent: 'center' }} className="PageTitle">
                  {pageTitle(location)}
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
          <List sx={{width: "250px"}}>
            <ListItem>
              <Link to={"/"} style={{width: "100%", textDecoration: "none"}}className='linkMenuBT' >
                <Grid container direction={'row'}>
                    <Grid item xs={2}>
                      <ListItemIcon>
                        <PointOfSaleIcon fontSize="medium" /> 
                      </ListItemIcon>
                    </Grid>
                    <Grid item xs={10}>
                      <ListItemText>Vendas</ListItemText>
                    </Grid>
                </Grid>   
              </Link>
            </ListItem>
            <ListItem >
              <Link to={"/commissions"} style={{width: "100%", textDecoration: "none"}} className='linkMenuBT'>
              <Grid container direction={'row'}>
                    <Grid item xs={2}>
                      <ListItemIcon>
                        <CalculateIcon fontSize="medium" /> 
                      </ListItemIcon>
                    </Grid>
                    <Grid item xs={10}>
                      <ListItemText>Comissões</ListItemText>
                    </Grid>
                </Grid>
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
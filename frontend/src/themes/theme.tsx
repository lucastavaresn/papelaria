import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#F0F0F0',
      dark: '#002884',
      contrastText: '#2B7D83',
    },
    secondary: {
      light: '#ff7961',
      main: '#2B7D83',
      dark: '#12595e',
      contrastText: '#fff',
    },    
  },
  typography:{
    fontFamily:[
      'Roboto', 
    ].join(',')
  },
});

export default theme;
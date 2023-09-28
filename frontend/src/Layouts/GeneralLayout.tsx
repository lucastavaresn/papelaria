
import { Container, Grid } from '@mui/material';
import {TopBar} from '../components/TopBar/TopBar';
import { Props } from '../utils/ChildProps';


export const GeneralLayout = ({children, title, ... props}: Props)=> {
    return (
      <>
        <TopBar title={title}/>
        <Grid container spacing={2} padding={8}>
            <Grid item xs={12}>
            {children}
            </Grid>
        </Grid>
      </>
    );
  }


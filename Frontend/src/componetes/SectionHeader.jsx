import { Box, Grid } from "@mui/material";




export const SectionHeader = ( {children}) => {
    return (
        <Box component="section" sx={{ padding: '1.5rem 0' }}>
            <Grid container alignItems={'center'} justifyContent={'space-between'} >
                {children}
            </Grid>
        </Box>
    );
};
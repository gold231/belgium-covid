// MUI
import { Box, Grid, Paper, Stack, Typography } from "@mui/material"

// Atoms/Molecules
import DatePicker from '../../atoms/DatePicker';

// props type definition
interface IProps {
    from: Date | null;
    to: Date | null;
    handleChange: (newValue: Date | null) => void;
    handleToChange: (newValue: Date | null) => void;
    CasesCount: number | string;
};

// Component definition
const Header = ({
    from,
    to,
    handleChange,
    handleToChange,
    CasesCount = 0
}: IProps) => {
    return (
        <Box>
            <Paper>
                <Grid container>
                    <Grid item xs={12} md={6} xl={6}>
                        {/** Date Filter  */}
                        <Stack direction="row" spacing={1}>
                            <Box
                                sx={{
                                    display: 'flex'
                                }}
                            >
                                <DatePicker
                                    label="From"
                                    date={from}
                                    handleChange={handleChange}
                                />
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex'
                                }}
                            >
                                <DatePicker
                                    label="To"
                                    date={to}
                                    handleChange={handleToChange}
                                />
                            </Box>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={6} xl={6} sx={{textAlign: 'right'}} padding={1}>
                        <Typography sx={{fontWeight: 'bold'}}>
                            Total Confirmed Cases: <em style={{color: 'red'}}>{CasesCount}</em>
                       </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
};

export default Header
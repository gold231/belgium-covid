// Top level imports
import { ReactElement, useState, useEffect } from "react";

// Material UI
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Logout } from "@mui/icons-material";
import Container from '@mui/material/Container';

// Atoms/Molecules/Organisms
import Sidebar from '../../components/organisms/Sidebar';
import Header from "../../components/molecules/Header";

// utilities
import { CRecordType } from "../../utilities/types";
import DataTable from "../../components/molecules/DataTable";
import moment from "moment";

const mdTheme = createTheme();

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

type DateQueryParms =  {
    from: String,
    to: String,
}
// Component Definition
const Dashboard = (): ReactElement => {
    // state definition
    const [open, setOpen] = useState(true);
    const [date, setDate] = useState<Date | null>(new Date());
    const [to, setToDate] = useState<Date | null>(new Date());
    const toggleDrawer = () => {
        setOpen(!open);
    };
    // Covid records
    const [records, setRecords] = useState<CRecordType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect((): void => {
        const from = new Date(date ?? '').toISOString();
        fetchRecords({
            from,
            to: new Date(to ?? '').toISOString(),
        });
    }, [date, to]);

    //fetches record through api call
    const fetchRecords = ({ from, to }: DateQueryParms): void => {
        setIsLoading(true);
        fetch(`https://api.covid19api.com/country/belgium/status/confirmed?from=${from}&to=${to}`)
            .then(res => res.json())
            .then(handleResponse)
            .catch(err => { 
                setIsLoading(false);
                throw err;
             });
    }

    const handleResponse = (data: CRecordType[]) => {
        const tranformed: CRecordType[] = data.map((datum: CRecordType, index: number): CRecordType => {
            return {
                ...datum,
                Date: moment(new Date(datum.Date.toString())).format('MMMM Do YYYY'),
                id: index + 1,
            }
        });

        setRecords(tranformed);
        setIsLoading(false);
    }
    // handles date change and set the value into state
    const handleDateChange = (newValue: Date | null) => {
        setDate(newValue);
    }

    const handleToDateChange = (newValue: Date | null) => {
        setToDate(newValue);
    }

    return (
        <>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position="absolute" open={open}>
                        <Toolbar
                            sx={{
                                pr: '24px', // keep right padding when drawer closed
                            }}
                        >
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{
                                    marginRight: '36px',
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ flexGrow: 1 }}
                            >
                                Department of Health - Belgium
                            </Typography>
                            <IconButton color="inherit" title="logout">
                                <Logout />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" open={open}>
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                px: [1],
                            }}
                        >
                            <IconButton onClick={toggleDrawer}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Toolbar>
                        <Divider />
                        <List component="nav">
                            <Sidebar />
                        </List>
                    </Drawer>
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar />

                        {/** Main Content */}
                        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                            <Header
                                from={date}
                                to={to}
                                handleChange={(newValue: Date | null) => handleDateChange(newValue)}
                                handleToChange={(newValue: Date | null) => handleToDateChange(newValue)}
                                CasesCount = {records.at(-1)?.Cases ?? 0}
                            />

                            <DataTable
                                rows={records}
                                isLoading={isLoading}
                            />
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        </>
    );
};

export default Dashboard;

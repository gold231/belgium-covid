import { ReactElement, useState } from "react";

// MUI
import { Box, Paper } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

// utilities
import { CRecordType } from "../../../utilities/types";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Sr. No', width: 70 },
    { field: 'Province', headerName: 'Province', width: 150 },
    { field: 'Lat', headerName: 'Latitude', width: 150 },
    { field: 'Lon', headerName: 'Longitude', width: 150 },
    { field: 'Cases', headerName: 'Cases Count', width: 150 },
    { field: 'Status', headerName: 'Status', width: 200 },
    { field: 'Date', headerName: 'Date', width: 200 },
]; 

// Props type definitions
interface IProps {
    rows: CRecordType[];
    isLoading: boolean
}
// Component definition
const DataTable = ({
    rows,
    isLoading
}: IProps): ReactElement => {
    const [pageSize, setPageSize] = useState<number>(10)
    
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    marginTop: '1rem',
                }}
            >
                <Paper >
                    <div style={{ height: '600px'}}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={pageSize}
                            onPageSizeChange={(pageSize: number) => setPageSize(pageSize)}
                            rowsPerPageOptions={[5, 10, 20, 50, 100]}
                            loading={isLoading}
                        />
                    </div>
                </Paper>
            </Box>
        </>
    );
};

export default DataTable;

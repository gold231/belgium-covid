import { ReactElement } from 'react';

// MUI
import { TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

// props type definition
interface IProps {
    label: String;
    date: Date | null;
    handleChange: (newValue: Date | null) => void;
};
// component definition
const DatePicker = ({
    date,
    handleChange,
    label
}: IProps): ReactElement => {
    return (
        <>
            <DesktopDatePicker
                label={label}
                value={date}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
            />
        </>
    );
};

export default DatePicker;

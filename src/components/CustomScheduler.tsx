import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import CustomAppointment from "./CustomAppointment";
import { Button, ToggleButton, ToggleButtonGroup, Box } from "@mui/material";

const CustomScheduler = ({
  currentDate,
  schedulerData,
  onOpenDialog,
  onEditAppointment,
  onDeleteAppointment,
  currentView,
  onViewChange,
}) => {
  return (
    <Paper
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={() => onOpenDialog(null)}
          variant="contained"
          color="primary"
          style={{ height: 40 }}
        >
          Add Appointment
        </Button>
        <Box sx={{ display: "flex", gap: 2 }}>
          <ToggleButtonGroup
            value={currentView}
            exclusive
            onChange={(e, newView) => onViewChange(newView)}
            aria-label="view selector"
          >
            <ToggleButton value="dayView" style={{ height: 40, minWidth: 100 }}>
              Day
            </ToggleButton>
            <ToggleButton
              value="weekView"
              style={{ height: 40, minWidth: 100 }}
            >
              Week
            </ToggleButton>
            <ToggleButton
              value="monthView"
              style={{ height: 40, minWidth: 100 }}
            >
              Month
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      <Scheduler data={schedulerData} style={{ flexGrow: 1 }}>
        <ViewState currentDate={currentDate} />
        {currentView === "dayView" && (
          <DayView startDayHour={6} endDayHour={18} />
        )}
        {currentView === "weekView" && (
          <WeekView startDayHour={6} endDayHour={18} />
        )}
        {currentView === "monthView" && <MonthView />}
        <Appointments
          appointmentComponent={(props) => (
            <CustomAppointment
              {...props}
              onEdit={onEditAppointment}
              onDelete={onDeleteAppointment}
            />
          )}
        />
      </Scheduler>
    </Paper>
  );
};

export default CustomScheduler;

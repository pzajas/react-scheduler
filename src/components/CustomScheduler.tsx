import { useState } from "react";
import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import { CustomAppointment } from "./CustomAppointment";
import { Button, ToggleButton, ToggleButtonGroup, Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../firebase/firebaseFunctions";
import { IAppointment, ICurrentView } from "../typescript/interfaces";

export const CustomScheduler = ({
  onOpenDialog,
  onEditAppointment,
  onDeleteAppointment,
  initialView = "dayView",
}: {
  onOpenDialog: () => void;
  onEditAppointment: (appointment: IAppointment) => void;
  onDeleteAppointment: (id: string) => void;
  initialView?: string;
}) => {
  const [currentView, setCurrentView] = useState(initialView);
  const currentDate = new Date().toISOString().split("T")[0];

  const { data: schedulerData = [] } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  const handleViewChange = (
    _event: React.MouseEvent<HTMLElement>,
    newView: ICurrentView
  ) => {
    if (newView) {
      setCurrentView(newView);
    }
  };

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
          onClick={() => onOpenDialog()}
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
            onChange={handleViewChange}
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

      <Scheduler data={schedulerData}>
        <ViewState currentDate={currentDate} />
        {currentView === "dayView" && (
          <DayView startDayHour={6} endDayHour={24} />
        )}
        {currentView === "weekView" && (
          <WeekView startDayHour={6} endDayHour={24} />
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

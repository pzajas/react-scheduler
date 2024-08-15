import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";

interface ISchedulerData {
  startDate: string;
  endDate: string;
  title: string;
}

interface ICustomScheduler {
  currentDate: string;
  schedulerData: ISchedulerData[];
}

export const CustomScheduler = ({
  currentDate,
  schedulerData,
}: ICustomScheduler) => (
  <Paper>
    <Scheduler data={schedulerData}>
      <ViewState currentDate={currentDate} />
      <DayView startDayHour={9} endDayHour={14} />
      <Appointments />
    </Scheduler>
  </Paper>
);

export type ICurrentView = "dayView" | "weekView" | "monthView";
export interface IAppointment {
  id: string;
  startDate: string;
  endDate: string;
  title: string;
}
export interface IScheduler {
  currentDate: string;
  schedulerData: IAppointment[];
  onOpenDialog: () => void;
  onEditAppointment: () => void;
  onDeleteAppointment: () => void;
  currentView: ICurrentView;
  onViewChange: (viewName: ICurrentView) => void;
}
export interface IAppointmentDialog {
  dialogOpen: boolean;
  isEditing: boolean;
  appointment: IAppointment | null;
  updateAppointmentField: (field: keyof IAppointment, value: string) => void;
  handleSave: () => void;
  handleDelete: () => void;
  closeDialog: () => void;
}

import { useState, useCallback } from "react";
import { IAppointment } from "../typescript/interfaces";

interface UseDialogReturn {
  dialogOpen: boolean;
  isEditing: boolean;
  appointment: IAppointment | null;
  openDialog: (appointment?: IAppointment | null) => void;
  closeDialog: () => void;
  updateAppointmentField: (field: keyof IAppointment, value: string) => void;
}

export const useDialog = (): UseDialogReturn => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [appointment, setAppointment] = useState<IAppointment | null>(null);

  const openDialog = useCallback((appointment?: IAppointment | null) => {
    const now = new Date();

    if (appointment) {
      setIsEditing(true);
      setAppointment(appointment);
    } else {
      setIsEditing(false);
      setAppointment({
        title: "",
        startDate: now.toISOString().slice(0, 16),
        endDate: new Date(now.setHours(now.getHours() + 1))
          .toISOString()
          .slice(0, 16),
      });
    }
    setDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const updateAppointmentField = useCallback(
    (field: keyof IAppointment, value: string) => {
      setAppointment((prev) => (prev ? { ...prev, [field]: value } : null));
    },
    []
  );

  return {
    dialogOpen,
    isEditing,
    appointment,
    openDialog,
    closeDialog,
    updateAppointmentField,
  };
};

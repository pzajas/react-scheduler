import { useDialog } from "./hooks/useDialog";
import { useAppointment } from "./hooks/useAppointment";
import { AppointmentDialog } from "./components/AppointmentDialog";
import { CustomScheduler } from "./components/CustomScheduler";

const App = () => {
  const {
    dialogOpen,
    isEditing,
    appointment,
    openDialog,
    closeDialog,
    updateAppointmentField,
  } = useDialog();
  const { handleSaveAppointment, handleDeleteAppointment } = useAppointment();

  const handleSave = async () => {
    if (appointment) {
      await handleSaveAppointment(appointment, isEditing);
      closeDialog();
    }
  };

  const handleDelete = async () => {
    if (appointment?.id) {
      await handleDeleteAppointment(appointment.id);
      closeDialog();
    }
  };

  return (
    <>
      <CustomScheduler
        onOpenDialog={openDialog}
        onEditAppointment={openDialog}
        onDeleteAppointment={handleDelete}
      />
      <AppointmentDialog
        dialogOpen={dialogOpen}
        isEditing={isEditing}
        appointment={appointment}
        updateAppointmentField={updateAppointmentField}
        handleSave={handleSave}
        handleDelete={handleDelete}
        closeDialog={closeDialog}
      />
    </>
  );
};

export default App;

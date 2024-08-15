// App.tsx
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import CustomScheduler from "./components/CustomScheduler";
import { IAppointment } from "./typescript/interfaces";
import {
  getAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
} from "./firebase/firebaseFunctions";

const App = () => {
  const [schedulerData, setSchedulerData] = useState<IAppointment[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentAppointmentId, setCurrentAppointmentId] = useState<
    string | null
  >(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentView, setCurrentView] = useState("dayView");

  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAppointments();
        setSchedulerData(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setSchedulerData([]);
      }
    };

    fetchData();
  }, []);

  const handleOpenDialog = (appointment?: IAppointment) => {
    if (appointment) {
      setCurrentAppointmentId(appointment.id);
      setTitle(appointment.title);
      setStartDate(appointment.startDate);
      setEndDate(appointment.endDate);
      setIsEditing(true);
    } else {
      const now = new Date();
      const start = new Date(now);
      const end = new Date(now);

      start.setMinutes(0);
      end.setHours(end.getHours() + 1);
      end.setMinutes(0);

      setStartDate(start.toISOString().slice(0, 16));
      setEndDate(end.toISOString().slice(0, 16));
      setTitle("");
      setIsEditing(false);
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveAppointment = async () => {
    try {
      if (title.trim() === "") {
        toast.error("Title is required.");
        return;
      }

      const appointment: IAppointment = { title, startDate, endDate };

      if (isEditing) {
        if (currentAppointmentId) {
          await updateAppointment(currentAppointmentId, appointment);
          toast.success("Appointment updated successfully.");
        }
      } else {
        await addAppointment(appointment);
        toast.success("Appointment added successfully.");
      }

      handleCloseDialog();
      const data = await getAppointments();
      setSchedulerData(data);
    } catch (error) {
      console.error("Error saving appointment:", error);
      toast.error("Error saving appointment.");
    }
  };

  const handleDeleteAppointment = async () => {
    try {
      if (!currentAppointmentId) {
        toast.error("No appointment ID provided for deletion.");
        return;
      }

      await deleteAppointment(currentAppointmentId);
      toast.success("Appointment deleted successfully.");

      const data = await getAppointments();
      setSchedulerData(data);

      handleCloseDialog();
    } catch (error) {
      console.error("Error deleting appointment:", error);
      toast.error("Error deleting appointment.");
    }
  };

  const handleViewChange = (viewName: string) => {
    setCurrentView(viewName);
  };

  return (
    <>
      <CustomScheduler
        currentDate={currentDate}
        schedulerData={schedulerData}
        onOpenDialog={handleOpenDialog}
        onEditAppointment={handleOpenDialog}
        onDeleteAppointment={handleDeleteAppointment}
        currentView={currentView}
        onViewChange={handleViewChange}
      />
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          {isEditing ? "Edit Appointment" : "Add Appointment"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Start Date"
            type="datetime-local"
            fullWidth
            variant="standard"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: "06:00", max: "18:00" }}
          />
          <TextField
            margin="dense"
            label="End Date"
            type="datetime-local"
            fullWidth
            variant="standard"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: "06:00", max: "18:00" }}
          />
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            {isEditing && (
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteAppointment}
              >
                Delete
              </Button>
            )}
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSaveAppointment}>
              {isEditing ? "Save" : "Add"}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default App;

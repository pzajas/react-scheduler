import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { IAppointmentDialog } from "../typescript/interfaces";

export const AppointmentDialog = ({
  dialogOpen,
  isEditing,
  appointment,
  updateAppointmentField,
  handleSave,
  handleDelete,
  closeDialog,
}: IAppointmentDialog) => {
  return (
    <Dialog open={dialogOpen} onClose={closeDialog}>
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
          value={appointment?.title || ""}
          onChange={(e) => updateAppointmentField("title", e.target.value)}
        />
        <TextField
          margin="dense"
          label="Start Date"
          type="datetime-local"
          fullWidth
          variant="standard"
          value={appointment?.startDate || ""}
          onChange={(e) => updateAppointmentField("startDate", e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="dense"
          label="End Date"
          type="datetime-local"
          fullWidth
          variant="standard"
          value={appointment?.endDate || ""}
          onChange={(e) => updateAppointmentField("endDate", e.target.value)}
          InputLabelProps={{ shrink: true }}
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
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleSave}>{isEditing ? "Save" : "Add"}</Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

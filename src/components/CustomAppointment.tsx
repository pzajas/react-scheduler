import { useState } from "react";
import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";
import { Button } from "@mui/material";
import { IAppointment } from "../typescript/interfaces";

export const CustomAppointment = ({
  data,
  onEdit,
  onDelete,
}: {
  data: any;
  onEdit: (appointment: IAppointment) => void;
  onDelete: (appointment: string) => void;
}) => {
  const [hover, setHover] = useState(false);
  const color = "#FF7F00";

  console.log(data, "data from custom");

  return (
    <Appointments.Appointment
      {...data}
      style={{
        position: "relative",
        cursor: "pointer",
        padding: "5px 10px",
        boxSizing: "border-box",
        borderRadius: "4px",
        backgroundColor: color,
        color: "#fff",
        overflow: "hidden",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onEdit(data)}
    >
      <span
        style={{
          display: "block",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {data.title}
      </span>
      {hover && (
        <Button
          variant="contained"
          color="error"
          size="small"
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            padding: "4px",
            minWidth: "auto",
          }}
          onClick={(event) => {
            event.stopPropagation();
            onDelete(data);
          }}
        >
          X
        </Button>
      )}
    </Appointments.Appointment>
  );
};

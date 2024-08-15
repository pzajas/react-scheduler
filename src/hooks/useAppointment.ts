import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { IAppointment } from "../typescript/interfaces";
import {
  addAppointment,
  deleteAppointment,
  getAppointments,
  updateAppointment,
} from "../firebase/firebaseFunctions";
import { toast } from "react-toastify";

export const useAppointment = () => {
  const queryClient = useQueryClient();

  const addAppointmentToQueryData = (newAppointment: IAppointment) => {
    queryClient.setQueryData(
      ["appointments"],
      (prevAppointments: IAppointment[] = []) => [
        ...prevAppointments,
        newAppointment,
      ]
    );
  };

  const updateAppointmentInQueryData = (updatedAppointment: IAppointment) => {
    queryClient.setQueryData(
      ["appointments"],
      (prevAppointments: IAppointment[] = []) =>
        prevAppointments.map((appointment) =>
          appointment.id === updatedAppointment.id
            ? updatedAppointment
            : appointment
        )
    );
  };

  const removeAppointmentFromQueryData = (deletedAppointmentId: string) => {
    queryClient.setQueryData(
      ["appointments"],
      (prevAppointments: IAppointment[] = []) =>
        prevAppointments.filter(
          (appointment) => appointment.id !== deletedAppointmentId
        )
    );
  };

  const { mutateAsync: addAppointmentMutation } = useMutation({
    mutationFn: async (data: IAppointment) => {
      const id = uuidv4();
      await addAppointment({ ...data, id });
      return id;
    },
    onSuccess: async (newAppointmentId: string) => {
      const newAppointments = await getAppointments();
      const newAppointment = newAppointments.find(
        (app) => app.id === newAppointmentId
      );
      if (newAppointment) {
        addAppointmentToQueryData(newAppointment);
      } else {
        console.error(`No appointment found with ID ${newAppointmentId}`);
      }
    },
    onError: (error) => {
      console.error("Error adding appointment:", error);
    },
  });

  const { mutateAsync: editAppointmentMutation } = useMutation({
    mutationFn: async (data: IAppointment) => {
      await updateAppointment(data.id, data);
      return data;
    },
    onSuccess: async (updatedAppointment: IAppointment) => {
      const newAppointments = await getAppointments();
      updateAppointmentInQueryData(
        newAppointments.find((app) => app.id === updatedAppointment.id)!
      );
    },
    onError: (error) => {
      console.error("Error editing appointment:", error);
    },
  });

  const { mutateAsync: deleteAppointmentMutation } = useMutation({
    mutationFn: async (appointmentId: string) => {
      await deleteAppointment(appointmentId);
      return appointmentId;
    },
    onSuccess: (deletedAppointmentId: string) => {
      removeAppointmentFromQueryData(deletedAppointmentId);
    },
    onError: (error) => {
      console.error("Error deleting appointment:", error);
    },
  });

  const handleSaveAppointment = async (
    appointment: IAppointment,
    isEditing: boolean
  ) => {
    if (appointment.title.trim() === "") {
      toast.error("Title is required.");
      return;
    }

    try {
      if (isEditing) {
        if (appointment.id) {
          await editAppointmentMutation(appointment);
          toast.success("Appointment updated successfully.");
        }
      } else {
        await addAppointmentMutation(appointment);
        toast.success("Appointment added successfully.");
      }
    } catch (error) {
      console.error("Error saving appointment:", error);
      toast.error("Error saving appointment.");
    }
  };

  const handleDeleteAppointment = async (appointmentId: string) => {
    try {
      await deleteAppointmentMutation(appointmentId);
      toast.success("Appointment deleted successfully.");
    } catch (error) {
      console.error("Error deleting appointment:", error);
      toast.error("Error deleting appointment.");
    }
  };

  return {
    addAppointment: addAppointmentMutation,
    editAppointment: editAppointmentMutation,
    deleteAppointment: deleteAppointmentMutation,
    handleSaveAppointment,
    handleDeleteAppointment,
  };
};

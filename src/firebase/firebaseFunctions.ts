import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { FIREBASE_DB } from "./firebaseConfig";
import { IAppointment } from "../typescript/interfaces";

export const getAppointments = async (): Promise<IAppointment[]> => {
  try {
    const data: IAppointment[] = await fetchAppointments();
    return data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
};

export const fetchAppointments = async (): Promise<IAppointment[]> => {
  const q = collection(FIREBASE_DB, "appointments");
  const querySnapshot = await getDocs(q);
  const allAppointments: IAppointment[] = [];
  querySnapshot.forEach((doc) => {
    const appointment = doc.data();
    appointment.id = doc.id;
    allAppointments.push(appointment as IAppointment);
  });
  return allAppointments;
};

export const addAppointment = async (
  appointment: IAppointment
): Promise<void> => {
  try {
    const docRef = doc(FIREBASE_DB, "appointments", appointment.id);
    await setDoc(docRef, appointment);
  } catch (error) {
    console.error("Error adding appointment:", error);
    throw new Error("Error adding appointment.");
  }
};

export const updateAppointment = async (
  id: string,
  appointment: Partial<IAppointment>
): Promise<void> => {
  try {
    const appointmentRef = doc(FIREBASE_DB, "appointments", id);
    await updateDoc(appointmentRef, appointment);
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw new Error("Error updating appointment.");
  }
};

export const deleteAppointment = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(FIREBASE_DB, "appointments", id));
  } catch (error) {
    console.error("Error deleting appointment:", error);
    throw new Error("Error deleting appointment.");
  }
};

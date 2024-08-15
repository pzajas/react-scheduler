import { useState, useEffect } from "react";
import { CustomScheduler } from "./components/CustomScheduler";
import { getCurrentDate } from "./helpers/dateHelpers";
import { getCollectionItems } from "./firebase/firebaseFunctions";
import { IAppointment } from "./typescript/interfaces";

const App = () => {
  const [schedulerData, setSchedulerData] = useState<IAppointment[]>([]);
  const currentDate = getCurrentDate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCollectionItems<IAppointment>("appointments");
        setSchedulerData(data || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setSchedulerData([]);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <CustomScheduler
        currentDate={currentDate}
        schedulerData={schedulerData}
      />
    </>
  );
};

export default App;

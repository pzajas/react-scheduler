import { CustomScheduler } from "./components/CustomScheduler";
import { getCurrentDate } from "./helpers/dateHelpers";

const App = () => {
  const schedulerData = [
    {
      startDate: "2024-08-15T09:45",
      endDate: "2024-08-15T11:00",
      title: "Meeting",
    },
  ];
  const currentDate = getCurrentDate();

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

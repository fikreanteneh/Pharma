import { Card } from "@mui/material";
import { Medicine } from "../state/types/medicineTypes";

const MedicineCard = (prop: { medicine: Medicine }) => {
  const { name, amharicName } = prop.medicine;

  return (
    <>
      <h1>{name}</h1>
      <Card>
        <h1> {name}</h1>
        <h1> {amharicName}</h1>

      </Card>
    </>
  );
};

export default MedicineCard;


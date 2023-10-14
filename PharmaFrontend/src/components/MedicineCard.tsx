import { Card, styled } from "@mui/material";
import { Medicine } from "../models/Medicine";
import { useNavigate } from 'react-router-dom';

const MedicineCardStyle = styled.div({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "10px",
  bord
})


const MedicineCard = (prop: { medicine: Medicine }) => {
  const navigate = useNavigate();
  const { id, name, exactname } = prop.medicine;

  return (
    <MedicineCardStyle onClick={() => { navigate(`${id}`) }}>
      
        <h1> {name}</h1>
        <h1> {exactname}</h1>
    
    </MedicineCardStyle>
  );
};

export default MedicineCard;


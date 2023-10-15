import styled from "@emotion/styled";
import { useNavigate } from 'react-router-dom';
import MedicineLogo from "../assets/images/medicine.jpeg";
import { Medicine } from "../models/Medicine";


const MedicineCardStyle = styled.div({
  width: "100%",
  maxWidth: "720px",
  display: "flex",
  // flexDirection: "ro",
  // justifyContent: "center",
  alignItems: "center",
  margin: "10px",
  height: "70px",
  // border: "1px solid black",
  // copilot give me a box shadow with blue black
  boxShadow: "0px 0px 3px 0px rgba(0,0,50,0.80)",
  borderRadius: "10px",
  // padding: "15px",
  background: "rgba(220,220,220,0.80)",
  cursor: "pointer"
})


const MedicineCardImageStyle = styled.img({
  height: "100%",
  objectFit: "contain",
  borderRadius: "10px",
  background: "rgba(220,220,220,0.80)",
  cursor: "pointer"
})

const MedicineCard = (prop: { medicine: Medicine }) => {
  const navigate = useNavigate();
  const { id, name, exactname } = prop.medicine;

  return (
    <MedicineCardStyle onClick={() => { navigate(`${id}`) }}>
      <MedicineCardImageStyle src={MedicineLogo} alt="Medicine Logo" />
      <div>
        <h1> {name}</h1>
        <h1> {exactname}</h1>
      </div>

    </MedicineCardStyle>
  );
};

export default MedicineCard;


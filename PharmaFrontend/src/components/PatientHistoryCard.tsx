import './PatientHistoryCard.css';

const PatientHistoryCard = ({ patient }) => {
  const { type, description, date, doctor, hospital } = patient;
  
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <div className="patient-card">
      <h1>{type}</h1>
      <p>{description}</p>
      <div className="patient-card-footer">
        <p>{doctor}</p>
        <p>{hospital}</p>
      </div>
      <div className="left-side">
        <p>{formattedDate}</p>
      </div>
    </div>
  );
};

export default PatientHistoryCard;
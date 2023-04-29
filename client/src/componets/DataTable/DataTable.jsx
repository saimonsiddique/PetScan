import { useState } from "react";
import { Button } from "@mui/material";
import apiVet from "../../ApiServices/ApiVetServices";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PrescriptionForm from "../PrescriptionForm/PrescriptionForm";

const DataTable = ({ appointments }) => {
  const [open, setOpen] = useState(false);
  const [prescription, setPrescription] = useState([]);
  const [client, setClient] = useState({});
  const [pet, setPet] = useState({});
  const handleClose = () => setOpen(false);

  const createData = (email, clientName, petName, concern, pet) => {
    return {
      email,
      clientName,
      petName,
      concern,
      pet: pet,
    };
  };

  const OrginalRows = appointments.map((appointment) => {
    return createData(
      appointment.clientEmail,
      appointment.clientName,
      appointment.petName,
      appointment.concern,
      appointment.pet
    );
  });
  const [rows, setRows] = useState(OrginalRows);
  const accessToken = localStorage.getItem("accessToken");

  const handleSelection = (appointment) => {
    console.log("Appointment", appointment);
    setClient({
      name: appointment.clientName,
      email: appointment.email,
    });

    setPet({
      name: appointment.petName,
      concern: appointment.concern,
      petId: appointment.pet._id,
    });
    setOpen(true);
  };

  const sendPrescriptionToClient = () => {
    console.log("New prescription with Data", prescription);
    console.log("Client", client);
    console.log("Pet", pet);

    const data = {
      client: client,
      pet: pet,
      prescription: prescription,
    };
    try {
      const response = apiVet.sendPrescription(accessToken, data);
      console.log("Response", response);
    } catch (error) {
      console.log("Error", error);
      alert("Error sending prescription");
    }
    handleClose();
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          width: "65vw",
          margin: "auto",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "#3BAFDA",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Pet Parent's Email
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#3BAFDA",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Pet Name
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#3BAFDA",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Concern
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#3BAFDA",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Suggestions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.email}</TableCell>
                <TableCell align="center">{row.petName}</TableCell>
                <TableCell align="center">{row.concern}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => handleSelection(row)}
                    variant="contained"
                    sx={{
                      backgroundColor: "#42389D",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#42389D",
                        color: "white",
                      },
                    }}
                  >
                    Suggest
                  </Button>
                  <PrescriptionForm
                    open={open}
                    handleClose={handleClose}
                    handleOpen={handleSelection}
                    appointment={row}
                    setPrescription={setPrescription}
                    sendPrescriptionToClient={sendPrescriptionToClient}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DataTable;

import { useState } from "react";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PrescriptionForm from "../PrescriptionForm/PrescriptionForm";

const DataTable = ({ appointments }) => {
  console.log("DataTable appointments", appointments);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
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
              <TableCell>Pet Parent's Email</TableCell>
              <TableCell align="center">Pet Name</TableCell>
              <TableCell align="center">Concern</TableCell>
              <TableCell align="center">Suggestions</TableCell>
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
                    onClick={handleOpen}
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
                    handleOpen={handleOpen}
                    appointment={row}
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

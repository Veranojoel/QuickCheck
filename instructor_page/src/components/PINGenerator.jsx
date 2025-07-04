// ✅ PINGenerator.jsx
import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
} from "@mui/material";

const PINGenerator = ({ courseId }) => {
  const [duration, setDuration] = useState("");
  const [pin, setPin] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);

  const handleGenerate = () => {
    if (!duration || isNaN(duration)) return alert("Enter valid duration in minutes");

    axios
      .post("http://localhost:8080/api/pin/generate", {
        courseId,
        duration,
      })
      .then((res) => {
        setPin(res.data.pinCode);
        const expireTime = new Date(res.data.generatedAt);
        expireTime.setMinutes(expireTime.getMinutes() + res.data.durationMinutes);
        setExpiresAt(expireTime);
      })
      .catch((err) => {
        alert("Failed to generate pin");
        console.error(err);
      });
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Generate Attendance PIN
      </Typography>

      <Stack spacing={2} direction="row" alignItems="center">
        <TextField
          label="Duration (minutes)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <Button variant="contained" onClick={handleGenerate}>
          Generate
        </Button>
      </Stack>

      {pin && (
        <Box mt={2}>
          <Typography variant="h5">PIN: {pin}</Typography>
          <Typography variant="body2" color="textSecondary">
            Expires at: {expiresAt?.toLocaleTimeString()}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default PINGenerator;

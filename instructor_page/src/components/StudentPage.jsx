import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
  width: 850,
};

const StudentPage = () => {
  const [modalOpen, setModalOpen] = useState(true);

  const [searchName, setSearchName] = useState("");
  const [pinCode, setPinCode] = useState("");

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    studentNo: "",
  });

  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [courseList, setCourseList] = useState([]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/students/courses");
        setCourseList(res.data);
        if (res.data.length > 0) {
          setSelectedCourseId(res.data[0].courseId); // set default
        }
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };
    fetchCourses();
  }, []);

  const handleCheckIn = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/students/checkin", {
        name: searchName,
        pinCode,
        courseId: selectedCourseId,
      });

      const { success, message } = res.data;

      setSnackbar({
        open: true,
        message: success ? `✅ ${message}` : `❌ ${message}`,
        severity: success ? "success" : "error",
      });

      if (success) {
        setSearchName("");
        setPinCode("");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "⚠️ Check-in failed. Try again.",
        severity: "warning",
      });
    }
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/students/register", {
        ...registerData,
        courseId: selectedCourseId,
      });

      setSnackbar({
        open: true,
        message: "🎉 Registration successful!",
        severity: "success",
      });

      setRegisterData({ name: "", email: "", studentNo: "" });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setSnackbar({
          open: true,
          message: "⚠️ Student already exists.",
          severity: "warning",
        });
      } else {
        setSnackbar({
          open: true,
          message: "❌ Registration failed.",
          severity: "error",
        });
      }
    }
  };

  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        📘 Student Attendance Check-In
      </Typography>
      <Button variant="contained" onClick={() => setModalOpen(true)}>
        Open Check-In Panel
      </Button>

      {/* 📦 Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            ...modalStyle,
            display: "flex",
            flexDirection: "row",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {/* ✅ Check-In Form */}
          <Box sx={{ width: "50%" }}>
            <Typography variant="h6" gutterBottom>
              ✅ Check In
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select Course</InputLabel>
              <Select
                value={selectedCourseId}
                label="Select Course"
                onChange={(e) => setSelectedCourseId(e.target.value)}
              >
                {courseList.map((course) => (
                  <MenuItem key={course.courseId} value={course.courseId}>
                    {course.courseDesc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Enter your name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Enter pin code"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button fullWidth variant="contained" onClick={handleCheckIn}>
              Submit Check-In
            </Button>
          </Box>

          {/* 🆕 Register Form */}
          <Box sx={{ width: "50%" }}>
            <Typography variant="h6" gutterBottom>
              🆕 Register Student
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select Course</InputLabel>
              <Select
                value={selectedCourseId}
                label="Select Course"
                onChange={(e) => setSelectedCourseId(e.target.value)}
              >
                {courseList.map((course) => (
                  <MenuItem key={course.courseId} value={course.courseId}>
                    {course.courseDesc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Full Name"
              value={registerData.name}
              onChange={(e) =>
                setRegisterData({ ...registerData, name: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Student No."
              value={registerData.studentNo}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  studentNo: e.target.value,
                })
              }
              sx={{ mb: 2 }}
            />
            <Button fullWidth variant="contained" onClick={handleRegister}>
              Register
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* ✅ Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StudentPage;

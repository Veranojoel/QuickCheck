import React, { useRef } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import Button from "@mui/material/Button";

const ImportStudents = ({ courseId, onImported }) => {
  const fileInputRef = useRef();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !courseId) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
      let students = [];

      // 📄 TEXT FILE (.txt)
      if (file.name.endsWith(".txt")) {
        const lines = e.target.result.split("\n");
        students = lines.map((name) => ({
          name: name.trim(),
          email: "",
          studentNo: "",
          course: { courseId: courseId },
        }));
      }

      // 📊 EXCEL FILE (.xlsx)
      else if (file.name.endsWith(".xlsx")) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet);

        students = rows.map((row) => ({
          name: row.name || "",
          email: row.email || "",
          studentNo: row.studentNo || "",
          course: { courseId: courseId }, // ✅ required for backend
        }));
      }

      // POST each student with course object
      for (let student of students) {
        if (student.name) {
          try {
            await axios.post(
              `http://localhost:8080/api/courses/${courseId}/students`,
              student
            );
          } catch (err) {
            console.error("Failed to import student:", student.name, err);
            alert(`Failed to import student: ${student.name}`);
          }
        }
      }

      alert("Students imported successfully!");
      onImported();
      fileInputRef.current.value = null; // ✅ allow re-importing same file
    };

    if (file.name.endsWith(".txt")) {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <>
      <input
        type="file"
        id="import-students"
        accept=".txt,.xlsx"
        hidden
        ref={fileInputRef}
        onChange={handleFileUpload}
      />
      <label htmlFor="import-students">
        <Button
          variant="outlined"
          component="span"
          sx={{
            color: "#5A827E",
            borderColor: "#5A827E",
            "&:hover": {
              borderColor: "#45635F",
              backgroundColor: "rgba(90, 130, 126, 0.08)",
            },
          }}
        >
          Import
        </Button>
      </label>
    </>
  );
};

export default ImportStudents;

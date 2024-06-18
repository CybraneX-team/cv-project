import React, { useState, useRef } from "react";
import { Box, Button, Typography, Modal, TextField, Chip } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { firebaseConfig } from "../firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";

const MainPage = () => {
  const [open, setOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [displayJobDescription, setDisplayJobDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const app = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const handleGoogleSignIn = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    setDisplayJobDescription(jobDescription);
    handleClose();
  };

  const handleCancel = () => {
    setJobDescription("");
    handleClose();
  };

  const handleUploadFiles = () => {
    fileInputRef.current.click();
  };

  const handleFilesSelected = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(files);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#ffffff"
    >
      <div
        onClick={handleGoogleSignIn}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
        }}
      >
        <GoogleIcon color="primary" />
      </div>
      <Box mb={4}>
        <Typography
          variant="h4"
          color="initial"
          style={{
            fontWeight: "bold",
            fontSize: "2rem",
            textAlign: "left",
            marginLeft: "-500px",
          }}
        >
          Analyze Candidate
        </Typography>
        <Typography
          variant="h4"
          color="initial"
          style={{
            fontWeight: "bold",
            fontSize: "2rem",
            textAlign: "left",
            marginLeft: "-500px",
          }}
        >
          CVs Using AI
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: "#e0e0e0",
            color: "black",
            marginBottom: "1rem",
            width: "150px",
            height: "80px",
          }}
          onClick={handleOpen}
        >
          Job Description Pasted
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: "black",
            color: "white",
            marginBottom: "1rem",
            width: "150px",
            height: "80px",
          }}
          onClick={handleUploadFiles}
        >
          Upload CV
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: "#e0e0e0",
            color: "black",
            width: "150px",
            height: "80px",
          }}
        >
          Analyze (10 tokens)
        </Button>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bgcolor="white"
          padding={4}
          borderRadius={2}
          boxShadow={3}
          width={400}
          height={200}
          position="absolute"
          top="30%"
          left="35%"
          transform="translate(-50%, -50%)"
        >
          <Typography variant="body1" gutterBottom>
            Insert your job description here.
          </Typography>
          <TextField
            multiline
            rows={4}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="contained" color="primary" onClick={handleConfirm}>
              Confirm
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancel}
              style={{ marginLeft: "1rem" }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      {displayJobDescription && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Job Description
          </Typography>
          <Box bgcolor="#e0e0e0" padding={2} borderRadius={2}>
            <Typography variant="body1">{displayJobDescription}</Typography>
          </Box>
        </Box>
      )}
      {uploadedFiles.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Attached CVs
          </Typography>
          <Box display="flex" flexWrap="wrap">
            {uploadedFiles.map((file, index) => (
              <Chip
                key={index}
                label={file.name}
                variant="outlined"
                style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }}
              />
            ))}
          </Box>
        </Box>
      )}
      <input
        type="file"
        multiple
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFilesSelected}
      />
    </Box>
  );
};

export default MainPage;

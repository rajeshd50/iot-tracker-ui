import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { QrReader } from "react-qr-reader";

export interface IDeviceQrScannerProps {
  show: boolean;
  onCancel: () => void;
  onScanDone: (value: string) => void;
}

function QrViewFinder() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: "100%",
        height: "100%",
        zIndex: 99999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          border: `2px dashed ${grey[900]}`,
          borderRadius: "15px",
          width: "350px",
          height: "350px",
          backgroundColor: "transparent",
        }}
      ></Box>
    </Box>
  );
}

function DeviceQrScanner(props: IDeviceQrScannerProps) {
  const { show, onCancel, onScanDone } = props;
  const [qrData, setQrData] = useState("");

  const onClose = () => {
    setQrData("");
    onCancel();
  };
  const onClickDone = () => {
    onScanDone(qrData);
    onClose();
  };
  useEffect(() => {
    if (qrData) {
      onClickDone();
    }
  }, [qrData]);
  return (
    <Dialog
      onClose={onClose}
      open={show}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown
    >
      <DialogTitle
        sx={{ fontSize: "1.4rem", borderBottom: `1px solid ${grey[200]}` }}
      >
        Scan Device QR code
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            width: "100%",
            minHeight: "400px",
            backgroundColor: grey[200],
          }}
        >
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                setQrData(result?.getText().trim());
              }

              if (!!error) {
                console.info(error);
              }
            }}
            constraints={{
              aspectRatio: 1,
            }}
            ViewFinder={QrViewFinder}
          />
        </Box>
        {qrData ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "8px 0",
            }}
          >
            <Typography variant="h6">{qrData}</Typography>
          </Box>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          variant="outlined"
          autoFocus
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          disabled={!qrData}
          variant="contained"
          color="primary"
          onClick={onClickDone}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeviceQrScanner;

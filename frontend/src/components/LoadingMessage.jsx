import { Box, Typography, CircularProgress } from "@mui/material";
import { SmartToy } from "@mui/icons-material";

const LoadingMessage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mb: 3,
      }}
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          color: "text.primary",
          backgroundColor: "background.paper",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <SmartToy fontSize="small" />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: 3,
          py: 2,
          borderRadius: 3,
          border: 1,
          borderColor: "divider",
          backgroundColor: "background.paper",
        }}
      >
        <CircularProgress size={20} />
        <Typography variant="body2" color="text.secondary">
          Researching...
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingMessage;


import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useState } from "react";

const TopicCard = ({ onGenerate, loading }) => {
  const [topic, setTopic] = useState("");

  const handleSubmit = () => {
    if (topic.trim() && !loading) {
      onGenerate(topic.trim());
      setTopic("");
    }
  };

  return (
    <Box
      sx={{
        px: 3,
        py: 2,
        backgroundColor: "background.paper",
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          fullWidth
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && topic.trim() && !loading) {
              handleSubmit();
            }
          }}
          placeholder="Enter a topic to research"
          sx={{
            maxWidth: "600px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
              backgroundColor: "background.paper",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "& fieldset": {
                borderColor: "divider",
                borderWidth: 1.5,
              },
              "&:hover fieldset": {
                borderColor: "text.primary",
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              },
              "&.Mui-focused": {
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                transform: "translateY(-1px)",
                "& fieldset": {
                  borderColor: "text.primary",
                  borderWidth: 2,
                },
              },
            },
            "& .MuiInputBase-input": {
              py: 1.5,
              px: 3,
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ mr: 1 }}>
                <IconButton
                  disabled={!topic.trim() || loading}
                  onClick={handleSubmit}
                  sx={{
                    backgroundColor: topic
                      ? "text.primary"
                      : "action.disabledBackground",
                    color: "background.paper",
                    width: 40,
                    height: 40,
                    boxShadow: topic ? "0 2px 8px rgba(0,0,0,0.2)" : "none",
                    "&:hover": {
                      backgroundColor: topic
                        ? "text.primary"
                        : "action.disabledBackground",
                      opacity: topic ? 0.9 : 1,
                      transform: topic ? "scale(1.05)" : "scale(1)",
                      boxShadow: topic ? "0 4px 12px rgba(0,0,0,0.3)" : "none",
                    },
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&.Mui-disabled": {
                      backgroundColor: "action.disabledBackground",
                    },
                  }}
                >
                  <ArrowUpwardIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default TopicCard;

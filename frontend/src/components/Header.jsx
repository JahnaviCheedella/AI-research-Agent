import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import { LightMode, DarkMode, Menu } from "@mui/icons-material";
import { createTheme, useColorScheme } from "@mui/material/styles";

export const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: "#e6e6e6",
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: "#1a1a1a",
        },
      },
    },
  },
});

const Header = ({ onMenuClick }) => {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, sm: 4 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {onMenuClick && (
            <IconButton
              onClick={onMenuClick}
              sx={{
                color: "text.primary",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <Menu />
            </IconButton>
          )}
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              color: "text.primary",
            }}
          >
            AI Research Agent
          </Typography>
        </Box>
        <Box>
          <IconButton
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            sx={{
              color: "text.primary",
              "&:hover": {
                backgroundColor: "action.hover",
              },
              transition: "all 0.2s ease",
            }}
            aria-label="toggle theme"
          >
            {mode === "light" ? (
              <Tooltip title="Dark Mode">
                <DarkMode sx={{ fontSize: 24 }} />
              </Tooltip>
            ) : (
              <Tooltip title="Light Mode">
                <LightMode sx={{ fontSize: 24, color: "warning.light" }} />
              </Tooltip>
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

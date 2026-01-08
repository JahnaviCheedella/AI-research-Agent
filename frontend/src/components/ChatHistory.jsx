import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import { Add, Delete, Chat, Close } from "@mui/icons-material";

const ChatHistory = ({ chats, currentChatId, onSelectChat, onNewChat, onDeleteChat, open, onClose }) => {
  return (
    <Drawer
      variant={{ xs: "temporary", sm: "persistent" }}
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: { xs: "100%", sm: 280 },
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: { xs: "100%", sm: 280 },
          boxSizing: "border-box",
          borderRight: 1,
          borderColor: "divider",
          backgroundColor: "background.paper",
        },
      }}
    >
      <Box sx={{ p: 2, display: "flex", gap: 1, alignItems: "center" }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<Add />}
          onClick={onNewChat}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            py: 1,
            backgroundColor: "text.primary",
            "&:hover": {
              backgroundColor: "text.primary",
              opacity: 0.9,
            },
          }}
        >
          New Chat
        </Button>
        <IconButton
          onClick={onClose}
          sx={{
            color: "text.primary",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
          aria-label="close sidebar"
        >
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ flex: 1, overflow: "auto" }}>
        {chats.length === 0 ? (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Chat sx={{ fontSize: 48, color: "text.disabled", opacity: 0.5, mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              No chat history
            </Typography>
          </Box>
        ) : (
          chats.map((chat) => (
            <ListItem
              key={chat.id}
              disablePadding
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(chat.id);
                  }}
                  sx={{ mr: 1 }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              }
            >
              <ListItemButton
                selected={chat.id === currentChatId}
                onClick={() => onSelectChat(chat.id)}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "action.selected",
                  },
                }}
              >
                <ListItemText
                  primary={chat.title}
                  secondary={new Date(chat.createdAt).toLocaleDateString()}
                  primaryTypographyProps={{
                    sx: {
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>
    </Drawer>
  );
};

export default ChatHistory;


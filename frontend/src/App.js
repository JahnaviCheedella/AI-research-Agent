import { Alert, Stack, Box, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useState } from "react";
import Header from "./components/Header";
import ChatHistory from "./components/ChatHistory";
import ChatMessage from "./components/ChatMessage";
import LoadingMessage from "./components/LoadingMessage";
import TopicCard from "./components/TopicCard";
import { useDispatch, useSelector } from "react-redux";
import { runResearch, createNewChat, setCurrentChat, deleteChat, clearError } from "./store/slices/researchSlice";

function App() {
  const dispatch = useDispatch();
  const { loading, error, chats, currentChatId } = useSelector((state) => state.research);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentChat = chats.find((chat) => chat.id === currentChatId) || chats[0];

  const handleGenerate = (topic) => {
    // If no current chat exists, create one first
    let chatId = currentChatId;
    if (!chatId || !chats.find(chat => chat.id === chatId)) {
      chatId = Date.now().toString();
      dispatch(createNewChat(chatId));
    }
    dispatch(runResearch({ topic, chatId }));
  };

  const handleNewChat = () => {
    dispatch(createNewChat());
    setSidebarOpen(false);
  };

  const handleSelectChat = (chatId) => {
    dispatch(setCurrentChat(chatId));
    setSidebarOpen(false);
  };

  const handleDeleteChat = (chatId) => {
    dispatch(deleteChat(chatId));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <ChatHistory
          chats={chats}
          currentChatId={currentChatId}
          onSelectChat={handleSelectChat}
          onNewChat={handleNewChat}
          onDeleteChat={handleDeleteChat}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            ml: { xs: 0, sm: sidebarOpen ? "280px" : 0 },
            transition: "margin-left 0.3s ease",
            position: "relative",
          }}
        >
          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              px: { xs: 2, sm: 4, md: 6 },
              py: 4,
              display: "flex",
              alignItems: (!currentChat || currentChat.messages.length === 0) && !loading && !error ? "center" : "flex-start",
              justifyContent: (!currentChat || currentChat.messages.length === 0) && !loading && !error ? "center" : "flex-start",
            }}
          >
            <Stack spacing={3} sx={{ width: "100%" }}>
              {currentChat?.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {loading && <LoadingMessage />}

              {error && (
                <Alert
                  severity="error"
                  sx={{ borderRadius: 2 }}
                  onClose={() => dispatch(clearError())}
                >
                  {error}
                </Alert>
              )}

              {!loading && !error && (!currentChat || currentChat.messages.length === 0) && (
                <Stack alignItems="center" spacing={0.5}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: "50%",
                      backgroundColor: "action.hover",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Search
                      sx={{ fontSize: 56, color: "text.secondary", opacity: 0.7 }}
                    />
                  </Box>
                  <Typography variant="h5" color="text.primary" fontWeight={600}>
                    Start Your Research
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ maxWidth: "450px", textAlign: "center", lineHeight: 1.7 }}
                  >
                    Enter a topic below to get AI-powered research summaries with
                    source citations
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Box>
          <Box sx={{ position: "sticky", bottom: 0, zIndex: 1000 }}>
            <TopicCard onGenerate={handleGenerate} loading={loading} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchResearch from "../../api/researchApi";

export const runResearch = createAsyncThunk("research/run", async ({ topic, chatId }) => {
  const data = await fetchResearch(topic);
  return { data, topic, chatId };
});

const initialState = {
  loading: false,
  error: null,
  chats: [],
  currentChatId: null,
};

const researchSlice = createSlice({
  name: "research",
  initialState,
  reducers: {
    createNewChat: (state, action) => {
      const newChatId = action.payload || Date.now().toString();
      state.currentChatId = newChatId;
      // Check if chat already exists to prevent duplicates
      if (!state.chats.find(chat => chat.id === newChatId)) {
        state.chats.unshift({
          id: newChatId,
          title: "New Chat",
          messages: [],
          createdAt: new Date().toISOString(),
        });
      }
      state.error = null;
    },
    setCurrentChat: (state, action) => {
      state.currentChatId = action.payload;
    },
    deleteChat: (state, action) => {
      state.chats = state.chats.filter((chat) => chat.id !== action.payload);
      if (state.currentChatId === action.payload) {
        state.currentChatId = state.chats.length > 0 ? state.chats[0].id : null;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(runResearch.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      const { topic, chatId } = action.meta.arg;
      
      let chat = state.chats.find((c) => c.id === chatId);
      if (!chat) {
        chat = {
          id: chatId,
          title: topic.length > 30 ? topic.substring(0, 30) + "..." : topic,
          messages: [],
          createdAt: new Date().toISOString(),
        };
        state.chats.unshift(chat);
      } else {
        // Move chat to top when new message is added
        state.chats = state.chats.filter((c) => c.id !== chatId);
        state.chats.unshift(chat);
      }
      
      // Add user message immediately
      chat.messages.push({
        id: Date.now().toString(),
        type: "user",
        content: topic,
        timestamp: new Date().toISOString(),
      });
      
      state.currentChatId = chatId;
    });
    builder.addCase(runResearch.fulfilled, (state, action) => {
      state.loading = false;
      const { data, topic, chatId } = action.payload;
      
      const chat = state.chats.find((c) => c.id === chatId);
      if (chat) {
        // Add assistant response
        chat.messages.push({
          id: Date.now().toString(),
          type: "assistant",
          content: data,
          timestamp: new Date().toISOString(),
        });
        
        // Update title if needed
        if (chat.title === "New Chat" || chat.title.length > 30) {
          chat.title = topic.length > 30 ? topic.substring(0, 30) + "..." : topic;
        }
      }
    });
    builder.addCase(runResearch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { createNewChat, setCurrentChat, deleteChat, clearError } = researchSlice.actions;
export const researchReducer = researchSlice.reducer;

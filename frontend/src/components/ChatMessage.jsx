import {
  Box,
  Typography,
  Stack,
  Link,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { Person, SmartToy } from "@mui/icons-material";

const getDomain = (url) => {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
};

const ChatMessage = ({ message }) => {
  if (message.type === "user") {
    return (
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          justifyContent: "flex-end",
        }}
      >
        <Box
          sx={{
            maxWidth: "80%",
            backgroundColor: "text.primary",
            color: "background.paper",
            borderRadius: 3,
            p: 1,
          }}
        >
          <Typography>{message.content}</Typography>
        </Box>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            backgroundColor: "text.primary",
            color: "background.paper",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Person fontSize="small" />
        </Box>
      </Box>
    );
  }

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
      <Card
        elevation={0}
        sx={{
          maxWidth: "80%",
          borderRadius: 3,
          border: 1,
          borderColor: "divider",
          backgroundColor: "background.paper",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack spacing={2}>
            {message.content?.summary?.map((item, i) => (
              <Box key={i}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    color: "text.primary",
                  }}
                >
                  {item.text}
                  {item.source && (
                    <Link
                      href={item.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        ml: 1.5,
                        fontSize: "0.75rem",
                        color: "primary.main",
                        fontWeight: 500,
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                          opacity: 0.8,
                        },
                      }}
                    >
                      [{getDomain(item.source)}]
                    </Link>
                  )}
                </Typography>
                {i < message.content.summary.length - 1 && (
                  <Divider sx={{ mt: 2, opacity: 0.5 }} />
                )}
              </Box>
            ))}

            <Divider sx={{ my: 2, opacity: 0.5 }} />

            <Box
              sx={{
                backgroundColor: "action.hover",
                borderRadius: 2,
                p: 2,
              }}
            >
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 1, fontWeight: 600, fontSize: "0.9rem" }}
              >
                Sources
              </Typography>
              <Stack spacing={0.5}>
                {[
                  ...new Set(
                    message.content?.summary?.map((item) => item.source)
                  ),
                ].map((src, i) => (
                  <Link
                    key={i}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      fontSize: "0.875rem",
                      color: "primary.main",
                      fontWeight: 500,
                      textDecoration: "none",
                      display: "inline-block",
                      "&:hover": {
                        textDecoration: "underline",
                        opacity: 0.8,
                      },
                    }}
                  >
                    {getDomain(src)}
                  </Link>
                ))}
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ChatMessage;

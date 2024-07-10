import PostToken from "@/components/token_list_quate.js/quote";
import TokenFetch from "@/components/token_list_quate.js/tokenfetch";
import { StateContext } from "@/context/state";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useContext } from "react";

export const Main = () => {
  const { params, setParams } = useContext(StateContext);
  return (
    <>
      <Grid container spacing={2} sx={{ p: 3 }}>
        <Grid item sm={12} xs={12} md={6} lg={7}>
          <TokenFetch />
        </Grid>
        <Grid item sm={12} xs={12} md={6} lg={5}>
          <PostToken />
        </Grid>
        <Grid item sm={12} xs={12} md={12} lg={12}>
          <Box>
            <Paper
              style={{
                padding: "16px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Parameters
              </Typography>
              <Box>
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    color: "black",
                    backgroundColor: "#ffffff",
                    padding: "16px",
                    borderRadius: "8px",
                    fontFamily: "monospace",
                    overflowX: "auto",
                  }}
                >
                  {JSON.stringify(params, null, 2)}
                </pre>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

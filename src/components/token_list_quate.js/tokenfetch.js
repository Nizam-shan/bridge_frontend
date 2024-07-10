import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { BASE_URL } from "@/constants.js/url";
import { useContext } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import axios from "axios";
import { StateContext } from "@/context/state";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Bounce, toast } from "react-toastify";

const TokenFetch = () => {
  const [open, setOpen] = React.useState({});
  const { tokens, setTokens } = useContext(StateContext);
  const [loading, setLoading] = React.useState(false);

  const handleClick = (index) => {
    setOpen(!open);
    setOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
    // setOpen(open === index ? null : index);
  };
  const handleCopy = (address, name) => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        toast.success(`${name} copied ${address}`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .catch((error) => {
        alert("Failed to copy", error.message);
      });
  };
  React.useEffect(() => {
    const fetchTokens = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/token`);
        setTokens(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tokens:", error);
        setLoading(false);
      }
    };

    fetchTokens();
  }, [setTokens]);
  return (
    <List
      sx={{
        width: "100%",
        height: "100vh",
        bgcolor: "background.paper",
        color: "black",
        overflow: "auto",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          XY Tokens
        </ListSubheader>
      }
    >
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      )}
      {tokens ? (
        tokens.map((item, index) => (
          <React.Fragment key={index}>
            <ListItemButton onClick={() => handleClick(index)}>
              <ListItemIcon
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <img
                  style={{ width: "50px", height: "50px" }}
                  src={item?.logoURI}
                  alt={item?.name}
                />
              </ListItemIcon>

              <ListItemText primary={item?.name} />
              <Typography>{`Decimals:${item.decimals}`}</Typography>
              {open[index] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{
                    pl: 4,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    onClick={() => handleCopy(item.address, "Address")}
                  >
                    {`${item.symbol} : ${item.address}`}
                    <span style={{ padding: "4px" }}>
                      <ContentCopyIcon style={{ width: "20px" }} />
                    </span>
                  </Typography>
                  <Typography
                    onClick={() => handleCopy(item.chainId, "Chain Id")}
                  >
                    {`chain Id : ${item.chainId}`}{" "}
                    <span style={{ padding: "4px" }}>
                      <ContentCopyIcon style={{ width: "20px" }} />
                    </span>
                  </Typography>
                  {/* <ListItemText primary={item?.address} /> */}
                </ListItemButton>
              </List>
            </Collapse>
          </React.Fragment>
        ))
      ) : (
        <div style={{ width: "100%", height: "100%" }}>No data found</div>
      )}
    </List>
  );
};

export default TokenFetch;

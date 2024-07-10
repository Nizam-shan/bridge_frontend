import { Box, Button, CircularProgress } from "@mui/material";
import { useContext, useState } from "react";
import CustomTextField from "../sharedComponents/customtextField";
import axios from "axios";
import { BASE_URL } from "@/constants.js/url";
import { StateContext } from "@/context/state";
import { Bounce, toast } from "react-toastify";

const PostToken = () => {
  const [formData, setFormData] = useState({
    srcChainId: "",
    srcQuoteTokenAddress: "",
    srcQuoteTokenAmount: "",
    dstChainId: "",
    dstQuoteTokenAddress: "",
    slippage: "",
  });
  const [loading, setLoading] = useState(false);
  const { quote, setQuote, params, setParams } = useContext(StateContext);
  console.log("🚀 ~ PostToken ~ quote:", quote);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setFormData({
      srcChainId: "",
      srcQuoteTokenAddress: "",
      srcQuoteTokenAmount: "",
      dstChainId: "",
      dstQuoteTokenAddress: "",
      slippage: "",
    });
  };
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    setQuote(null);
    try {
      axios
        .post(
          `${BASE_URL}/quotes?srcChainId=${formData.srcChainId}&srcQuoteTokenAddress=${formData.srcQuoteTokenAddress}&srcQuoteTokenAmount=${formData.srcQuoteTokenAmount}&dstChainId=${formData.dstChainId}&dstQuoteTokenAddress=${formData.dstQuoteTokenAddress}&slippage=${formData.slippage}`
        )
        .then((res) => {
          const data = res.data;

          setLoading(false);
          if (data.data.success === true) {
            console.log("data", data.data);
            setQuote(data.data);
            toast.success("Request done successfully", {
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
            handleCancel();
          } else {
            toast.info(data.data.errorMsg, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          }
        })
        .catch((error) => {
          console.log("🚀 ~ handleSubmit ~ error:", error);
          setLoading(false);

          toast.error(error.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        });
    } catch (error) {
      setLoading(false);

      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleBuildTx = (e) => {
    setLoading(true);
    setParams(null);
    try {
      axios(
        `${BASE_URL}/transaction?srcChainId=${
          quote.routes[quote.routes.length - 1].srcChainId
        }&srcQuoteTokenAddress=${
          quote.routes[quote.routes.length - 1].srcQuoteTokenAddress
        }&srcQuoteTokenAmount=${
          quote.routes[quote.routes.length - 1].srcQuoteTokenAmount
        }&dstChainId=${
          quote.routes[quote.routes.length - 1].dstChainId
        }&dstQuoteTokenAddress=${
          quote.routes[quote.routes.length - 1].dstQuoteTokenAddress
        }&slippage=${quote.routes[quote.routes.length - 1].slippage}&receiver=${
          quote.routes[quote.routes.length - 1].dstQuoteTokenAddress
        }&bridgeProvider=${
          quote.routes[quote.routes.length - 1]?.bridgeDescription?.provider
            ? quote.routes[quote.routes.length - 1].bridgeDescription.provider
            : ""
        }&srcBridgeTokenAddress=${
          quote.routes[quote.routes.length - 1].bridgeDescription
            ?.srcBridgeToken.address
            ? quote.routes[quote.routes.length - 1].bridgeDescription
                ?.srcBridgeToken.address
            : ""
        }&dstBridgeTokenAddress=${
          quote.routes[quote.routes.length - 1].bridgeDescription
            ?.dstBridgeToken.address
            ? quote.routes[quote.routes.length - 1].bridgeDescription
                ?.dstBridgeToken.address
            : ""
        }&srcSwapProvider=${
          quote.routes[quote.routes.length - 1].srcSwapDescription?.provider
        }&dstSwapProvider=${
          quote.routes[quote.routes.length - 1].dstSwapDescription?.provider
        }`
      )
        .then((res) => {
          const data = res.data;
          console.log("🚀 ~ .then ~ data:", data);
          setLoading(false);
          if (data.data) {
            setParams(data.data);
          } else {
            console.log("error ", data);
          }
        })
        .catch((error) => {
          console.log("🚀 ~ handleBuildTx ~ error:", error);
          setLoading(false);

          toast.error(error.message, {
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
        });
    } catch (error) {
      console.log("🚀 ~ handleBuildTx ~ error:", error);
      setLoading(false);

      toast.error(error.message, {
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
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 style={{ color: "black" }}>GET QUOTES</h2>
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

        <Box
          sx={{
            mt: 2,
            minWidth: "100%",
            minHeight: "100%",
            bgcolor: "background.paper",
            color: "black",
            overflow: "auto",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <CustomTextField
              label="Source chain Id"
              name="srcChainId"
              value={formData.srcChainId}
              required
              onChange={handleChange}
            />
            <CustomTextField
              label="Source token address"
              name="srcQuoteTokenAddress"
              value={formData.srcQuoteTokenAddress}
              required
              onChange={handleChange}
            />
            <CustomTextField
              label="Source token amount"
              name="srcQuoteTokenAmount"
              value={formData.srcQuoteTokenAmount}
              required
              onChange={handleChange}
            />
            <CustomTextField
              label="Destination chain Id"
              name="dstChainId"
              value={formData.dstChainId}
              required
              onChange={handleChange}
            />
            <CustomTextField
              label="Destination token address"
              name="dstQuoteTokenAddress"
              value={formData.dstQuoteTokenAddress}
              required
              onChange={handleChange}
            />
            <CustomTextField
              label="slippage"
              name="slippage"
              value={formData.slippage}
              required
              onChange={handleChange}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              p: 3,
              gap: 3,
            }}
          >
            <Button variant="outlined" onClick={() => handleCancel()}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {quote && quote?.routes && (
              <Button onClick={() => handleBuildTx()}>Generate the TX</Button>
            )}
          </Box>
        </Box>
      </form>
    </>
  );
};

export default PostToken;

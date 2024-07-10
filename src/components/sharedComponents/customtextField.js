import { TextField } from "@mui/material";

const CustomTextField = (props) => {
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        fullWidth
        {...props}
      />
    </>
  );
};

export default CustomTextField;

import { useState, FC, ChangeEvent } from "react";
import { Box, OutlinedInput, InputAdornment } from "@mui/material";

interface INumberInput {
  label: string;
  unit: string;
}

const NumberInput: FC<INumberInput> = ({ label, unit }) => {
  const [amount, setAmount] = useState(0);
  const handleChangeAmount = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (typeof e.target.value === "number") {
      setAmount(e.target.value);
    }
  };
  return (
    <Box
      sx={{
        "& > :not(style)": {
          m: 1,
        },
      }}
    >
      <OutlinedInput
        label={label}
        value={amount}
        onChange={handleChangeAmount}
        endAdornment={<InputAdornment position="end">XMR</InputAdornment>}
        name="numberformat"
        id="numberformat-input"
        inputProps={{
          inputMode: "numeric",
          pattern: "[0-9]*",
        }}
      />
    </Box>
  );
};
export default NumberInput;

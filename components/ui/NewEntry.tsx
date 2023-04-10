import { ChangeEvent, useState, useContext } from "react";
import { Box, Button, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { EntriesContext } from "@/context/entries";
import { UIContext } from "@/context/ui";

export const NewEntry = () => {
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);
  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const handleFormChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if (inputValue.trim().length <= 0) return;
    addNewEntry(inputValue);
    setInputValue("");
    setTouched(false);
    setIsAddingEntry(false);
  };

  const onCancel = () => {
    setIsAddingEntry(false);
    setInputValue("");
  };

  return (
    <Box
      sx={{
        mb: 2,
        paddingX: 2,
      }}
    >
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{
              mt: 2,
              mb: 1,
            }}
            placeholder="Nueva Entrada..."
            autoFocus
            multiline
            label="Nueva Entrada"
            helperText={inputValue.length <= 0 && touched && "Ingrese un Valor"}
            value={inputValue}
            onChange={handleFormChange}
            error={inputValue.length <= 0 && touched}
            onBlur={() => setTouched(true)}
          />
          <Box display={"flex"} justifyContent={"space-between"}>
            <Button variant="text" color="secondary" onClick={onCancel}>
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          endIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={() => setIsAddingEntry(true)}
        >
          Agregar Entrada
        </Button>
      )}
    </Box>
  );
};

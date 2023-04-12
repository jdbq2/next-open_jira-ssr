import { useState, ChangeEvent, useContext } from "react";
import { NextPage, GetServerSideProps } from "next";
import {
  Button,
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Layout } from "@/components/layouts";
import { Entry, EntryStatus } from "@/interfaces";
import { isValidObjectId } from "mongoose";
import { db } from "@/database";
import { Entry as EntryModel } from "@/models";
import { EntriesContext } from "@/context/entries";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";
import { dateFunctions } from "@/utils";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
  entry: Entry;
}

const EntryPage: NextPage<Props> = ({ entry }) => {
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);
  const router = useRouter();
  const { updateEntry } = useContext(EntriesContext);

  const handleFormChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInputValue(event.target.value);
  };

  const onStatusChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {
    const updatedEntry = {
      ...entry,
      description: inputValue,
      status,
    };
    updateEntry(updatedEntry);
    enqueueSnackbar("Entrada actualizada!", {
      autoHideDuration: 2000,
      variant: "success",
    });
    router.push("/");
  };

  const handleEntryDelete = () => {};

  return (
    <Layout title="...">
      <Grid container justifyContent={"center"} sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title="Entrada"
              subheader={dateFunctions.getFormatDistanceToNow(entry.createdAt)}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 1, marginBottom: 1 }}
                fullWidth
                autoFocus
                multiline
                placeholder="Nueva Entrada"
                label="Nueva Entrada"
                onChange={handleFormChange}
                value={inputValue}
                helperText={
                  inputValue.length <= 0 && touched && "Ingrese un valor"
                }
                onBlur={() => setTouched(true)}
                error={inputValue.length <= 0 && touched}
              />
              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChange}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      label={capitalize(option)}
                      control={<Radio />}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0}
              >
                Guardar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        onClick={handleEntryDelete}
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.dark",
        }}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as { id: string };

  if (!isValidObjectId(id)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  await db.connect();
  const entry = await EntryModel.findById(id).lean();
  await db.disconnect();

  if (entry) {
    return {
      props: { entry: JSON.parse(JSON.stringify(entry)) },
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

export default EntryPage;

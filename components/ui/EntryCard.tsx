import { useContext } from "react";
import { UIContext } from "@/context/ui";
import { Entry } from "@/interfaces";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { DragEvent, FC } from "react";

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { setIsDragging } = useContext(UIContext);
  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    event.dataTransfer.setData("text", entry._id);
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <Card
      sx={{
        marginBottom: 1,
      }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: 2,
          }}
        >
          <Typography variant="body2">Hace 30 mins</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

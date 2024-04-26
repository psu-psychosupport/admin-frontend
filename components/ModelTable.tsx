import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";

import { Edit as EditIcon } from "@mui/icons-material";

import React from "react";
import { redirect } from "@remix-run/node";

export default function ModelTable<T>({
  data,
  model,
}: {
  data: T[];
  model: string;
}) {
  const entries = data.map(Object.entries);

  return (
    <TableContainer>
      <Stack
        justifyContent={'space-between'}
        sx={{marginBottom: "2%" }}
        direction={"row"}
      >
        <Typography variant={"h6"}>Пользователи</Typography>
        <Button
          variant={"contained"}
          sx={{ alignSelf: "flex-end" }}
          onClick={() => redirect(`/panel/create/${model}`)}
        >
          Добавить
        </Button>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Имя</TableCell>
            <TableCell>Почта</TableCell>
            <TableCell>Подтверждён</TableCell>
            <TableCell>Разрешения</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((item) => (
            <TableRow key={item.id}>
              {item.map(([key, value]) => (
                <TableCell key={key}>{value}</TableCell>
              ))}
              <TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

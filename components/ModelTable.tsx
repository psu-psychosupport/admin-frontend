import {
  Button,
  Heading,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import React from "react";
import { redirect } from "@remix-run/node";

const ModelTable = <T,>({ data, model }: { data: T[]; model: string }) => {
  const entries = data.map(Object.entries);

  return (
    <TableContainer>
      <Stack justify={"space-between"} marginBottom={"2%"} direction={"row"}>
        <Heading as={"h6"}>Пользователи</Heading>
        <Button
          colorScheme={"messenger"}
          alignSelf={"flex-end"}
          onClick={() => redirect(`/panel/create/${model}`)}
        >
          Добавить
        </Button>
      </Stack>
      <Table size={"lg"} borderWidth={"1px"} borderRadius={"6"}>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Имя</Th>
            <Th>Почта</Th>
            <Th>Подтверждён</Th>
            <Th>Разрешения</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {entries.map((item) => (
            <Tr key={item.id}>
              {item.map(([key, value]) => (
                <Td key={key}>{value}</Td>
              ))}
              <Td>
                <EditIcon />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ModelTable;

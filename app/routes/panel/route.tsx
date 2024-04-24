import type { MetaFunction } from "@remix-run/node";
import React from "react";
import {
  Box,
  Text,
  Stack,
  Flex,
  Button,
  Table,
  TableContainer,
  Td,
  Tr,
  Th,
  Thead,
  Tbody,
  Heading,
} from "@chakra-ui/react";
import {EditIcon} from "@chakra-ui/icons";

const data = [
  {
    id: 1,
    name: 'Батуев Данил',
    email: 'damego@vk.com',
    isVerified: 'true',
    permissions: 'ADMINISTRATOR' // todo: format from int
  }
]

export const meta: MetaFunction = () => {
  return [{ title: "Панель управления" }];
};

const Header = () => {};

const NavigationContainer = () => {
  return (
    <Box position={"fixed"}>
      <Stack fontWeight={500} fontSize={"large"}>
        <Text>Пользователи</Text>
        <Text>Категории</Text>
        <Text>Посты</Text>
        <Text>Схемы</Text>
        <Text>Тесты</Text>
        <Text>Загруженные файлы</Text>
      </Stack>
    </Box>
  );
};

const InfoTable = () => {
  return (
    <TableContainer>
      <Stack justify={'space-between'} marginBottom={'2%'} direction={'row'}>
        <Heading as={"h6"}>
          Пользователи
        </Heading>
        <Button colorScheme={'messenger'} alignSelf={'flex-end'}>Добавить</Button>
      </Stack>
      <Table size={"lg"}>
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
            {data.map((item) => (
              <Tr key={item.id}>
                <Td>{item.id}</Td>
                <Td>{item.name}</Td>
                <Td>{item.email}</Td>
                <Td>{item.isVerified}</Td>
                <Td>{item.permissions}</Td>
                <Td><EditIcon /></Td>
              </Tr>
              ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default function Index() {
  return (
    <Stack direction={"row"} padding={"2%"}>
      <Flex flex={1}>
        <NavigationContainer />
      </Flex>
      <Flex flex={3}>
        <InfoTable />
      </Flex>
    </Stack>
  );
}

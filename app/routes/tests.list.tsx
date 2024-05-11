import { json } from "@remix-run/node";
import React from "react";

import { apiService } from "../../api/apiService";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { Box, colors, IconButton, Stack, Typography } from "@mui/material";
import { ETestTypes, ITestForm } from "~/routes/tests.add";
import { MediaTypes } from "../../api/types/enums";
import { Edit as EditIcon } from "@mui/icons-material";
import { IMedia } from "../../api/types/content";
import { TableHeader } from "../../components/ModelTable";

export async function loader() {
  const res = await apiService.getMediaList<ITestForm>(MediaTypes.TEST);
  if (res.error) return json([]);
  return json(res.data);
}

export const TestItem = ({
  test,
  onRequestEdit,
}: {
  test: ITestForm;
  onRequestEdit: () => void;
}) => {
  const typeNames = {
    [ETestTypes.OPTIONS]: "С опциями",
    [ETestTypes.INPUT]: "С вводом текста",
  };

  return (
    <Box bgcolor={colors.grey[200]} sx={{ borderRadius: 4 }}>
      <Stack direction={"row"} p="1%" justifyContent={"space-between"}>
        <Stack spacing={1}>
          <Typography variant="h5">{test.title}</Typography>
          <Typography>Тип: {typeNames[test.type]}</Typography>
        </Stack>
        <IconButton onClick={onRequestEdit}>
          <EditIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default function TestsListRoute() {
  const mediaList = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const onRequestEdit = (media: IMedia<ITestForm>) => {
    navigate(`/tests/edit/${media.id}`);
  };

  return (
    <Box sx={{ width: "50vw" }}>
      <TableHeader title={"Тесты"} route={"/tests"} />
      <Stack spacing={2}>
        {mediaList.map((media) => (
          <TestItem
            key={media.id}
            test={media.data!}
            onRequestEdit={() => onRequestEdit(media)}
          />
        ))}
      </Stack>
    </Box>
  );
}

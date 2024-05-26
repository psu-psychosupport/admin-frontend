import React from "react";
import { Typography, Box, Stack, Button } from "@mui/material";

import { apiService } from "../../api/apiService";
import { json, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Инструкции" }];
};

export async function loader() {
  const res = await apiService.getGuideList();

  return json(res.data);
}

const GuideIndexRoute = () => {
  const guideList = useLoaderData<typeof loader>();

  const navigate = useNavigate();
  const onGuideRequestAdd = () => {
    navigate("/guide/add");
  };

  return (
    <>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant={"h4"} fontWeight={"800"}>
          Инструкции администратора
        </Typography>
        <Button onClick={onGuideRequestAdd} variant={"contained"}>
          Добавить инструкцию
        </Button>
      </Stack>
      <Stack mt={2}>
        {!guideList.length && (
          <Box sx={{ backgroundColor: "#FFFFFF", borderRadius: "4px", p: 1 }}>
            <Typography variant={"h4"} fontWeight={"800"}>
              Инструкции не добавлены
            </Typography>
          </Box>
        )}
        {guideList.map((guide) => (
          <Link
            to={`/guide/${guide.id}`}
            key={guide.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Box sx={{ backgroundColor: "#FFFFFF", borderRadius: "4px", p: 1 }}>
              <Typography variant="h5" fontWeight={"500"}>
                {guide.name}
              </Typography>
            </Box>
          </Link>
        ))}
      </Stack>
    </>
  );
};

export default GuideIndexRoute;

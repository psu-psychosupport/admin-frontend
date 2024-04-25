import { LoaderFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import React from "react";

import { User } from "../../types/users";
import { useLoaderData } from "@remix-run/react";
import ModelTable from "../../components/ModelTable";
import Page from "../../components/Page";
import { validateModelName } from "../../utils/validators";

const data: User[] = [
  {
    id: 1,
    name: "Батуев Данил",
    email: "damego@vk.com",
    is_verified: "true",
    permissions: "ADMINISTRATOR", // todo: format from int
  },
  {
    id: 2,
    name: "Иванов Иван",
    email: "ivanov@vk.com",
    is_verified: "true",
    permissions: "NONE", // todo: format from int
  },
];

export const meta: MetaFunction = () => {
  return [{ title: "Панель управления" }];
};

export async function loader({ params }: LoaderFunctionArgs) {
  if (!validateModelName(params.model as string)) {
    throw new Response(null, {
      status: 404,
      statusText: "Похоже на то, что вы не туда зашли.",
    });
  }
  return params.model as string;
}

export default function Index() {
  const model = useLoaderData<typeof loader>();

  return (
    <Page>
      <ModelTable model={model} data={data} />
    </Page>
  );
}

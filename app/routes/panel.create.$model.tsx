import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import React from "react";

import Page from "../../components/Page";
import { validateModelName } from "../../utils/validators";
import CreateUserForm from "../../components/createModelForms/CreateUserForm";

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

export default function PanelModelCreateRoute() {
  return (
    <Page>
      <CreateUserForm />
    </Page>
  );
}

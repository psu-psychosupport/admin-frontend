import {
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createFileUploadHandler as createFileUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
} from "@remix-run/node";

const uploadHandler = composeUploadHandlers(
  createFileUploadHandler({
    maxPartSize: 536_870_912, // 512 MB
    file: ({ filename }) => filename,
  }),
  createMemoryUploadHandler(),
);

const parseFormData = (request: Request) => {
  return parseMultipartFormData(request, uploadHandler);
};

export default parseFormData;

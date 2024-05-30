import parseFormData from "../../../utils/parseFormData";

export default async function getPayload(request: Request) {
  if (
    request.headers.get("Content-Type")!.split(";")[0] === "application/json"
  ) {
    return await request.json();
  } else {
    // formdata is default
    return Object.fromEntries(await parseFormData(request));
  }
}

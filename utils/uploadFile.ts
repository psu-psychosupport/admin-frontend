export const uploadFile = async (fileList: FileList): Promise<string> => {
  const file = fileList.item(0)!;

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("http://127.0.0.1:8000/upload", {
    method: "POST",
    body: formData,
    mode: "cors",
  });
  const data = await res.json();
  return data.url;
}
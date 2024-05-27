import parseFormData from "../../utils/parseFormData";
import {apiService} from "../../api/apiService";
import {json} from "@remix-run/node";
import {MediaTypes} from "../../api/types/enums";

const guideAction = async (request: Request) => {
  let payload;
  let goal: string;
  if (
    request.headers.get("Content-Type")!.split(";")[0] === "application/json"
  ) {
    payload = await request.json();
    goal = payload.goal;
  } else {
    payload = await parseFormData(request);
    goal = payload.get("goal") as string;
  }

  if (goal === "add-guide") {
    const res = await apiService.addGuide(payload.guide);
    return json(res);
  } else if (goal === "update-guide") {
    const res = await apiService.updateGuide(payload.guideId, payload.guide);
    return json(res);
  } else if (goal === "delete-guide") {
    const res = await apiService.deleteGuide(payload.guideId);
    return json(res);
  }
  if (goal === "insert-test") {
    const res = await apiService.uploadMedia({ data: payload.test });
    return json(res);
  } else if (goal === "update-test") {
    const res = await apiService.updateMedia(payload.mediaId, payload.test);
    return json(res);
  } else if (goal === "delete-test") {
    const res = await apiService.deleteMedia(payload.MediaId);
    return json(res);
  }
  if (goal === "get-media") {
    const res = await apiService.getMedia(payload.mediaId);
    return json(res);
  }

  // Загрузка файлов
  // TODO: Может и не стоит такую дичь оставлять?

  const goalToType = {
    "insert-audio": MediaTypes.AUDIO,
    "insert-video": MediaTypes.VIDEO,
    "insert-image": MediaTypes.IMAGE,
    "insert-file": MediaTypes.FILE,
    "insert-presentation": MediaTypes.PRESENTATION,
    "insert-pdf": MediaTypes.PDF,
  };
  if (goalToType[goal] !== undefined) {
    const file: File = payload.get("file");
    const res = await apiService.uploadMedia({
      file,
      data: { type: goalToType[goal] },
    });
    if (res.data) {
      return json({
        goal,
        url: res.data.file_url,
        name: res.data.file_name,
      });
    }
  }

  return null;
}

export default guideAction;
import { apiService } from "../../api/apiService";
import { json } from "@remix-run/node";
import getPayload from "~/actions/utils/getPayload";
import { MediaTypes } from "../../api/types/enums";

const guideAction = async (request: Request) => {
  const { goal, ...payload } = await getPayload(request);

  if (goal === "add-guide") {
    const res = await apiService.addGuide(payload.guide);
    return json(res);
  }
  if (goal === "update-guide") {
    const res = await apiService.updateGuide(payload.guideId, payload.guide);
    return json(res);
  }
  if (goal === "delete-guide") {
    const res = await apiService.deleteGuide(payload.guideId);
    return json(res);
  }

  if (goal === "get-media") {
    const res = await apiService.getMedia(payload.mediaId);
    return json(res);
  }

  if (goal === "get-tests") {
    const res = await apiService.getTestList();
    return json({ goal, ...res });
  }
  if (goal === "get-test") {
    const res = await apiService.getTestById(payload.testId);
    return json({ goal, ...res });
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
};

export default guideAction;

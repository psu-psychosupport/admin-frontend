import { json } from "@remix-run/node";
import parseFormData from "../../utils/parseFormData";
import { IFormPost } from "../../components/modelForms/types";
import { MediaTypes } from "api/types/enums";
import { apiService } from "api/apiService";

const postAction = async (request: Request) => {
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

  if (goal === "add-post") {
    const post: IFormPost = payload.post;
    const res = await apiService.createPost(post);
    return json(res);
  } else if (goal === "edit-post") {
    const $post = payload.post as IFormPost;
    const postId = payload.postId as number;
    const res = await apiService.updatePost(postId, $post);
    return json(res);
  } else if (goal === "convert-document") {
    const file: File = payload.get("file");
    const res = await apiService.transformDocument(file);
    return json(res);
  }

  if (goal === "get-media") {
    const res = await apiService.getMedia(payload.mediaId);
    return json({ goal: "get-media", ...res });
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

export default postAction;

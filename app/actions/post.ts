import { json, redirect } from "@remix-run/node";
import parseFormData from "../../utils/parseFormData";
import { IFormPost } from "../../components/modelForms/types";
import { MediaTypes } from "api/types/enums";
import { apiService } from "api/apiService";
import { ISelectPost } from "components/modelForms/SelectCategory";

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
    await apiService.createPost(post);
    throw redirect("/posts/list");
  } else if (goal === "edit-post") {
    const $post = payload.post as IFormPost;
    const postId = payload.postId as number;
    const res = await apiService.updatePost(postId, $post);
    if (res.data) throw redirect("/posts/list");
  } else if (goal === "convert-document") {
    const file: File = payload.get("file");
    const res = await apiService.transformDocument(file);
    return json({ goal, text: res.data });
  } else if (goal === "category-select") {
    const post: ISelectPost = payload.post;
    const res = await apiService.getPost(post);
    return json({ goal, postFound: res.data });
  }
  else if (goal === "request-test") {
    const mediaId = payload.mediaId;
    const res = await apiService.getMedia(mediaId);
    return json({goal, data: res.data});
  }

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
        url: apiService.getFullFileUrl(res.data.file_url!),
        name: res.data.file_name,
      });
    }
  }

  if (goal === "insert-test") {
    // TODO: fetch test media
  }

  return null;
};

export default postAction;

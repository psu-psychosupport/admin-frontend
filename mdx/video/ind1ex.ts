import { $wrapNodeInElement, mergeRegister } from "@lexical/utils";
import {
  Action,
  Cell,
  Signal,
  map,
  mapTo,
  withLatestFrom,
} from "@mdxeditor/gurx";
import {
  $createParagraphNode,
  $getNodeByKey,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  DRAGOVER_COMMAND,
  DRAGSTART_COMMAND,
  DROP_COMMAND,
  PASTE_COMMAND,
} from "lexical";
import {
  activeEditor$,
  createActiveEditorSubscription$,
} from "@mdxeditor/editor"; //'../../RealmWithPlugins'
import { CAN_USE_DOM } from "../../utils/detectMac";

import { VideoDialog } from "./VideoDialog";

/**
 * @group Video
 */
export type VideoUploadHandler = ((image: File) => Promise<string>) | null;

/**
 * @group Video
 */
export type VideoPreviewHandler =
  | ((imageSource: string) => Promise<string>)
  | null;

/**
 * @group Video
 */
export interface InsertVideoParameters {
  src?: string;
  title?: string;
  file: FileList;
}

/**
 * The state of the image dialog when it is inactive.
 * @group Video
 */
export type InactiveVideoDialogState = {
  type: "inactive";
};

/**
 * The state of the image dialog when it is in new mode.
 * @group Video
 */
export type NewVideoDialogState = {
  type: "new";
};

/**
 * The state of the image dialog when it is in editing an existing node.
 * @group Video
 */
export type EditingVideoDialogState = {
  type: "editing";
  nodeKey: string;
  initialValues: Omit<InsertVideoParameters, "file">;
};

/**
 * A signal that inserts a new image node with the published payload.
 * @group Video
 */
export const insertVideo$ = Signal<InsertVideoParameters>();
/**
 * Holds the autocomplete suggestions for image sources.
 * @group Video
 */
export const imageAutocompleteSuggestions$ = Cell<string[]>([]);

/**
 * Holds the disable image resize configuration flag.
 * @group Video
 */
export const disableVideoResize$ = Cell<boolean>(false);

/**
 * Holds the image upload handler callback.
 * @group Video
 */
export const imageUploadHandler$ = Cell<VideoUploadHandler>(null);

/**
 * Holds the image preview handler callback.
 * @group Video
 */
export const imagePreviewHandler$ = Cell<VideoPreviewHandler>(null);

/**
 * Holds the current state of the image dialog.
 * @group Video
 */
export const imageDialogState$ = Cell<
  InactiveVideoDialogState | NewVideoDialogState | EditingVideoDialogState
>({ type: "inactive" }, (r) => {
  r.sub(
    r.pipe(
      saveVideo$,
      withLatestFrom(activeEditor$, imageUploadHandler$, imageDialogState$),
    ),
    ([values, theEditor, imageUploadHandler, dialogState]) => {
      const handler =
        dialogState.type === "editing"
          ? (src: string) => {
              theEditor?.update(() => {
                const { nodeKey } = dialogState;
                const imageNode = $getNodeByKey(nodeKey) as VideoNode;

                imageNode.setTitle(values.title);
                imageNode.setAltText(values.altText);
                imageNode.setSrc(src);
              });
              r.pub(imageDialogState$, { type: "inactive" });
            }
          : (src: string) => {
              theEditor?.update(() => {
                const imageNode = $createVideoNode({
                  altText: values.altText ?? "",
                  src,
                  title: values.title ?? "",
                });
                $insertNodes([imageNode]);
                if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
                  $wrapNodeInElement(
                    imageNode,
                    $createParagraphNode,
                  ).selectEnd();
                }
              });
              r.pub(imageDialogState$, { type: "inactive" });
            };

      if (values.file.length > 0) {
        imageUploadHandler?.(values.file.item(0)!)
          .then(handler)
          .catch((e) => {
            throw e;
          });
      } else if (values.src) {
        handler(values.src);
      }
    },
  );

  r.pub(createActiveEditorSubscription$, (editor) => {
    const theUploadHandler = r.getValue(imageUploadHandler$);
    return mergeRegister(
      editor?.registerCommand<InsertVideoPayload>(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createVideoNode(payload);
          $insertNodes([imageNode]);
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
          }

          return true;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
      editor?.registerCommand<DragEvent>(
        DRAGSTART_COMMAND,
        (event) => {
          return onDragStart(event);
        },
        COMMAND_PRIORITY_HIGH,
      ),
      editor?.registerCommand<DragEvent>(
        DRAGOVER_COMMAND,
        (event) => {
          return onDragover(event);
        },
        COMMAND_PRIORITY_LOW,
      ),

      editor?.registerCommand<DragEvent>(
        DROP_COMMAND,
        (event) => {
          return onDrop(event, editor, r.getValue(imageUploadHandler$));
        },
        COMMAND_PRIORITY_HIGH,
      ),
      ...(theUploadHandler !== null
        ? [
            editor?.registerCommand(
              PASTE_COMMAND,
              (event: ClipboardEvent) => {
                let cbPayload = Array.from(event.clipboardData?.items || []);
                cbPayload = cbPayload.filter((i) => /image/.test(i.type)); // Strip out the non-image bits

                if (!cbPayload.length || cbPayload.length === 0) {
                  return false;
                } // If no image was present in the collection, bail.

                const imageUploadHandlerValue =
                  r.getValue(imageUploadHandler$)!;

                Promise.all(
                  cbPayload.map((file) =>
                    imageUploadHandlerValue(file.getAsFile()!),
                  ),
                )
                  .then((urls) => {
                    urls.forEach((url) => {
                      editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                        src: url,
                        altText: "",
                      });
                    });
                  })
                  .catch((e) => {
                    throw e;
                  });
                return true;
              },
              COMMAND_PRIORITY_CRITICAL,
            ),
          ]
        : []),
    );
  });
});

/**
 * Opens the new image dialog.
 * @group Video
 */
export const openNewVideoDialog$ = Action((r) => {
  r.link(
    r.pipe(openNewVideoDialog$, mapTo({ type: "new" })),
    imageDialogState$,
  );
});

/**
 * Opens the edit image dialog with the published parameters.
 * @group Video
 */
export const openEditVideoDialog$ = Signal<
  Omit<EditingVideoDialogState, "type">
>((r) => {
  r.link(
    r.pipe(
      openEditVideoDialog$,
      map((payload) => ({ type: "editing" as const, ...payload })),
    ),
    imageDialogState$,
  );
});

/**
 * Close the image dialog.
 * @group Video
 */
export const closeVideoDialog$ = Action((r) => {
  r.link(
    r.pipe(closeVideoDialog$, mapTo({ type: "inactive" })),
    imageDialogState$,
  );
});

export const disableVideoSettingsButton$ = Cell<boolean>(false);

/**
 * Saves the data from the image dialog
 * @group Video
 */
export const saveVideo$ = Signal<InsertVideoParameters>();

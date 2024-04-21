import * as Dialog from '@radix-ui/react-dialog'
import classNames from 'classnames'
import React from 'react'
import { useForm } from 'react-hook-form'
import styles from './styles/ui.module.css'
import { editorRootElementRef$, useTranslation } from '@mdxeditor/editor'//'../core/index'
import { closeVideoDialog$, videoAutocompleteSuggestions$, videoDialogState$, saveVideo$ } from './ind1ex'
import { DownshiftAutoComplete } from '../core/ui/DownshiftAutoComplete'
import { useCellValues, usePublisher } from '@mdxeditor/gurx'

interface VideoFormFields {
  src: string
  title: string
  file: FileList
}

export const VideoDialog: React.FC = () => {
  const [videoAutocompleteSuggestions, state, editorRootElementRef] = useCellValues(
    videoAutocompleteSuggestions$,
    videoDialogState$,
    editorRootElementRef$
  )
  const saveVideo = usePublisher(saveVideo$)
  const closeVideoDialog = usePublisher(closeVideoDialog$)
  const t = useTranslation()

  const { register, handleSubmit, control, setValue, reset } = useForm<VideoFormFields>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    values: state.type === 'editing' ? (state.initialValues as any) : {}
  })

  return (
    <Dialog.Root
      open={state.type !== 'inactive'}
      onOpenChange={(open) => {
        if (!open) {
          closeVideoDialog()
          reset({ src: '', title: '' })
        }
      }}
    >
      <Dialog.Portal container={editorRootElementRef?.current}>
        <Dialog.Overlay className={styles.dialogOverlay} />
        <Dialog.Content
          className={styles.dialogContent}
          onOpenAutoFocus={(e) => {
            e.preventDefault()
          }}
        >
          <form
            onSubmit={(e) => {
              void handleSubmit(saveVideo)(e)
              reset({ src: '', title: '' })
              e.preventDefault()
              e.stopPropagation()
            }}
            className={styles.multiFieldForm}
          >
            <div className={styles.formField}>
              <label htmlFor="file">{t('uploadVideo.uploadInstructions', 'Upload an video from your device:')}</label>
              <input type="file" accept="video/*" {...register('file')} />
            </div>

            <div className={styles.formField}>
              <label htmlFor="src">{t('uploadVideo.addViaUrlInstructions', 'Or add an video from an URL:')}</label>
              <DownshiftAutoComplete
                register={register}
                initialInputValue={state.type === 'editing' ? state.initialValues.src || '' : ''}
                inputName="src"
                suggestions={videoAutocompleteSuggestions}
                setValue={setValue}
                control={control}
                placeholder={t('uploadVideo.autoCompletePlaceholder', 'Select or paste an video src')}
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="title">{t('uploadVideo.title', 'Title:')}</label>
              <input type="text" {...register('title')} className={styles.textInput} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-2)' }}>
              <button
                type="submit"
                title={t('dialogControls.save', 'Save')}
                aria-label={t('dialogControls.save', 'Save')}
                className={classNames(styles.primaryButton)}
              >
                {t('dialogControls.save', 'Save')}
              </button>
              <Dialog.Close asChild>
                <button
                  type="reset"
                  title={t('dialogControls.cancel', 'Cancel')}
                  aria-label={t('dialogControls.cancel', 'Cancel')}
                  className={classNames(styles.secondaryButton)}
                >
                  {t('dialogControls.cancel', 'Cancel')}
                </button>
              </Dialog.Close>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

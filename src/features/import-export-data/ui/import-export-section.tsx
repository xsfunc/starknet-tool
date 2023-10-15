import { Button, Stack, Typography, styled } from '@mui/joy'
import { useUnit } from 'effector-react'
import { useRef } from 'react'
import { exportJSON, fileAdded, importJSON } from '..'
import { ImportDataDialog } from './import-dialog'
import UploadIcon from '~icons/solar/cloud-upload-bold'

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`

export function ImportExportDataSection() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const exportData = useUnit(exportJSON)
  const importData = useUnit(importJSON)
  const addFile = useUnit(fileAdded)

  function fileOnChange() {
    if (!fileInputRef?.current?.files)
      return
    const file = fileInputRef.current.files[0]
    addFile(file)
    fileInputRef.current.value = ''
  }

  return (
    <>
      <Typography level="title-lg" component="h2" sx={{ mb: 1 }}>
        Export and import all data
      </Typography>

      <Stack gap={1} direction="row">
        <Button
          color="success"
          size="sm"
          onClick={() => exportData()}
        >
          Export
        </Button>

        <Button
          component="label"
          size="sm"
          role={undefined}
          variant="outlined"
          color="neutral"
          onClick={importData}
          startDecorator={<UploadIcon />}
        >
          Upload a file for import
          <VisuallyHiddenInput
            onChange={fileOnChange}
            accept="application/json"
            ref={fileInputRef}
            type="file"
          />
        </Button>
      </Stack>

      <ImportDataDialog />
    </>
  )
}

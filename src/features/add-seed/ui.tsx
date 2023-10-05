import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Modal from '@mui/joy/Modal'
import { useUnit } from 'effector-react'
import { useForm } from 'effector-forms'
import { FormHelperText, IconButton, ModalDialog, Stack, Textarea, Typography } from '@mui/joy'
import type { FormEvent } from 'react'
import { generateMnemonic, seedPhraseDialog, seedPhraseForm } from './model'
import AddWalletIcon from '~icons/solar/add-square-bold'

export function AddSeedButton() {
  const { open } = useUnit(seedPhraseDialog)
  return (
    <IconButton onClick={open} variant='solid' size='sm' color='primary'>
      <AddWalletIcon />
    </IconButton>
  )
}
export function AddSeedDialog() {
  const { isOpen, close } = useUnit(seedPhraseDialog)
  const { fields, submit, errorText } = useForm(seedPhraseForm)
  const generatePhrase = useUnit(generateMnemonic)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    submit()
  }

  return (
    <Modal open={isOpen} onClose={close}>
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        aria-describedby="basic-modal-dialog-description"
        sx={{ minWidth: 500 }}
      >
        <Typography level="h4">
          Add seed
        </Typography>

        <form onSubmit={onSubmit}>
          <Stack spacing={1}>
            <FormControl error={fields.mnemonic.hasError()} size='sm'>
              <FormLabel>Mnemonic phrase</FormLabel>
              <Textarea
                minRows={2}
                value={fields.mnemonic.value}
                onChange={e => fields.mnemonic.onChange(e.target.value)}
                endDecorator={
                  <Button
                    size='sm'
                    sx={{ ml: 'auto' }}
                    variant='outlined'
                    onClick={generatePhrase}
                  >
                    Generate
                  </Button>
                }
              />
              <FormHelperText>{errorText('mnemonic')}</FormHelperText>
            </FormControl>
            <Button type="submit" size='sm'>
              Add seed
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  )
}

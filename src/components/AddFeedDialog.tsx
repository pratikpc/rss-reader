import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog({
  open,
  setOpen,
  name = '',
  setName,
  url = '',
  setUrl,
}: {
  open: boolean;
  setOpen: (_: boolean) => void;
  name: string;
  setName: (_: string) => void;
  url: string;
  setUrl: (_: string) => void;
}) {
  return (
    <>
      <Dialog open={open} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to the RSS Feed, please enter the details here
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='URL'
            label='URL'
            type='url'
            fullWidth
            required
            value={url}
            onChange={(event) => {
              setUrl(event?.target.value ?? '');
            }}
          />
          <TextField
            autoFocus
            margin='dense'
            id='Name'
            label='Name'
            type='text'
            fullWidth
            required
            value={name}
            onChange={(event) => {
              setName(event?.target.value ?? '');
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setName('');
              setUrl('');
              setOpen(false);
            }}
            color='primary'
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            color='primary'
          >
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

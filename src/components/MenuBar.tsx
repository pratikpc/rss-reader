import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import RefreshIcon from '@material-ui/icons/RefreshOutlined';
import IconButton from '@material-ui/core/IconButton';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import AddButton from '@material-ui/icons/AddToQueue';
import AddFeedDialog from './AddFeedDialog';

export default function MenuBar({
  classes,
  open,
  setOpen,
  forceRefresh,
  newFeedAdded,
  onThemeChangeClick,
}: {
  classes: any;
  open: boolean;
  setOpen: (_: boolean) => void;
  forceRefresh: () => void;
  onThemeChangeClick: () => void;
  newFeedAdded: (name: string, url: string) => void;
}) {
  const [addFeedDialogOpen, setAddFeedDialogOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [addFeedDialogUrl, setAddFeedDialogUrl] = React.useState('');
  React.useEffect(() => {
    if (addFeedDialogOpen) return;
    if (addFeedDialogUrl === '') return;
    newFeedAdded(name, addFeedDialogUrl);
    setName('');
    setAddFeedDialogUrl('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addFeedDialogOpen]);
  return (
    <>
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={() => setOpen(true)}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            PC RSS WebView Reader
          </Typography>
          <div className={classes.toolbarButtons}>
            <IconButton
              color='inherit'
              onClick={onThemeChangeClick}
              edge='end'
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <InvertColorsIcon />
            </IconButton>
            <IconButton
              color='inherit'
              onClick={() => setAddFeedDialogOpen(true)}
              edge='end'
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <AddButton />
            </IconButton>
            <IconButton
              color='inherit'
              onClick={() => forceRefresh()}
              edge='end'
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <RefreshIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <AddFeedDialog
        open={addFeedDialogOpen}
        setOpen={setAddFeedDialogOpen}
        name={name}
        setName={setName}
        url={addFeedDialogUrl}
        setUrl={setAddFeedDialogUrl}
      />
    </>
  );
}

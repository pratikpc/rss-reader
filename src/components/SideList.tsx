import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/RemoveFromQueue';
import FeedConfiguration from './FeedConfiguration';

function SideListItem({
  item,
  onClick,
  removeUrl,
}: {
  item: FeedConfiguration;
  onClick: (_: FeedConfiguration) => void;
  removeUrl: (url: string[]) => void;
}) {
  return (
    <ListItem
      button
      key={item.name + Math.random()}
      onClick={() => onClick(item)}
    >
      <ListItemText primary={item.name} />
      <ListItemSecondaryAction>
        <IconButton
          edge='end'
          aria-label='comments'
          onClick={() => removeUrl(item.url)}
        >
          <RemoveIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
export default function SideList({
  items,
  onClick,
  removeUrl,
}: {
  items: FeedConfiguration[];
  onClick: (_: FeedConfiguration) => void;
  removeUrl: (url: string[]) => void;
}) {
  return (
    <List>
      {items.map((item) => (
        <SideListItem
          item={item}
          key={item.name + Math.random()}
          onClick={onClick}
          removeUrl={removeUrl}
        />
      ))}
    </List>
  );
}

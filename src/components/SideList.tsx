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
  onSelect,
  onModify,
  removeUrl,
}: {
  item: FeedConfiguration;
  onSelect: (_: FeedConfiguration) => void;
  onModify: (_: FeedConfiguration) => void;
  removeUrl: (url: string[]) => void;
}) {
  return (
    <ListItem
      button
      key={item.name + Math.random()}
      onMouseDown={(event) => {
        // Left Click
        if (event.button === 0) onSelect(item);
        // Other click
        else onModify(item);
      }}
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
  onSelect,
  onModify,
  removeUrl,
}: {
  onModify: (_: FeedConfiguration) => void;
  items: FeedConfiguration[];
  onSelect: (_: FeedConfiguration) => void;
  removeUrl: (url: string[]) => void;
}) {
  return (
    <List>
      {items.map((item) => (
        <SideListItem
          item={item}
          key={item.name + Math.random()}
          onSelect={onSelect}
          onModify={onModify}
          removeUrl={removeUrl}
        />
      ))}
    </List>
  );
}

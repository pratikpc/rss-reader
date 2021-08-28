import React from 'react';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import type { Item as FeedItem } from 'rss-parser';
import Divider from '@material-ui/core/Divider';
import Share from '@material-ui/icons/Share';
import LinkIcon from '@material-ui/icons/LinkOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined';
import ExpandLessIcon from '@material-ui/icons/ExpandLessOutlined';
import ParseHtml from './ParseHtml';

function Chips<T>({
  chips,
  onClick,
}: {
  chips: T[];
  onClick: (_: string) => void;
}) {
  return (
    <>
      {chips
        .map((chip) =>
          typeof chip === 'string'
            ? chip
            : (chip as unknown as { _: string })._,
        )
        .map((chip) => (
          <Chip key={chip} onClick={() => onClick(chip)} label={chip} />
        ))}
    </>
  );
}

function FeedListItem({
  item,
  onFilterByCategory,
}: {
  item: FeedItem;
  onFilterByCategory: (_: string) => void;
}) {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <Card>
      <CardHeader
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          maxWidth: '100%',
        }}
        action={
          item.link && (
            <>
              {navigator.share && (
                <IconButton
                  onClick={() => {
                    navigator.share({
                      title: item.title,
                      url: item.link,
                    });
                  }}
                >
                  <Share />
                </IconButton>
              )}
              <IconButton href={item.link} target='_blank'>
                <LinkIcon />
              </IconButton>
              <IconButton
                aria-label='settings'
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </>
          )
        }
        title={
          <Link href={item.link} target='_blank'>
            {item.title}
          </Link>
        }
        subheader={
          <Typography component='div' variant='caption' color='textSecondary'>
            {item.creator ?? (item as { author: string }).author ?? ''}
          </Typography>
        }
      />

      {item.content && item.content !== '' && (
        <Collapse
          in={expanded}
          timeout='auto'
          unmountOnExit
          style={{
            marginLeft: 'auto',
          }}
        >
          <CardContent>
            <Typography
              style={{
                width: '100%',
                overflowY: 'auto',
                maxWidth: '100%',
                overflowX: 'auto',
                height: '100%',
                // flexGrow: 1,
                // flexShrink: 1,
                maxHeight: '50vh',
              }}
              component='div'
              variant='body2'
              color='textSecondary'
            >
              {ParseHtml(item.content)}
            </Typography>
            <Chips onClick={onFilterByCategory} chips={item.categories ?? []} />
          </CardContent>
          {item.enclosure != null && item.enclosure.url != null && (
            <CardMedia
              title={item.title}
              component='img'
              image={item.enclosure?.url ?? ''}
              style={{
                height: '100%',
                width: '20%',
              }}
            />
          )}{' '}
        </Collapse>
      )}
    </Card>
  );
}
export default function FeedList({
  items,
  onFilterByCategory,
}: {
  items: FeedItem[];
  onFilterByCategory: (_: string) => void;
}) {
  return (
    <List>
      {items.map((item) => (
        <>
          <FeedListItem onFilterByCategory={onFilterByCategory} item={item} />{' '}
          <Divider />
        </>
      ))}
    </List>
  );
}

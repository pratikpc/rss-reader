import React from 'react';
import clsx from 'clsx';
import './App.css';
import '@fontsource/roboto';

import {
  makeStyles,
  Theme,
  createStyles,
  createTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Parser from 'rss-parser';
import type { Item as FeedItem } from 'rss-parser';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import SideList from './SideList';
import FeedConfiguration from './FeedConfiguration';
import FeedList from './FeedList';
import MenuBar from './MenuBar';

const drawerWidth = '15vw';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      maxWidth: '100vw',
      overflowY: 'hidden',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      maxWidth: '100vw',
      marginLeft: 0,
    },
    appBarShift: {
      width: `calc(100vw - ${drawerWidth})`,
      maxWidth: `calc(100vw - ${drawerWidth})`,
      marginLeft: 0,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: '1vw',
      overflowY: 'hidden',

      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}`,
      width: '90vw',
      height: '100%',
    },
    // this group of buttons will be aligned to the right side
    toolbarButtons: {
      marginLeft: 'auto',
    },
    contentShift: {
      overflowY: 'hidden',

      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      width: `calc(99vw - ${drawerWidth})`,
      maxWidth: `calc(99vw - ${drawerWidth})`,
    },
  }),
);
const parser = new Parser();

async function ExtractFeed(url: string) {
  const response = await fetch(url);
  const text = await response.text();
  const feed = await parser.parseString(text);
  return feed;
}
function MaxLength2D<T>(arrays: T[][]) {
  const lengths = arrays.map((elem) => elem.length);
  return Math.max(...lengths);
}

function Sequentialize<T>(items: T[][]) {
  if (items.length <= 1) return items.flat();
  const res: T[] = [];
  const maxLength = MaxLength2D(items);

  for (let i = 0; i < maxLength; i += 1)
    for (let j = 0; j < items.length; j += 1)
      if (i < items[j].length) res.push(items[j][i]);
  return res;
}

async function ExtractFeeds(urls: string[]) {
  if (urls.length === 0) return [];
  const feeds = (await Promise.all(urls.map((url) => ExtractFeed(url)))).map(
    ({ items }) => items,
  );
  if (urls.length > 1) return Sequentialize(feeds);
  return feeds.flat();
}

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [urls, setUrls] = React.useState<string[]>([]);
  const [isDarkTheme, setIfDarkTheme] = React.useState<boolean>(false);

  const [feedItems, setFeedItems] = React.useState<FeedItem[]>([]);
  const [feedList, setFeedList] = React.useState<FeedConfiguration[]>([]);
  const [saveToFeedList, setSaveToFeedList] = React.useState(false);

  const [refresh, setRefresh] = React.useState(false);

  React.useEffect(() => {
    async function Fetch() {
      if (urls.length === 0) {
        setFeedItems([]);
        return;
      }
      const extractFeeds = await ExtractFeeds(urls);
      setFeedItems(extractFeeds);
    }
    Fetch();
  }, [urls, refresh]);

  React.useEffect(() => {
    if (!saveToFeedList) return;
    if (feedList.length === 1) {
      setUrls(feedList[0].url);
    }
    window.localStorage.setItem('feed', JSON.stringify(feedList));
    setSaveToFeedList(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveToFeedList]);
  // Enabling Dark Mode according to system-wide setting
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  React.useEffect(() => {
    const feedList: FeedConfiguration[] =
      JSON.parse(window.localStorage.getItem('feed') ?? '[]') ?? [];

    if (feedList.length > 0) setUrls(feedList[0].url);
    setFeedList(feedList);
    setIfDarkTheme(prefersDarkMode);
  }, []);

  const theme = React.useMemo(() => {
    return createTheme({
      palette: {
        type: isDarkTheme ? 'dark' : 'light',
      },
    });
  }, [isDarkTheme]);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <MenuBar
          classes={classes}
          forceRefresh={() => setRefresh(!refresh)}
          open={open}
          setOpen={(open) => {
            if (open && feedList.length === 0) return;
            setOpen(open);
          }}
          onThemeChangeClick={() => setIfDarkTheme(!isDarkTheme)}
          newFeedAdded={async (name, url) => {
            if (url === '') return;
            const urlSplit = url.split(';');
            if (urlSplit.length === 0) return;
            if (name === '') {
              const feed = await ExtractFeed(urlSplit[0]);
              if (feed.title == null) return;
              name = feed.title;
            }
            if (
              urlSplit.length === 1 &&
              feedList.filter(
                (item) =>
                  item.url.includes(urlSplit[0]) && item.url.length === 1,
              ).length !== 0
            )
              return;
            setFeedList([...feedList, { name, url: urlSplit }]);
            setSaveToFeedList(true);
          }}
        />
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={() => setOpen(false)}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <SideList
            items={feedList}
            onClick={(item) => setUrls(item.url)}
            removeUrl={(url) => {
              const feed = feedList.filter((item) => item.url !== url);
              if (feed.length === 0) setFeedItems([]);
              setFeedList(feed);
              setSaveToFeedList(true);
            }}
          />
        </Drawer>

        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <FeedList
            items={feedItems}
            onFilterByCategory={(category) => {
              setFeedItems(
                feedItems.filter(({ categories }) => {
                  if (categories == null || categories.length === 0)
                    return false;
                  if (typeof categories[0] !== 'string')
                    categories = (categories as unknown[]).map(
                      ({ _ }: { _: string }) => String(_),
                    );
                  return categories.includes(category);
                }),
              );
            }}
          />
        </main>
      </div>
    </ThemeProvider>
  );
}

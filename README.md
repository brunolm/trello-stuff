# Trello Stuff

Scripts for Trello.

## env

```
TRELLO_KEY=#https://trello.com/app-key
TRELLO_SECRET=#you can manually generate a Token
```

## Mass archive

```sh
Usage: mass-archive [options]

Options:
  -l, --list <id>  ID of the list to archive cards
  -d, --date <id>  Archive anything before this date
  -h, --help       display help for command
```

Example

```
npm start -- -- mass-archive -l 5f123...e50 -d 2021-01-20T00:00:00.000Z
```

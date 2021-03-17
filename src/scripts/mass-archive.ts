import { Command } from 'commander'
import { DateTime } from 'luxon'

import { trello } from '../trello'

interface MassArchiveCommand {
  list: string
  date: string
}

interface Data {
  id: string
  name: string
  dateLastActivity?: string
}

const archiveBeforeDate = async (command: Command & MassArchiveCommand) => {
  if (!command.list) {
    console.error('Provide a list ID')

    return process.exit(1)
  }

  if (!command.date || !DateTime.fromISO(command.date).isValid) {
    console.error('Provide a ISO Date')

    return process.exit(1)
  }

  const list = await trello.list.search(command.list)

  const cards = (await trello.list.searchField(list.id, 'cards')) as Data[]

  const old = DateTime.fromISO(command.date)

  let i = 0
  for (const card of cards) {
    const time = parseInt(card.id.substring(0, 8), 16)
    const date = DateTime.fromSeconds(time)

    if (old > date) {
      ++i
      await trello.card.update(card.id, { closed: true })
    }
  }

  console.log('Total archived:', i)
}

export const register = (program: Command) => {
  program
    .command('mass-archive')
    .option('-l, --list <id>', 'ID of the list to archive cards')
    .option('-d, --date <id>', 'Archive anything before this date')
    .action(archiveBeforeDate)
}

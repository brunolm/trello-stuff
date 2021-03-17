import { Command } from 'commander'

import { trello } from '../trello'

interface MyBoards {
  verbose: boolean
}

const listMyBoards = async (command: Command & MyBoards) => {
  const boards = await trello.member.searchBoards('me')

  if (command.verbose) {
    console.log(boards)

    return
  }

  console.log(boards.map((b) => `${b.id} ${b.name}`).join('\n'))
}

export const register = (program: Command) => {
  program
    .command('my-boards')
    .option('-v, --verbose', 'Verbose')
    .action(listMyBoards)
}

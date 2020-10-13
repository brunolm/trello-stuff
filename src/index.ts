import { trello } from './trello'
import { DateTime } from 'luxon'

interface Data {
  id: string
  name: string
  dateLastActivity?: string
}

const start = async () => {
  const boards = (await trello.member.searchBoards('me')) as Data[]

  const { id } = boards.find((x) => x.name === 'Jobs')

  const lists = (await trello.board.searchLists(id)) as Data[]
  const list = lists.find((x) => /bad/i.test(x.name))

  const cards = (await trello.list.searchField(list.id, 'cards')) as Data[]

  const old = DateTime.fromISO('2020-09-20T00:00:00.000Z')

  let i = 0
  for (const card of cards) {
    const time = parseInt(card.id.substring(0, 8), 16)
    const date = DateTime.fromSeconds(time)

    if (old > date) {
      ++i
      await trello.card.update(card.id, { closed: true })
    }
  }

  console.log(i)
}

start()

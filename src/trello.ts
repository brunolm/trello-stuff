import * as Trello from 'trello-node-api'
import * as dotenv from 'dotenv'

dotenv.config()

const trelloInstance = new Trello(process.env.TRELLO_KEY, process.env.TRELLO_SECRET)
trelloInstance.setApiKey(process.env.TRELLO_KEY)
trelloInstance.setOauthToken(process.env.TRELLO_SECRET)

export const trello = trelloInstance

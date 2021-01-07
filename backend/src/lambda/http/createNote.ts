import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreateNoteRequest } from '../../requests/CreateNoteRequest'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'
import { createNote } from '../../businessLogic/notes';

const logger = createLogger('lambda')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info("Processing event: ", event)
  const userId = getUserId(event)
  const newNote: CreateNoteRequest = JSON.parse(event.body)

  const item = await createNote(newNote, userId)
  return {
    statusCode: 201,
    body: JSON.stringify(item)
  }
}

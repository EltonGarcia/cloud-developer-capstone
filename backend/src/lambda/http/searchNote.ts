import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { SearchNoteRequest } from '../../requests/SearchNoteRequest'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
import { searchUserNote } from '../../businessLogic/notes';

const logger = createLogger('lambda')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info("Processing event: ", event)
  
  const request: SearchNoteRequest = JSON.parse(event.body)
  const userId = getUserId(event)
  const items = await searchUserNote(userId, request.query)
  return {
    statusCode: 200,
    body: JSON.stringify(items)
  }
}
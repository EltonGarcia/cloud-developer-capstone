import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'
import { deleteNote } from '../../businessLogic/notes';

const logger = createLogger('lambda')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info("Processing event: ", event)
    const userId = getUserId(event)
    const noteId = event.pathParameters.noteId

    await deleteNote(noteId, userId)

    return {
        statusCode: 200,
        body: null
    }
}

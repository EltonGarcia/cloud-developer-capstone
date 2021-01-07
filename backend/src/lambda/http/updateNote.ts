import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateNoteRequest } from '../../requests/UpdateNoteRequest'
import { createLogger } from '../../utils/logger';
import { updateNote } from '../../businessLogic/notes';
import { getUserId } from '../utils';

const logger = createLogger('lambda')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info("Processing event: ", event)
    const userId = getUserId(event)
    const noteId = event.pathParameters.noteId
    const updatedNote: UpdateNoteRequest = JSON.parse(event.body)

    await updateNote(noteId, userId, updatedNote)

    return {
        statusCode: 204,
        body: null
    }
}

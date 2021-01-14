import { DynamoDBStreamEvent, DynamoDBStreamHandler } from 'aws-lambda'
import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
import * as elasticsearch from 'elasticsearch'
import * as httpAwsEs from 'http-aws-es'

const logger = createLogger('es')
const esHost = process.env.ES_ENDPOINT
const esIndex = process.env.ES_INDEX
const esType = process.env.ES_NOTES_TYPE

const es = new elasticsearch.Client({
  hosts: [ esHost ],
  connectionClass: httpAwsEs
})

export const handler: DynamoDBStreamHandler = async (event: DynamoDBStreamEvent) => {
    logger.info('Processing events batch from DynamoDB', JSON.stringify(event))
    for (const record of event.Records) {
        logger.info('Processing record', JSON.stringify(record))
        logger.info(JSON.stringify(record))
        if (record.eventName == 'INSERT') {
            const newItem = record.dynamodb.NewImage
            const noteId = newItem.noteId.S
            // const userId = newItem.userId.S
            const body = {
                createdAt: newItem.createdAt.S,
                noteId: newItem.noteId.S,
                title: newItem.title.S,
                favorite: newItem.favorite.S,
                userId: newItem.userId.S,
                content: newItem.content.S
            }
          
            await es.index({
                index: esIndex,
                type: esType,
                id: noteId,
                body
            })

        } else if (record.eventName == 'MODIFY') {
        }
    }
}
import { DynamoDBStreamEvent, DynamoDBStreamHandler } from 'aws-lambda'
import 'source-map-support/register'
import { createLogger } from '../../utils/logger'

const logger = createLogger('es')

export const handler: DynamoDBStreamHandler = async (event: DynamoDBStreamEvent) => {
    logger.info('Processing events batch from DynamoDB', JSON.stringify(event))
    for (const record of event.Records) {
        logger.info('Processing record', JSON.stringify(record))
        // if (record.eventName == 'INSERT') {
        //   const newItem = record.dynamodb.NewImage
        // }else if(record.eventName == 'MODIFY'){
        // }
    }
}
import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { Note } from '../models/Note'

const XAWS = AWSXRay.captureAWS(AWS)

export class TodosAccess {
    constructor(
        private readonly docClient: DocumentClient = createDynamoDBClient(),
        private readonly notesTable = process.env.NOTES_TABLE,
        private readonly indexName = process.env.NOTES_INDEX) {
    }
}

function createDynamoDBClient() {
    return new XAWS.DynamoDB.DocumentClient()
}

import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { Note } from '../models/Note'

const XAWS = AWSXRay.captureAWS(AWS)

export class NotesAccess {
    constructor(
        private readonly docClient: DocumentClient = createDynamoDBClient(),
        private readonly notesTable = process.env.NOTES_TABLE,
        private readonly indexName = process.env.NOTES_INDEX) {
    }

    async createNote(item: Note): Promise<Note> {
        await this.docClient.put({
          TableName: this.notesTable,
          Item: item
        }).promise()
    
        return item
    }
}

function createDynamoDBClient() {
    return new XAWS.DynamoDB.DocumentClient()
}

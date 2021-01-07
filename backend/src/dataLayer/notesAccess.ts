import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { Note } from '../models/Note'
import { UpdateNoteRequest } from '../requests/UpdateNoteRequest'

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

    async getUserNotes(userId: string): Promise<Note[]> {
        console.log('Getting all user notes')

        const result = await this.docClient.query({
            TableName: this.notesTable,
            IndexName: this.indexName,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        }).promise()

        const items = result.Items
        return items as Note[]
    }

    async updateNote(noteId: string, userId: string, item: UpdateNoteRequest): Promise<void> {
        await this.docClient.update({
            TableName: this.notesTable,
            Key: {
                noteId: noteId,
                userId: userId
            },
            UpdateExpression: 'set title = :title, content = :content, favorite = :favorite',
            ExpressionAttributeValues: {
                ':name': item.title,
                ':content': item.content,
                ':favorite': item.favorite
            }
        }).promise()
    }

    async deleteNote(noteId: string, userId: string): Promise<void> {
        await this.docClient.delete({
            TableName: this.notesTable,
            Key: {
                noteId: noteId,
                userId: userId,
            }
        }).promise()
    }

    async setAttachmentUrl(noteId: string, userId: string, attachmentUrl: string): Promise<void> {
        await this.docClient.update({
            TableName: this.notesTable,
            Key: {
                noteId,
                userId,
            },
            UpdateExpression: 'set attachmentUrl = :attachmentUrl',
            ExpressionAttributeValues: {
                ':attachmentUrl': attachmentUrl,
            }
        }).promise();
    }
}

function createDynamoDBClient() {
    return new XAWS.DynamoDB.DocumentClient()
}

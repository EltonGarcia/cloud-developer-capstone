import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { setAttachmentUrl } from '../../businessLogic/notes';
import { createLogger } from '../../utils/logger';
import { getUserId } from '../utils';

const logger = createLogger('lambda')
const XAWS = AWSXRay.captureAWS(AWS)

const s3 = new XAWS.S3({
    signatureVersion: 'v4'
})

const bucketName = process.env.IMAGES_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info("Processing event: ", event)
    const userId = getUserId(event)
    const noteId = event.pathParameters.noteId
    const url = s3.getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: noteId,
        Expires: urlExpiration
    })
    await setAttachmentUrl(
        noteId,
        userId,
        `https://${bucketName}.s3.amazonaws.com/${noteId}`
    );
    return {
        statusCode: 200,
        body: JSON.stringify({
            uploadUrl: url
        })
    }
}

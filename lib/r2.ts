import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'

export const r2 = new S3Client({
	region: 'auto',
	endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
	},
})



export const deleteObject = async (Key: string) => {

	const deleteObjectCommand = new DeleteObjectCommand({
		Bucket: process.env.R2_BUCKET_NAME,
		Key: Key,
	});
	
	await r2.send(deleteObjectCommand);
}
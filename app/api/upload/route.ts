import { NextResponse } from 'next/server';
import chalk from 'chalk';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { r2 } from '@/lib/r2';

export async function POST(request: Request) {
  try {
    const { filename } = await request.json(); // Extract the filename from the request body

    console.log(chalk.yellow(`Generating an upload URL for ${filename}!`));

    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: filename, // Use the filename as the key
      }),
      { expiresIn: 60 }
    );

    console.log(chalk.green(`Success generating upload URL for ${filename}!`));

    return NextResponse.json({ url: signedUrl });
  } catch (err) {
    console.log(chalk.red('Error generating upload URL'), err);
    return NextResponse.json({ error: 'Error generating upload URL' }, { status: 500 });
  }
}

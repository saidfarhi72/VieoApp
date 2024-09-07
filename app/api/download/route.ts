import { GetObjectCommand } from '@aws-sdk/client-s3'
import chalk from 'chalk'
import { NextResponse } from 'next/server'
import { r2 } from '@/lib/r2'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      throw new Error('Filename not provided.');
    }

    console.log(chalk.yellow(`Retrieving ${filename} from R2!`));

    const pdf = await r2.send(
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: filename,
      })
    );

    if (!pdf) {
      return new NextResponse(`${filename} not found.`, { status: 500 });

    }

    return new Response(pdf.Body?.transformToWebStream(), {
      headers: {
        'Content-Type': 'application/pdf',
      },
    });
  } catch (err) {
    console.log('error', err);
    return new NextResponse("Internal Error", { status: 500 });

    
  }
}

import fs from 'fs';
import { Readable } from 'stream';

import getClientConfig from '@/lib/config/clientConfig';
import { supabase } from '@/lib/supabaseClient';

export class SupabaseService {
  static async uploadToSupabase(filePath: string, bucketName: string, fileName: string) {
    try {
      const fileBuffer = fs.readFileSync(filePath);
      const { data, error } = await supabase.storage.from(bucketName).upload(fileName, fileBuffer, {
        contentType: 'video/mp4'
    });
  
      if (error) {
        throw error;
      }
  
      console.log(`File uploaded successfully: ${data?.path}`);
      return data?.path;
    } catch (error: any) {
      console.error('Error uploading file:', error.message);
    }
  }

  static getBucketURL(bucketName: string, fileName: string) {
    return `${
      getClientConfig().supabaseUrl
    }/storage/v1/object/public/${bucketName}/${fileName}`;
  }

  static getBucketAndFileNameFromURI(
    uri: string
  ): { bucket: string; fileName: string } | null {
    const regex =
      /https?:\/\/[^\\/]+\/storage\/v1\/object\/public\/([^/]+)\/(.+)$/;
    const match = uri.match(regex);

    console.log('MATCHES', match);

    if (match) {
      return {
        bucket: match[1],
        fileName: match[2],
      };
    } else {
      return null;
    }
  }

  static async getBufferFromSupabase(uri: string): Promise<Buffer> {
    const fileAndBucket = SupabaseService.getBucketAndFileNameFromURI(uri);

    if (!fileAndBucket) {
      throw new Error(`Invalid URI: ${uri}`);
    }

    const { bucket, fileName } = fileAndBucket;

    const { data, error } = await supabase.storage
      .from(bucket)
      .download(fileName);

    if (error || !data) {
      throw new Error(
        `Failed to fetch file from ${bucket} bucket Supabase: ${fileName}. Error: ${error?.message}`
      );
    }

    const buffer = await new Response(data).arrayBuffer();
    return Buffer.from(buffer);
  }

  static async getStreamFromSupabase(uri: string): Promise<Readable> {
    const fileAndBucket = SupabaseService.getBucketAndFileNameFromURI(uri);

    if (!fileAndBucket) {
      throw new Error(`Invalid URI: ${uri}`);
    }

    const { bucket, fileName } = fileAndBucket;

    const { data, error } = await supabase.storage
      .from(bucket)
      .download(fileName);

    if (error || !data) {
      throw new Error(
        `Failed to fetch file from ${bucket} bucket Supabase: ${fileName}. Error: ${error?.message}`
      );
    }

    const readableStream = new Readable();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readableStream.push(data as any); // Push the Blob data into the stream
    readableStream.push(null); // Indicate that there's no more data to be added

    return readableStream;
  }
}

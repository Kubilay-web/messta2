import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

enum ErrorCode {
  appIDInvalid = 1,
  userIDInvalid = 3,
  secretInvalid = 5,
  effectiveTimeInSecondsInvalid = 6,
}

function RndNum(a: number, b: number) {
  return Math.floor(a + Math.random() * (b - a + 1));
}

function makeNonce() {
  return RndNum(-2147483648, 2147483647);
}

function makeRandomIv(): string {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function getAlgorithm(key: Buffer): string {
  switch (key.length) {
    case 16:
      return 'aes-128-cbc';
    case 24:
      return 'aes-192-cbc';
    case 32:
      return 'aes-256-cbc';
    default:
      throw new Error('Invalid key length: ' + key.length);
  }
}

function aesEncrypt(plainText: string, key: Buffer, iv: Buffer): Buffer {
  const cipher = crypto.createCipheriv(getAlgorithm(key), key, iv);
  cipher.setAutoPadding(true);
  const encrypted = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);
  return encrypted;
}

function generateToken04(
  appId: number,
  userId: string,
  secret: string,
  effectiveTimeInSeconds: number,
  payload = ''
): string {
  if (!appId || typeof appId !== 'number') {
    throw { errorCode: ErrorCode.appIDInvalid, errorMessage: 'appID invalid' };
  }
  if (!userId || typeof userId !== 'string') {
    throw { errorCode: ErrorCode.userIDInvalid, errorMessage: 'userId invalid' };
  }
  if (!secret || typeof secret !== 'string' || secret.length !== 32) {
    throw { errorCode: ErrorCode.secretInvalid, errorMessage: 'secret must be 32 bytes string' };
  }
  if (!effectiveTimeInSeconds || typeof effectiveTimeInSeconds !== 'number') {
    throw { errorCode: ErrorCode.effectiveTimeInSecondsInvalid, errorMessage: 'effectiveTimeInSeconds invalid' };
  }

  const createTime = Math.floor(Date.now() / 1000);
  const tokenInfo = {
    app_id: appId,
    user_id: userId,
    nonce: makeNonce(),
    ctime: createTime,
    expire: createTime + effectiveTimeInSeconds,
    payload,
  };

  const plainText = JSON.stringify(tokenInfo);

  const ivStr = makeRandomIv();
  const iv = Buffer.from(ivStr, 'utf8');
  const key = Buffer.from(secret, 'utf8');

  const encrypted = aesEncrypt(plainText, key, iv);

  // Build buffer:
  // 8 byte expire + 2 byte iv len + iv + 2 byte encrypted len + encrypted
  const expireBuf = Buffer.alloc(8);
  expireBuf.writeBigInt64BE(BigInt(tokenInfo.expire), 0);

  const ivLenBuf = Buffer.alloc(2);
  ivLenBuf.writeUInt16BE(iv.length, 0);

  const encryptedLenBuf = Buffer.alloc(2);
  encryptedLenBuf.writeUInt16BE(encrypted.length, 0);

  const buf = Buffer.concat([expireBuf, ivLenBuf, iv, encryptedLenBuf, encrypted]);

  return '04' + buf.toString('base64');
}

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  const userId = params.userId;

  if (!userId || typeof userId !== 'string') {
    return NextResponse.json({ error: 'userId param invalid' }, { status: 400 });
  }

  const appId = Number(process.env.ZEGO_APP_ID);
  const secret = process.env.ZEGO_SERVER_SECRET || '';

  if (!appId || !secret) {
    return NextResponse.json({ error: 'Missing ZEGO_APP_ID or ZEGO_SERVER_SECRET' }, { status: 500 });
  }

  try {
    const token = generateToken04(appId, userId, secret, 3600);
    return NextResponse.json({ token });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}

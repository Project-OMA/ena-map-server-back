// SUCCESS

import { Response } from 'express';

export const ok = (res: Response, content: any): Response =>
  res.status(200).json({
    code: 'OK',
    content,
  });

export const created = (res: Response, content: any, message: string): Response =>
  res.status(201).json({
    code: 'CREATED',
    message,
    content,
  });

export const empty = (res: Response, message: string): Response =>
  res.status(204).json({
    code: 'NO_CONTENT',
    message: message || undefined,
  });

// CLIENT ERROR
export const badRequest = (res: Response, description: any): Response =>
  res.status(400).json({
    code: 'BAD_REQUEST_ERROR',
    description,
  });

export const invalid = (res: Response, message: string): Response =>
  res.status(400).json({
    code: 'INVALID',
    message: message || 'Invalid.',
  });

export const unauthorized = (res: Response, message: string | undefined = undefined): Response =>
  res.status(401).json({
    code: 'UNAUTHORIZED',
    message: message || 'Not allowed to perform this action.',
  });

export const forbidden = (res: Response, message: string | undefined = undefined): Response =>
  res.status(403).json({
    code: 'FORBIDDEN',
    message: message || 'User has no roles to perform any action.',
  });

export const notFound = (res: Response, message: string): Response =>
  res.status(404).json({
    code: 'NOT_FOUND',
    message: message || 'Not found.',
  });

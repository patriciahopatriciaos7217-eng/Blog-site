import { NextRequest, NextResponse } from 'next/server';

export interface CorsOptions {
  origin?: string | string[] | boolean;
  methods?: string[];
  allowedHeaders?: string[];
  exposedHeaders?: string[];
  credentials?: boolean;
  maxAge?: number;
}

const defaultOptions: CorsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  exposedHeaders: [],
  credentials: true,
  maxAge: 86400, // 24 hours
};

/**
 * Get the origin from request
 */
function getOrigin(request: NextRequest, allowedOrigins: string | string[] | boolean): string | null {
  const requestOrigin = request.headers.get('origin');

  if (allowedOrigins === '*') {
    return requestOrigin || '*';
  }

  if (allowedOrigins === true) {
    return requestOrigin;
  }

  if (Array.isArray(allowedOrigins)) {
    return allowedOrigins.includes(requestOrigin || '') ? requestOrigin : null;
  }

  if (typeof allowedOrigins === 'string') {
    return requestOrigin === allowedOrigins ? requestOrigin : null;
  }

  return null;
}

/**
 * CORS middleware function
 */
export function cors(request: NextRequest, options: CorsOptions = {}): NextResponse | null {
  const opts = { ...defaultOptions, ...options };
  const origin = getOrigin(request, opts.origin || '*');

  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    const headers = new Headers();

    if (origin) {
      headers.set('Access-Control-Allow-Origin', origin);
    }

    if (opts.credentials) {
      headers.set('Access-Control-Allow-Credentials', 'true');
    }

    if (opts.methods && opts.methods.length > 0) {
      headers.set('Access-Control-Allow-Methods', opts.methods.join(', '));
    }

    if (opts.allowedHeaders && opts.allowedHeaders.length > 0) {
      headers.set('Access-Control-Allow-Headers', opts.allowedHeaders.join(', '));
    }

    if (opts.maxAge) {
      headers.set('Access-Control-Max-Age', opts.maxAge.toString());
    }

    return new NextResponse(null, { status: 204, headers });
  }

  return null;
}

/**
 * Add CORS headers to a response
 */
export function addCorsHeaders(
  response: NextResponse,
  request: NextRequest,
  options: CorsOptions = {}
): NextResponse {
  const opts = { ...defaultOptions, ...options };
  const origin = getOrigin(request, opts.origin || '*');

  if (origin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }

  if (opts.credentials) {
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }

  if (opts.exposedHeaders && opts.exposedHeaders.length > 0) {
    response.headers.set('Access-Control-Expose-Headers', opts.exposedHeaders.join(', '));
  }

  return response;
}


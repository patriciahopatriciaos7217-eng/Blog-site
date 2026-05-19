"use server";

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Session } from './types';
import clientPromise from './mongodb';

export const getSession = async (): Promise<Session | null> => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');

  if (!sessionCookie) {
    return null;
  }

  try {
    return JSON.parse(sessionCookie.value) as Session;
  } catch {
    return null;
  }
}

export async function setSession(session: Session) {
  const cookieStore = await cookies();
  cookieStore.set('session', JSON.stringify(session), {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 1 day
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

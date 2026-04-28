'use client';
import emailjs from '@emailjs/browser';

const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

const _timestamps: Record<string, number[]> = {};
const WINDOW = 60_000;
const MAX    = 3;

export async function sendEmail(
  formType: 'contact' | 'tool' | 'collab',
  params: Record<string, string>
): Promise<void> {
  const now = Date.now();
  _timestamps[formType] = (_timestamps[formType] ?? []).filter(t => now - t < WINDOW);
  if (_timestamps[formType].length >= MAX) {
    throw new Error('Too many submissions. Please wait a minute.');
  }

  await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    ...params,
    to_email:  'devanshup416@gmail.com',
    form_type: formType,
  }, PUBLIC_KEY);

  _timestamps[formType].push(now);
}

import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { ProfileService } from '@/services/profile.service';
import { Webhook } from 'svix';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.WEBHOOK_SECRET || '');

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, username, first_name, last_name } = evt.data;
    
    try {
      // Create a new profile
      const profile = await ProfileService.createProfile({
        userId: id,
        email: email_addresses[0].email_address,
        username: username || id,
        displayName: `${first_name || ''} ${last_name || ''}`.trim() || username || id,
        bio: '',
        avatar: '',
        location: '',
        timeZone: '',
        role: 'creator',
        isVerified: false,
        skills: [],
        languages: [],
        hourlyRate: 0,
        availability: 'available',
        completedProjects: 0,
        rating: 0,
        walletAddress: '',
        showEmail: false,
        showRate: true,
        totalEarnings: 0,
        responseTime: '< 24 hours',
        joinDate: new Date().toISOString(),
        portfolio: []
      });

      return NextResponse.json({ success: true, profile });
    } catch (error) {
      console.error('Error creating profile:', error);
      return NextResponse.json({ success: false, error: 'Failed to create profile' }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
} 
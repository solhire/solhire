import { redirect } from 'next/navigation';

export default function ProfileRedirect() {
  redirect('/profile/settings');
} 
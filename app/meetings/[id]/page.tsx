import { DEMO_TRANSCRIPTS } from '@/lib/demo-transcripts';
import { MeetingDetailClient } from '@/components/detail/MeetingDetailClient';

export function generateStaticParams() {
  return [
    { id: 'acme-meeting-1' },
    { id: 'acme-meeting-2' },
    { id: 'acme-meeting-3' },
  ];
}

export default async function MeetingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const demo = DEMO_TRANSCRIPTS.find((d) => d.id === id) || DEMO_TRANSCRIPTS[2];

  return <MeetingDetailClient demo={demo} />;
}

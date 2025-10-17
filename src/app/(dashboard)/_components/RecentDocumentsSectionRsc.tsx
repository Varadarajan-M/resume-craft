import { getAllResumesAction } from '@/backend/actions/resume';
import { RecentDocumentsSection } from '@/features/dashboard';

export default async function RecentDocumentSectionRsc() {
  const res = await getAllResumesAction(3).catch(console.log);

  return <RecentDocumentsSection documents={res?.data} />;
}

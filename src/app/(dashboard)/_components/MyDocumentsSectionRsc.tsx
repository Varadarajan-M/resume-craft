import { getAllResumesAction } from '@/backend/actions/resume';
import { MyDocumentsSection } from '@/features/documents';

const MyDocumentsSectionRsc = async () => {
  const res = await getAllResumesAction().catch(console.log);

  return <MyDocumentsSection documents={res?.data} />;
};

export default MyDocumentsSectionRsc;

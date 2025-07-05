import { withAuth } from '@/lib/utils/withAuth';
import PreviewPageClient from './page-client';

export default async function PreviewPageWrapper({ params }: { params: { id: string } }) {
  await withAuth({
    roles: ['instructor'],
    resource: { table: 'courses', id: params.id, ownerField: 'instructor_id' },
  });
  return <PreviewPageClient />;
} 
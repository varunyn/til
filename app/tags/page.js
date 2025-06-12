import Tag from '@/components/Tag';
import { getAllTags } from '@/lib/tags';

export const metadata = {
  title: 'Tags - TIL',
  description: 'Browse posts by tags'
};

export default async function TagsPage() {
  const tags = await getAllTags('blog');

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-4xl py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Tags
      </h1>
      <div className="flex flex-wrap gap-2">
        {Object.entries(tags).map(([tag, count]) => (
          <Tag key={tag} tag={tag} count={count} />
        ))}
      </div>
    </div>
  );
}

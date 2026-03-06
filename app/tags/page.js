import Tag from "@/components/tag";
import { getAllTags } from "@/lib/tags";

export const metadata = {
  title: "Tags - TIL",
  description: "Browse posts by tags",
};

export default function TagsPage() {
  const tags = getAllTags("blog");

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h1 className="mb-8 font-bold text-3xl text-gray-900 sm:text-4xl dark:text-gray-100">
        Tags
      </h1>
      <div className="flex flex-wrap gap-2">
        {Object.entries(tags).map(([tag, count]) => (
          <Tag count={count} key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
}

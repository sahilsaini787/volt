import { GetTags } from "@/lib/api/getTags";
import PopularTags from "./PopularTags";
import { TagsType } from "@/lib/types/tags";

export default async function PopularTagsWrapper() {
  const tags: TagsType = await GetTags();

  return (
    <div>
      <PopularTags tags={tags} />
    </div>
  );
}

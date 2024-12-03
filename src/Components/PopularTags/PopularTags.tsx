"use client";

import styles from "@/Components/PopularTags/PopularTags.module.scss";
import Link from "next/link";
import { TagsType } from "@/lib/types/tags";
import { useUserContext } from "@/context/UserPrefsContext";

const PopularTags = ({ tags }: { tags: TagsType }) => {
  const { themeMode } = useUserContext();
  return (
    <div
      className={`${styles.popularTagsContainer} ${themeMode === "light" ? styles.lightMode : styles.darkMode}`}
    >
      {tags ? (
        <>
          <div className={styles.popularTagsHeader}>
            <span>POPULAR TAGS</span>
          </div>
          <div className={styles.tagsListContainer}>
            <ul className={styles.tagsList}>
              {tags.map((tag) => (
                <li key={tag.id} className={styles.tagsListItem}>
                  <Link
                    href={`/tag/${tag.slug}`}
                    className={styles.tagsListItemLink}
                  >
                    {tag.name}
                  </Link>
                  <div className={styles.tagsCount}>· {tag.count}</div>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

export default PopularTags;

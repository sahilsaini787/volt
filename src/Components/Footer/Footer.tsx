import Link from "next/link";
import styles from "@/Components/Footer/Footer.module.scss";
import { TagsType } from "@/lib/types/tags";
import { CategoriesType } from "@/lib/types/categories";

export default function Footer({
  tags,
  categories,
}: {
  tags: TagsType;
  categories: CategoriesType;
}) {
  return (
    <div className={styles.footerMain}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLogoContainer}>
          <div className={styles.footerLogoSVGContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="80 0 430 430"
              className={styles.footerLogoSVG}
            >
              <rect
                rx="0"
                ry="0"
                width="100%"
                height="100%"
                fill="transparent"
              ></rect>
              <g
                data-element="wrapper"
                transform="translate(-520.50000000000324 -350.50000000000225) scale(2.7000000000000104)"
              >
                <g>
                  <g
                    data-element="icon"
                    transform="scale(0.16986770557110065) translate(1009.5428569319054 968.0538222369025)"
                  >
                    <path
                      id="color_x5F_2"
                      fill="currentColor"
                      d="M442.798,322.935c-2.812-0.482-5.581-0.696-8.291-0.662    c-15.575,0.19-30.639-5.439-41.652-16.453l-34.692-34.691c-10.999-11-16.662-26.041-16.451-41.595    c0.036-2.764-0.183-5.592-0.683-8.459c-3.164-18.145-17.883-32.703-36.067-35.628c-30.035-4.833-55.601,20.708-50.821,50.732    c2.897,18.194,17.437,32.942,35.583,36.132c2.903,0.51,5.765,0.733,8.562,0.692c15.537-0.226,30.555,5.465,41.542,16.452    l33.214,33.216c11.521,11.52,17.977,27.157,17.936,43.45v0.223c0,0.075,0,0.151,0,0.227c0.079,15.622-5.26,30.775-16.309,41.821    l-34.982,34.983c-11.047,11.048-26.201,16.385-41.823,16.308c-0.075-0.001-0.149-0.001-0.225-0.001c-0.074,0-0.149,0-0.223,0.001    c-15.627,0.077-30.784-5.261-41.834-16.311l-34.982-34.982c-10.902-10.902-16.588-25.81-16.304-41.225    c0.052-2.835-0.166-5.737-0.68-8.683c-3.166-18.146-17.887-32.701-36.072-35.624c-30.032-4.828-55.596,20.712-50.813,50.734    c2.897,18.194,17.437,32.94,35.582,36.131c2.977,0.523,5.91,0.744,8.775,0.688c15.399-0.298,30.289,5.414,41.179,16.306    l35.001,35.003c10.908,10.906,16.578,25.822,16.305,41.245c-0.05,2.802,0.164,5.67,0.666,8.581    c3.268,18.928,19.116,33.802,38.2,35.987c26.668,3.055,49.279-17.722,49.279-43.776c0-0.075,0-0.15,0-0.226    c-0.079-15.623,5.259-30.777,16.307-41.824L393,426.727c11.048-11.047,26.201-16.386,41.824-16.307c0.076,0,0.152,0,0.227,0    c26.066,0,46.848-22.627,43.774-49.311C476.627,342.023,461.732,326.185,442.798,322.935z"
                    ></path>
                    <path
                      id="color_x5F_1"
                      fill="currentColor"
                      d="M116.435,234.021c-2.982-26.621,17.77-49.166,43.791-49.166l0.223,0.001    c16.293,0.041,31.932-6.414,43.454-17.935l33.21-33.21c11.005-11.005,16.655-26.054,16.454-41.615    c-0.035-2.743,0.181-5.548,0.674-8.393c3.143-18.148,17.851-32.72,36.032-35.663c30.065-4.868,55.674,20.714,50.855,50.773    c-2.917,18.196-17.478,32.929-35.632,36.095c-2.871,0.5-5.7,0.72-8.466,0.682c-15.552-0.212-30.589,5.454-41.587,16.451    l-33.204,33.204c-11.524,11.523-17.979,27.166-17.939,43.462v0.223c0,0.075,0,0.149,0,0.223    c-0.078,15.628,5.261,30.786,16.311,41.837l34.981,34.979c10.917,10.917,25.85,16.566,41.286,16.304    c2.79-0.047,5.646,0.167,8.542,0.667c18.157,3.131,32.744,17.835,35.694,36.021c4.881,30.086-20.729,55.714-50.81,50.865    c-18.192-2.932-32.915-17.505-36.063-35.66c-0.507-2.924-0.723-5.804-0.672-8.618c0.275-15.422-5.398-30.337-16.305-41.243    l-35.001-35.002c-10.891-10.891-25.78-16.603-41.179-16.307c-2.85,0.056-5.767-0.162-8.726-0.68    C133.427,269.011,118.574,253.12,116.435,234.021z M435.051,273.007c24.343,0,44.076-19.733,44.076-44.076    c0-24.342-19.733-44.076-44.076-44.076c-24.344,0-44.074,19.734-44.074,44.076C390.977,253.274,410.707,273.007,435.051,273.007z"
                    ></path>
                  </g>
                  <text
                    transform="translate(267.21873474121094 230.33333587646484)"
                    fill="currentColor"
                    fontSize="64"
                    data-element="company-name"
                    dx="0 0 0 0 0"
                  >
                    fedup
                  </text>
                </g>
              </g>
            </svg>
          </div>
        </div>

        {tags ? (
          <div className={styles.footer_popularTags}>
            <div className={styles.footer_tagsHeader}>
              <h4>POPULAR TAGS</h4>
            </div>
            <div className={styles.footer_tagsListContainer}>
              <ul className={styles.footer_tagsList}>
                {tags.map((tag) => (
                  <li key={tag.id} className={styles.footer_tagItemContainer}>
                    <Link
                      href={`/tag/${tag.slug}`}
                      className={styles.footer_tagItem}
                    >
                      {`${tag.name[0].toUpperCase()}${tag.name.slice(1).toLowerCase()}`}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}

        {categories ? (
          <div className={styles.footer_categories}>
            <div className={styles.footer_categoriesHeader}>
              <h4>CATEGORIES</h4>
            </div>
            <div className={styles.footer_categoriesListContainer}>
              <ul className={styles.footer_categoriesList}>
                {categories.map((category) =>
                  category.name !== "Uncategorized" ? (
                    <li
                      key={category.id}
                      className={styles.footer_categoryItemContainer}
                    >
                      <Link
                        href={`/category/${category.slug}`}
                        className={styles.footer_categoryItem}
                      >
                        {`${category.name[0].toUpperCase()}${category.name.slice(1).toLowerCase()}`}
                      </Link>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          </div>
        ) : null}

        <div className={styles.footer_resources}>
          <div className={styles.footer_resourcesHeader}>
            <h4>RESOURCES</h4>
          </div>
          <div className={styles.footer_resourcesListContainer}>
            <ul className={styles.footer_resourcesList}>
              <li>
                <Link
                  href="/contact-us"
                  className={styles.footer_resourceListItem}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faqs" className={styles.footer_resourceListItem}>
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className={styles.footer_resourceListItem}
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className={styles.footer_resourceListItem}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className={styles.footer_resourceListItem}
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

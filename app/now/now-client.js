import Link from "next/link";
import JournalHeatmap from "./journal-heatmap";
import styles from "./now.module.css";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
  year: "numeric",
});
const formatDate = (date) => dateFormat.format(new Date(date));

function TimelineEntry({ entry }) {
  return (
    <article className={styles.update} id={`timeline-${entry.date}`}>
      <time dateTime={entry.date}>{formatDate(entry.date)}</time>
      <h3>{entry.title}</h3>
      {entry.content.map((item, index) => (
        <p key={`${entry.date}-${index}`}>
          {Array.isArray(item)
            ? item.map((part, partIndex) =>
                part.type === "link" ? (
                  <a href={part.url} key={`${part.url}-${partIndex}`}>
                    {part.text}
                  </a>
                ) : (
                  <span key={`${part.content}-${partIndex}`}>
                    {part.content}
                  </span>
                )
              )
            : item}
        </p>
      ))}
    </article>
  );
}

export default function NowOverview({
  githubData,
  personalBlogData,
  recentPosts,
  summary,
  timelineEntries,
}) {
  const [latestUpdate] = timelineEntries;
  const stats = [
    [summary.notesThisYear, `notes in ${summary.year}`],
    [summary.updatesThisYear, `journal updates in ${summary.year}`],
    [summary.notes, "notes in the archive"],
    [summary.topics, "topics in the archive"],
  ];

  return (
    <div className={`notes-home font-sans ${styles.page}`}>
      <header className="notes-intro">
        <h1>Now</h1>
        <p className="notes-description">
          Learning new stuff and building things using AI.
        </p>
        <p className={styles.context}>
          A snapshot of what I’m building, writing, and learning.
        </p>
      </header>

      <div className={styles.grid}>
        <section
          aria-labelledby="year-heading"
          className={`${styles.section} ${styles.overview}`}
        >
          <h2 id="year-heading">TIL at a glance</h2>
          <dl className={styles.stats}>
            {stats.map(([value, label]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          aria-labelledby="building-heading"
          className={`${styles.section} ${styles.projects}`}
        >
          <div className={styles.heading}>
            <h2 id="building-heading">On the workbench</h2>
            <a href="https://github.com/varunyn">GitHub profile</a>
          </div>
          <p className={styles.context}>
            Recently worked on in my public repositories.
          </p>
          {githubData?.length ? (
            <ul className={styles.list}>
              {githubData.map((project) => (
                <li key={project.url}>
                  <a className={styles.row} href={project.url}>
                    <span>
                      <strong>{project.name}</strong>
                      {project.description ? (
                        <span className={styles.description}>
                          {project.description}
                        </span>
                      ) : null}
                    </span>
                    <time dateTime={project.date}>
                      {formatDate(project.date)}
                    </time>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.context}>
              Browse my public projects on GitHub.
            </p>
          )}
          <p className={styles.footnote}>
            Project activity refreshes when this site is published.
          </p>
        </section>

        <section
          aria-labelledby="blog-heading"
          className={`${styles.section} ${styles.blog}`}
        >
          <div className={styles.heading}>
            <h2 id="blog-heading">On the blog</h2>
            <a href="https://varunyadav.com">varunyadav.com</a>
          </div>
          {personalBlogData ? (
            <>
              <dl className={styles.stats}>
                <div>
                  <dt>posts in {personalBlogData.year}</dt>
                  <dd>{personalBlogData.postsThisYear}</dd>
                </div>
                <div>
                  <dt>posts in the archive</dt>
                  <dd>{personalBlogData.totalPosts}</dd>
                </div>
                <div>
                  <dt>topics in the archive</dt>
                  <dd>{personalBlogData.topics}</dd>
                </div>
              </dl>
              <ul aria-label="Recent blog posts" className={styles.list}>
                {personalBlogData.recentPosts.map((post) => (
                  <li key={post.url}>
                    <a className={styles.row} href={post.url}>
                      <strong>{post.title}</strong>
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </a>
                  </li>
                ))}
              </ul>
              <p className={styles.footnote}>
                Blog stats refresh when this site is published.
              </p>
            </>
          ) : (
            <p className={styles.context}>
              Blog stats are unavailable.{" "}
              <a href="https://varunyadav.com">Read the blog</a> for the latest
              posts.
            </p>
          )}
        </section>

        <section
          aria-labelledby="writing-heading"
          className={`${styles.section} ${styles.notes}`}
        >
          <div className={styles.heading}>
            <h2 id="writing-heading">Latest TIL notes</h2>
            <Link href="/">All notes</Link>
          </div>
          {recentPosts.length ? (
            <ul className={styles.list}>
              {recentPosts.map((post) => (
                <li key={post.slug}>
                  <Link className={styles.row} href={`/blog/${post.slug}`}>
                    <strong>{post.title}</strong>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.context}>No notes published yet.</p>
          )}
        </section>

        <section
          aria-labelledby="updates-heading"
          className={`${styles.section} ${styles.journal}`}
        >
          <h2 id="updates-heading">From the journal</h2>
          {latestUpdate ? (
            <p className={styles.context}>
              Last entry{" "}
              <time dateTime={latestUpdate.date}>
                {formatDate(latestUpdate.date)}
              </time>
            </p>
          ) : (
            <p className={styles.context}>No journal entries yet.</p>
          )}
          <JournalHeatmap dates={timelineEntries.map((entry) => entry.date)} />
          <div className={styles.journalEntries}>
            {timelineEntries.slice(0, 2).map((entry) => (
              <TimelineEntry entry={entry} key={entry.date} />
            ))}
          </div>
          {timelineEntries.length > 2 ? (
            <details className={styles.archive}>
              <summary>Earlier updates ({timelineEntries.length - 2})</summary>
              {timelineEntries.slice(2).map((entry) => (
                <TimelineEntry entry={entry} key={entry.date} />
              ))}
            </details>
          ) : null}
        </section>
      </div>
      <p className={styles.footnote}>
        This is a <a href="https://nownownow.com/about">now page</a> — a small
        window into life between blog posts.
      </p>
    </div>
  );
}

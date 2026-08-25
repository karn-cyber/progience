import { Breadcrumbs, PageHero } from "@/components/ui";

type LegalPageProps = {
  title: string;
  eyebrow: string;
  introduction: string;
  sections: Array<{ heading: string; body: string }>;
  reviewNote?: string;
};

export function LegalPage({ title, eyebrow, introduction, sections, reviewNote }: LegalPageProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={introduction} />
      <article className="section legal-page">
        <div className="shell article-grid">
          <aside>
            <Breadcrumbs items={[{ label: title }]} />
            <p className="legal-status">Working policy</p>
          </aside>
          <div className="article-body">
            {reviewNote && <div className="note-panel"><strong>Publication gate</strong><p>{reviewNote}</p></div>}
            {sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}
          </div>
        </div>
      </article>
    </>
  );
}

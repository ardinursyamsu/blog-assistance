import { marked } from "marked";

export default function Test() {
  const markup = 
`# This is headings
## This is also headings
### This is it`;
  const html = marked(markup);
  return (
    <div>
      <article className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </div>
  );
}

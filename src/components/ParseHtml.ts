import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

export default function ParseHtml(html: string) {
  return parse(DOMPurify.sanitize(html), { trim: true });
}

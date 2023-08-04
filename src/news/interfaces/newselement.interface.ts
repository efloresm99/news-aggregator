export interface INewsElement {
  id: string;
  type: string;
  publication_date: string;
  title: string;
  abstract: string | null;
  byline: string | null;
  web_url: string;
  source: string;
}

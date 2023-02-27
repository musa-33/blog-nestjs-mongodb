import { ArticleSearchBody } from "./article-search-body.interface";

export interface ArticleSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: ArticleSearchBody
    }>;
  }
}
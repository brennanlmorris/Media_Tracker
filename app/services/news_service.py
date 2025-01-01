from gnews import GNews
import time


class NewsService:
    def __init__(self):
        self.google_news = GNews(
            language='en',
            country='US',
            period='7d',
            max_results=10,
            proxy=None
        )

    def get_company_news(self, company_name):
        try:
            print(f"Attempting to fetch news for {company_name}...")
            time.sleep(1)

            # Try with different search formats
            search_terms = [
                company_name,  # Plain search
                f'"{company_name}"',  # Exact match
                f'{company_name} company news'  # Extended search
            ]

            for term in search_terms:
                print(f"Trying search term: {term}")
                news_items = self.google_news.get_news(term)

                if news_items:
                    print(f"Found {len(news_items)} items with search term: {term}")
                    return [{
                        'title': item['title'],
                        'published_date': item['published date'],
                        'description': item['description'],
                        'url': item['url']
                    } for item in news_items]
                else:
                    print(f"No results for: {term}")

            print("No results found with any search term")
            return []

        except Exception as e:
            print(f"Error in news fetch: {str(e)}")
            return []
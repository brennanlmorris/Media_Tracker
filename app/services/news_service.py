from gnews import GNews
import time

class NewsService:
    def __init__(self):
        self.google_news = GNews(
            language='en',
            country='US',
            period='7d',
            max_results=10
        )
        print("NewsService initialized") #debug print

    def get_company_news(self, company_name):
        try:
            print(f"Starting news fetch for: {company_name}") #debug print
            # Add small delay to avoid rate limiting
            time.sleep(1)

            news_items = self.google_news.get_news(company_name)
            print(f"Raw response: {news_items}") # See what we're getting back

            if not news_items:
                print("No news items returned from API")
                return []

            processed_items = [{
                'title': item.get('title', 'No title'),
                'published_date': item.get('published date', 'No date'),
                'description': item.get('description', 'No description'),
                'url': item.get('url', 'no URL')
            } for item in news_items]

            print(f"Processed {len(processed_items)} items")
            return processed_items

        except Exception as e:
            print(f"Error fetching news: {e}")
            print(f"Error type: {type(e)}")
            return []
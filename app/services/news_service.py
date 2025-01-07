import requests
from bs4 import BeautifulSoup

class NewsService:
    def fetch_google_news_headlines(self, query):

        url = f"https://news.google.com/rss/search?q={query}+stock"
        try:
            response = requests.get(url)
            if response.status_code != 200:
                print(f"Failed to fetch Google News for {query}")
                return []
            soup = BeautifulSoup(response.content, 'xml')
            return [item.title.text for item in soup.find_all('item')]
        except Exception as e:
            print(f"Error fetch Google News: {e}")
            return []

    def get_news(self, query):

        try:
            headlines = self.fetch_google_news_headlines(query)
            articles = []
            for headline in headlines:
                article = {
                    'title': headline,
                    'link': '',
                    'published': 'Not available'
                }
                articles.append(article)

            print(f"Articles fetched: {articles}")
            return articles
        except Exception as e:
            print(f"An error occured in NewsService: {e}")
            return None

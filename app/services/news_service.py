from gnewsclient import gnewsclient

class NewsService:
    def __init__(self):
        self.client = gnewsclient.NewsClient()

    def get_news(self, query):
        """
        Fetches news articles for a given query.

        Args:
            query: The search query (company name or ticker).

        Returns:
            A list of news article dictionaries or None if an error occurs.
        """
        try:
            self.client.query = query

            self.client.language = 'english'
            self.client.location = "United States"
            self.client.topic = 'Business'

            news_items = self.client.get_news()
            return news_items
        except Exception as e:
            print(f"An error occured in NewsService: {e}")
            return None
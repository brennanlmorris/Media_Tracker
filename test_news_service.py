from app.services.news_service import NewsService

news_service = NewsService()
query = "DAL"
articles = news_service.get_news(query)

if articles:
    print(f"Found {len(articles)} articles for '{query}':")
    for article in articles:
        print(f" Title: {article['title']}")
        print(f" Link: {article['link']}")
        print(f" Published: {article.get('published', 'Not available')}")
        print(" ---")

    else:
        print(f"No articles found for '{query}' or an error occured.")


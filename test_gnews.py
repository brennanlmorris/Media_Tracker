from gnewsclient import gnewsclient

client = gnewsclient.NewsClient()

# Configure query parameters (optional)
client.language = 'english'
client.location = 'United States'  # Or a specific city/region
client.topic = 'Business'  # Or other topics like 'World', 'Nation', 'Sports', etc.
client.query = 'Tesla'

try:
    news_items = client.get_news()
    if news_items:
        for item in news_items:
            print(f"Title: {item['title']}")
            print(f"Link: {item['link']}")

            #Handle cases where 'published' might be missing:
            if 'published' in item:
                print(f"Published: {item['published']}")
            else:
                print("Published: Not available")

            print("---")

    else:
        print("No news items found.")
except Exception as e:
    print(f"An error occurred: {e}")
from flask import Blueprint, render_template, request
from ..services.news_service import NewsService

main = Blueprint('main', __name__)
news_service = NewsService()

@main.route('/', methods=['GET', 'POST'])
def index():
    news_items = []
    if request.method == 'POST':
        company = request.form.get('company')
        if company:
            print(f"Processing request for company: {company}")  # Debug print
            news_items = news_service.get_company_news(company)
            print(f"Returned {len(news_items)} items")  # Debug print
    return render_template('index.html', news_items=news_items)




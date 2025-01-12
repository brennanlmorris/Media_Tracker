document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const query = document.getElementById('query').value;

    fetch('/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'query=' + encodeURIComponent(query)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

/**
 * Represents a news article with sentiment data.
 * @typedef {Object} Article
 * @property {string} title - The title of the article.
 * @property {string} link - The URL of the article.
 * @property {string} published - The publication date of the article (or "Not available").
 * @property {Sentiment} sentiment - The sentiment analysis results for the article.
 */

/**
 * Represents sentiment analysis scores.
 * @typedef {Object} Sentiment
 * @property {number} positive - The positive sentiment score.
 * @property {number} neutral - The neutral sentiment score.
 * @property {number} negative - The negative sentiment score.
 */

/**
 * Display the news article results on the page.
 * @param {Article[]} articles - The array of article objects.
 */
function displayResults(articles) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (articles.error) {
        resultsDiv.innerHTML = '<p>' + articles.error + '</p>';
        return;
    }

    if (articles.length === 0) {
        resultsDiv.innerHTML = '<p>No articles found.</p>';
        return;
    }

    articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article');
        articleDiv.innerHTML = `
            <h3>${article.title}</h3>
            <p>Sentiment:</p>
            <ul>
                <li>Positive: ${article.sentiment.positive.toFixed(2)}</li>
                <li>Neutral: ${article.sentiment.neutral.toFixed(2)}</li>
                <li>Negative: ${article.sentiment.negative.toFixed(2)}</li>
            </ul>
        `;
        resultsDiv.appendChild(articleDiv);
    });
}
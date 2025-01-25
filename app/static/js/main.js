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
        console.log('Data received:', data);

        if (data.error) {
            console.error('Error from server:', data.error);
            displayResults(data);
            return;
        }

        if (data.articles && Array.isArray(data.articles)) {
            displayResults(data.articles);

            if (data.average_sentiment) {
                displayAverageSentiment(data.average_sentiment);
            }
        } else {
            console.error('No articles found or data.articles is not an array.');
            displayResults({ error: 'No articles found.' });
        }
    })
    .catch(error => {
        console.error('Fetch Error:', error);
        displayResults({ error: 'An error occurred while fetching data.' });
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
 * @param {Article[]|{error: string}} data - Either an array of Article objects or an error object.
 */
function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    // Handle case where data is an error object
    if (data.error) {
        resultsDiv.innerHTML = '<p>' + data.error + '</p>';
        return;
    }

    // Handle case where data is an empty array or null
    if (!data || data.length === 0) {
        resultsDiv.innerHTML = '<p>No articles found.</p>';
        return;
    }

    // Iterate over the articles array
    data.forEach(article => {
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

/**
 * Display the average sentiment scores in boxes.
 * @param {{positive: number, neutral: number, negative: number}} averageSentiment - The average sentiment scores.
 */
function displayAverageSentiment(averageSentiment) {
    const sentimentDiv = document.getElementById('averageSentiment');
    sentimentDiv.innerHTML = ''; // Clear previous content

    const positiveBox = document.createElement('div');
    positiveBox.classList.add('sentiment-box', 'positive');
    positiveBox.innerHTML = `<h2>Positive</h2><p>${(averageSentiment.positive * 100).toFixed(0)}%</p>`;

    const neutralBox = document.createElement('div');
    neutralBox.classList.add('sentiment-box', 'neutral');
    neutralBox.innerHTML = `<h2>Neutral</h2><p>${(averageSentiment.neutral * 100).toFixed(0)}%</p>`;

    const negativeBox = document.createElement('div');
    negativeBox.classList.add('sentiment-box', 'negative');
    negativeBox.innerHTML = `<h2>Negative</h2><p>${(averageSentiment.negative * 100).toFixed(0)}%</p>`;

    sentimentDiv.appendChild(positiveBox);
    sentimentDiv.appendChild(neutralBox);
    sentimentDiv.appendChild(negativeBox);
}
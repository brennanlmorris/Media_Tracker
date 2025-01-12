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

        displayResults(data);

        if (data.average_sentiment) {
            renderOrUpdateChart(data.average_sentiment);
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
 * @param {Object} data - The data object received from the server.
 * @param {Article[]} [data.articles] - The array of article objects (only present if no error).
 * @param {string} [data.error] - The error message (only present if an error occurred).
 */
function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    // Handle error case
    if (data.error) {
        resultsDiv.innerHTML = '<p>' + data.error + '</p>';
        return;
    }

    // Check if 'data.articles' exists and is an array before proceeding
    if (data.articles && Array.isArray(data.articles)) {
        // Iterate over the articles array
        data.articles.forEach(article => {
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
    } else {
        // Handle unexpected data format
        resultsDiv.innerHTML = '<p>No articles found or unexpected data format received.</p>';
        console.error('Unexpected data format:', data);
    }
}

/**
 * @type {Chart}
 */
let sentimentChart = null;

function renderOrUpdateChart(averageSentiment) {
    const ctx = document.getElementById('sentimentChart').getContext('2d');

    if (!sentimentChart) {
        // If the chart does not exist, create it
        sentimentChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Positive', 'Neutral', 'Negative'],
                datasets: [{
                    data: [averageSentiment.positive, averageSentiment.neutral, averageSentiment.negative],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Average Sentiment'
                    }
                }
            }
        });
    } else {
        // If the chart exists, update its data
        sentimentChart.data.datasets[0].data = [averageSentiment.positive, averageSentiment.neutral, averageSentiment.negative];
        sentimentChart.update();
    }
}
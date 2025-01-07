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
    .then(response => response.json())
    .then(data => {
        displayResults(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

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
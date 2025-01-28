# Media Sentiment Tracker

## Description

This project is a Flask-based web application that analyzes the sentiment of recent news articles related to a user-specified company or stock ticker. It leverages the power of Natural Language Processing (NLP) and a pre-trained FinBERT model to provide insights into market sentiment.

The application performs the following:

1.  **Fetches News Headlines:** Gathers recent news headlines related to the user's query from the Google News RSS feed.
2.  **Performs Sentiment Analysis:** Utilizes the FinBERT model (a fine-tuned BERT model for financial text) from the Hugging Face Transformers library to analyze the sentiment of each headline.
3.  **Calculates Average Sentiment:** Computes the average positive, neutral, and negative sentiment scores across all fetched articles.
4.  **Displays Results:** Presents the news headlines and their corresponding sentiment scores in a user-friendly web interface, along with boxes indicating the overall average sentiment.

## Features

*   **Web Interface:** A simple and intuitive web interface built with Flask and vanilla JavaScript.
*   **Dynamic Search:** Users can enter any company name or stock ticker to get real-time sentiment analysis.
*   **Sentiment Visualization:** Clear display of sentiment scores (positive, neutral, negative) for each article.
*   **Average Sentiment:** Presents the overall average sentiment in visually distinct boxes.
*   **Error Handling:** Includes basic error handling for network issues, API errors, and cases where no articles are found.

## Technology Stack

*   **Python:** The core programming language.
*   **Flask:** A lightweight Python web framework for building the web application.
*   **Hugging Face Transformers:** A library for working with state-of-the-art NLP models, including FinBERT.
*   **gnewsclient:** A library for pulling articles from Google News.
*   **Beautiful Soup:** A library for parsing HTML and XML content (used for scraping the Google News RSS feed).
*   **PyTorch:** Deep learning framework used by the `transformers` library.
*   **Requests:** A library for making HTTP requests.
*   **HTML/CSS/JavaScript:** For the frontend web interface.
*   **Chart.js:** Used for creating the sentiment pie chart (removed in latest version, but mentioned here for historical context).

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/brennanlmorris/Media_Tracker
    cd Media_Tracker
    ```

2.  **Create and activate a virtual environment (recommended):**

    *   **Using `venv`:**

    ```bash
    python3 -m venv .venv
    source .venv/bin/activate  # On macOS/Linux
    .venv\Scripts\activate  # On Windows
    ```

3.  **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

## Usage

1.  **Start the Flask development server:**

    ```bash
    python run.py
    ```

2.  **Enter a company name or stock ticker in the search bar and click "Analyze"**


## Future Improvements

*   **Enhanced Sentiment Analysis:**
    *   Fine-tune the FinBERT model on a larger, more specific dataset of financial news headlines.
    *   Experiment with different FinBERT models or other NLP architectures.
    *   Implement more sophisticated sentiment analysis techniques (e.g., aspect-based sentiment analysis).
*   **Improved News Fetching:**
    *   Use a more robust news API (e.g., NewsAPI.org, Newscatcher) for better data quality and filtering options.
    *   Implement caching to reduce API calls and improve performance.
*   **Advanced Visualizations:**
    *   Add more interactive charts and graphs to visualize sentiment trends over time.
*   **User Authentication:**
    *   Allow users to create accounts and save their search history or favorite stocks.
*   **Deployment:**
    *   Deploy the application to a cloud platform like AWS, Heroku, or Google Cloud for public access.

## Disclaimer

This application is for informational and educational purposes only and should not be considered financial advice. The sentiment analysis results are based on a machine learning model and may not always be accurate. Always do your own research before making any investment decisions.

## Contributing

Contributions to this project are welcome! Please feel free to submit pull requests or open issues on the GitHub repository.

## License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.
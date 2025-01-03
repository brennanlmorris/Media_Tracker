from transformers import BertTokenizer, BertForSequenceClassification
import torch

class SentimentService:
    def __init__(self, model_path="app/models/finbert/"):
        """
        Loads the FinBERT model and tokenizer.

        Args:
            model_path: The path to the directory containing the FinBERT model files.
        """
        self.tokenizer = BertTokenizer.from_pretrained(model_path)
        self.model = BertForSequenceClassification.from_pretrained(model_path)
        self.model.eval()

    def analyze_sentiment(self, text):
        """
        Analyzes the sentiment of a given text using FinBERT.

        Args:
            text: The text to analyze.

        Returns:
            A dictionary containing the sentiment scores (positive, negative, neutral).
        """
        inputs = self.tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=512)
        with torch.no_grad():
            outputs = self.model(**inputs)
            logits = outputs.logits
            probabilities = torch.softmax(logits, dim=1).tolist()[0]

        sentiment_scores = {
            "positive": probabilities[2],
            "neutral": probabilities[1],
            "negative": probabilities[0],
        }
        return sentiment_scores
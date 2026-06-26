from flask import Flask, render_template, request
import joblib
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

# Download NLTK resources (only first time)
try:
    nltk.data.find("corpora/stopwords")
except LookupError:
    nltk.download("stopwords")

try:
    nltk.data.find("corpora/wordnet")
except LookupError:
    nltk.download("wordnet")

try:
    nltk.data.find("corpora/omw-1.4")
except LookupError:
    nltk.download("omw-1.4")

app = Flask(__name__)

# ===============================
# Load Saved Models
# ===============================
ensemble_model = joblib.load("models/ensemble_model.pkl")
tfidf = joblib.load("models/tfidf_vectorizer.pkl")
label_encoder = joblib.load("models/label_encoder.pkl")

# ===============================
# Text Preprocessing
# ===============================
stop_words = set(stopwords.words("english"))
lemmatizer = WordNetLemmatizer()


def clean_text(text):
    text = text.lower()

    # Remove URLs
    text = re.sub(r"http\S+|www\S+", "", text)

    # Remove HTML
    text = re.sub(r"<.*?>", "", text)

    # Remove punctuation/numbers
    text = re.sub(r"[^a-zA-Z\s]", " ", text)

    # Remove extra spaces
    text = re.sub(r"\s+", " ", text).strip()

    # Tokenize
    words = text.split()

    # Remove stopwords and lemmatize
    words = [
        lemmatizer.lemmatize(word)
        for word in words
        if word not in stop_words
    ]

    return " ".join(words)


# ===============================
# Home Page
# ===============================
@app.route("/")
def home():
    return render_template("index.html")


# ===============================
# Prediction Route
# ===============================
@app.route("/predict", methods=["POST"])
def predict():

    news = request.form["news"]

    cleaned = clean_text(news)

    vector = tfidf.transform([cleaned])

    prediction = ensemble_model.predict(vector)[0]

    probability = ensemble_model.predict_proba(vector)[0]

    confidence = probability.max() * 100

    label = label_encoder.inverse_transform([prediction])[0]

    return render_template(
        "index.html",
        prediction=label.upper(),
        confidence=round(confidence, 2),
        news=news,
    )


# ===============================
# Run App
# ===============================
if __name__ == "__main__":
    app.run(debug=True)
# 📰 Fake News Detection — Classical ML with NLP

A machine learning pipeline that classifies news articles as **fake** or **real** using NLP-based feature extraction, five classical supervised classifiers, a soft voting ensemble, and unsupervised DBSCAN clustering for exploratory analysis. The trained ensemble is served via a Flask web application.

---

## 📌 Overview

This project presents an end-to-end ML pipeline covering data preprocessing, feature engineering, model training and evaluation, ensemble learning, and web deployment.

**Key design choices:**
- Title + body text are concatenated for richer signal
- TF-IDF with bigrams and sublinear term frequency scaling
- Stratified 70/15/15 train/val/test split to prevent data leakage
- KNN uses TruncatedSVD (LSA, 100 components) to handle sparse TF-IDF input
- DBSCAN uses 50-component LSA reduction before clustering
- All supervised models evaluated on both validation and test sets

---

## ✨ Features

- 📊 Exploratory Data Analysis (EDA) — label distribution, subject/source breakdown, word clouds, text length
- 🧹 Advanced text preprocessing pipeline
- 🔠 TF-IDF feature extraction (5,000 features, unigrams + bigrams)
- 🤖 Five classical ML classifiers + unsupervised DBSCAN
- 🗳️ Soft Voting Ensemble for deployment
- 📈 Comprehensive evaluation — confusion matrices, ROC curves, metrics heatmap
- 🌐 Flask web application with live predictions and confidence scores
- ☁️ Ready for Render deployment

---

## 📂 Project Structure

```
Fake-News-Detection/
│
├── app.py                          # Flask application entry point
├── requirements.txt
├── Procfile                        # For Render/Heroku deployment
├── README.md
├── .gitignore
│
├── notebooks/
│   └── Fake_News_Detection.ipynb   # Full pipeline notebook
│
├── models/
│   ├── ensemble_model.pkl
│   ├── tfidf_vectorizer.pkl
│   └── label_encoder.pkl
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   └── script.js
│
└── results/
    ├── label_distribution.png
    ├── category_source.png
    ├── wordclouds.png
    ├── text_length_analysis.png
    ├── cm_naive_bayes.png
    ├── cm_logistic_regression.png
    ├── cm_random_forest.png
    ├── cm_svm.png
    ├── cm_knn.png
    ├── cm_ensemble.png
    ├── knn_k_selection.png
    ├── dbscan_clusters.png
    ├── model_comparison.png
    ├── test_vs_val_accuracy.png
    ├── metrics_heatmap.png
    └── roc_curve.png
```

---

## 🗃️ Dataset

This project uses the [Fake and Real News Dataset](https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset) from Kaggle.

| File | Label | Description |
|---|---|---|
| `Fake.csv` | `fake` | Fake news articles |
| `True.csv` | `real` | Real/legitimate news articles |

Both files share the same columns: `title`, `text`, `subject`, `date`. Place both CSV files in the project root before running the notebook.

---

## 🔄 Pipeline

```
Fake.csv + True.csv
       ↓
Load & merge → label → shuffle
       ↓
EDA (label dist · subject dist · word clouds · text length)
       ↓
Data Preparation
  ├── Drop duplicates
  ├── Fill missing values
  ├── Combine title + text → combined_text
  └── Clean text (lowercase · remove URLs/tags · lemmatize · remove stopwords)
       ↓
Feature Engineering
  ├── TF-IDF (5,000 features · unigrams+bigrams · sublinear_tf · fit on train only)
  └── TruncatedSVD reduction for KNN (100 components) and DBSCAN (50 components)
       ↓
Stratified Split: 70% Train · 15% Val · 15% Test
       ↓
Model Training & Evaluation
  ├── Naive Bayes
  ├── Random Forest
  ├── Logistic Regression
  ├── SVM (LinearSVC + Calibration)
  ├── KNN (best K tuned on validation set)
  └── DBSCAN (unsupervised, exploratory only)
       ↓
Soft Voting Ensemble (NB + LR + RF + SVM)
       ↓
Flask Web Application
```

---

## 🧹 Text Preprocessing

The `clean_text` function applies these steps in order:

1. Lowercase
2. Remove URLs (`http://`, `www.`)
3. Remove Reuters tags — `(reuters)`
4. Remove non-alphabetic characters
5. Collapse whitespace
6. Tokenize → lemmatize (WordNetLemmatizer) → remove stopwords → remove tokens shorter than 3 characters

---

## ⚙️ Feature Engineering

TF-IDF Vectorization configuration:

| Parameter | Value |
|---|---|
| Max features | 5,000 |
| N-gram range | Unigrams + Bigrams |
| Sublinear TF | ✅ |
| Min document frequency | 2 |
| Max document frequency | 0.95 |

The vectorizer is fitted **only on the training set** to prevent data leakage.

---

## 🤖 Models

| # | Model | Key Configuration |
|---|---|---|
| 1 | Multinomial Naive Bayes | `alpha=0.1` |
| 2 | Random Forest | 200 trees, `min_samples_split=5`, `n_jobs=-1` |
| 3 | Logistic Regression | `C=5.0`, SAGA solver, 5-fold CV, `max_iter=1000` |
| 4 | SVM | LinearSVC `C=1.0` wrapped with `CalibratedClassifierCV` (cv=3) |
| 5 | KNN | Cosine metric, best K from {3,5,7,9,11} on val set, LSA-reduced input |
| 6 | DBSCAN | `eps=2.5`, `min_samples=5`, Euclidean metric, 50-component LSA input |

> **Note:** DBSCAN is unsupervised and used for exploratory clustering only — it is not part of the supervised comparison or the deployed ensemble.

---

## 🚀 Deployed Ensemble

The Flask application uses a **Soft Voting Ensemble** of:

- Multinomial Naive Bayes
- Logistic Regression
- Random Forest
- Support Vector Machine (SVM)

**Why is KNN excluded?** TF-IDF produces high-dimensional sparse vectors, making KNN inference computationally expensive. The marginal performance gain does not justify the added latency in a web deployment context.

---

## 📊 Evaluation Metrics

Each supervised model is evaluated on both the test and validation sets using:

- Accuracy, Precision, Recall, F1-Score, AUC-ROC

Outputs include per-model confusion matrices, a multi-model ROC curve, a bar chart comparing all metrics, a test vs. validation accuracy comparison, and a metrics heatmap.

DBSCAN is evaluated via cluster count, noise point count, and Silhouette Score (computed on non-noise points only).

---

## 🌐 Web Application

The trained ensemble is deployed as a Flask application.

**Features:**
- Paste any news article text
- Automatic preprocessing and TF-IDF vectorization
- Ensemble prediction with confidence score
- Responsive UI

---

## 💾 Saved Models

Inference loads three serialized objects via Joblib:

| File | Contents |
|---|---|
| `ensemble_model.pkl` | Soft Voting Ensemble |
| `tfidf_vectorizer.pkl` | Fitted TF-IDF vectorizer |
| `label_encoder.pkl` | Label encoder |

---

## 🚀 Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/zaiinbaloch/fake-news-detection.git
cd fake-news-detection

# 2. Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# 3. Install dependencies
pip install -r requirements.txt

# 4. Download NLTK resources (first run only)
python -c "import nltk; nltk.download('stopwords'); nltk.download('wordnet'); nltk.download('omw-1.4')"

# 5. Place Fake.csv and True.csv in the project root

# 6. Run the notebook to train and serialize models
jupyter notebook notebooks/Fake_News_Detection.ipynb

# 7. Launch the web app
python app.py
# Open http://127.0.0.1:5000
```

---

## 📋 Requirements

- Python 3.8+
- `pandas`, `numpy`
- `scikit-learn`
- `nltk`
- `wordcloud`
- `matplotlib`, `seaborn`
- `flask`
- `joblib`

Install all at once:

```bash
pip install -r requirements.txt
```

---

## 🛠 Tech Stack

`Python` · `Scikit-learn` · `NLTK` · `Flask` · `Pandas` · `NumPy` · `SciPy` · `Joblib` · `Matplotlib` · `Seaborn` · `WordCloud`

---

## 👨‍💻 Author

**Ghulam Zain Ul Abidin Rind**  
Machine Learning · Artificial Intelligence · NLP · Data Science  
[GitHub](https://github.com/zaiinbaloch)

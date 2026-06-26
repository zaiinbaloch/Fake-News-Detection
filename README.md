<<<<<<< HEAD
# 📰 Fake News Detection using Classical Machine Learning & Soft Voting Ensemble

A comprehensive **Natural Language Processing (NLP)** and **Machine Learning** project that detects whether a news article is **Fake** or **Real** using TF-IDF feature extraction and multiple classical machine learning algorithms. The final deployed system uses a **Soft Voting Ensemble** to improve prediction robustness and generalization.
=======
# 📰 Fake News Detection — Classical ML with NLP

A machine learning pipeline that classifies news articles as **fake** or **real** using NLP-based feature extraction and five classical classifiers, plus unsupervised DBSCAN clustering for exploratory analysis.
>>>>>>> faf81f0fbab11c275413f81896256d01c3ea4b86

---

## 📌 Overview

<<<<<<< HEAD
Fake news has become one of the major challenges in the digital era. This project presents an end-to-end machine learning pipeline that classifies news articles as **Fake** or **Real**. It covers the complete workflow from data preprocessing and feature engineering to model evaluation, ensemble learning, and deployment as a Flask web application.

---

## ✨ Features

* 📊 Exploratory Data Analysis (EDA)
* 🧹 Advanced Text Preprocessing
* 🔠 TF-IDF Feature Extraction
* 🤖 Training of Multiple Classical ML Models
* 🗳️ Soft Voting Ensemble Classifier
* 📈 Model Performance Comparison
* 📉 Confusion Matrices & ROC Curves
* 🌐 Flask Web Application
* ☁️ Ready for Render Deployment

---

# 📂 Project Structure

```text
Fake-News-Detection/
│
├── app.py
├── requirements.txt
├── Procfile
├── README.md
├── .gitignore
│
├── models/
│   ├── ensemble_model.pkl
│   ├── tfidf_vectorizer.pkl
│   └── label_encoder.pkl
│
├── notebooks/
│   └── Fake_News_Detection.ipynb
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   └── script.js
│
├── results/
│   ├── cm_nb.png
│   ├── cm_lr.png
│   ├── cm_rf.png
│   ├── cm_svm.png
│   ├── cm_knn.png
│   ├── cm_ensemble.png
│   ├── roc_curve.png
│   ├── metrics_heatmap.png
│   └── label_distribution.png
│
└── screenshots/
    ├── homepage.png
    └── prediction.png
=======
This project applies classical ML to the fake news detection problem using a TF-IDF text representation pipeline. Five supervised classifiers are trained and compared, and DBSCAN clustering is used to explore natural groupings in the data without labels.

**Key design choices:**
- Title + body text are concatenated for richer signal
- TF-IDF with bigrams and sublinear term frequency scaling
- Stratified 70/15/15 train/val/test split
- KNN uses TruncatedSVD (LSA) dimensionality reduction (100 components) to handle sparse TF-IDF input
- DBSCAN uses 50-component LSA reduction before clustering
- All models evaluated on both test and validation sets

---

## 📂 Project Structure

```
├── Fake_News_Detection.ipynb    # Full pipeline notebook
├── Fake.csv                     # Fake news articles (required)
├── True.csv                     # Real news articles (required)
└── output plots/
    ├── label_distribution.png
    ├── category_source.png
    ├── wordclouds.png
    ├── text_length_analysis.png
    ├── cm_naive_bayes.png
    ├── cm_random_forest.png
    ├── cm_logistic_regression.png
    ├── cm_svm.png
    ├── cm_knn.png
    ├── knn_k_selection.png
    ├── dbscan_clusters.png
    ├── model_comparison.png
    ├── test_vs_val_accuracy.png
    ├── metrics_heatmap.png
    └── roc_curve.png
>>>>>>> faf81f0fbab11c275413f81896256d01c3ea4b86
```

---

<<<<<<< HEAD
# 📊 Dataset

Dataset used:

**Fake and Real News Dataset**

Source:

https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset

Files included:

* Fake.csv
* True.csv

Each article contains:

* Title
* News Text
* Subject
* Date

---

# 🔄 Machine Learning Pipeline

```text
Dataset
    │
    ▼
Data Cleaning
    │
    ▼
Exploratory Data Analysis
    │
    ▼
Text Preprocessing
    │
    ▼
TF-IDF Vectorization
    │
    ▼
70% Train
15% Validation
15% Test
    │
    ▼
Model Training
    │
    ├── Multinomial Naive Bayes
    ├── Logistic Regression
    ├── Random Forest
    ├── Support Vector Machine
    ├── K-Nearest Neighbors
    └── DBSCAN
    │
    ▼
Performance Evaluation
    │
    ▼
Soft Voting Ensemble
    │
    ▼
Flask Deployment
=======
## 🗃️ Dataset

This project uses the [Fake and Real News Dataset](https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset) from Kaggle.

| File | Label | Description |
|---|---|---|
| `Fake.csv` | `fake` | Fake news articles |
| `True.csv` | `real` | Real/legitimate news articles |

Both files share the same columns: `title`, `text`, `subject`, `date`.

Place both CSV files in the same directory as the notebook before running.

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
  └── DBSCAN (unsupervised)
       ↓
Comparison: Accuracy · Precision · Recall · F1 · AUC-ROC
            Confusion matrices · ROC curves · Metrics heatmap
>>>>>>> faf81f0fbab11c275413f81896256d01c3ea4b86
```

---

<<<<<<< HEAD
# 🧹 Text Preprocessing

The preprocessing pipeline includes:

* Lowercase conversion
* URL removal
* HTML tag removal
* Reuters tag removal
* Punctuation removal
* Number removal
* Stopword removal
* Lemmatization
* Whitespace normalization

---

# ⚙️ Feature Engineering

The project uses **TF-IDF Vectorization** with the following configuration:

* Maximum Features: **5000**
* N-grams: **Unigrams + Bigrams**
* Sublinear TF Scaling
* Unicode normalization
* Minimum document frequency = **2**
* Maximum document frequency = **0.95**

The TF-IDF vectorizer is fitted **only on the training set** to prevent data leakage.

---

# 🤖 Models Evaluated

| Model                        | Purpose                             |
| ---------------------------- | ----------------------------------- |
| Multinomial Naive Bayes      | Supervised Classification           |
| Logistic Regression          | Supervised Classification           |
| Random Forest                | Supervised Classification           |
| Support Vector Machine (SVM) | Supervised Classification           |
| K-Nearest Neighbors (KNN)    | Performance Comparison              |
| DBSCAN                       | Exploratory Unsupervised Clustering |

---

# 🚀 Final Deployment Model

The deployed web application uses a **Soft Voting Ensemble** consisting of:

* Multinomial Naive Bayes
* Logistic Regression
* Random Forest
* Support Vector Machine (SVM)

### Why isn't KNN included?

Although **K-Nearest Neighbors (KNN)** was trained and evaluated, it was **not selected for deployment** because:

* TF-IDF creates high-dimensional sparse feature vectors.
* KNN prediction is computationally expensive on sparse text data.
* The performance improvement did not justify the additional inference time.

Similarly, **DBSCAN** was used only for exploratory clustering and is **not part of the deployed prediction pipeline**.

---

# 📈 Evaluation Metrics

Each supervised model was evaluated using:

* Accuracy
* Precision
* Recall
* F1-Score
* ROC-AUC Score

Visualization includes:

* Confusion Matrices
* ROC Curve
* Metrics Heatmap
* Model Comparison
* Label Distribution
* Word Clouds

---

# 🌐 Web Application

The trained Soft Voting Ensemble has been deployed as a Flask web application.

### Features

* Paste any news article
* Automatic preprocessing
* TF-IDF vectorization
* Ensemble prediction
* Confidence score
* Responsive user interface

---

# 💾 Saved Models

The application loads the following serialized objects during inference:

* `ensemble_model.pkl`
* `tfidf_vectorizer.pkl`
* `label_encoder.pkl`

These files are loaded using **Joblib**.

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/your-username/Fake-News-Detection.git
```

Navigate into the project

```bash
cd Fake-News-Detection
```

Create a virtual environment

```bash
python -m venv venv
```

Activate it (Windows)

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run the application

```bash
python app.py
```

Open your browser:

```
http://127.0.0.1:5000
=======
## 🧹 Text Preprocessing

The `clean_text` function applies these steps in order:

1. Lowercase
2. Remove URLs (`http://`, `www.`)
3. Remove Reuters tags — `(reuters)`
4. Remove non-alphabetic characters
5. Collapse whitespace
6. Tokenize → lemmatize (WordNetLemmatizer) → remove stopwords → remove tokens shorter than 3 characters

---

## 🤖 Models

| # | Model | Key Configuration |
|---|---|---|
| 1 | Multinomial Naive Bayes | `alpha=0.1` |
| 2 | Random Forest | 200 trees, `min_samples_split=5`, `n_jobs=-1` |
| 3 | Logistic Regression | `C=5.0`, SAGA solver, 5-fold CV, `max_iter=1000` |
| 4 | SVM | LinearSVC `C=1.0` wrapped with `CalibratedClassifierCV` (cv=3) |
| 5 | KNN | Cosine metric, best K selected from {3,5,7,9,11} on validation set, LSA-reduced input |
| 6 | DBSCAN | `eps=2.5`, `min_samples=5`, Euclidean metric, LSA-reduced input |

> **Note:** DBSCAN is unsupervised and is used for exploratory clustering only — it is not included in the supervised comparison table.

---

## 📊 Evaluation Metrics

Each supervised model is evaluated on both the test and validation sets using:

- Accuracy
- Precision
- Recall
- F1-Score
- AUC-ROC

Outputs include per-model confusion matrices, a multi-model ROC curve, a bar chart comparing all metrics, a test vs. validation accuracy comparison, and a metrics heatmap.

DBSCAN is evaluated via the number of clusters found, noise point count, and Silhouette Score (computed on non-noise points only).

---

## 🚀 Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

# 2. Install dependencies
pip install pandas numpy matplotlib seaborn scikit-learn nltk wordcloud

# 3. Download NLTK resources (first run only)
python -c "import nltk; nltk.download('stopwords'); nltk.download('wordnet'); nltk.download('omw-1.4')"

# 4. Place Fake.csv and True.csv in the project folder

# 5. Open and run the notebook
jupyter notebook Fake_News_Detection.ipynb
>>>>>>> faf81f0fbab11c275413f81896256d01c3ea4b86
```

---

<<<<<<< HEAD
# 🛠 Technologies Used

* Python
* Flask
* Scikit-learn
* Pandas
* NumPy
* SciPy
* NLTK
* Joblib
* Matplotlib
* Seaborn
* WordCloud
* HTML
* CSS
* JavaScript

---

# 📷 Screenshots

## 🏠 Home Page

> ![alt text](webpage.png)

---

## 🔍 Prediction Example

> ![alt text](<webpage 2.png>)

---

# 👨‍💻 Author

**Ghulam Zain Ul Abidin Rind**

Machine Learning • Artificial Intelligence • NLP • Data Science

=======
## 📋 Requirements

- Python 3.8+
- `pandas`, `numpy`
- `scikit-learn`
- `nltk`
- `wordcloud`
- `matplotlib`, `seaborn`
>>>>>>> faf81f0fbab11c275413f81896256d01c3ea4b86

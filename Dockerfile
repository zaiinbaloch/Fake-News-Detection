FROM python:3.11-slim

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

RUN python -c "import nltk; \
nltk.download('stopwords'); \
nltk.download('wordnet'); \
nltk.download('omw-1.4')"

EXPOSE 7860

CMD ["python", "app.py"]
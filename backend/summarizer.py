from transformers import pipeline

# Initialize the summarization pipeline globally
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def summarize_text(text, max_length=150, min_length=20):  # Adjusted lengths
    try:
        if not text.strip():
            return "No content available to summarize."
        # Use the globally initialized summarizer
        summary = summarizer(text, max_length=max_length, min_length=min_length, do_sample=False)
        return summary[0]['summary_text']
    except Exception as e:
        print(f"Error in summarize_text: {e}")
        return "Error generating summary."

# Test the summarization function
if __name__ == "__main__":
    test_text = "This is a test sentence to summarize."
    try:
        summary = summarizer(test_text, max_length=50, min_length=10, do_sample=False)
        print("Summary:", summary[0]['summary_text'])
    except Exception as e:
        print(f"Error in summarization: {e}")
const submitReview = (e) => {
    e.preventDefault();
    const review = document.getElementById('review').value;
    const options = {
      method: 'POST',
      body: JSON.stringify({ review }),
      headers: new Headers({ 'Content-Type': 'application/json' })
    }
  
    const emojiSection = document.getElementById('emojiSection');
    const title = document.getElementById('title');
    const outline = document.querySelector(':focus');
  
    fetch('/api/nlp/s-analyzer', options)
      .then(res => res.json())
      .then (({ analysis }) => {
        if (analysis < 0) {
          emojiSection.innerHTML = '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrxnSmNO-u0pXS-8wNUaaBQFs4XZVYTche2w&usqp=CAU">';
          title.style.color = 'red';
          outline.style.borderColor = 'red';
          
        };
        if (analysis === 0) {
          emojiSection.innerHTML = '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTLf0zgjcP_p2OAGuNt6AfABS2ANaRQ0jtr9g&usqp=CAU">';
          title.style.color = 'orange';
          outline.style.borderColor = 'orange';
        }
        if (analysis > 0) {
          emojiSection.innerHTML = '<img src="data:image/png;base64,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">';
          title.style.color = 'green';
          outline.style.borderColor = 'green'
        }
      })
      .catch(err => {
        emojiSection.innerHTML = 'There was an error processing your request!'
      })
  }
  
  document.getElementById('review').addEventListener('keyup', submitReview);
  document.getElementById('reviewForm').addEventListener('submit', submitReview);
  
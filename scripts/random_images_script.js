// List of image URLs
const imageList = [
  "https://que.com/wp-content/uploads/2024/07/image-18.png",
  "https://que.com/wp-content/uploads/2024/07/Que.com-business-future.png",
  "https://que.com/wp-content/uploads/2024/07/Que.com-Robot.png",
  "https://que.com/wp-content/uploads/2024/07/Que.com-Must-read-books.png",
  "https://que.com/wp-content/uploads/2024/07/Yehey.com-breaking-news.png",
  "https://que.com/wp-content/uploads/2024/07/IndustryStandard.com-we-assist-you-to-start.png",
  "https://que.com/wp-content/uploads/2024/07/QUE.com-Space.png",
  "https://que.com/wp-content/uploads/2024/07/QUE.com-Future-Trends.png",
  "https://que.com/wp-content/uploads/2024/07/QUE.com-ComputerVision-202407010449.png",
  "https://que.com/wp-content/uploads/2024/06/IndustryStandard.com-marketing-v1.png",
  "https://que.com/wp-content/uploads/2024/06/hardworking.com_.png",
  "https://que.com/wp-content/uploads/2024/04/Que.com-Marketing-Internet-Billboard.png",
  "https://que.com/wp-content/uploads/2024/02/Que.com-Crypto-News.png",
  "https://que.com/wp-content/uploads/2024/07/QUE.com-Innovation-for-the-Future.png",
  "https://que.com/wp-content/uploads/2024/07/Yehey.com-Tax-Advisor.png",
  "https://que.com/wp-content/uploads/2024/07/QUE.com-AI-Business-and-the-Environment.png",
  "https://que.com/wp-content/uploads/2024/07/Que.com-Tech-talk.png",
  "https://que.com/wp-content/uploads/2024/07/Que.com-Unknown-the-future-of-AI.png",
  "https://que.com/wp-content/uploads/2024/07/Que.com-Artificial-Intelligence-shadow.png",
  "https://que.com/wp-content/uploads/2024/07/Yehey.com-Kikay-Magazine.png"
];

function showRandomImage() {
  // Get a random index from the array
  const randomIndex = Math.floor(Math.random() * imageList.length);
  // Get the random image URL 
  const randomImage = imageList[randomIndex];
  // Set the image src attribute to the random image URL
  const imageElement = document.getElementById("random-image");
  imageElement.src = randomImage;
}

showRandomImage();
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

// 요청 함수 정의
app.get('/getTopNews', async (req, res) => {
    try {
      const url = 'https://www.asahi.com';
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);
  
      const topNews = [];
  
      // 탑 10 뉴스 기사 크롤링
      $('.top-news-list li').each(async (index, element) => {
        const title = $(element).find('y_Qv3').text();
        const link = url + $(element).find('a').attr('href');
        
        // 기사 내용 크롤링
        const content = await crawlArticleContent(link);
        console.log(title);
        topNews.push({ title, content });
      });
  
      res.json({ topNews });
    } catch (error) {
      console.error('크롤링 오류:', error);
      res.status(500).json({ error: '크롤링 오류' });
    }
  });

// 요청 함수 정의
async function crawlArticleContent(link) {
  try {
    const articleResponse = await axios.get(link);
    const articleHtml = articleResponse.data;
    const $article = cheerio.load(articleHtml);
    const content = $article('nfyQp').text();
    return content;
  } catch (error) {
    console.error('기사 내용 크롤링 오류:', error);
    return '기사 내용을 가져올 수 없음';
  }
}

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});
  
  

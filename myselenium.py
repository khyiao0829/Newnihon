from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument("--start-maximized")

service = Service(ChromeDriverManager().install())

driver = webdriver.Chrome(service=service, options=options)

article_titles =[]
url = 'https://www.asahi.com/whatsnew/ranking/?iref=pc_gnavi'
driver.get(url)

for i in range(1, 11):
    xpath = f'//*[@id="AccesstopList"]/dl/dd[{i}]/p/a'
    article_element = driver.find_element(By.XPATH, xpath)
    article_title = article_element.text
    article_titles.append(article_title)

# 기사 제목 리스트를 출력합니다.
for rank, title in enumerate(article_titles, 1):
    print(f"{rank}. {title}")

driver.quit()

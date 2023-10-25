from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument("--start-maximized")

url = 'https://www.asahi.com/articles/ASRBS4G6HRBSUTIL002.html?iref=comtop_7_05'

service = Service(ChromeDriverManager().install())

num_browsers = 1

for _ in range(num_browsers):
    driver = webdriver.Chrome(service=service, options=options)
    driver.get(url)
    
    article_page = driver.find_element(By.CLASS_NAME, 'nfyQp')
    print(article_page.text)
    
    driver.quit()
    time.sleep(2)


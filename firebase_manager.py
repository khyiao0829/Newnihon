import firebase_admin
from firebase_admin import credentials, firestore

# Firebase 프로젝트의 서비스 계정 JSON 파일을 다운로드하고 사용 가능한 경로에 저장합니다.
cred = credentials.Certificate("path/to/your-serviceAccountKey.json")

# Firebase 앱 초기화
firebase_admin.initialize_app(cred)

# Firestore 클라이언트 생성
db = firestore.client()

def save_to_firestore(article_titles):
    try:
        for i, title in enumerate(article_titles, 1):
            data = {"title": title}
            # "articles" 컬렉션에 데이터 추가
            db.collection("articles").document(f"article{i}").set(data)
        print("Data saved to Firestore")
    except Exception as e:
        print("Error:", e)

if __name__ == '__main__':
    article_titles = [
        "기사 제목 1",
        "기사 제목 2",
        "기사 제목 3",
        # 크롤링한 기사 제목을 추가
    ]
    save_to_firestore(article_titles)

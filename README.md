# ALTO SAT Grammar 챕터 학습

ALTO SAT Grammar 교재(Reference·Lesson 1–12)를 챕터 순서대로 따라가며 개념을 읽고 퀴즈를 푸는 학습 웹앱입니다.

- **챕터형 구성**: 용어집·Reference A–F, Lesson 1–12의 개념 정리 + Practice·Cumulative 퀴즈 318문항
- **EN / 한국어 전환**: 한국어 모드에서는 설명·지시문만 한국어이고, 예문과 퀴즈 문장은 영어 그대로
- **진행 기록**: 읽음 표시, 퀴즈 점수, 오답노트가 브라우저(localStorage)에 저장됨
- 서버·빌드 없이 `index.html`만 열면 동작하는 정적 사이트

## 알아둘 점

- 교재에 정답지가 없어서 퀴즈 정답은 필기 답과 교재 규칙을 대조해 판정했습니다. 일부 문항(예: Practice 9A 1번, 11A 1번)은 확정이 아니며 해설에 표시해 두었습니다.
- 교재의 `PUNCT` 표기는 이 앱에서 `PUNC`로 통일했습니다.
- 교재 내용을 개인 학습용으로 정리한 것입니다.

## 구조

```
index.html        진입 페이지
css/style.css     스타일
js/app.js         라우팅·퀴즈·오답노트·언어 전환
data/chNN.js      챕터별 영어 원문 내용과 퀴즈
data/ko/chNN.js   한국어 설명(예문은 영어 유지)
```

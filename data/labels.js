/* 퀴즈 라벨(보기) 공통 설명 */
(function (D) {
  D.labels = {
    'OK': '오류 없음 — 문장이 올바름',
    'O': '올바름 (Practice 1C에서는 완전한 문장)',
    'F': 'Fragment — 독립절(IC)이 없는 불완전한 문장',
    'MOD': 'Modifier error — 수식어가 가까이 있는 엉뚱한 주어를 꾸밈(dangling modifier)',
    'FRAG': 'Fragment error — 독립절(IC)이 없어서 문장이 아님',
    'PUNC': 'Punctuation error — 콤마·세미콜론·콜론·대시 오류',
    'PUNCT': 'Punctuation error — 콤마·세미콜론·콜론·대시 오류',
    'SV': 'Subject–Verb agreement error — 주어와 동사의 수 불일치',
    'PR': 'Pronoun error — 대명사 오류(모호한 선행사, 격, who/whom, which 등)',
    'PL/PO': 'Plural/Possessive mix-up — 복수형과 소유격(\') 혼동',
    'VT': 'Verb Tense error — 시제 이동·부적절한 시제',
    'N#': 'Noun-number error — 같은 대상을 가리키는 두 명사의 단·복수 불일치',
    '//': 'Parallelism error — 병렬 구조 오류',
    '//ID': 'Parallelism idiom error — 병렬 관용구(both…and, not only…but also 등) 오류',
    'COMP': 'Logical comparison error — 비교 대상이 논리적으로 맞지 않음',
    'SUBJ': 'Subjunctive mood (MOOD) error — 가정법/요구·제안 동사 뒤 시제 오류',
    'CONJ': 'Conjunction/Transition error — 접속사·접속부사 쓰임 오류'
  };
})(window.SAT_DATA);

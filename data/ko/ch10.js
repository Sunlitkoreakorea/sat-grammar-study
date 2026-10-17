/* 한국어 설명 — Lesson 10. 예문(Ex)과 관용구 패턴은 영어 그대로. 0 = 그대로 */
(function (D) {
  D.ko['L10'] = {
    title: 'Lesson 10. 논리적 비교(Comparisons)',
    short: '비교',
    parts: {
      '10-1': {
        title: '10-1. 단순 비교',
        blocks: [
          '비교되는 두 명사는 <b>논리적으로 비교 가능</b>해야 한다. 다음 구조를 찾아보자:',
          0,
          'SAT는 <b>A</b>와 <b>B</b>를 찾기 어렵게 만들려고 수식어를 자주 덧붙인다:',
          0,
          '항목 <b>A</b>가 <b>Kayla</b>임을 찾고 항목 <b>B</b>를 올바르게 찾으면, 사람(<b>Kayla</b>)은 <b>Louis’s interest</b>가 아니라 다른 사람(<b>Louis</b>)과 비교해야 한다는 것이 쉽게 보인다. 두 번째 문장이 오류를 고친 것이다.'
        ]
      },
      '10-2': {
        title: '10-2. 동사 기반 비교',
        blocks: [
          '아래 비교 구조를 <b>외우고</b> SAT 문장에서 찾아내야 한다:',
          0,
          [
            '비교 구조가 보이면 먼저 <u>관용 구조에 오류가 없는지</u> 확인한다:',
            '관용 구조가 올바르면, 비교 앞부분의 <b>vb</b>를 이용해 항목 <b>A</b>를 찾는다. 항목 A는 그 동사의 주어이다.',
            '항목 A를 바탕으로 항목 B가 무엇이어야 하는지 예측한다. 잠시 멈추고 그 단어를 소리 내어 말해 보면 도움이 된다.',
            '항목 B는 두 번째 신호어(<b>than, as, to, with</b> 등) 바로 뒤에 있다.',
            '항목 B에 <b>that of</b>나 <b>those of</b> 같은 대명사가 있으면 <u>항목 A를 그 자리에 넣어</u> <b>문장 전체를 읽고</b> 비교 전체가 맞는지 확인한다.'
          ],
          0,
          { lines: ['Audiences seem to think that [<b>주어 / 항목 A:</b> the movie] [<b>동사:</b> is] better than [<b>항목 B:</b> that of most recent films].'] },
          '위 1~5단계를 따르기 전까지는 오류를 찾기 어렵다. 5단계에서 <b>that of</b>가 의도치 않은 중복을 만든다는 것을 보면 비교 오류를 찾을 수 있다: “<i>the movie is better than <u>the movie</u> of most recent films</i>.”',
          '<b>NOTE:</b> 출제 가능성은 낮지만 다음 비교 오류도 SAT에 나올 수 있다:',
          { tags: ['논리 오류', '올바름 — 자기 자신보다 더 뛰어날 수는 없다'] },
          'Tiger Woods 자신도 골퍼이므로 논리 오류를 고쳐야 한다(자기 자신보다 더 뛰어날 수는 없다).'
        ]
      },
      '10': {
        instr: '<b>PRACTICE 10:</b> 위의 필수 단계를 따르고 있음을 보이도록 문장에 표시한다. 문장에 <b>COMP</b> 또는 <b>OK</b> 라벨을 붙인다.'
      },
      'C110': {
        instr: '이전 Cumulative Practice 연습과 같은 지시를 따르고, 문장에 계속 풀이 과정을 표시한다. 줄에 <b>OK</b> 또는 발견한 오류에 해당하는 표기 <b>FRAG, MOD, PUNC, SV, PR, PL/PO, VT, N#, //</b>(<b>//ID</b> 포함), <b>COMP</b> 중 하나를 쓴다.'
      }
    }
  };
})(window.SAT_DATA);

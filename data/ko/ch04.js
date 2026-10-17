/* 한국어 설명 — Lesson 4. 예문(Ex)은 영어 그대로, 설명·지시문만 한국어. 0 = 그대로 */
(function (D) {
  D.ko['L4'] = {
    title: 'Lesson 4. 주어-동사 일치(S-V Agreement)',
    short: '주어-동사 일치',
    parts: {
      '4-1': {
        title: '4-1. 주어를 정확히 찾기',
        blocks: [
          'Lesson 1에서 배웠듯 <u>모든 명사가 주어는 아니다</u>. 첫 번째 명사가 대개 주어이지만, 그 N이 전치사구나 다른 수식어 안에 있으면 주어가 아니다. <b>S-V 오류</b>를 정확히 확인하려면 각 동사의 주어를 정확히 찾아야 하며, 수식어나 끼어드는 구에 현혹되어서는 안 된다:',
          0,
          'Ex1에서 <b>team</b>이 주어이고 단수 명사이므로 단수 동사 <b>has</b>가 맞다. 명사 <b>advisors</b>는 전치사(<b>of</b>) 뒤에 있으므로 목적어 명사다. <u>집합명사(collective nouns)</u>인 <b>team, class, couple</b> 등은 둘 이상의 사람이나 사물로 이루어진 집단을 가리키더라도 단수 형태라는 점도 기억하자. <b>어느 N이 주어인지는 의미가 아니라 문법 구조가 결정한다.</b> 다음 문장은 모두 올바르다:',
          0
        ]
      },
      '4-2': {
        title: '4-2. “AND” 문장 (복합 주어)',
        blocks: [
          '<span class="circ">AND</span>가 두 주어 명사를 이으면 <mark>복수 주어</mark>로 취급한다:',
          0,
          '<b>along with</b>나 <b>in addition to</b> 같은 구는 그냥 전치사일 뿐이다. 주어를 복수로 만들지 <b>못한다</b>:',
          0,
          '<span class="circ">AND</span>가 <u>두 S</u>를 잇는지 <u>두 O</u>를 잇는지 판단하려면 문맥을 살펴야 할 수 있다:',
          0,
          '위 두 문장은 모두 <b>N of N and N</b> 구조이지만, 첫 문장에서는 <b>and</b>가 <u>두 S</u>를, 둘째 문장에서는 <u>두 O</u>를 잇는다. <mark><b>and</b>가 어떻게 쓰였는지 보려면 문맥을 읽고 따져야 한다.</mark>'
        ]
      },
      '4-3': {
        title: '4-3. “OR” 문장 — (N)Either… (n)or',
        blocks: [
          '<b>OR</b>가 두 주어를 이을 때 — <mark>S or S / Either S or S / Neither S nor S</mark> — 에는 <u>동사에 <span class="circ">더 가까운</span> S만 본다</u>:',
          0,
          '<b>tools</b>도 주어 중 하나이지만, <b>S or S</b> 문장에서는 V를 <u>더 가까운 S</u>에만 맞춘다.'
        ]
      },
      '4-4': {
        title: '4-4. 도치문 (V가 S보다 먼저 올 때)',
        blocks: [
          0,
          '보통 S가 V 앞에 오지만, 일부 문장 구조에서는 그 순서가 뒤집힌다. <b>꼭 외우자!</b>',
          { tbl: { cells: [
            [0, 2, '<b>A:</b> V 앞에 there/here <small>(NOTE: <i>There</i>는 명사가 아니다 — 진짜 S는 V 뒤에 나옴)</small>'],
            [1, 2, '<b>B:</b> V 앞에 전치사구'],
            [2, 2, '<b>C:</b> V가 둘로 나뉘고 분사가 먼저 나옴'],
            [3, 2, '<b>D:</b> 도치된 비교'],
            [4, 2, '<b>E:</b> 부정어로 시작하는 절 — <small><i>Not only/since</i>, <i>Never before</i>, <i>Only after/when</i></small>'],
            [5, 2, '<b>F:</b> 의문문']
          ] } }
        ]
      },
      '4A': {
        instr: '<b>PRACTICE 4A:</b> 줄에 <b>OK</b> 또는 <b>SV</b>를 쓴다. SV 오류를 찾으면 S와 V에 <u>동그라미를 치고 선으로 연결</u>한다. 이 문장들은 규칙 4-1 ~ 4-4만 다룬다.'
      },
      '4-5': {
        title: '4-5. 불규칙 명사',
        blocks: [
          '4-5a. 불규칙 명사 암기',
          '<u>Reference E와 F</u>를 꼼꼼히 공부해서 <b>모든 불규칙 단수/복수 명사</b>를 알아 두자! (이 앱의 “용어집 & Reference” 챕터에서 확인)',
          0,
          '4-5b. A number… / the number…',
          'SAT에서는 이 두 구를 자주 시험한다 — <mark><b>the number</b>는 단수</mark>, <mark><b>a number</b>는 복수</mark>:',
          0,
          '4-5c. “The [형용사]”',
          '필자는 <b>the ADJ</b>로 <mark>그 ADJ한 사람들</mark>을 가리키기도 한다. 이 구는 <b>복수</b>로 취급한다:',
          0,
          '4-5d. 동명사(-ing 명사) 주어',
          '동명사 주어를 놓치고 실수로 그 목적어에 집중하기 쉽다. <mark>동명사는 단수</mark>임을 기억하자:',
          { lines: ['<u>Buying</u> stocks and bonds <b>is</b> risky. <span class="sm">NOTE: <i>Buying</i>이 주어이고, <i>stocks and bonds</i>는 목적어이다.</span>'] },
          '4-5e. 제목, 구, 회사 이름',
          '대문자 표기, 이탤릭, 따옴표는 필자가 <mark>단수인 회사나 예술 작품</mark> 등을 가리키고 있음을 알려 준다:',
          0
        ]
      },
      '4-6': {
        title: '4-6. 부정대명사 주어 (Reference F 참고)',
        blocks: [
          '4-6a. 대부분의 부정대명사는 단수이다',
          0,
          0,
          0,
          '4-6b. 다음 부정대명사는 항상 복수이다',
          0,
          0,
          '4-6c. 카멜레온 — 복수 목적어 명사 앞에서는 복수, 단수 명사 앞에서는 단수',
          '다음 부정대명사(그리고 <b>분수</b>와 <b>퍼센트</b>)는 <b>카멜레온</b>과 같다:',
          0,
          0,
          '<b>NOTE:</b> <b>none</b>과 <b>a majority</b>는 걱정하지 않아도 된다. 처리 방식에 의견이 갈려서 SAT는 이를 출제하지 않는다. 또한 <b>관계대명사(that/which/who(m))</b>도 카멜레온과 조금 비슷하게 행동한다. 자세한 내용은 <b>Reference D</b> 참고.'
        ]
      },
      '4B': {
        instr: '<b>PRACTICE 4B:</b> 다음 문제는 규칙 4-5, 4-6의 불규칙 명사를 다룬다. <b>Reference E &amp; F</b>를 공부하자!'
      },
      '4C': {
        instr: '<b>PRACTICE 4C:</b> 위와 같은 지시를 따른다. 이 문장들은 <b>Lesson 4의 모든 규칙</b>을 다룬다.'
      },
      'C14': {
        instr: '이전 Cumulative Practice 연습과 같은 지시를 따르고, 문장의 어디에 오류가 있는지 계속 표시한다. 줄에 <b>OK</b> 또는 발견한 오류에 해당하는 표기 <b>FRAG, MOD, PUNC, SV</b> 중 하나를 쓴다.'
      }
    }
  };
})(window.SAT_DATA);

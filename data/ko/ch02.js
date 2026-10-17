/* 한국어 설명 — Lesson 2. 예문(Ex)은 영어 그대로, 설명·지시문만 한국어. 0 = 그대로 */
(function (D) {
  D.ko['L2'] = {
    title: 'Lesson 2. 수식어(Modifiers)',
    short: '수식어',
    parts: {
      '2-1': {
        title: '2-1. 수식어는 바로 옆에 오는 절의 S를 설명한다',
        blocks: [
          '<b>수식어(Modifiers)</b>는 <b>S</b>나 <b>V</b>가 없는 단어 묶음이다. <i>-ing</i> 분사(<b>walking home from school</b>)나 부정사(<b>in order to get home</b>) 같은 동작어를 포함할 수는 있지만, <u>동사는 포함하지 않는다</u>.',
          { tags: ['절(clause) — 주어: I, 동사: was walking home', '수식어(modifier) — walking은 동사가 아니고, home은 주어가 아니라 목적어이다'] },
          '<u>수식어는 바로 옆에 오는 절의 <b>S</b>를 설명해야 한다.</u> <mark>수식어 오류(dangling modifier)</mark>는 SAT의 오류 유형으로, 수식어가 바로 옆에 놓인 S를 제대로 설명하지 못할 때 생긴다:',
          { tags: ['오류', '올바름'] },
          ['<b>오류:</b> 수식어 <i>While walking home</i>은 실제로 걸을 수 있는 대상을 설명해야 한다. (필기: 뒤에 오는 S는 walking 하는 대상이어야 함 → “the sun”은 걸을 수 없다.)', '<b>올바름:</b> 문장에 수식어가 더 이상 없으므로 수식어 오류가 생길 수 없다.'],
          0,
          '<b>중요!</b> Ex2에서 보듯, <u>SAT의 모든 문장은 시작 부분을 확인해야 한다</u>: <mark>수식어로 시작하는가, 절로 시작하는가?</mark> 절로 시작하면 뒤따르는 주어는 안심하고 무시해도 된다. 하지만 문장이 수식어로 시작한다면 <u>뒤따르는 절의 주어 명사를 <i>반드시</i> 확인해야 한다!</u>'
        ]
      },
      '2A': {
        instr: '<b>PRACTICE 2A:</b> 모든 수식어에 <u>밑줄</u>을 긋는다. 그다음 그 수식어가 설명하는 S에 동그라미를 치고 둘을 선으로 잇는다. 수식어가 올바르게 쓰였으면 줄에 <b>O</b>를 쓴다. 수식어가 주어를 잘못 설명하면 줄에 <b>MOD</b>를 쓰고 그 주어에 X 표시를 한다. 수식어가 없는 문장은 밑줄이나 선을 긋지 말고 <b>O</b>만 쓴다.'
      },
      '2-2': {
        title: '2-2. “fake beginning” 뒤나 문장 뒤쪽에 숨은 수식어',
        blocks: [
          '원래는 단순한 문장도 SAT에서는 “<b>fake beginning</b>(가짜 시작)”, 즉 <i>I hope that, Mike believes that,</i> <i>The newspapers recently reported that…</i> 같은 도입 구가 붙어 <b>더 복잡해지는</b> 경우가 많다.',
          'SAT 문제를 풀 때는 항상 fake beginning이 있는지 확인하고, 있으면 <u>단어 <b>that</b> 뒤에 슬래시를 긋는다</u>. 그런 다음 2-1에서 배운 대로, 뒤따르는 “진짜 시작(real beginning)”에서 수식어 오류가 있는지 확인한다:',
          { tags: ['수식어(MOD) 오류'] },
          '마찬가지로 SAT 문장에는 <u>IC가 둘 이상</u> 들어 있는 경우가 많다. 문장이 두 부분(세미콜론이나 FANBOYS 접속사로 나뉨 — Lesson 3 참고)으로 되어 있으면, <u>양쪽 모두</u> 수식어 오류가 없는지 확인해야 한다:',
          { tags: ['올바름', '수식어(MOD) 오류'] },
          0
        ]
      },
      '2B': {
        instr: '<b>PRACTICE 2B:</b> Practice 2A의 지시를 따른다. 단, 보이는 fake beginning을 표시하고, 위 Ex4 같은 구조를 찾아본다.'
      },
      '2-3': {
        title: '2-3. “IC, MOD” 문장 속 수식어',
        blocks: [
          '많은 학생이 “<i>–ing</i> MOD, IC” 문장은 알지만, 순서를 뒤집으면 틀렸다고 생각한다. <b>“IC, –ing MOD”</b> 문장도 <u>–ing 수식어가 IC의 S를 올바르게 설명하기만 하면</u> 괜찮다.',
          0,
          { tags: ['올바름', '올바름', '올바름', '수식어(MOD) 오류', '수식어(MOD) 오류'] },
          [
            '<b>exhausted</b>는 동사가 아니라 분사이며, <b>children</b>을 올바르게 설명한다.',
            '<mark class="o">수식어가 <b>before, after, if, while, when</b>으로 시작하면 <b>콤마를 생략</b>한다는 점도 기억하자.</mark>',
            '<b>수식어 오류:</b> legs는 정상에 도달할 수 없다. &nbsp;·&nbsp; <b>수식어 오류:</b> head는 숙제를 할 수 없다.'
          ]
        ]
      },
      '2C': {
        instr: '<b>PRACTICE 2C:</b> Practice 2A·2B와 같은 지시를 따른다. 이번에는 <b>IC 뒤에 오는 수식어</b>를 찾는다.'
      },
      'C12': {
        instr: '아래 문장 중 일부는 <b>수식어(modifier)</b> 또는 <b>문장 조각(fragment)</b> 오류를 포함한다. 줄에 <b>MOD</b>, <b>FRAG</b>, <b>OK</b> 중 알맞은 것을 쓴다. <u>MOD 오류가 보이면 앞선 연습처럼 풀이 과정을 표시해야 한다</u>: 수식어와, 그것이 제대로 설명하지 못하는 S를 선으로 연결한다. 틀린 문장을 고칠 필요는 없다. <b><u>fake beginning</u></b>에 주의하자!'
      },
      tree: {
        title: 'Decision Tree: 수식어(MODIFIER)·문장 조각(FRAGMENT) 오류 찾기',
        blocks: [0, 0]
      }
    }
  };
})(window.SAT_DATA);

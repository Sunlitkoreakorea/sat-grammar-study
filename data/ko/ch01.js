/* 한국어 설명 — Lesson 1. 예문(Ex)은 영어 그대로, 설명·지시문만 한국어. blocks[i]는 영어 blocks[i]에 대응. 0 = 그대로 */
(function (D) {
  D.ko['L1'] = {
    title: 'Lesson 1. 명사, 동사, 그리고 절',
    short: '명사·동사·절',
    parts: {
      '1-1': {
        title: '1-1. 모든 명사는 주어 또는 목적어이다',
        blocks: [
          'DSAT 문법 문제는 중간에 끼어드는 부분이 많은 긴 문장으로 이루어져 있다. 먼저 <u>주어 명사(subject)</u>와 <u>동사(verb)</u>를 정확히 찾는 법부터 익히면, 아무리 긴 문장도 다룰 수 있다.',
          '1-1a. 주어(Subjects)',
          '<u>주어</u>(대개 문장의 첫 번째 명사)는 동사와 연결되어 있다. <u>행동 동사를 하는 사람/사물</u>이거나, <u>설명 동사가 설명하는 명사</u>이기 때문이다:',
          { lines: [
            '<b>행동 동사의 주어:</b> &nbsp;<u>Tom</u> loves spaghetti. &nbsp;·&nbsp; <u>That dog</u> barks all day long.',
            '<b>설명 동사의 주어:</b> &nbsp;<u>The job</u> was finished by Amy. &nbsp;·&nbsp; <u>Running</u> feels good.'
          ] },
          '<b><i>love</i>나 <i>visit</i> 같은 행동 동사</b>가 있는 문장에서 주어는 그 <i>love</i>·<i>visit</i> 동작을 <u>하는 사람(또는 동물)</u>이다. 그런데 이 “능동태” 동사를 “수동태” 설명 형태(<u>is loved</u>, <u>was visited</u>)로 바꾸면, 주어 명사는 사랑하거나 방문하는 사람/동물이 <b>아니다</b>. 대신 주어는 <u>사랑받는(being loved)</u> 것, <u>방문되는(being visited)</u> 것이다:',
          { lines: [
            '<b>행동 동사(능동):</b> &nbsp;<u>My family</u> loved this movie. &nbsp;·&nbsp; <u>We</u> visit the bay every year.',
            '<b>설명 동사(수동):</b> &nbsp;<u>This movie</u> is loved by my family. &nbsp;·&nbsp; <u>The bay</u> is visited every year.'
          ] },
          '1-1b. 목적어 명사(Object nouns)',
          '명사가 <b>목적어</b>인 경우는 (1) 동사(또는 다른 동작어)의 <u>동작을 받는</u> 명사이거나, <span class="bx">(2) 전치사 바로 뒤에 오는 명사</span>일 때이다. (전치사 목록은 <b>Reference A</b> 참고!)',
          { lines: [
            '<mark class="o">(1) 동작을 받는 목적어:</mark> &nbsp;Tom loves <u>spaghetti</u>. &nbsp;·&nbsp; Solving <u>math problems</u> all day is tedious.',
            '<mark class="o">(2) 전치사의 목적어:</mark> &nbsp;Sam runs at <u>the gym</u> next to <u>his house</u>. &nbsp;·&nbsp; Each of <u>the boys</u> slept soundly.'
          ] },
          '1-1c. 찾기 어려운 주어',
          0,
          '문법을 모르는 학생들은 <i>club members</i>를 주어 명사라고 생각한다. 아니다! 앞에서 배웠듯 전치사(<i>of</i> 등) 뒤의 명사는 <u>목적어</u>다. 이 문장의 첫 번째 주어 명사는 <b>All</b>이다. <i>all</i>은 명사처럼 <i>느껴지지</i> 않아서 주어로 알아보기 어렵지만, 여기서는 명사다. <b>Reference F</b>로 돌아가 <i>each</i> 같은 여러 <b>부정대명사(indefinite pronouns)</b>를 확인해 두자. (<b>All</b>이 <i>항상</i> 명사인 것은 아니지만, 이 예문에서는 명사다.)',
          '두 번째로 찾기 어려운 주어는 <b>who</b>다. 이 단어도 명사 같지 않지만 명사다(<b>관계대명사</b>). 행동 동사 <i>arrive</i>의 주어이다. 아래 연습 문제를 풀기 전에 <b>Reference D</b> 맨 아래에서 <b>who, that, which</b> 같은 단어가 <b>관계절(relative clause)</b>의 주어로 쓰이는 방식을 읽어 두자.',
          0
        ]
      },
      '1A': {
        instr: '<b>PRACTICE 1A:</b> 모든 명사를 찾아 구분한다. 모든 <u>주어 명사에는 밑줄</u>을 긋고, 모든 <s>목적어 명사에는 취소선</s>을 긋는다.'
      },
      '1-2': {
        title: '1-2. 진짜 동사와 동사가 아닌 동작어',
        blocks: [
          '1-2a. 동사는 여러 단어로 이루어질 때가 많다',
          'has been working, would eat, is opening, may be done… 동사는 다른 단어가 중간에 끼어들어 끊기는 경우도 많다: <b>Was</b> Sal <b>able to finish</b> his work? He <b>has</b> already <b>spent</b> a week on it.',
          '1-2b. 항상 동사인 단어',
          { box: ['<b>is/are/am/was/were, has/have, can/could, may/might, will/would</b>는 <u>언제나</u> 동사 단어이다'] },
          '<b>Has</b>나 <b>is</b>는 동사 전체일 수도 있고, 긴 동사의 첫 부분일 수도 있다: The house <b>is</b> old. She <b>has finished</b> the job.',
          '1-2c. 절대 동사가 아닌 것',
          ['<b>부정사(infinitive)와 -ing 단어</b>는 <u>절대</u> 동사가 아니다:'],
          '<b>부정사</b>(to + 동사원형, 예: <b>to finish</b>, <b>to be</b>)는 동사의 일부가 될 수는 있지만 그 자체로는 동사가 아니다.',
          '<i>–ing</i> 단어는 <b>동사의 일부</b>가 될 수는 있어도 혼자서는 절대 동사가 아니다! -ing 단어는 형용사, 동명사(gerund), 또는 긴 동사의 일부(현재분사)일 수 있지만, 혼자서 동사가 되는 일은 없다.',
          { tags: ['형용사 — 동사가 아님!', '동명사(-ing 명사) — 동사가 아님!', null] },
          '1-2d. -ed로 끝나는 단어',
          ['<b>-ed 단어</b>는 문맥에 따라 동사일 <u>수도 있다</u>:'],
          '<i>–ed</i> 단어는 왼쪽의 주어 명사가 그 <i>–ed</i> 동작을 <u>했을 때만</u> 동사다:',
          0,
          0
        ]
      },
      '1B': {
        instr: '<b>PRACTICE 1B:</b> 주어 단어(들)에 <u>밑줄</u>을 긋는다. 그다음 동사(들)에 <span class="circ">동그라미</span>를 치고, 둘을 선으로 연결한다. <b>중요!</b> 동사는 여러 단어로 이루어질 수 있고, 한 명사가 둘 이상의 동사의 주어가 될 수 있다. 동사의 일부나 추가 동사를 놓치지 않도록 문장 전체를 끝까지 읽어야 한다!'
      },
      '1-3': {
        title: '1-3. 독립절, 종속절, 그리고 문장 조각(fragment) 오류',
        blocks: [
          '<mark class="o"><b>절(clause)</b>이란 연결된 <u>S + V</u>이다.</mark> (S와 V가 없는 구는 절이 아니라 <b>수식어(modifier)</b>이다 — 2-1 참고.)',
          '1-3a. 독립절(Independent clause, IC)',
          '<u>독립절(IC)</u>은 그 자체로 완전한 문장이다. <mark>모든 문장에는 적어도 하나의 IC가 있다.</mark> 문장을 쓰려 했는데 완전한 독립절이 하나도 없으면 <b><u>문장 조각(fragment)</u> 오류</b>다. <mark><i>sentence fragment</i>는 문장의 일부라는 뜻이 아니라 “불완전한 문장”을 달리 부르는 말이다.</mark>',
          { tags: ['문장 조각(fragment) 오류!', '올바름 — 고친 문장', '올바름 — 또 다른 고침'] },
          '1-3b. 기본적인 종속절(Dependent clause)',
          'IC는 S와 V만으로 충분하지만, <mark><u>종속절(DC)</u>은 항상 <b>3가지 요소</b>를 갖는다: <u>Reference D의 단어/구, S, V</u>.</mark> IC를 DC로 바꿔 주는 단어(<i>although, because, which</i> 등) 목록은 Ref D를 보자.',
          0,
          '1-3c. 심화 종속절: 관계절과 명사절',
          '<u>관계절(relative clause)</u>은 종속절의 한 종류로, 앞에 나온 명사를 설명한다. 문장 어디에든 끼어들 수 있다. (자세한 내용과 예문은 <b>Reference D</b> 맨 아래 참고.)',
          0,
          '위 예문에서 <b>관계절</b>은 명사 <i>truck</i>을 설명한다.',
          '<u>명사절(noun clause)</u>은 또 다른 종류의 종속절이다. 관계절은 명사를 <i>설명</i>하지만, <b>명사절</b>은 그 자체가 명사<i>이다</i>. 일반 명사처럼 <b>명사절</b>도 주어나 목적어 역할을 한다:',
          0,
          'IC₁에서는 일반 명사 대신 <b>명사절</b>이 <b>주어</b>로 쓰였다. 비슷한 뜻을 일반 명사(Picasso’s brilliance)나 명사+관계절(The fact that Picasso was a visionary)로도 표현할 수 있지만, 이 문장의 필자는 <i>That Picasso…</i>의 격식 있는 문체를 택한 것이다. 이제 명사절이 <b>목적어</b>로 쓰이는 경우를 보자:',
          0,
          '첫 번째 문장은 일반 명사 <u>the location</u> of the lost tomb을 목적어로 썼다. 두 번째 문장은 <b>명사절</b> <b>whether the tomb belonged to a king or a commoner</b>를 목적어 명사로 썼다.',
          0
        ]
      },
      '1C': {
        instr: '<b>PRACTICE 1C:</b> 각 문장이 완전한 문장이면 <b>O</b>, 문장 조각(fragment)이면 <b>F</b>를 고른다.'
      }
    }
  };
})(window.SAT_DATA);

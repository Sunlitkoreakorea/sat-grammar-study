/* 한국어 설명 — Lesson 5. 예문(Ex)은 영어 그대로, 설명·지시문·의사결정 트리만 한국어. 0 = 그대로 */
(function (D) {
  D.ko['L5'] = {
    title: 'Lesson 5. 대명사(Pronouns)',
    short: '대명사',
    parts: {
      '5-1': {
        title: '5-1. 모호한 대명사: it, they, he, she',
        blocks: [
          '<b>It, they, he, she</b>는 글로 쓰인 <b>선행사(antecedent)</b>(대명사가 대신하는 원래 명사)가 <b>정확히 하나</b>여야 한다. 문장에서 이 네 대명사가 보이면 아래 의사결정 트리로 올바르게 쓰였는지 확인한다:',
          { tree: { title: '<b>의사결정 트리</b> — it/its* 테스트', root: {
            q: '<b>it* 또는 its*가 보이는가?</b>',
            b: [['YES', {
              q: '이 문장(또는 앞 문장)에 <b>단수이면서 사람이 아닌 명사</b>가 있는가?',
              b: [
                ['YES', {
                  q: '<b>it</b>(또는 테스트 중인 대명사)을 <u>처음 찾은 단수·비인간 명사</u>로 바꿔 넣고 <b>문장 전체를 읽는다</b>. 가능한 모든 선행사로 이 단계를 반복한다. <b>문맥에 맞는 선행사는 몇 개인가?</b>',
                  b: [
                    ['ZERO', '!<b>대명사 오류!</b> 모든 대명사에는 글로 쓰인 명사 선행사가 필요하다.'],
                    ['ONE', '+<b>올바른 대명사.</b> 올바르게 쓰인 대명사는 글로 쓰인 선행사가 정확히 하나다.'],
                    ['TWO or more', '!<b>대명사 오류!</b> 올바르게 쓰인 대명사는 가능한 선행사가 둘 이상이면 안 된다. 단, <u>서로 다른 두 명사가 같은 대상을 가리키는 경우</u>는 예외: <i>A fierce predator, the lion can catch its prey even after a long chase.</i> (predator와 lion이 둘 다 맞지만 같은 대상 → 올바름.)']
                  ]
                }],
                ['NO', '!<b>대명사 오류!</b> — 단, 다음 관용 구문은 예외: <i>it is [ADJ] [infinitive]</i> · <i>make it [ADJ]</i> · <i>regard it as [adj]…</i><br><small>예: It is hard to see at night. · Alcohol makes it hard to drive. · It isn’t easy to make it in sports. · Some regard it as pointless…</small>']
              ]
            }]]
          } } },
          '<b>*</b> <b>they/them/their/theirs</b>가 보이면 위와 같은 단계를 따르되, 단수·비인간 명사 대신 <u>모든 복수 명사</u>를 찾는다. 마찬가지로 <b>he/she/him/her/his/hers</b>가 보이면 같은 단계를 따르되 <u>단수 사람</u>을 찾는다.',
          0,
          '위 Ex 1을 의사결정 트리로 확인하면, 문장에 <b>복수 명사가 없다</b>는 것을 곧바로 알 수 있다. <i>them</i>을 <b>the animal, the species</b> 또는 <b>crocodiles</b>로 바꾸면 오류가 고쳐진다. 반면 <i>them</i>을 <i>it</i>으로 바꾼다고 오류가 고쳐지지는 <u>않는다</u>. <i>it</i>을 테스트해 봐도 맞는 단수 명사가 없기 때문이다. (<b>crocodile</b>은 이 문장에서 명사가 아니라 형용사로 쓰였다는 점에 주의!)',
          '필자가 무엇을 말하려는지 분명해 보여도, 선행사는 암시가 아니라 <b>글로 쓰여</b> 있어야 한다:',
          0,
          '의사결정 트리는 가정 없이 대명사를 엄밀하게 테스트하도록 도와준다:',
          0,
          '<b>NOTE</b> 아래 문장에서는 대명사를 테스트할 때 <b>의도된 의미</b>와 <b>문법적 맥락</b>을 모두 살피지 않으면 의사결정 트리가 실패한 것처럼 보일 수 있다:',
          0,
          '<b>pillows</b>가 대명사 <i>their</i>의 의도된 선행사라고 가정하더라도, 단수 주어 <b>Each</b>와 단수 동사 <b>has</b>에 맞춰 <b>단수 대명사 <i>its</i></b>를 써야 한다.'
        ]
      },
      '5-2': {
        title: '5-2. where, when, which의 잘못된 쓰임',
        blocks: [
          '5-2a. 장소에는 where, 시간에는 when',
          '(특히 <b>is where / is when</b>이 들어간 문장에서).',
          0,
          '위 Ex 5에서는 영화 장면이 실제 장소가 아니기 때문에 대명사 <b>where</b>를 고쳐야 한다.',
          0,
          '마찬가지로 <b>birdie</b>는 시간이 아니므로 위 Ex 6은 고쳐 써야 한다. 가능한 수정은 다음과 같다:',
          0,
          '5-2b. 사람에게는 절대 which를 쓰지 않는다',
          0,
          '<b>NOTE:</b> <b>Whose</b>는 <b>which</b>와 <b>who</b>의 소유격이다. 따라서 <b>whose</b>는 사물에도 <u>사람</u>에도 쓸 수 있다:',
          0
        ]
      },
      '5-3': {
        title: '5-3. 지나치게 넓은 “…, which”',
        blocks: [
          '대명사 <b>which</b>는 앞에 나온 구 안에 있는 <u>구체적인 비인간 명사</u>(단수 또는 복수)를 가리켜야 한다. “<b>…, which</b>”가 올바른지 아래 의사결정 트리로 확인한다:',
          { tree: { title: '<b>의사결정 트리</b> — “…, which” 테스트', root: {
            q: '<b>“…, which”가 보이는가?</b>',
            b: [['YES', {
              q: '콤마 앞 “…” 부분에 <b>사람이 아닌 명사</b>가 있는가?',
              b: [
                ['NO', '!문장이 <b>틀렸다</b>. <b>Which</b>는 문맥상 알맞은, 분명한 비인간 선행사를 대신해야 한다.'],
                ['YES', {
                  q: '가장 가까운 비인간 <b>N</b>을 <i>which</i> 자리에 넣고 <b>문장을 읽는다</b>. 문맥에 집중하고, 문법적 어색함이나 중복은 무시한다. <b>그 N(또는 비인간 N 중 하나)이 필자가 의도한 뜻을 나타내는가?</b>',
                  b: [
                    ['YES', '+<b>which</b>가 올바르게 쓰였다.'],
                    ['NO', '!문장이 <b>틀렸다</b>. Which는 문맥상 알맞은, 분명한 비인간 선행사를 대신해야 한다.']
                  ]
                }]
              ]
            }]]
          } } },
          '이 예문은 위 의사결정 트리 테스트를 통과하지 못한다:',
          { tags: ['테스트 실패'] },
          '다음과 같이 여러 방식으로 고칠 수 있다:',
          [
            'Francis’s parents divorced when she was young, <b>teaching</b> her to be cynical about marriage.',
            '<mark>Francis’s parents divorced when she was young, <b>an experience that</b> taught her to be cynical…</mark> <span class="tag">대개 정답</span>',
            'Francis’s parents divorced when she was young, <b>and now</b> she is cynical about marriage.'
          ],
          '<b>NOTE:</b> 처음 두 가지 수정 방식은 많은 학생에게 문법이 낯설어서 SAT에 자주 나온다.'
        ]
      },
      '5A': {
        instr: '<b>PRACTICE 5A:</b> 줄에 <b>OK</b> 또는 <b>PR</b>을 쓴다. 잘못된 대명사에는 <span class="circ">동그라미</span>를 친다. 이 문장들은 규칙 5-1 ~ 5-3만 다룬다. 찾은 대명사 오류(또는 그와 관련된 다른 오류)를 고칠 필요는 없다.'
      },
      '5-4': {
        title: '5-4. 대명사의 격, who vs. whom, 부분집합 문장',
        blocks: [
          '5-4a. 주격 대명사 vs. 목적격 대명사',
          { tbl: { cells: [
            [0, 0, '<b>주격</b> — 단수'],
            [1, 0, '<b>주격</b> — 복수'],
            [2, 0, '<b>목적격</b> — 단수'],
            [3, 0, '<b>목적격</b> — 복수']
          ] } },
          '대명사가 선행사 바로 옆에서 강조를 위해 쓰이기도 한다:',
          { lines: ['<s>Us</s> <b>We</b> teenagers often feel misunderstood. <span class="sm">→ 주격 <b>We</b>가 필요하다 (S <i>teenagers</i>를 가리킨다).</span>'] },
          '대명사가 어떻게 쓰였는지 살펴서 주격(S)이 필요한지 목적격(O)이 필요한지 판단해야 할 때도 있다:',
          { lines: ['Everyone except <s>I</s> <b>me</b> was sad to leave. <span class="sm">→ <i>except</i>는 전치사이므로 목적격 <b>me</b>가 필요하다.</span>'] },
          'SAT의 대명사 격 오류는 대부분 <span class="bx">X and [PRN]</span> 또는 <span class="bx">[PRN] and X</span> 형태의 문장에 나온다. 이런 문장에서는 <b>대명사만 따로 읽어</b> 주격이 필요한지 목적격이 필요한지 판단한다:',
          0,
          '5-4b. “Who 테스트”: who와 whom 구별하기',
          '<mark><b>Who</b>는 주격, <b>whom</b>은 목적격이다.</mark> 다음 단계로 어느 쪽이 필요한지 판단한다:',
          [
            '<b>who/whom</b> 앞에 있는 단어는 모두 무시한다.',
            'who/whom 절을 나머지 문장과 분리한다. 즉 who/whom 절이 어디서 끝나는지 정한다(주절이 다시 이어지는 곳). <i>The professor</i> <span class="bx">who I spoke with</span> <i>was surprised that I would ask such an elementary question.</i>',
            '분리한 who/whom 절만 보고, <u>첫 단어(who 또는 whom)를 주격 대명사 <b>they</b> 또는 <b>he</b>로 바꿔 본다</u>. 절이 문법적으로 말이 되면 주격이 필요하다는 뜻이므로 <u>who</u>가 맞다. 말이 되지 않으면(위 상자의 예처럼 “he I spoke with”) <u>whom</u>이 필요하다.'
          ],
          '<b>WARNING:</b> <b>whom</b>이 맞는지 테스트하려 하지 말 것! 위에 설명한 <b>who</b> 테스트만 그대로 사용한다.',
          { tags: ['“He/they you choose”는 테스트 실패.', '“He comes to the reception”은 OK.'] },
          '5-4c. “부분집합(Subset)” 문장',
          0,
          '<b>부분집합 문장</b>에는 Who 테스트를 쓰지 <b>말 것</b>! 이 구조는 특별한 예외이고 SAT에 자주 나온다. Who 테스트는 부분집합 문장에서 통하지 않으니 아래 <u>패턴을 외우자</u>:',
          ['<b>집합/부분집합 패턴:</b> … [복수 N]…, <u>S of which/whom</u> [vb]'],
          0,
          '<b>NOTE:</b> 부분집합 부분은 <b>종속절</b>(관계절)이다. S 자리에는 분수/숫자나 부정대명사(예: <b>all, some, none</b>; 규칙 4-6 참고)를 쓸 수 있다. <b>who / whose는 쓰지 않는다 — of whom / of which.</b>'
        ]
      },
      '5B': {
        instr: '<b>PRACTICE 5B:</b> 줄에 <b>OK</b> 또는 <b>PR</b>을 쓴다. 잘못된 대명사에는 <span class="circ">동그라미</span>를 친다. 이 문장들은 이 페이지에서 다룬 규칙만 다룬다. 찾은 대명사 오류를 고칠 필요는 없다.'
      },
      '5-5': {
        title: '5-5 ~ 5-7. 대명사 시프트, 재귀대명사, 지나치게 넓은 this/these/those',
        blocks: [
          0,
          '5-5. 대명사 시프트(Pronoun shifts)',
          '<b>you</b>에서 <b>one</b>으로, <b>they</b>에서 <b>you</b>로, 또는 특정한 종류의 사람에서 <b>one</b>으로 바꾸지 않는다.',
          0,
          '5-6. 재귀대명사(Reflexive pronouns)',
          '<b>재귀대명사</b>는 <u>S와 O가 같은 대상/사람일 때 목적어 자리</u>에 쓴다:',
          0,
          '<b>NOTE:</b> 재귀대명사는 다른 명사를 강조할 때도 쓰인다. (SAT는 이 용법을 직접 시험하지 않는다.)',
          0,
          '5-7. 지나치게 넓은 this, these, those',
          '구어체 영어에서는 손가락으로 가리키거나 맥락으로 뜻이 분명해서 <b>this</b>를 혼자 쓰는 경우가 많다. 하지만 글에서는 <mark>대명사 this/these/those 뒤에 항상 <b>명사</b>를 써야 한다</mark>:',
          { lines: ['As time passed, crime increased, and city dwellers were forced to accept <s>this</s> <b>this situation</b>. <span class="sm">(여기에 <i>problem</i>이나 <i>situation</i>을 넣는다)</span>'] }
        ]
      },
      '5C': {
        instr: '<b>PRACTICE 5C:</b> 5A·5B와 같은 지시를 따른다. 이 문장들은 이 페이지의 규칙만 다룬다.'
      },
      '5D': {
        instr: '<b>PRACTICE 5D:</b> 다음 문제는 Lesson 5에서 다룬 모든 대명사 규칙을 포함한다.'
      },
      'C15': {
        instr: '이전 Cumulative Practice 연습과 같은 지시를 따르고, 문장의 어디에 오류가 있는지 계속 표시한다. 줄에 <b>OK</b> 또는 발견한 오류에 해당하는 표기 <b>FRAG, MOD, PUNC, SV, PR</b> 중 하나를 쓴다.'
      }
    }
  };
})(window.SAT_DATA);

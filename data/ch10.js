/* Lesson 10. Logical comparisons (교재 pp.32–33) */
(function (D) {
  var NOTE_KEY = '※ 교재 정답지는 사진에 없어서, 손필기 답과 규칙(10-1, 10-2)을 함께 대조해 정리한 답이에요.';

  D.chapters.push({
    id: 'L10', order: 10, no: 'L10', short: 'Comparisons', title: 'Lesson 10. Logical comparisons',
    ko: '비교 대상은 논리적으로 같은 종류여야 한다 — Like A, B / A [vb] -er than B / than any other',
    parts: [
      {
        kind: 'learn', id: '10-1', short: '10-1 단순 비교', title: '10-1. Simple comparisons', page: 'p.32',
        ko: 'Like/Unlike A, B… 구조에서 A와 B는 논리적으로 같은 종류(사람↔사람)여야 한다. 수식어(an expert potter)에 속지 말고 A를 정확히 찾기.',
        blocks: [
          'Two nouns in a comparison must be <b>logically comparable</b>. Look for these structures:',
          { box: [ '<b>[un]like</b> A, B… &nbsp;·&nbsp; A, <b>[un]like</b> B, … &nbsp;·&nbsp; <b>Compared to</b> A, B… &nbsp;·&nbsp; <b>In contrast to</b> A, B… &nbsp;·&nbsp; A, <b>in contrast to</b> B,…' ] },
          'The SAT often adds a modifier to make it harder to identify <b>A</b> and <b>B</b>:',
          { ex: 'Ex1', lines: [
            ['Like <u>Kayla</u>, an expert potter, <u>Louis’s interest</u> in art is great.', 'COMP ERROR — 사람(Kayla)과 관심(interest) 비교', 'err'],
            ['Like <u>Kayla</u>, an expert potter, <u>Louis</u> is interested in art.', 'OK — 사람 ↔ 사람', 'ok']
          ] },
          'When we can identify item <b>A</b> as <b>Kayla</b> and correctly identify item <b>B</b>, it’s easy to see that a person (<b>Kayla</b>) should be compared to another person (<b>Louis</b>), not <b>Louis’s interest</b>. The second sentence corrects the error.'
        ]
      },
      {
        kind: 'learn', id: '10-2', short: '10-2 동사 비교', title: '10-2. Verb-based comparisons', page: 'p.32',
        ko: '관용구 → 맞는지 먼저 확인 → 동사 앞이 A(주어) → B 예측 → 두 번째 신호어(than/as/to/with) 바로 뒤가 B → that of/those of는 A를 넣어 읽기. “than any golfer” → “than any other golfer”.',
        blocks: [
          'You must <b>memorize</b> and hunt in SAT sentences for the comparison structures below:',
          { table: { head: ['', '', ''], rows: [
            ['A [vb] <b>–er than</b> B', 'A [vb] <b>superior / similar to</b> B', 'A <b>differs from</b> B'],
            ['A [vb] <b>as [adj/adv] as</b> B', 'A [vb] <b>equal / equivalent to</b> B', 'A [vb] <b>the same as</b> B'],
            ['A [vb] <b>comparable to</b> B', 'A [vb] <b>consistent with</b> B', 'A <b>numbers</b> [x times] B']
          ] } },
          { list: [
            'When you see one, first, <u>check the idiom structure for errors</u>:',
            'If the idiom structure is correct, use the <b>vb</b> at the beginning of the comparison to help you identify item <b>A</b>. Item A is the subject of that verb.',
            'Based on item A, make a prediction for what item B should be. It’s useful to pause and say the word aloud.',
            'Item B is located right after the second signal word (<b>than, as, to, with,</b> etc).',
            'If item B contains a pronoun like <b>that of</b> or <b>those of</b>, <u>plug in item A</u> and <b>read the whole sentence</b> to make sure the whole comparison is correct.'
          ], ol: true },
          { ex: 'Ex2', lines: [
            ['My old phone was much cheaper <s>compared to</s> <b>than</b> my new phone.', '(1) 관용구: cheaper than', 'ok'],
            ['This neighborhood is similar <s>with</s> <b>to</b> my old neighborhood in Minnesota.', '(1) 관용구: similar to', 'ok']
          ] },
          { ex: 'Ex3', lines: [ 'Audiences seem to think that [<b>SUB / item A:</b> the movie] [<b>VB:</b> is] better than [<b>item B:</b> that of most recent films].' ] },
          'It’s hard to detect the error until we follow steps 1–5 above. In step 5, we find the comparison error when we see how the phrase <b>that of</b> creates unintended redundancy: “<i>the movie is better than <u>the movie</u> of most recent films</i>.”',
          { note: '<b>NOTE:</b> Although less unlikely, this comparison error may appear on the SAT:', kind: 'tip' },
          { ex: 'Ex4', lines: [
            ['For years, <u>Tiger Woods</u> was better than any golfer.', 'logic error', 'err'],
            ['For years, <u>Tiger Woods</u> was better than any <b>other</b> golfer.', 'OK — you can’t be better than yourself', 'ok']
          ] },
          'We must correct a logic error because Tiger Woods was himself a golfer (and you can’t be better than yourself).'
        ]
      },
      {
        kind: 'quiz', id: '10', short: 'Practice 10', title: 'Practice 10 — 비교', page: 'p.32',
        options: ['OK', 'COMP'],
        legend: { OK: '오류 없음', COMP: 'Logical comparison error — 비교 대상이 논리적으로 맞지 않음' },
        instr: '<b>PRACTICE 10:</b> Mark the sentences to show that you’re following the necessary steps above. Label them as <b>COMP</b> or <b>OK</b>.',
        ko: NOTE_KEY,
        items: [
          { q: 'Sharks and dolphins both have strong tails, but unlike sharks, dolphin tails are oriented horizontally.', a: 'COMP', why: 'unlike sharks(A=동물) ↔ dolphin tails(B=꼬리) → unlike those of sharks / unlike shark tails…' },
          { q: 'The atmosphere at the rugby tournament was far more sedate than the last month’s soccer tournament.', a: 'COMP', why: 'A = atmosphere, B = tournament → than that of the last month’s soccer tournament.' },
          { q: 'Unlike commercial broadcasting, producers in public radio tend to be less concerned about revenue.', a: 'COMP', why: 'Unlike commercial broadcasting(A=산업) ↔ producers(B=사람) → unlike producers in commercial broadcasting.' },
          { q: 'In India, mangoes are a beloved staple food and are perhaps more popular than any fruit.', a: 'COMP', why: 'mangoes도 fruit → than any other fruit. (Tiger Woods 예시와 같음)' },
          { q: 'The economy suffered through a recession that was equal, if not worse than, the recession a decade before.', a: 'COMP', why: 'equal to, if not worse than — “equal … than” 관용구 오류 (equal to B). 필기: “to?”' }
        ]
      },
      {
        kind: 'quiz', id: 'C110', short: 'Cumulative 1–10', title: 'Cumulative Practice 1–10', page: 'p.33',
        options: ['OK', 'FRAG', 'MOD', 'PUNC', 'SV', 'PR', 'PL/PO', 'VT', 'N#', '//', '//ID', 'COMP'],
        legend: { OK: '오류 없음', FRAG: 'Fragment error', MOD: 'Modifier error', PUNC: 'Punctuation error', SV: 'S-V agreement error', PR: 'Pronoun error', 'PL/PO': 'Plural/Possessive mix-up', VT: 'Verb Tense error', 'N#': 'Noun-number error', '//': 'Parallelism error', '//ID': 'Parallelism idiom error', COMP: 'Logical comparison error' },
        instr: 'Follow the same instructions you followed for the previous Cumulative Practice exercises, and keep marking the sentences to show your work. On the line provided, write <b>OK</b> or the following annotations for any errors you find: <b>FRAG, MOD, PUNC, SV, PR, PL/PO, VT, N#, //</b> (including <b>//ID</b>), or <b>COMP</b>.',
        ko: NOTE_KEY,
        items: [
          { q: 'Annie continued to send text messages during class even after receiving a warning; it led her teacher to confiscate the phone.', a: 'PR', why: 'it → 선행사 후보(text messages? warning? class?)가 모호. 필기: ambiguous pronoun.' },
          { q: 'As much as the pundit lambasts the government in her weekly editorials, she would certainly agree that as an American, she enjoys much more freedom than an oppressive dictatorship.', a: 'COMP', why: 'freedom ↔ dictatorship — 같은 종류가 아님 → than [freedom] under an oppressive dictatorship.' },
          { q: 'During summer vacation, Cota worked as a math tutor, went to lacrosse camp, and she also visited her grandparents in Mongolia.', a: '//', why: 'worked …, went …, and [she also visited …] — C에 주어가 붙어 병렬이 깨짐.' },
          { q: 'Amira thought that repairing computers was a good way for her and her sister to gain experience that might help them become an electrical engineer.', a: 'N#', why: 'her and her sister(복수) → become electrical engineers.' },
          { q: 'Historians have argued that the worship of saints in medieval Christianity is similar to the worship of a pantheon of gods that was practiced in the ancient world.', a: 'OK', why: 'the worship of saints ↔ the worship of a pantheon — 비교 대상 OK.' },
          { q: 'Hong Kong, perhaps the most cosmopolitan city in Asia, first developed under British colonial rule, however, even after attaining independence in 1997, the city retained its unique character.', a: 'PUNC', why: 'IC, however, IC → “rule<b>;</b> however,”처럼 세미콜론 필요.' },
          { q: 'Cole, Molly, and Janice decided to attend different colleges, each of which were famous for its fine arts program.', a: 'SV', why: 'each of which = 단수 → was.' },
          { q: 'When I stepped into an empty room, I realized that everyone except Dan and I had already left for the concert.', a: 'PR', why: 'except = 전치사 → 목적격 “Dan and me”. (필기: me)' },
          { q: 'At the beginning of the novel, the characters witness a traumatic scene that they struggled to process or make sense of for the entire rest of the book.', a: 'VT', why: '줄거리를 현재시제로 서술(witness) → struggled가 아니라 struggle.' },
          { q: 'Whoever the investigators hold responsible is likely to face fierce criticism from the public even if he or she is actually innocent.', a: 'PR', why: 'who test: “the investigators hold [him] responsible” — 목적어 자리 → Whomever.' },
          { q: 'The team from California has much more money than New York, but both teams have been able to recruit a number of star athletes.', a: 'COMP', why: 'The team ↔ New York(도시) → than the team from New York.' },
          { q: 'On my final exam, I was asked to analyze similarities between Ernest Hemingway and the writing style of F. Scott Fitzgerald.', a: 'COMP', why: 'Ernest Hemingway(사람) ↔ the writing style(문체) → between Hemingway’s writing style and that of F. Scott Fitzgerald.' },
          { q: 'College applicants are first evaluated with numeric data—GPA, test scores, and ranking, for example—but they are also evaluated based on writing ability and various personality traits.', a: 'OK', why: '대시 삽입구 짝 OK, 병렬 OK.' },
          { q: 'Some entrepreneurs who fail in their first businesses think of themselves as a loser; however, a number of the most successful business leaders attained success only after years of setbacks.', a: 'N#', why: 'Some entrepreneurs(복수) … themselves as losers.' },
          { q: 'Only after submitting the draft manuscript was Cynthia and her sister able to collect their first paychecks from the publisher.', a: 'SV', why: '도치문 — 주어 “Cynthia and her sister”(복수) → were.' }
        ]
      }
    ]
  });
})(window.SAT_DATA);

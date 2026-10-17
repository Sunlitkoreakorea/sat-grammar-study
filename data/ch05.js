/* Lesson 5. Pronouns (교재 pp.20–24) */
(function (D) {
  var OP = ['OK', 'PR'];
  var OP_LEG = { OK: '대명사 오류 없음', PR: 'Pronoun error — 대명사 오류(모호한 선행사, 격, who/whom, which 등)' };
  var NOTE_KEY = '※ 교재 정답지는 사진에 없어서, 손필기 답과 규칙(5-1~5-7)을 함께 대조해 정리한 답이에요.';

  D.chapters.push({
    id: 'L5', order: 5, no: 'L5', short: 'Pronouns', title: 'Lesson 5. Pronouns',
    ko: 'it/they/he/she의 선행사, where·when·which, “…, which”, 주격/목적격, who vs whom, 대명사 시프트, 재귀대명사, this/these/those',
    parts: [
      {
        kind: 'learn', id: '5-1', short: '5-1 모호한 대명사', title: '5-1. Ambiguous pronouns: it, they, he, she', page: 'p.20',
        ko: 'it·they·he·she는 글에 쓰인 선행사가 딱 하나여야 한다. 의사결정 트리로 확인!',
        blocks: [
          '<b>It, they, he,</b> and <b>she</b> must have only <b>one written antecedent</b> (the original noun which the pronoun replaces/refers to). When you see any of these four pronouns in a sentence, use this decision tree to check if they are used correctly:',
          { tree: { title: '<b>Decision tree</b> — it/its* 테스트', root: {
            q: '<b>See it* or its*?</b>',
            b: [
              ['YES', {
                q: 'Does the sentence (or the previous sentence) have any <b>singular, non-human nouns</b>?',
                b: [
                  ['YES', {
                    q: '<b>Replace it</b> (or the pronoun you’re testing) with the <u>first singular, non-human noun you find</u>, and <b>read the entire sentence</b>. Repeat this step with every possible antecedent. <b>How many antecedents fit properly?</b>',
                    b: [
                      ['ZERO', '!<b>Pronoun error!</b> All pronouns need a written noun antecedent.'],
                      ['ONE', '+<b>Correct pronoun.</b> Correctly used pronouns have just one written antecedent.'],
                      ['TWO or more', '!<b>Pronoun error!</b> Correctly used pronouns shouldn’t have more than one possible antecedent, <u>unless two different nouns refer to the same thing</u>: <i>A fierce predator, the lion can catch its prey even after a long chase.</i> (predator &amp; lion both fit, but refer to the same thing → correct.)']
                    ]
                  }],
                  ['NO', '!<b>Pronoun error!</b> — unless you see one of these idioms: <i>it is [ADJ] [infinitive]</i> · <i>make it [ADJ]</i> · <i>regard it as [adj]…</i><br><small>Examples: It is hard to see at night. · Alcohol makes it hard to drive. · It isn’t easy to make it in sports. · Some regard it as pointless…</small>']
                ]
              }]
            ]
          } } },
          { note: '<b>*</b> If you see <b>they/them/their/theirs</b>, follow the same steps above, but look for <u>all plural nouns</u> instead of singular, non-human nouns. Likewise, if you see <b>he/she/him/her/his/hers</b>, follow the same steps but look for <u>singular people</u>.', kind: 'rule' },
          { ex: 'Ex1', lines: [ 'The damage has now been reversed after a century of crocodile hunting nearly drove <s>them</s> <b>the animal / the species / crocodiles</b> to extinction.' ] },
          'When we use the decision tree to test Ex 1 above, we quickly find that the sentence contains <b>no plural nouns</b>. We can fix the error by changing <i>them</i> to <b>the animal, the species,</b> or <b>crocodiles</b>. It would <u>not</u> fix the error if we changed <i>them</i> to <i>it</i>, however, because there is no singular noun that would fit when we test <i>it</i>. (Note that <b>crocodile</b> is used as an adjective in that sentence, not a noun!)',
          'Even when it’s clear what an author intends to say, antecedents must be <b>written</b>, not just implied:',
          { ex: 'Ex2', lines: [ 'In Russia this year, <s>they</s> <b>the government</b> banned agricultural imports out of fear of an epidemic.' ] },
          'The decision tree helps you test pronouns rigorously—without making assumptions:',
          { ex: 'Ex3', lines: [ 'Even after Mary worked with Kelly to resolve the problem, <s>she</s> <b>Mary/Kelly</b> was still upset.' ] },
          '<b>NOTE</b> that in this sentence below, the decision tree may seem to fail unless you pay attention to both <b>intended meaning</b> <u>and</u> <b>grammatical context</b> when you test the pronoun:',
          { ex: 'Ex4', lines: [ 'Each of the pillows on the bed has <s>their</s> <b>its</b> own matching pillowcase.' ] },
          'Even if you assume that <b>pillows</b> is the intended antecedent for the pronoun <i>their</i>, you must still write the <b>singular pronoun <i>its</i></b> to be consistent with the singular subject <b>Each</b> and the singular verb <b>has</b>.'
        ]
      },
      {
        kind: 'learn', id: '5-2', short: '5-2 where/when/which', title: '5-2. Misused where, when, which', page: 'p.21',
        ko: 'where = 장소, when = 시간. which는 사람에게 쓰지 않는다(→ who). whose는 사물·사람 모두 가능.',
        blocks: [
          { h: '5-2a. Use where for places and when for times' },
          '(especially in sentences containing <b>is where/is when</b>).',
          { ex: 'Ex5', lines: [ 'I like the scene <s>where</s> <b>in which</b> Arnold fires his shotgun.' ] },
          'In Ex 5 above, the pronoun <b>where</b> must be corrected (because a movie scene isn’t an actual place).',
          { ex: 'Ex6', lines: [ 'A birdie is <b>when</b> you put the ball in the hole one stroke under par.' ] },
          'Similarly, Ex 6 above must be re-written because a <b>birdie</b> isn’t a time. Possible rewrites might be:',
          { ex: '고치기', lines: [ 'A “birdie” <b>occurs when</b> a golfer… &nbsp;<b>OR</b>&nbsp; A birdie shot is one <b>in which</b> the ball is…' ] },
          { h: '5-2b. Never use which for people' },
          { ex: 'Ex7', lines: [ 'The doctor <s>which</s> <b>who</b> helped me was Dr. Nick Riviera.' ] },
          { note: '<b>NOTE:</b> <b>Whose</b> is the possessive form of <b>which</b> and <b>who</b>. Thus, <b>whose</b> can be used for things <u>and</u> people:', kind: 'tip' },
          { ex: 'Ex8', lines: [ 'The company, <b>whose</b> CEO recently quit, has filed for bankruptcy.' ] }
        ]
      },
      {
        kind: 'learn', id: '5-3', short: '5-3 “…, which”', title: '5-3. Overly broad “…, which”', page: 'p.21',
        ko: ', which는 앞 절 안의 구체적인 “비인간 명사” 하나를 가리켜야 한다. 앞 절 전체(상황)를 가리키면 오류 — teaching… / an experience that… 로 고친다.',
        blocks: [
          'The pronoun <b>which</b> must refer to a <u>specific non-human noun</u> (singular or plural) somewhere in the phrase that precedes it. Use this decision tree to check whether a “<b>…, which</b>” is correct:',
          { tree: { title: '<b>Decision tree</b> — “…, which” 테스트', root: {
            q: '<b>See …, which?</b>',
            b: [['YES', {
              q: 'Are there any <b>non-human nouns</b> in the “…” section before the comma?',
              b: [
                ['NO', '!The sentence is <b>wrong</b>. <b>Which</b> must replace a clear, contextually appropriate non-human antecedent.'],
                ['YES', {
                  q: 'Take the nearest non-human <b>N</b>, plug it in to the <i>which</i> position, and <b>read the sentence</b>. Focus on context; ignore any grammar weirdness and redundancy. <b>Does that N, or any of the non-human Ns, express what the writer intended?</b>',
                  b: [
                    ['YES', '+The <b>which</b> is used correctly.'],
                    ['NO', '!The sentence is <b>wrong</b>. Which must replace a clear, contextually appropriate non-human antecedent.']
                  ]
                }]
              ]
            }]]
          } } },
          'This example fails the decision tree test above:',
          { ex: 'Ex9', lines: [ ['Francis’s parents divorced when she was young, <b>which</b> taught her to be cynical about marriage.', 'fails the test', 'err'] ] },
          'It can be fixed a few different ways:',
          { list: [
            'Francis’s parents divorced when she was young, <b>teaching</b> her to be cynical about marriage.',
            '<mark>Francis’s parents divorced when she was young, <b>an experience that</b> taught her to be cynical…</mark> <span class="tag">usually the right answer</span>',
            'Francis’s parents divorced when she was young, <b>and now</b> she is cynical about marriage.'
          ] },
          { note: '<b>NOTE:</b> The first 2 fixes are common on the SAT because their grammar is unfamiliar to many students.', kind: 'tip' }
        ]
      },
      {
        kind: 'quiz', id: '5A', short: 'Practice 5A', title: 'Practice 5A — 규칙 5-1 ~ 5-3', page: 'p.21',
        options: OP, legend: OP_LEG,
        instr: '<b>PRACTICE 5A:</b> On the line provided, write <b>OK</b> or <b>PR</b>. <span class="circ">Circle</span> any incorrect pronouns. These sentences focus only on rules 5-1 through 5-3. You don’t have to fix the pronoun errors you find (or other errors related to them).',
        ko: NOTE_KEY,
        example: { q: 'ExA. My dad asked me to shovel all the snow on the driveway, but I didn’t feel like doing it.', a: 'PR', why: 'it → “doing it”에서 it의 선행사 후보: snow는 비가산(복수 아님)이지만 driveway와 맞지 않음 — 명사가 아닌 행동(shovel)을 가리키므로 오류.' },
        items: [
          { q: 'All the candidates must appeal to a wide variety of voters if he or she wants to win the election.', a: 'PR', why: 'he or she는 단수인데 선행사는 복수 candidates → they.' },
          { q: 'My friend Julia is extremely arrogant, which makes it hard for me to work on the same team as her.', a: 'PR', why: 'which는 사람 Julia(arrogant는 형용사)나 상태를 가리킴 — 구체적인 비인간 명사 없음 → 오류.' },
          { q: 'David lent his motorcycle to someone who in turn allowed her friend to use it.', a: 'OK', why: 'it → motorcycle 하나뿐. her → someone(단수 사람). 선행사가 각각 하나라 OK.' },
          { q: 'One Finnish researcher published a study indicating a correlation between crime and immigration, which has been used by conservatives to call for stricter immigration laws.', a: 'OK', why: '“, which”의 앞에 비인간 명사(study, correlation …) 존재. which = the study → 의도된 의미 표현 OK.' },
          { q: 'The Department of Education announced a new policy addressing school safety; they were apparently attempting to respond to concerns that had been raised about gang-related violence in the city.', a: 'PR', why: 'they의 복수 선행사가 없음(Department는 단수) → it.' }
        ]
      },
      {
        kind: 'learn', id: '5-4', short: '5-4 주격/목적격·who/whom', title: '5-4. Pronoun case, who vs. whom, subset sentences', page: 'p.22',
        ko: '주어 자리엔 I/we/he/she/they, 목적어 자리엔 me/us/him/her/them. “X and [PRN]”은 대명사만 읽어서 판단. who = 주어, whom = 목적어 (Who Test). 부분집합 문장은 “of which/whom” 패턴 암기.',
        blocks: [
          { h: '5-4a. Subject vs. object pronouns' },
          { table: { head: ['', 'I / we', 'you', 'he, she, it / they'], rows: [
            ['<b>SUBJECT</b> — SINGULAR', 'I', 'you', '(s)he / it'],
            ['<b>SUBJECT</b> — PLURAL', 'we', 'you', 'they'],
            ['<b>OBJECT</b> — SINGULAR', 'me', 'you', 'him / her / it'],
            ['<b>OBJECT</b> — PLURAL', 'us', 'you', 'them']
          ] } },
          'Sometimes a pronoun is used for emphasis right next to its antecedent:',
          { ex: 'Ex10', lines: [ '<s>Us</s> <b>We</b> teenagers often feel misunderstood. <span class="sm">→ Subject case <b>We</b> is needed (it refers to the S <i>teenagers</i>).</span>' ] },
          'Other times, it’s necessary to look at how a pronoun is used to determine whether S or O is needed:',
          { ex: 'Ex11', lines: [ 'Everyone except <s>I</s> <b>me</b> was sad to leave. <span class="sm">→ Object case <b>me</b> is needed because <i>except</i> is a preposition.</span>' ] },
          'But most pronoun case errors on the SAT will appear in sentences with <span class="bx">X and [PRN]</span> or <span class="bx">[PRN] and X</span>. For these sentences, <b>read only the pronoun</b> to determine if you need S or O:',
          { ex: 'Ex12', lines: [
            'Jon robbed a store after his girlfriend and <s>him</s> <b>he</b> decided to break up. <span class="sm">(“he decided …”)</span>',
            'The doctor recommended treatment for my wife and <s>I</s> <b>me</b>. <span class="sm">(“for me”)</span>'
          ] },
          { h: '5-4b. The “Who Test”: distinguishing who &amp; whom' },
          '<mark><b>Who</b> is a subject; <b>whom</b> is an object.</mark> Determine which you need by following these steps:',
          { list: [
            'Ignore any words that appear before <b>who/whom</b>.',
            'Isolate the who/whom clause from the rest of the sentence. In other words, determine where the who/whom clause ends. (It’s where the main sentence continues again.) <i>The professor</i> <span class="bx">who I spoke with</span> <i>was surprised that I would ask such an elementary question.</i>',
            'Looking only at the isolated who/whom clause, <u>replace the first word (who or whom) with the subject pronouns <b>they</b> or <b>he</b></u>. If the isolated clause makes grammatical sense, you’ve determined that a subject is needed: <u>who</u> is correct. If the clause doesn’t make grammatical sense (as in the box above — “he I spoke with”), then you need <u>whom</u>.'
          ], ol: true },
          { note: '<b>WARNING:</b> Don’t try to test if <b>whom</b> is correct! Use only the <b>who</b> test exactly as described above.', kind: 'warn' },
          { ex: 'Ex13', lines: [
            ['I believe that <s>whoever</s> <b>whomever</b> you choose will be a good employee.', '“He/they you choose” fails the test.'],
            ['<s>Whomever</s> <b>Whoever</b> comes to the reception will be welcomed warmly.', '“He comes to the reception” is OK.']
          ] },
          { h: '5-4c. “Subset” sentences' },
          { note: '필기: ★★★★ <b>memorize the pattern below!</b>', kind: 'rule' },
          'Do <b>NOT</b> use the Who Test in a <b>subset sentence</b>! This structure is a unique exception, and it often appears on the SAT. The Who Test doesn’t work for subset sentences, so just <u>memorize the pattern below</u>:',
          { box: [ '<b>Set/subset usage pattern:</b> … [plural N]…, <u>S of which/whom</u> [vb]' ] },
          { ex: 'Ex14', lines: [
            'My class has <u>thirty students</u>, <b>five of whom</b> are very annoying.',
            'I own <u>five computers</u>, <b>some of which</b> still work.'
          ] },
          { note: '<b>NOTE:</b> The subset part of the sentence is a <b>dependent clause</b> (relative clause). In the S position, you can use fractions/numbers or indefinite pronouns (ex: <b>all, some, none</b>; see rule 4-6). <b>who / whose는 쓰지 않는다 — of whom / of which.</b>', kind: 'tip' }
        ]
      },
      {
        kind: 'quiz', id: '5B', short: 'Practice 5B', title: 'Practice 5B — 주격/목적격, who/whom, subset', page: 'p.22',
        options: OP, legend: OP_LEG,
        instr: '<b>PRACTICE 5B:</b> On the line provided, write <b>OK</b> or <b>PR</b>. <span class="circ">Circle</span> any incorrect pronouns. These sentences focus only on the rules covered on this page. You don’t have to fix the pronoun errors you find.',
        ko: NOTE_KEY,
        example: { q: 'ExB. My mom scolded my sister and I for at least a half hour.', a: 'PR', why: '“scolded … I”이 아니라 object → “my sister and me”.' },
        items: [
          { q: 'I told John what I honestly believed—that either him or his brother must have been lying.', a: 'PR', why: '“him must have been lying”의 주어 자리 → he.' },
          { q: 'Worried about possible accidents, the lab director told we interns to better follow the safety protocols.', a: 'PR', why: '“told we”가 아니라 object → told us interns.' },
          { q: 'In an underground bunker, an armistice meeting was convened by ten diplomats, all of whom were risking being branded as traitors for doing so.', a: 'OK', why: 'subset 패턴: [plural N], S of whom [vb] — “all of whom were risking”이 올바름.' },
          { q: 'For people who want to go to an online college, it’s important to know that online degrees may not be valued or even recognized by some employers.', a: 'OK', why: 'who test: “they want to go …” OK → who가 맞음.' },
          { q: 'Ushio, the last rock climber up the wall, tossed Teri and I the remaining pitons and carabineers.', a: 'PR', why: '“tossed … I”가 아니라 “tossed me” → Teri and me.' }
        ]
      },
      {
        kind: 'learn', id: '5-5', short: '5-5~5-7 시프트·재귀·this', title: '5-5 ~ 5-7. Pronoun shifts, reflexive pronouns, overly broad this/these/those', page: 'p.23',
        ko: 'you → one 같은 대명사 시프트 금지 · 재귀대명사는 S와 O가 같은 대상일 때만 · this/these/those 뒤에는 항상 명사(this problem, this situation).',
        blocks: [
          { note: '필기(상단): BROAD … — 아래 5-7(overly broad this/these/those) 참고', kind: 'tip' },
          { h: '5-5. Pronoun shifts' },
          'Don’t shift from <b>you</b> to <b>one</b>, from <b>they</b> to <b>you</b>, or from a specific type of person to <b>one</b>.',
          { ex: 'Ex15', lines: [
            'When <b>one</b> walks alone at night, <s>you</s> <b>one/he/she</b> should always carry a phone. <span class="sm">(필기: someone)</span>',
            'When <b>a teacher</b> enters the profession, <s>one</s> <b>he or she</b> is often full of idealism.'
          ] },
          { h: '5-6. Reflexive pronouns' },
          '<b>Reflexive pronouns</b> are used in the <u>object position when the S and O are the same thing/person</u>:',
          { ex: 'Ex16', lines: [ 'When Don was trying to fix the table, it collapsed and fell on <s>himself</s> <b>him</b>. <span class="sm">(the table ≠ Don → 재귀 불가)</span>' ] },
          { note: '<b>NOTE:</b> Reflexive pronouns are also used to emphasize other nouns. (The SAT doesn’t directly test this usage.)', kind: 'tip' },
          { ex: 'Ex17', lines: [
            'Mary did the work <b>herself</b>. &nbsp;OR&nbsp; Mary <b>herself</b> did the work. &nbsp;OR&nbsp; Mary did the work by <b>herself</b>.',
            'An experienced golfer <b>himself</b>, Bill liked to give his friends free lessons.'
          ] },
          { h: '5-7. Overly broad this, these, and those' },
          'In spoken English, the word <b>this</b> is often used by itself because finger-pointing or context makes its meaning clear. But in writing, <mark>a <b>noun</b> should always be written after the pronouns this/these/those</mark>:',
          { ex: 'Ex18', lines: [ 'As time passed, crime increased, and city dwellers were forced to accept <s>this</s> <b>this situation</b>. <span class="sm">(Insert <i>problem</i> or <i>situation</i> here)</span>' ] }
        ]
      },
      {
        kind: 'quiz', id: '5C', short: 'Practice 5C', title: 'Practice 5C — 5-5 ~ 5-7', page: 'p.23',
        options: OP, legend: OP_LEG,
        instr: '<b>PRACTICE 5C:</b> Follow the same instructions you followed in 5A and 5B. These sentences cover only the rules on this page.',
        ko: NOTE_KEY,
        example: { q: 'ExC. The store sold out of the book I needed for class, and this ruined my day.', a: 'PR', why: 'this 뒤에 명사가 없음 → this situation / this shortage.' },
        items: [
          { q: 'If anyone notices any suspicious activity, he or she should report it to the police.', a: 'OK', why: 'anyone(단수) → he or she. it → activity.' },
          { q: 'As soon as I opened the window, the shutters smacked myself in the face.', a: 'PR', why: '주어는 shutters, 목적어는 I → 재귀 불가 → me.' },
          { q: 'I applied for ten jobs but didn’t receive any phone calls afterwards; this made me feel quite depressed.', a: 'PR', why: 'this 뒤에 명사가 없음 → this lack of response 등.' }
        ]
      },
      {
        kind: 'quiz', id: '5D', short: 'Practice 5D', title: 'Practice 5D — Lesson 5 전체 규칙', page: 'p.23',
        options: OP, legend: OP_LEG,
        instr: '<b>PRACTICE 5D:</b> The following problems include all the pronoun rules covered in Lesson 5.',
        ko: NOTE_KEY,
        items: [
          { q: 'The parade committee was unanimous in their decision to allow every student club to participate.', a: 'PR', why: 'committee = 단수 집합명사 → its decision.' },
          { q: 'All applicants should be bilingual if they want to qualify for this position.', a: 'OK', why: 'All applicants(복수) → they. 올바름.' },
          { q: 'I intend to support whomever is nominated by the city council, even if he or she belongs to a different party.', a: 'PR', why: 'who test: “he is nominated …”이 자연스러움 → whoever.' },
          { q: 'Susan and Jessica both worked in the same department until she was transferred to the sales team.', a: 'PR', why: 'she의 선행사가 Susan/Jessica 둘 다 가능 → 모호.' },
          { q: 'Five close friends and myself rented a station wagon, packed it with food, and drove to New Orleans during the long holiday weekend.', a: 'PR', why: '주어 자리 → “Five close friends and I”. (myself는 재귀대명사라 S 자리 불가)' },
          { q: 'If you’re wondering why you should bother learning a new language, it’s good to know that foreign language learning can help one significantly improve cognition in all areas.', a: 'PR', why: 'you → one 대명사 시프트 → you.' },
          { q: 'The squawk of the brass horns drowned out us oboists and bassoonists.', a: 'OK', why: '“drowned out us” — 목적격 us가 맞음.' },
          { q: 'After submitting a prototype of the electric car they hoped to submit, Tom and Maynard were surprised to learn that the race committee had already disqualified themselves.', a: 'PR', why: 'the race committee(단수) → disqualified itself.' },
          { q: 'There were only three applicants left in the final round, all of who were extremely qualified.', a: 'PR', why: '부분집합(subset) 패턴 → all of whom.' },
          { q: 'Coach Windsall was disappointed, but we players were even more disappointed in ourselves.', a: 'OK', why: '“we players” — 주어 → 주격 we. ourselves = 주어와 같은 대상 → 재귀 OK.' },
          { q: 'Sunwoo claimed that if given a realistic chance to run for a third term, Johnson would have done it.', a: 'PR', why: 'it의 단수 비인간 선행사 후보 term은 맞지 않음 — 행동(run)을 가리킴 → 선행사 없음.' },
          { q: 'All the students begged for extra time, which gave Dr. Park the impression that her students hadn’t properly prepared for the test.', a: 'PR', why: '“, which” — 앞의 time은 의도와 맞지 않음(청원 행위를 가리킴) → overly broad which.' }
        ]
      },
      {
        kind: 'quiz', id: 'C15', short: 'Cumulative 1–5', title: 'Cumulative Practice 1–5', page: 'p.24',
        options: ['OK', 'FRAG', 'MOD', 'PUNC', 'SV', 'PR'],
        legend: { OK: '오류 없음', FRAG: 'Fragment error', MOD: 'Modifier error', PUNC: 'Punctuation error', SV: 'Subject–Verb agreement error', PR: 'Pronoun error' },
        instr: 'Follow the same instructions you followed for the previous Cumulative Practice exercises, and make sure you continue to show where in each sentence the errors occur. On the line provided, write <b>OK</b> or the following annotations for any errors you find: <b>FRAG, MOD, PUNC, SV,</b> or <b>PR</b>.',
        ko: 'Pronoun signals to hunt for: it/(s)he/they · where/when/which · …, which · we/us X, except [OBJ] · X and [pronoun] · who(ever)/whom(ever) · one/you (shifts) · -self/-selves (check the S) · this/these/that/those N',
        items: [
          { q: 'Stargazing can satisfy cravings for both knowledge and relaxation; skywatchers can enjoy a moment of peace and quiet while also learning about their names and orbital patterns.', a: 'PR', why: 'their의 복수 선행사 후보(skywatchers)는 의도된 의미(별·행성의 이름)와 맞지 않음 → 선행사 없음.' },
          { q: 'The professor realized that neither of the TAs helping to run her course were knowledgeable enough to effectively help her students master the most advanced subject matter.', a: 'SV', why: 'neither = 단수 → was.' },
          { q: 'The city’s new official logo, chosen among thousands of submissions, was widely criticized; however, the city council decided to ignore the criticism.', a: 'OK', why: 'IC; however, IC. 주어-동사 일치 OK, 수식어 chosen은 logo를 올바르게 설명.' },
          { q: 'Responsible for the breach in security was both the receptionist and two technicians.', a: 'SV', why: '도치문(C: 형용사/분사 먼저). 주어 “both the receptionist and two technicians”(복수) → were.' },
          { q: 'The speech whose first paragraph was written by Mark Twain was not actually delivered until long after Twain’s death.', a: 'OK', why: 'whose = 소유격(사물·사람 모두 OK). 주어 speech(단수) was.' },
          { q: 'People who were raised in foster homes, which sometimes lack the means to support disadvantaged children, often wary of the foster care system.', a: 'FRAG', why: '주어 People의 본동사가 없음(often wary…) → IC가 없음. (which는 homes를 가리켜 OK)' },
          { q: 'Although the device was revolutionary, its inventor, a well-known chemist from Sweden—never patented it and instead released its design directly into the public domain.', a: 'PUNC', why: '삽입구가 콤마(,)로 열렸고 대시(—)로 닫혀 짝이 맞지 않음.' },
          { q: 'By collaborating with peers on creative activities, a student’s ability to learn complex tasks can be greatly improved.', a: 'MOD', why: '“By collaborating …”의 주체는 사람인데 주어는 a student’s ability.' },
          { q: 'Reducing the margin of error on laboratory studies has gotten easier as lab equipment and cloud-based analytic tools have improved.', a: 'OK', why: '동명사 Reducing(단수) → has. “as lab equipment and … tools have”(복수)도 OK.' },
          { q: 'The architect submitted two designs to the agency in charge of stadium construction, neither of which were as polished as she would have liked them to be.', a: 'SV', why: 'subset 패턴 “neither of which” — neither는 단수 → was.' },
          { q: 'According to the policy on the course website, students whom earn below average scores on their finals and midterms will have to complete additional coursework in order to receive credit.', a: 'PR', why: 'who test: “they earn …” → who.' },
          { q: 'The phenomena first described in a journal of astronomy was at last explained: a microwave oven used by lab technicians had interfered with a sensitive microwave telescope array, causing the anomalies.', a: 'SV', why: 'phenomena = phenomenon의 복수 → were.' },
          { q: 'Hoping to reduce noise in the town, the city council plans to pass several new ordinances, each of which are likely to cause new controversy.', a: 'SV', why: 'subset “each of which” — each는 단수 → is.' },
          { q: 'Taking quizzes leads to a variety of anxious responses in students; for example, a quiz may make themselves fidget, become distracted, or panic.', a: 'PR', why: '재귀대명사는 주어(quiz)와 같은 대상일 때만 → them (students).' },
          { q: 'Dr. Adeyemi agreed to extend the deadline an entire month, which shocked students who were used to their professor’s normally uncompromising demeanor.', a: 'PR', why: '“, which” — 앞 절 전체(상황)를 가리킴(deadline은 의도와 불일치) → overly broad which.' }
        ]
      }
    ]
  });
})(window.SAT_DATA);

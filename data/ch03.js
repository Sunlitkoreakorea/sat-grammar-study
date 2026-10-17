/* Lesson 3. Punctuation (교재 pp.12–15) */
(function (D) {
  var OP = ['OK', 'PUNC'];
  var OP_LEG = { OK: '구두점 오류 없음', PUNC: 'Punctuation error — 콤마·세미콜론·콜론·대시 오류' };
  var NOTE_PUNC = '교재 3A~3C 지시문에는 PUNCT로 적혀 있지만 이 앱에서는 PUNC로 통일했어요. ';

  D.chapters.push({
    id: 'L3', order: 3, no: 'L3', short: 'Punctuation', title: 'Lesson 3. Punctuation',
    ko: 'IC 연결법(콤마+FANBOYS, 세미콜론), 콜론, 삽입구 구두점, 불필요한 콤마',
    parts: [
      {
        kind: 'learn', id: '3-1', short: '3-1 IC 연결', title: '3-1. Combining ICs', page: 'p.12',
        ko: 'IC 둘을 한 문장으로 잇는 올바른 방법은 “, FANBOYS”와 “;” 두 가지뿐. IC, IC · IC IC · IC; and, IC 같은 형태는 오류.',
        blocks: [
          { note: '필기 메모: <b>IC, and IC · IC ; IC · IC ; (f.c), IC · S V and V but V</b> — 이 네 가지가 정답 패턴! (IC . IC 마침표로 끊는 것도 가능)', kind: 'tip', title: '손필기' },
          { h: '3-1a. Comma + FANBOYS' },
          'One way to correctly combine two ICs in one sentence is to use <u>a comma and a FANBOYS conjunction</u> (see <b>Reference B</b>)—<b>for, and, nor, but, or, yet, so</b>:',
          { ex: 'Ex1', lines: [ ['Fay never enjoyed dancing<b>, but</b> while at the wedding, she cut loose on the dance floor.', 'OK: IC, but IC.', 'ok'] ] },
          { h: '3-1b. Semicolons (;) and the “supercomma”' },
          'The other way to correctly combine two ICs in one sentence is to use a <u><b>semicolon</b></u>. You may also (but are not required to) use a “fancy conjunction” (see <b>Ref C</b>) in various places:',
          { ex: 'Ex2', lines: [
            'Fay rarely enjoyed dancing<b>; however,</b> while at the wedding, she cut loose on the dance floor.',
            'Fay rarely enjoyed dancing; while at the wedding<b>, however,</b> she cut loose on the dance floor.',
            'Fay rarely enjoyed dancing; while at the wedding, she cut loose on the dance floor<b>, however</b>.',
            'Fay now dances quite often; she showed off her passion and skill at the wedding.'
          ] },
          'All four sentences above are correct. <b>Lesson 12</b> provides much more info on punctuating transition words.',
          'We also use the same mark (;) as a “<u>supercomma</u>”—as a way to upgrade regular commas (for clarity)—when writing a list with one or more items that already contain commas:',
          { ex: '예문', lines: [ 'Russian Soyuz rockets are used to launch satellites<b>;</b> ferry cargo, especially to the ISS<b>;</b> and carry astronauts.' ] },
          { h: '3-1c. Correct combining methods' },
          'Each pattern is illustrated with a corresponding correct example below.',
          { table: { head: ['패턴', '설명'], rows: [
            ['(a) IC<b>, and*</b> IC', '*Any FANBOYS word can go here—for, and, nor, but, or, yet, so.'],
            ['(b) IC<b>;</b> IC', ''],
            ['(c) IC<b>;</b> (fancy conj)<b>,</b> IC', 'See Ref C for a partial list of fancy conjunctions.'],
            ['*(d) S V and V but V', 'No commas before FANBOYS words unless complete ICs appear on both sides.']
          ] } },
          { ex: '(Ex-a~d)', lines: [
            ['The president was impeached, but she was not removed from office.', '(a)'],
            ['The president was impeached; she was not removed from office.', '(b)'],
            ['The president was impeached; however, she was not removed from office.', '(c)'],
            ['The president was impeached and widely condemned for her actions but not removed from office.', '(d) — S 하나에 V 여러 개']
          ] },
          { h: '3-1d. Incorrect combining methods' },
          { note: '필기: <b>3 + FANBOYS = “.”</b>', kind: 'tip' },
          { table: { head: ['틀린 형태', '왜 틀렸나'], rows: [
            ['<span class="tag err">IC, IC</span> · <span class="tag err">IC IC</span> · <span class="tag err">IC, DC, IC</span>', 'these wrong forms are examples of <u>run-on sentence errors</u>.'],
            ['<span class="tag err">IC, and V…</span>', 'It’s necessary to use a complete IC after “, and”—not just a verb phrase.'],
            ['<span class="tag err">IC and IC</span>', 'Need comma before <b>and</b> because there are ICs on both sides. (Note Exception 1 below in 3-1e)'],
            ['<span class="tag err">IC; and, IC</span>', 'Never use a semicolon before—or a comma after—a FANBOYS word.'],
            ['<span class="tag err">IC, (fancy conjunction) IC</span>', 'FANBOYS conj combine 2 ICs with a comma; <u>fancy conj require a semicolon</u>.']
          ] } },
          { h: '3-1e. Exception 1: Short ICs' },
          '<b>IC [fanboys] IC</b> <i>even <u>without a comma</u></i> is possible if one or both ICs are <b>short</b> (5-6 words or fewer):',
          { ex: 'Ex3', lines: [
            ['Mr. Prinz is a jerk so everyone hopes he will quit.', 'OK to omit comma: short IC.', 'ok'],
            ['Mr. Prinz is a jerk, so everyone hopes he will quit.', 'Also OK, of course.', 'ok']
          ] },
          { h: '3-1f. Exception 2: Contrast commas' },
          'It’s always possible to <u>insert a comma before <b>but</b> and <b>yet</b></u>, even if your sentence does not contain two ICs because English allows you to place a comma between <u>two contrasting ideas</u>:',
          { ex: 'Ex4', lines: [
            ['I tried to help Matt, even though I hated him.', 'Commas aren’t typically used in IC DC sentences—independent then dependent clause. But it’s OK to use a comma before the contrast phrase <b>even though</b>.']
          ] },
          { ex: 'Ex5', lines: [
            ['Tad wanted to defend himself<b>, but</b> lacked fighting skills.', 'OK because <b>but</b> is a contrast word (even though commas aren’t typically used in “IC, but V” sentences)', 'ok'],
            ['Tad wanted to defend himself <b>but</b> lacked fighting skills.', 'Also OK, of course.', 'ok']
          ] }
        ]
      },
      {
        kind: 'quiz', id: '3A', short: 'Practice 3A', title: 'Practice 3A — 3-1a~f 규칙', page: 'p.13',
        options: OP, legend: OP_LEG,
        instr: '<b>PRACTICE 3A:</b> <span class="circ">Circle</span> any punctuation errors you find in the sentences. On the line provided, write <b>PUNCT</b> when you find an error, or write <b>OK</b> if the sentence is correct. You don’t have to correct the sentences, which focus only on rules 3-1a~f.',
        ko: NOTE_PUNC + 'IC가 몇 개인지, 접속 방법이 올바른 패턴인지 확인하세요.',
        example: { q: 'ExA. Even though I didn’t feel ready, I had to go on stage and perform, I wish I had two more days to practice.', a: 'PUNC', why: 'I had to … perform, I wish … → IC, IC (콤마 스플라이스).' },
        items: [
          { q: 'The concert ended late, and I had to work early the next day, so I was eager to get home and get to bed.', a: 'OK', why: 'IC, and IC, so IC — 각각 완전한 IC 사이에 “콤마 + FANBOYS”. 올바른 패턴 (a).' },
          { q: 'The hockey fans cheered and sang, their joyful voices filling the arena.', a: 'OK', why: 'IC, + 수식어(their joyful voices filling the arena) — 콤마 뒤는 IC가 아니라 수식어이므로 run-on이 아님. (cheered and sang은 S V and V)' },
          { q: 'Finish the test quickly; even if you think you’re being sloppy.', a: 'PUNC', why: '세미콜론 오른쪽은 “even if you think …” — DC(종속절)라서 IC가 아님. 세미콜론은 IC와 IC 사이에만. (콤마나 없는 연결이 필요)' },
          { q: 'The opening ceremony lasted more than three hours yet it felt to me like it was over all too soon.', a: 'PUNC', why: '양쪽이 완전한 IC(ceremony lasted / it felt)이고 길어서 예외(3-1e)도 아님 → “hours<b>,</b> yet”처럼 콤마가 필요.' },
          { q: 'I had planned to visit Italy in the summer, however I was forced to reschedule by a sudden family problem.', a: 'PUNC', why: 'however는 fancy conjunction(Ref C) — IC, however IC는 오류. “summer<b>;</b> however<b>,</b> I was …”처럼 세미콜론이 필요.' }
        ]
      },
      {
        kind: 'learn', id: '3-2', short: '3-2 콜론', title: '3-2. Colons', page: 'p.13',
        ko: '콜론 왼쪽은 반드시 IC(마침표로 끊을 수 있어야 함), 오른쪽은 설명하는 list 또는 IC.',
        blocks: [
          { box: ['<b>Somewhere on the left side of a colon, we need an <u>IC</u>; on the right side, we need an <u>explanatory list or IC</u>.</b>'] },
          'Follow these two steps to identify errors:',
          { list: [
            'First, focus on the left side (before the colon). Temporarily ignore everything <u>after</u> the colon and ask, <mark>“Can I use a period to end the sentence here, where the colon is located?”</mark> If <u>NO</u>—the colon is WRONG. If <u>YES</u>—continue to the next step.',
            'Well-used colons are used after sentences that provoke curiosity; they cause a reader to ask a question. The information on the right side, after the colon, must <u>answer that question</u>. <mark>“Does the information after the colon provide an explanation in the form of a <u>list</u> (including a one-item list!) or <u>another IC</u>?”</mark> If <u>NO</u>—the colon is WRONG. If <u>YES</u>—the colon is used correctly, just like we see here:'
          ], ol: true },
          { ex: 'Ex6', lines: [
            'The lab announced something surprising<b>:</b> five new antibiotics were discovered in less than a year.',
            'The lab director described two new projects she intended to pursue<b>:</b> a gene drive mechanism that could be used to fight bacterial epidemics and a new, more accurate blood diagnostic tool.',
            'She lamented, however, that one thing was limiting her lab’s progress<b>:</b> insufficient funding.'
          ] },
          'The above sentences correctly use <b>an IC, then a colon, then an explanatory IC or list</b> (with 1 or more items).'
        ]
      },
      {
        kind: 'learn', id: '3-3', short: '3-3 삽입구', title: '3-3. Punctuation goes on both sides of grammatically non-essential info', page: 'p.13',
        ko: '필수 정보는 구두점 없음, 부가(비필수) 정보는 양쪽에 같은 짝의 구두점(콤마·대시·괄호). 주어 앞 비필수 정보는 콤마 하나.',
        blocks: [
          'Use <u>no commas/dashes at all</u> when an interrupting phrase is <b>essential</b> to the sentence. But if an interrupting phrase contains extra, <b>non-essential</b> information, use commas/dashes/parentheses on <u>both sides</u> of the phrase:',
          { ex: 'Ex7', lines: [ 'My dad<b>—</b>not otherwise a very skilled athlete<b>—</b>once bowled a perfect game.' ] },
          'Instead of dashes, commas or parentheses also could be used in the sentence above. The SAT won’t require you to know usage differences between these 3 marks; you’re tested only on whether the marks <b>match</b> each other:',
          { ex: 'Ex8', lines: [ ['Aunt Vera<b>—</b>normally a fancy dresser<b>,</b> surprised us by showing up in PJs.', 'WRONG: punct doesn’t match', 'err'] ] },
          'If non-essential info comes <b>before the subject</b>, use only one comma (as you would in any Mod, IC sentence):',
          { ex: 'Ex9', lines: [ ['Normally a fancy dresser<b>,</b> my Aunt Vera surprised us by showing up in PJs.', 'OK', 'ok'] ] },
          { note: '<b>NOTE:</b> Even though prepositional phrases are not essential to a sentence, we don’t normally place them between commas (unless the author obviously intends a pause or there’s a contrast—as discussed in 3-1f).', kind: 'rule' }
        ]
      },
      {
        kind: 'learn', id: '3-4', short: '3-4 불필요한 콤마', title: '3-4. Unnecessary commas', page: 'p.13',
        ko: 'S와 V 사이, V와 O 사이, FANBOYS 단어 뒤, 전치사구 앞/뒤에는 콤마 하나를 쓰지 않는다.',
        blocks: [
          'A few rules about <u>unnecessary, incorrect commas</u> are emphasized on the SAT:',
          { list: [
            'Don’t use a single comma between an <b>S and a V</b> (or between a <b>V and an O</b>).',
            'Don’t use a single comma after a <b>FANBOYS word</b>.',
            'Don’t use a comma before (or after) a <b>prepositional phrase</b>.',
            'See “Conjunctions, Transitions, &amp; Connectives” (Lesson 12) for more on how to punctuate transition words/phrases.'
          ], ol: true },
          { ex: 'Ex10', lines: [
            ['The man who came to the store<b class="circ">,</b> was a stranger.', 'S–V 사이 콤마', 'err'],
            ['I tried to help my sister move into her new home, but<b class="circ">,</b> she was already done by the time I arrived.', 'FANBOYS 뒤 콤마', 'err'],
            ['Celina had been sitting<b class="circ">,</b> on the sofa<b class="circ">,</b> for far too long.', '전치사구 앞뒤 콤마', 'err']
          ] },
          'The three sentences above illustrate the first three <b>unnecessary comma errors</b> described above.'
        ]
      },
      {
        kind: 'quiz', id: '3B', short: 'Practice 3B', title: 'Practice 3B — 3-2 ~ 3-4 규칙', page: 'p.14',
        options: OP, legend: OP_LEG,
        instr: '<b>PRACTICE 3B:</b> Follow the same instructions you followed in Practice 3A. The sentences below focus only on rules 3-2 to 3-4.',
        ko: NOTE_PUNC + '콜론(3-2), 삽입구 짝(3-3), 불필요한 콤마(3-4)를 점검하세요.',
        items: [
          { q: 'Even though no one had prepared for the pop quiz, everyone passed: Dr. Chaabra accidentally administered the assessment she had used in a previous unit.', a: 'OK', why: 'everyone passed(IC) 뒤 콜론, 오른쪽이 설명하는 IC → 올바른 콜론.' },
          { q: 'Even before the award was announced, most audience members were confident that Davison would win, and, they were not mistaken.', a: 'PUNC', why: 'FANBOYS(and) 뒤에 콤마를 쓰면 안 됨 (3-4 규칙 2).' },
          { q: 'The entire city has seen a revitalization: because a steady influx of companies and a well-educated workforce—thanks to the nearby college—have driven its economic growth.', a: 'PUNC', why: '콜론 오른쪽이 because로 시작하는 DC — 설명하는 list나 IC가 아님. (대시 두 개는 짝이 맞아 OK)' },
          { q: 'The dog’s owner hadn’t mentioned any reward in the posters about his dog, and so I was pleasantly surprised to be given $100 when I located and brought home his lost beagle.', a: 'OK', why: 'IC, and IC — 양쪽이 완전한 IC라 “콤마 + and”가 올바름. (and so 뒤에 콤마 없음)' },
          { q: 'Before being hung to dry, the photograph is dipped into a fixing agent which stops the chemical reaction.', a: 'PUNC', why: 'which 이하는 부가 설명(비필수 정보)이라 앞에 콤마가 필요: “a fixing agent<b>,</b> which stops the chemical reaction”. (손필기도 PUNC, 앞부분 “Before being hung to dry”는 MOD로 표시해 올바른 수식어임을 확인)' }
        ]
      },
      {
        kind: 'quiz', id: '3C', short: 'Practice 3C', title: 'Practice 3C — Lesson 3 전체 규칙', page: 'p.14',
        options: OP, legend: OP_LEG,
        instr: '<b>PRACTICE 3C:</b> Follow the same instructions you followed above. These sentences cover <b>all the rules from Lesson 3</b>.',
        ko: NOTE_PUNC + '3-1 ~ 3-4 규칙을 모두 섞어 점검합니다.',
        items: [
          { q: 'The diplomats quickly reached an agreement on trade but were unable to agree on issues such as: defense, contributions to a regional security force, and intellectual property.', a: 'PUNC', why: '콜론 왼쪽 “…issues such as”는 IC가 아님(마침표로 끊을 수 없음) → 콜론 삭제.' },
          { q: 'The beginner’s manual contains few technical terms; however, the advanced manual is full of jargon.', a: 'OK', why: 'IC; however, IC — 올바른 패턴 (c).' },
          { q: 'Equipment failures and labor strikes delayed the submarine’s completion; a small team of naval engineers thus, had to complete the project, on their own with limited resources.', a: 'PUNC', why: 'thus 뒤에만 콤마(짝 불일치: “engineers, thus, had” 또는 콤마 없이) + “project<b>,</b> on their own”은 전치사구 앞 불필요한 콤마.' },
          { q: 'Video games are sold with a variety of parental advisory ratings, for example an “A” rating indicates that a game is violence-free and suitable for all ages while a “MA” rating indicates that a game is violent and intended for adults.', a: 'PUNC', why: 'IC, for example IC — for example은 fancy conj. 계열이라 콤마만으로 연결하면 run-on: “ratings<b>;</b> for example<b>,</b> an …”.' },
          { q: 'The negotiators worked to gain approval for the contract, then they sat down to work out a final agreement.', a: 'PUNC', why: 'IC, then IC — then은 FANBOYS가 아님(접속부사) → 콤마 스플라이스. “and then” 또는 세미콜론 필요.' },
          { q: 'The author wanted people of all income levels to be able to read her book; toward that end, she insisted that the book be sold for less than five dollars.', a: 'OK', why: 'IC; (toward that end,) IC — 세미콜론 + 전환 표현 + 콤마. 올바름.' },
          { q: 'These underwater caves were created over thousands of years, their deepest depths slowly forming as a result of physical and chemical processes.', a: 'OK', why: 'IC, + 수식어(their deepest depths slowly forming …) — IC와 수식어를 콤마로 잇는 구조라 올바름.' },
          { q: 'The visitors were extremely eager to see the exhibit but also were polite and well mannered; they filed in and out of each room quietly, took notes, and then enthusiastically chatted about it in the museum café.', a: 'OK', why: 'IC; IC. 첫 IC는 S V but V (콤마 없음), 둘째 IC는 V, V, and V 리스트 → 모두 올바름.' },
          { q: 'Gradually, the dense rock such as basalt and shale, formed deep beneath ocean plates, buried the lighter rocks such as dolomite and granite.', a: 'OK', why: '“formed deep beneath ocean plates”가 양쪽 콤마로 짝이 맞는 삽입구. S–V 사이 콤마 문제 없음.' },
          { q: 'While working at the theme park, I had to wear an enormous bear costume and I was told to keep it on even if I became ill and vomited.', a: 'PUNC', why: 'I had to wear … costume / I was told … — 긴 IC 둘이 and로 연결 → “costume<b>,</b> and I was told”처럼 콤마 필요 (3-1d, 짧은 IC 예외 아님).' }
        ]
      },
      {
        kind: 'quiz', id: 'C13', short: 'Cumulative 1–3', title: 'Cumulative Practice 1–3', page: 'p.15',
        options: ['OK', 'FRAG', 'MOD', 'PUNC'],
        legend: { OK: '오류 없음', FRAG: 'Fragment error — IC가 없음', MOD: 'Modifier error — 수식어가 엉뚱한 주어를 꾸밈', PUNC: 'Punctuation error — 구두점 오류' },
        instr: 'If the sentence is correct, write <b>OK</b> on the line provided. Otherwise, write <b>FRAG</b> when you see sentence fragments, and label <b>MOD</b> errors (just as you did in Cumulative Practice 1–2). If you find a punctuation error, circle the incorrect marks (or place in the sentence where punctuation is needed) and write <b>PUNC</b> on the line provided.',
        ko: '필기: IC, FANBOYS IC / IC ; IC / IC ; (f.c), IC / S V and V but V — 연결 패턴을 먼저 떠올려 보세요.',
        items: [
          { q: 'Without consulting a lawyer, Sam’s chances of winning her lawsuit against the company are slim.', a: 'MOD', why: '“Without consulting a lawyer”의 주체는 사람인데 뒤 주어는 Sam’s chances (소유격 Sam은 주어 아님).' },
          { q: 'The social service bureau hoped that / by revamping its database, significant improvements could be made.', a: 'MOD', why: 'fake beginning(hoped that) 뒤 “by revamping its database”의 주체는 사람인데 주어는 improvements.' },
          { q: 'Though the platypus is often portrayed as a cute, quirky oddity of nature, the male has a surprising appendage that can be used to attack predators, venomous claws on its hind legs.', a: 'OK', why: 'DC, IC 구조 올바름. 끝의 “venomous claws on its hind legs”는 appendage를 설명하는 동격(appositive) → 콤마 OK.' },
          { q: 'My stepbrother told me that / before deciding to apply to law school, his attitude about the legal profession had been strongly negative.', a: 'MOD', why: '“before deciding to apply”의 주체는 사람인데 주어는 his attitude.' },
          { q: 'Because of our last-minute booking, we didn’t expect much from the hotel room we reserved, but we were pleasantly surprised by what we found: our room had a panorama view of the beach and a fully stocked kitchen.', a: 'OK', why: '“Because of our last-minute booking”은 전치사구(수식어) — 뒤 주어 we와 자연스러움. IC, but IC / 콜론 뒤 설명 IC 모두 올바름.' },
          { q: 'Although usually praised for her musical compositions, Jean-Marie Diderot was also an accomplished film and stage actress.', a: 'OK', why: '“Although usually praised …”의 대상 = 주어 Jean-Marie Diderot → 올바름.' },
          { q: 'After the stressful ordeal, the backpackers were relieved to be safely at home and uninjured but were annoyed at all the misinformation being reported about their wilderness misadventure.', a: 'OK', why: 'S(the backpackers) V(were relieved) but V(were annoyed) — 콤마 없이 연결(3-1c d). After the stressful ordeal은 전치사구라 MOD 불가.' },
          { q: 'Before graduating from high school, Melinda had already published two collections of poetry, thus we were surprised when she decided to study materials engineering in college.', a: 'PUNC', why: 'IC, thus IC — thus는 fancy conj → 콤마 스플라이스. “poetry<b>;</b> thus<b>,</b> we were …” 필요. (MOD는 OK: Melinda가 졸업)' },
          { q: 'The executives hoped that / by opening a new call center, customer complaints could be more quickly addressed.', a: 'MOD', why: '“by opening a new call center”의 주체는 사람인데 주어는 customer complaints.' },
          { q: 'Diplomats at the conference didn’t expect much progress to be made; since harsh words had been exchanged by both sides in the media for months before the event was held.', a: 'PUNC', why: '세미콜론 오른쪽 “since harsh words had been exchanged …”는 DC(IC 아님) → 세미콜론을 콤마로(또는 삭제).' },
          { q: 'Already damaged by the recent earthquake, the industrial center was further damaged by a torrential rain storm and had to be demolished.', a: 'OK', why: '“Already damaged by the recent earthquake”는 the industrial center를 올바르게 설명. S V and V (콤마 없음).' },
          { q: 'A report published jointly by two newspapers recently revealed something surprising about frozen packaged meats: nearly half of all poultry sold to consumers in the metropolitan area contains traces of potentially dangerous E. coli bacteria.', a: 'OK', why: '콜론 왼쪽 IC, 오른쪽 설명 IC → 올바름. (published jointly by …는 report를 꾸미는 과거분사 수식어)' },
          { q: 'In spite of all the problems, one extremely positive development: student satisfaction—according to an independent administered survey—was significantly higher than it had been one year earlier.', a: 'PUNC', why: '콜론 왼쪽 “In spite of all the problems, one extremely positive development”는 IC가 아님(동사 없음) → 콜론 삭제.' },
          { q: 'Having completed its research on the new propulsion method, the engineering team—comprised entirely of combat veterans, was optimistic that its patent application would be approved.', a: 'PUNC', why: '삽입구가 대시(—)로 열려 콤마(,)로 닫힘 → 짝이 안 맞음 (3-3). (Having completed는 team을 올바르게 설명)' },
          { q: 'The MacArthur Foundation—perhaps most famous for awarding so-called “genius grants,” is also a major supporter of nonprofit media.', a: 'PUNC', why: '삽입구가 대시(—)로 열렸는데 닫는 대시가 없음(콤마로 마무리) → 짝 불일치.' }
        ]
      }
    ]
  });
})(window.SAT_DATA);

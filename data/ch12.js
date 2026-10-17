/* Lesson 12. Conjunctions, Transitions, & Tricky Connectives (교재 pp.37–41) */
(function (D) {
  var OPC = ['OK', 'PUNC', 'CONJ'];
  var OPC_LEG = { OK: '오류 없음', PUNC: 'Punctuation error — 콤마·세미콜론·콜론·대시 오류', CONJ: 'Conjunction/Transition error — 접속사·접속부사 쓰임 오류' };
  var NOTE_KEY = '※ 교재 정답지는 사진에 없어서, 손필기 답과 규칙(12-1~12-7)을 함께 대조해 정리한 답이에요. 교재의 PUNCT는 이 앱에서 PUNC로 통일했어요.';

  D.chapters.push({
    id: 'L12', order: 12, no: 'L12', short: 'Conjunctions', title: 'Lesson 12. Conjunctions, Transitions, & Tricky Connectives',
    ko: '접속사·접속부사의 콤마 규칙과 뜻: 대조·추가·결과·예시·시간·양보, 그리고 whereby / wherein / as such / all but 같은 까다로운 연결어',
    parts: [
      {
        kind: 'learn', id: '12-1', short: '12-1 대조', title: '12-1. Contrasts', page: 'p.37',
        ko: '외워야 하는 단원. A(but/nor/yet/if) · B(however 등 “fancy”) · C(despite 등: 뒤에 명사구) · D(although 등: 뒤에 절). though는 문장 앞에선 although, 중간/끝에선 however처럼. whereas는 서로 다른 주어의 대조.',
        blocks: [
          'The following information simply needs to be memorized—especially important reminders in the boxes.',
          { table: { head: ['', '대조 표현'], rows: [
            ['<b>A</b>', 'but, nor, yet, if'],
            ['<b>B</b>', 'alternatively, at the same time, contrarily, conversely, even so, however, in contrast, instead, nevertheless, nonetheless, on the other hand, on the contrary, rather, still, though, while this may be true'],
            ['<b>C</b>', 'despite, in spite of, notwithstanding'],
            ['<b>D</b>', 'although, even though, though, <u>whereas</u>, while']
          ] } },
          { h: 'A. FANBOYS 단어 (but, nor, yet, if)' },
          'Never put a single comma immediately <u>after</u> these words. Use commas <u>before</u> FANBOYS conjunctions only if they join two independent clauses (see Lesson 3 &amp; Reference B):',
          { ex: '예문', lines: [
            'Public humiliation can be a cruel but effective teaching tool.',
            'Dr. Jones was a well known composer<b>, but</b> her politician husband was virtually unknown outside of Kansas.'
          ] },
          { note: 'Aside from its use in conditional statements, <b>if</b> can also be used to mean <b>although</b>:<br>The doctor relied on methods that were traditional, <b>if</b> not always helpful. (= … although not always helpful)<br>The widely-studied, <b>if</b> often misunderstood, phenomenon continued to fascinate people.<br><b>If</b> the first film in the trilogy was popular with critics, the final film was the biggest moneymaker for the studio.', kind: 'rule', title: 'if = although' },
          { h: 'B. Put a comma after these words/phrases' },
          { ex: '예문', lines: [
            'Words alone may not physically hurt us; <b>however,</b> online bullying has driven some people to commit suicide.',
            'Political radicals are often criticized for their extreme ideas. <b>At the same time,</b> they are also often posthumously lauded for their vision.'
          ] },
          { note: '<b>About <i>however</i>:</b><br>• However can start clauses and can also be used in the middle or end of sentences: Most problems were solved. Land reform<b>, however,</b> continued to vex policymakers. / …continued to vex policymakers<b>, however</b>.<br>• However can also be used to mean <i>no matter how</i>: <b>However</b> hard she tried, Melinda was unable to break her earlier record in the 500-meter race.', kind: 'tip' },
          { note: 'It’s fine to use <b>nevertheless</b> (without commas) in a sentence that already has a contrast word: I asked Sam not to tell my secret, <b>but</b> he <b>nevertheless</b> shared it with the whole school.', kind: 'tip' },
          { h: 'C. Use noun phrases—never clauses—after these words' },
          { ex: '예문', lines: [
            'Despite <s>he was popular</s> <b>his international popularity</b>, Michael Jackson rarely was happy in his personal life.',
            '<b>In spite of the fact that</b> he was a pop superstar, Michael Jackson suffered from depression.'
          ] },
          { h: 'D. These phrases must precede clauses—except although (which can introduce nouns/modifiers)' },
          { ex: '예문', lines: [
            '<s>Even though</s> <b>Although</b> an accomplished pianist, Chopin is more famous as a composer.',
            'Although he was an accomplished pianist, Chopin is more famous as a composer.'
          ] },
          { note: 'As the first word of a clause, <b>though</b> is just a way to say <i>although</i>. Punctuate it the same way:<br><s>Though,</s> Though my parents grew up in Brazil, they don’t speak Portuguese fluently.<br>When placed in the middle or end of a clause, <b>though</b> is used (and punctuated) like <i>however</i>: Power outages were always a problem. They worsened<b>, though,</b> when the fuel shortages became severe.', kind: 'rule', title: 'though' },
          { note: '<b>Whereas</b> should be used to make contrasts between <u>two different subjects</u>:<br>Whereas Dave is a fan of jazz, his roommate prefers classic rock.<br><s>Whereas</s> <b>Although</b> Dave is a fan of jazz, he rarely has time to enjoy any. (같은 주어 Dave → although)', kind: 'rule', title: 'whereas' }
        ]
      },
      {
        kind: 'quiz', id: '12A', short: 'Practice 12A', title: 'Practice 12A — 대조 접속어', page: 'p.38',
        options: OPC, legend: OPC_LEG,
        instr: '<b>PRACTICE 12A:</b> Identify any conjunction or punctuation related errors in the sentences below. You’ll need to consider context and structures. Label each sentence with <b>PUNCT, CONJ,</b> or <b>OK</b>, as appropriate.',
        ko: NOTE_KEY,
        example: { q: 'ExB. Everyone in town complained about the noise; notwithstanding, there was nothing we could do.', a: 'CONJ', why: 'notwithstanding은 C그룹(뒤에 명사구) — “notwithstanding the complaints”처럼 쓰거나 “however”가 필요. ※ ExA는 OK: “…, but I nevertheless cried…”' },
        items: [
          { q: 'Whereas I know what’s wrong with the hardware, I don’t have the cash to fix it right now.', a: 'CONJ', why: 'whereas는 서로 다른 두 주어의 대조 → 같은 주어 I이므로 Although.' },
          { q: 'If the first book in the series was uplifting and fun, the last one was somber and depressing.', a: 'OK', why: 'if = although (대조) — 올바른 용법.' },
          { q: 'The math class was a total waste of time; I could not however easily drop the course.', a: 'PUNC', why: 'however가 절 중간에 끼어들었으니 양쪽 콤마 필요: “I could not<b>, however,</b> easily drop …”. Reference C의 예문 “I did not, however, mention …”과 같은 자리예요. (손필기도 PUNCT, 교재에 수정 표시 없음)' },
          { q: 'Despite, the obvious problems with the airplane, the inspector somehow deemed it safe to fly.', a: 'PUNC', why: 'Despite 바로 뒤에 콤마를 쓰면 안 됨(단일 콤마 금지).' }
        ]
      },
      {
        kind: 'learn', id: '12-2', short: '12-2 추가', title: '12-2. Adding information', page: 'p.38',
        ko: 'E(and) = FANBOYS 규칙 · F/G(furthermore, likewise 등) = 뒤에 콤마를 찍거나 문장 중간에서 콤마 없이 · H(too, also) = 콤마 선택, 절의 맨 앞에는 also를 피하기.',
        blocks: [
          { table: { head: ['', '표현'], rows: [
            ['<b>E</b>', 'and'],
            ['<b>F</b>', 'furthermore, further, moreover, in addition'],
            ['<b>G</b>', 'likewise, similarly, in the same way, in a similar vein, in [a] like manner/fashion, equally important, by the same token, along these [same] lines'],
            ['<b>H</b>', 'too, also']
          ] } },
          { h: 'E. FANBOYS rule (same as A in rule 12-1 above)' },
          { ex: '예문', lines: [
            'Ride sharing reflects changing attitudes about cars <b>and</b> is increasingly popular among young people.',
            'Mental illness was once highly stigmatized<b>, and</b> in many places it still is.'
          ] },
          { h: 'F–G. Put commas after the words in F &amp; G or insert them without any commas at all' },
          { ex: '예문', lines: [
            'Tamara has an advanced degree in psychopharmacology. <b>In addition,</b> she is a practicing surgeon.',
            'Young apprentices often rebelled against their masters. <b>Likewise,</b> many teenagers rebel against their parents.',
            'Young people often wish they were adults, and old people <b>likewise</b> often wish they could be young again.'
          ] },
          { note: 'Put a comma after <b>in addition</b> when it begins a clause; otherwise it can be used w/out a comma:<br>The war caused irreparable damage to the historical site; <b>in addition,</b> it destroyed the tourism industry.<br>The war caused irreparable damage to the historical site <b>in addition to</b> destroying the tourism industry.', kind: 'rule' },
          { h: 'H. Commas are optional with <i>too</i> and <i>also</i>. Avoid beginning clauses with <i>also</i>.' },
          { ex: '예문', lines: [
            'London is known for its often rainy weather. The city is <b>also</b> known for its pubs.',
            'London is known for its often rainy weather. Seattle <b>too</b> is known for its rainy weather.',
            '&nbsp;&nbsp;&nbsp;OR &nbsp;Seattle<b>, too,</b> is known for its rainy weather.',
            '&nbsp;&nbsp;&nbsp;OR &nbsp;Seattle is known for its rainy weather<b>, too</b>.'
          ] }
        ]
      },
      {
        kind: 'learn', id: '12-3', short: '12-3 결과', title: '12-3. Showing consequence or result', page: 'p.38',
        ko: 'I(for, so) = FANBOYS · J(accordingly, consequently, thus, therefore, hence) = 콤마로 감싸거나 동사 안에선 콤마 없이 · K(because, since, due to) = 앞뒤에 콤마 쓰지 않기.',
        blocks: [
          { table: { head: ['', '표현'], rows: [
            ['<b>I</b>', 'for, so'],
            ['<b>J</b>', 'accordingly, consequently, thus, therefore, hence <small>(always with commas: as a result, for this reason)</small>'],
            ['<b>K</b>', 'because, since, due to']
          ] } },
          { h: 'I. FANBOYS rule (same as A &amp; E above in 12-1 and 12-2)' },
          { ex: '예문', lines: [ 'Burial costs are rising dramatically<b>, so</b> many families are now considering cremation.' ] },
          { h: 'J. Put commas around these words, or insert them with no commas at all (esp before/in verbs)' },
          { ex: '예문', lines: [
            'Burial costs are rising dramatically; <b>thus,</b> many families are now considering cremation.',
            'Burial costs are rising dramatically; many families are <b>thus</b> now considering cremation.'
          ] },
          { h: 'K. Commas should not be used before or after these words' },
          { ex: '예문', lines: [
            'Career counselors encourage many to consider alternatives to four-year colleges <b>because of</b> rising costs.',
            'My counselor recommended an internship <b>because</b> it would help me in my hunt for jobs later.'
          ] }
        ]
      },
      {
        kind: 'learn', id: '12-4', short: '12-4 예시', title: '12-4. Clarifying, restating, or setting up examples', page: 'p.39',
        ko: 'L(for example 등) = however처럼 앞·중간·끝 · M(such as, including, like) = 지워도 되는 구라면 앞뒤 콤마 · N(namely) = 뒤 콤마 선택. 콜론으로도 같은 의미를 표현할 수 있다.',
        blocks: [
          { table: { head: ['', '표현'], rows: [
            ['<b>L</b>', 'for example, for instance, to illustrate, in other words, in short, in particular, specifically, that is [to say], again, in fact, indeed, after all, sure enough, true to form'],
            ['<b>M</b>', 'such as, including, like'],
            ['<b>N</b>', 'namely <small>[Archaic: to wit, viz. You might see these used in historical passages—not in the W section]</small>']
          ] } },
          { h: 'L. Use these phrases like <i>however</i>: at the beginning or end of a sentence/clause, or as a mid-sentence interrupter' },
          { ex: '예문', lines: [
            'I have many sources of stress; <b>for example,</b> my parents nag me and my classmates bully me.',
            'I have many sources of stress. <b>For example,</b> my parents nag me and my classmates bully me.',
            'Many vegetables contain protein. Lentils<b>, for example,</b> contain about half the amount of protein as salmon.'
          ] },
          { h: 'M. Commas are used before &amp; after phrases starting with these words <u>if the words can be deleted</u> from the sentence' },
          { ex: '예문', lines: [
            'In the garden, there were many beautiful orchid varieties<b>, such as</b> Phalaenopses, Brassias, and lady slippers.',
            'Moments <b>such as</b> these make me happy to be alive. <span class="sm">(필수 정보라 콤마 없음)</span>'
          ] },
          { h: 'N. Commas are optional after these words' },
          { ex: '예문', lines: [
            'The king, normally very prudent, had only one weakness<b>, namely</b> his love of wine.',
            '&nbsp;&nbsp;OR: …only one weakness, <b>namely,</b> his love of wine.',
            '&nbsp;&nbsp;OR: …only one weakness—<b>namely,</b> his love of wine.'
          ] },
          { note: 'Remember that you can use a <b>colon</b> to communicate the same thing as L, M, and N: The king allowed himself only one luxury<b>:</b> expensive French wine.', kind: 'tip' }
        ]
      },
      {
        kind: 'learn', id: '12-5', short: '12-5 시간·공간', title: '12-5. Showing time/space relationships', page: 'p.39',
        ko: 'O(first/next/finally, afterward, at last, soon, meanwhile, then …) = 절 앞에서는 콤마 허용(필수 아님), 절 중간에 넣을 땐 콤마 생략.',
        blocks: [
          { box: [ '<b>O.</b> first/second/etc., first/next/last/finally/etc., in the second place, afterward(s), at last, at length, at first, formerly, finally, soon, in time, meanwhile, at the same time, then, once, for a minute/hour/day/etc., during the morning/day/week/etc., in front of X, behind X, in the distance, within sight…' ] },
          { p: '<b>O. Commas are allowed but not required</b> for these words when they begin clauses; <u>omit commas if you drop these words in the middle of a clause</u>:' },
          { ex: '예문', lines: [
            'Because of her illness’ rapid spread, she was <b>soon</b> unable to drive.',
            'Her illness spread rapidly. <b>Soon,</b> she was unable to drive.',
            'Her illness spread rapidly. <b>Soon</b> she was unable to drive.'
          ] }
        ]
      },
      {
        kind: 'learn', id: '12-6', short: '12-6 양보', title: '12-6. Making concessions/qualifying statements', page: 'p.39',
        ko: 'P(admittedly, of course, to be sure, that said …) = 뒤에 콤마를 쓴다.',
        blocks: [
          { box: [ '<b>P.</b> admittedly, at any rate, granted, naturally, no doubt, of course, to be sure, that [being] said, then again, while it may be true' ] },
          { p: '<b>P. Use commas after these words:</b>' },
          { ex: '예문', lines: [ 'Monotheism first appeared in Ancient Egypt; <b>of course,</b> religion was practiced very differently in the ancient world, so it’s difficult to directly compare the monotheism of Egypt with that of modern world religions.' ] }
        ]
      },
      {
        kind: 'quiz', id: '12B', short: 'Practice 12B', title: 'Practice 12B — 12-1 ~ 12-6 종합', page: 'p.39',
        options: OPC, legend: OPC_LEG,
        instr: '<b>PRACTICE 12B:</b> Label each sentence with <b>PUNCT, CONJ,</b> or <b>OK</b>. These problems cover all previous Lesson 12 rules.',
        ko: NOTE_KEY,
        items: [
          { q: 'I had only two passionate interests when I was a young man—namely, music and movies.', a: 'OK', why: 'N: namely 앞 대시, 뒤 콤마(선택) → 올바름.' },
          { q: 'Although the temperature was fine, we stayed inside because, the air quality was so poor.', a: 'PUNC', why: 'K: because 뒤에 콤마를 쓰면 안 됨.' },
          { q: 'I may not be the best tennis player at my school, of course, I’m also not the worst.', a: 'PUNC', why: 'IC, of course, IC → 콤마 스플라이스. “school; of course, I’m …” (P: of course 뒤 콤마)' },
          { q: 'Sturdy wood such as oak or pine, should be used for the table you’re planning to build.', a: 'PUNC', why: 'M: such as 구가 필수 정보라 콤마가 없어야 하고(또는 앞뒤 둘 다), 콤마 하나만 쓰면 S-V 사이 단일 콤마.' },
          { q: 'Tim always has a hard time waking up for school; true to form, he slept through five alarms yesterday.', a: 'OK', why: 'L: true to form + 콤마 → 올바름.' },
          { q: 'Despite I was the worst student at the start of the year, I now have a very high grade.', a: 'CONJ', why: 'C: Despite 뒤에는 명사구 → Although I was … 또는 Despite being …' }
        ]
      },
      {
        kind: 'learn', id: '12-7', short: '12-7 까다로운 연결어', title: '12-7. Various tricky connectives', page: 'p.40',
        ko: 'whereby · wherein · 전치사+which · in that · as such(≠therefore) · so to speak · anything but · all but · inasmuch as / insofar as — 뜻을 외우기.',
        blocks: [
          { note: '필기: <b>Setup words for fancy RC</b> (Q, R, S는 “fancy 관계절” 만드는 말)', kind: 'tip' },
          { h: 'Q. [noun method/process/system] whereby / by which [clause describing that method/process/etc]' },
          { ex: '예문', lines: [ 'The agency hires employees using a method <b>whereby</b> applicants must pass tests and submit a portfolio.' ] },
          { h: 'R. N wherein S V = N in which S V' },
          { ex: '예문', lines: [
            'I enjoyed the conclusion of the book, <b>wherein</b> the protagonist finally realizes her goals.',
            'I enjoyed the conclusion of the book, <b>in which</b> the protagonist finally realizes her goals.'
          ] },
          { h: 'S. N [prepo] which S V = N that S V [prepo]' },
          { ex: '예문', lines: [
            'The chair <u>on</u> which I sat felt unstable. &nbsp;=&nbsp; The chair that I sat <u>on</u> felt unstable.',
            'The place <u>to</u> which I was heading was school. &nbsp;=&nbsp; The place that I was heading <u>to</u> was school.'
          ] },
          { h: 'T. [clause] in that [explanation/clarification of the clause]' },
          { ex: '예문', lines: [ 'Aside from physical risks, military service is a financial sacrifice <b>in that</b> young people must give up several years of income, thus delaying career advancement for several years.' ] },
          { h: 'U. [...NOUN.] As such, … (= as [that just-mentioned NOUN]…,)' },
          { note: '필기: <b>As such does NOT mean therefore!</b> (if “therefore” → CONJ 오류)', kind: 'warn' },
          { ex: '예문', lines: [
            'Sarah is the superintendent. <b>As such,</b> she must make many difficult decisions. <span class="sm">(As superintendent…)</span>',
            'The helots were slaves of the Spartans and were thus treated <b>as such</b>. <span class="sm">(…treated as slaves.)</span>'
          ] },
          { h: 'V. […something], so to speak, … = something is a metaphor, not literally true' },
          { ex: '예문', lines: [ 'Our teacher can be a slave driver, <b>so to speak</b>, but she is also very effective. <span class="sm">(= as it were, less commonly)</span>' ] },
          { h: 'W. anything but X = by no means X = far from X = definitely not X' },
          { ex: '예문', lines: [ 'The advanced physics class was <b>anything but</b> easy. <span class="sm">(The class was very hard!)</span>' ] },
          { h: 'X. all but X = almost X (or everyone except X)' },
          { ex: '예문', lines: [
            'Jeannie was <b>all but</b> finished with her dissertation when her computer crashed. <span class="sm">(She was almost finished.)</span>',
            '<b>All but</b> the most irresponsible students wrote the essay in advance. <span class="sm">(Everyone except the irresponsible kids)</span>'
          ] },
          { h: 'Y. Inasmuch as A, B = Insofar as A, B = To the degree/extent that A, B ≈ The more A, the more B' },
          { ex: '예문', lines: [
            'The economy looks like it will improve, <b>inasmuch as</b> we can predict the future. <span class="sm">(The future looks good, as far as we can tell.)</span>',
            '<b>Insofar as</b> it advantaged him to follow the rules, he did so. <span class="sm">(He ignored and followed the rules to the degree that he thought doing so would help him.)</span>'
          ] }
        ]
      },
      {
        kind: 'quiz', id: '12C', short: 'Practice 12C', title: 'Practice 12C — Lesson 12 전체', page: 'p.40',
        options: OPC, legend: OPC_LEG,
        instr: '<b>PRACTICE 12C:</b> Follow the same instructions you followed in Practice 12B. These problems cover all of Lesson 12.',
        ko: NOTE_KEY,
        items: [
          { q: 'We had all but arrived at the campsite when we realized that we had forgotten to pack the tent.', a: 'OK', why: 'X: all but arrived = almost arrived. 의미가 문맥에 맞음.' },
          { q: 'It took us two additional hours to get here; because, there was unusually heavy traffic on the bridge.', a: 'PUNC', why: '세미콜론 오른쪽이 DC(because …)이고 because 뒤 콤마는 금지(K).' },
          { q: 'I was extremely tired after the hike; as such, I fell into a deep sleep as soon as I got home.', a: 'CONJ', why: 'U: as such ≠ therefore. “… ; therefore, I fell …”로 써야 함.' },
          { q: 'The platform on which the speaker was standing on looked unstable, but it didn’t collapse.', a: 'CONJ', why: 'S: “on which … standing” 이미 전치사 on이 앞에 있음 → 끝의 on이 중복(double preposition).' },
          { q: 'Our company is using a new method to record data whereby our salesforce and other staff use mobile devices to update inventory as soon as a transaction is made.', a: 'OK', why: 'Q: method whereby + 절 → 올바름.' },
          { q: 'The walk was anything but relaxing: a group of angry, mean-looking men followed us the whole time.', a: 'OK', why: 'W: anything but relaxing = 전혀 편하지 않았다. 콜론 뒤 IC가 설명.' },
          { q: 'Inasmuch as our team felt discouraged after the loss, the next day we were eager to play again.', a: 'CONJ', why: 'Y: inasmuch as = to the extent that — 문맥은 대조(Although/Even though).' },
          { q: 'Even though I didn’t learn much chemistry from Dr. Khan, I gained two things from his class; namely, an improved ability to work hard and a study group that I continue to work with even now.', a: 'PUNC', why: '세미콜론 오른쪽(namely, …)이 IC가 아님 → “class: an improved … ” 또는 “class—namely, …”.' }
        ]
      },
      {
        kind: 'quiz', id: 'C112', short: 'Cumulative 1–12', title: 'Cumulative Practice 1–12', page: 'p.41',
        options: ['OK', 'FRAG', 'MOD', 'PUNC', 'SV', 'PR', 'PL/PO', 'VT', 'N#', '//', '//ID', 'COMP', 'SUBJ', 'CONJ'],
        legend: { OK: '오류 없음', FRAG: 'Fragment error', MOD: 'Modifier error', PUNC: 'Punctuation error', SV: 'S-V agreement error', PR: 'Pronoun error', 'PL/PO': 'Plural/Possessive mix-up', VT: 'Verb Tense error', 'N#': 'Noun-number error', '//': 'Parallelism error', '//ID': 'Parallelism idiom error', COMP: 'Logical comparison error', SUBJ: 'Subjunctive mood (MOOD) error', CONJ: 'Conjunction/Transition error' },
        instr: 'Follow the same instructions you followed for the previous Cumulative Practice exercises, and keep marking the sentences to show your work. On the line provided, write <b>OK</b> or the following annotations for any errors you find: <b>FRAG, MOD, PUNC, SV, PR, PL/PO, VT, N#, //</b> (including <b>//ID</b>), <b>COMP, MOOD,</b> or <b>CONJ</b>.',
        ko: NOTE_KEY + ' 14·15번은 손필기에 “or punct / or conj”라고 적혀 있어 둘 다 정답으로 인정해요.',
        items: [
          { q: 'The family that dominated high finance in the 19th century spent most of their fortune on wine, jewelry, and expensive fine art; thus, over a century later, little of the family’s fortune remains.', a: 'PR', why: 'The family(단수) → its fortune (their 불가).' },
          { q: 'Whereas an innovative neuroscientist, Robert Cajal was praised for being a great artist.', a: 'CONJ', why: 'D: Whereas는 절 앞에서만 → Although an innovative neuroscientist (although만 명사구/수식어 가능).' },
          { q: 'The number of students who took part in the demonstrations have increased ever since the arrest of their beloved professor.', a: 'SV', why: 'The number = 단수 → has increased.' },
          { q: 'At first, the student leaders demanded that the faculty accept their new proposal, but, they eventually showed a willingness to compromise.', a: 'PUNC', why: 'A: FANBOYS but 뒤 콤마 금지 → but they eventually …' },
          { q: 'A skilled technician herself, Dr. Petrunkevitch helped her husband finish his biology research, hindered as it was by his lack of up-to-date equipment.', a: 'OK', why: '“A skilled technician herself”의 주체 = Dr. Petrunkevitch. her/his 대명사도 명확. OK.' },
          { q: 'The climax of the movie, wherein a vagabond murders the protagonist, was interpreted by critics as a nihilist rejection of the values expressed earlier in the film.', a: 'OK', why: 'R: N, wherein S V = N, in which S V. 삽입구 양쪽 콤마.' },
          { q: 'It is important that whomever arrives first be willing to unlock the conference room and set up the A/V equipment before all the clients arrive.', a: 'PR', why: 'who test: “he arrives first” → whoever. (be는 올바른 subjunctive 원형)' },
          { q: 'Computer modeling and gene therapy promise to greatly improve cancer treatments, however, it will take some time before these methods are available to the general public.', a: 'PUNC', why: 'IC, however, IC → 콤마 스플라이스. “treatments; however, it will …”' },
          { q: 'The new grading system was all but effective; in fact, nearly everyone agreed that it was a total failure.', a: 'CONJ', why: 'X: all but effective = almost effective. 문맥상 “anything but effective”.' },
          { q: 'In the cathedral, the choir rehearsed Bach’s Mass in G Minor, moving many of its listeners to tears.', a: 'OK', why: 'moving many of its listeners … — 수식어 주체 = the choir. its = choir 하나. OK.' },
          { q: 'Plummeting sales figures made several managers and I worry about the future of our company.', a: 'PR', why: 'made [managers and me] worry — 목적격 필요.' },
          { q: 'In a sermon he gave right before the holiday, the pastor has expressed his deep concerns for the people in the community who lacked adequate housing.', a: 'VT', why: 'gave·lacked(과거) — has expressed(현재) → expressed.' },
          { q: 'Jen ended her first marriage after only a month, but she nevertheless kept in touch with her ex-husband and had cordial relations with his family members.', a: 'OK', why: 'A: , but + (contrast word가 있어도) nevertheless는 콤마 없이 OK. 병렬 kept … and had …' },
          { q: 'The Burbank neighborhood is gradually being gentrified; whereby, many public housing complexes are transformed into sleek, steel-framed buildings.', a: ['CONJ', 'PUNC'], why: 'whereby는 N whereby S V 구조의 관계 연결어 → “gentrified, whereby many … ” 형태여야 함(세미콜론·콤마 부적절). 필기: or punct.' },
          { q: 'The principal decided that wearing revealing clothing should be banned from school; such as “short” shorts.', a: ['PUNC', 'CONJ'], why: '세미콜론 오른쪽 “such as ‘short’ shorts”는 IC가 아님 → 콤마/콜론으로. 필기: or conj.' }
        ]
      }
    ]
  });
})(window.SAT_DATA);

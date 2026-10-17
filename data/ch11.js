/* Lesson 11. Subjunctive verb forms (교재 pp.34–36) */
(function (D) {
  var OS = ['OK', 'SUBJ'];
  var OS_LEG = { OK: '오류 없음', SUBJ: 'Subjunctive mood (MOOD) error — 가정법 / 요구·제안 동사 뒤 동사형 오류' };
  var NOTE_KEY = '※ 교재 정답지는 사진에 없어서, 손필기 답과 규칙(11-1~11-3)을 함께 대조해 정리한 답이에요.';

  D.chapters.push({
    id: 'L11', order: 11, no: 'L11', short: 'Subjunctive', title: 'Lesson 11. Subjunctive verb forms',
    ko: '가정법: “If+과거형 … would/could/might+원형”, 과거 가정은 had p.p. … would have p.p., 요구·제안 동사 뒤 that절은 동사원형',
    parts: [
      {
        kind: 'learn', id: '11-1', short: '11-1 현재 가정', title: '11-1. Subjunctive mood if/then: present tense', page: 'p.34',
        ko: '가정법 if/then은 “일어날 가능성이 낮거나 불가능한” 행동. if절은 과거형처럼 보이지만 현재/미래 이야기, then절은 would/could/might + 동사원형. if절에 was는 쓸 수 없고 항상 were.',
        blocks: [
          'Unlike a normal (indicative mood) if/then statement (<i>If I finish my work soon, I will be able to rest</i>), a <b>subjunctive if/then statement</b> tells readers that an action being considered is <mark class="o">unlikely or impossible</mark>.',
          { h: '11-1. Subjunctive mood if/then: present tense' },
          'Subjunctive mood present tense verbs <b>sound like past tense</b> verbs. But subjunctive mood present tense is actually used to describe actions that <b>won’t/probably won’t happen now, in general, or in the future</b>:',
          { ex: 'Ex1', lines: [
            ['If I <b>become</b> an astronaut, I <b>will</b> probably spend time on the Moon.', '(normal, indicative mood)'],
            ['If I <b>became</b> an astronaut, I <b>would</b> probably spend time on the Moon.', '(subjunctive mood)']
          ] },
          'In Ex1 above, both sentences actually have identical meaning and tense. However, the second sentence suggests that the writer <b>probably won’t</b> become an astronaut. It’s possible to say the “if” half of a present subjunctive sentence three different ways: <b>If I became, Were I to become,</b> or <b>If I were to become</b>.',
          { table: { head: ['Subjunctive PRESENT “IF” — <small>LOOKS LIKE PAST TENSE BUT ISN’T!</small>', 'Subjunctive PRESENT “THEN” — <small>USES WOULD/COULD/MIGHT + [BASE VB]</small>'], rows: [
            ['If I <b>finished</b> my work soon…<br>If I <b>were to finish</b> my work soon…<br><b>Were I to finish</b> my work soon…', '…I <s>will</s> <b>would be</b> able to rest.<br>…I <s>can</s> <b>could</b> rest.<br>…I <s>may</s> <b>might be</b> able to rest.']
          ] } },
          { note: '<b>NOTE:</b> <mark>was can’t be used in a subjunctive “if” clause.</mark> Always write <b>if…were</b>, regardless of the subject:', kind: 'rule' },
          { ex: 'Ex2', lines: [ 'If I <s>was</s> <b>were</b> better at math, I would probably take more science classes.' ] },
          'It’s also wrong to shift from subjunctive IF into normal THEN. Subjunctive present tense “then” clauses are written with <b>would, might,</b> or <b>could</b> (never <i>will/may/can</i>).',
          { ex: 'Ex3', lines: [ '<b>Were</b> Cathy a little taller, she <s>can</s> <b>could</b> safely ride that roller coaster.' ] }
        ]
      },
      {
        kind: 'quiz', id: '11A', short: 'Practice 11A', title: 'Practice 11A — 현재 가정법', page: 'p.34',
        options: OS, legend: OS_LEG,
        instr: '<b>PRACTICE 11A:</b> Identify any mood errors you find and label <b>SUBJ</b> or <b>OK</b> on the line provided, as appropriate. Careful—some of sentences below may be normal (indicative mood) sentences.',
        ko: NOTE_KEY,
        example: { q: 'ExA. If Mae-lin’s teammates didn’t argue so much, they can accomplish much more.', a: 'SUBJ', why: 'if절이 subjunctive(didn’t argue)인데 then절이 can → could accomplish.' },
        items: [
          { q: 'Even if the police catch the culprit, it is unlikely that a jury would convict him or her.', a: 'SUBJ', why: 'if절은 normal(catch = 실제로 일어날 수 있는 일)인데 결과절은 would convict로 가정법 → mood가 섞임. “…, it is unlikely that a jury will convict”처럼 맞춰야 해요. (손필기: “normal” 표시 + SUBJ?) <span class="sm">※ 이 문항만 손필기에 물음표가 있었어요. would를 자연스러운 표현으로 볼 여지도 있어서 확실하진 않아요.</span>' },
          { q: 'If Gavin is willing to work a little harder, he can almost definitely improve his biology grade.', a: 'OK', why: '실현 가능한 normal(indicative) 조건문: is … → can. 일관됨.' },
          { q: 'If that equipment was to get damaged, you would be responsible for repairing or replacing it.', a: 'SUBJ', why: 'was to → were to (가정법 if절에는 was 불가).' },
          { q: 'Were Felicia just a little bit faster when running long races, she certainly could be team captain.', a: 'OK', why: 'Were + S … → could be. 가정법 현재 올바름.' }
        ]
      },
      {
        kind: 'learn', id: '11-2', short: '11-2 과거 가정', title: '11-2. Subjunctive mood “if/then”: past tense', page: 'p.34',
        ko: '과거 가정(사실과 반대되는 과거): if절은 had + p.p. (또는 Had + S + p.p.), then절은 would/could/might have + p.p.',
        blocks: [
          '<b>Subjunctive past</b> is used to imagine the past <u>counterfactually</u>—in a way different from what actually happened. Study the chart below carefully:',
          { table: { head: ['Subjunctive PAST “IF” — <small>LOOKS LIKE PAST PERFECT</small>', 'Subjunctive PAST “THEN” — <small>USES WOULD/COULD/MIGHT HAVE [P.P.]</small>'], rows: [
            ['If I <b>had eaten</b> the whole cake…<br><b>Had I eaten</b> the whole cake…', '…I <b>would/could/might have gotten</b> a stomachache.']
          ] } },
          { ex: 'Ex4', lines: [ '<b>Last January</b>, if I <s>were to visit</s> <b>had visited</b> my family, I too <b>would have gotten</b> stuck in the blizzard.' ] },
          'It’s important to see the <b>context clues</b> (<i>Last January, would have gotten</i>) to see that we must use <u>subjunctive past</u>, not present, on the “if” side of the sentence.'
        ]
      },
      {
        kind: 'quiz', id: '11B', short: 'Practice 11B', title: 'Practice 11B — 과거 가정법', page: 'p.35',
        options: OS, legend: OS_LEG,
        instr: '<b>PRACTICE 11B:</b> Mark errors and label each sentence as <b>SUBJ</b> or <b>OK</b>, as appropriate. You’ll need to determine whether the sentence follows the <b>correct pattern</b> AND whether it is using a <b>contextually appropriate tense</b>.',
        ko: NOTE_KEY,
        items: [
          { q: 'The airplane would not have had to make an emergency landing if the runways did not become so slick with ice.', a: 'SUBJ', why: 'would not have had to(과거 가정) → if절도 had not become.' },
          { q: 'If Sue were to practice more before last week’s game, she would have not played so badly.', a: 'SUBJ', why: 'last week’s(과거) → If Sue had practiced …' },
          { q: 'If Mel does all of his homework, he wouldn’t have been scolded by Dr. Cooper.', a: 'SUBJ', why: 'wouldn’t have been(과거 가정) → If Mel had done all of his homework.' },
          { q: 'I wouldn’t have been upset if you had just told me about the problem and not been so evasive.', a: 'OK', why: 'would not have p.p. + if + had p.p. — 올바른 과거 가정.' },
          { q: 'Had you not been so stubborn, you probably would have gotten a lot more out of the tutorial.', a: 'OK', why: 'Had + S + p.p. … would have p.p. — 올바름.' }
        ]
      },
      {
        kind: 'learn', id: '11-3', short: '11-3 간접 요구', title: '11-3. Subjunctive mood &amp; indirect demands', page: 'p.35',
        ko: 'demand · insist · recommend · request · suggest (+ require/ask, It is important/essential/crucial/imperative that) 뒤의 that절 동사는 “동사원형”. should·must·-s 붙이지 않는다.',
        blocks: [
          { note: '필기: <b>demand, insist, recommend, request, suggest</b> — 이 다섯 동사는 암기!', kind: 'rule' },
          { h: '11-3a. These words set up a special subjunctive clause pattern' },
          { p: '<b>demand, insist, recommend, request, suggest</b>' },
          { table: { head: ['[SUBJECT 1] suggest(s/ed) that', '[SUBJECT 2]', '[BASE FORM VERB]', '[REST OF PREDICATE]'], rows: [
            ['Bob requested that', 'Meredith', '<b>stop</b>', 'spreading rumors about him.'],
            ['Dr. Brown insists that', 'we', '<b>be</b>', 'on time for his class.'],
            ['The UN demanded that', 'the rogue nation', '<b>shut down</b>', 'its weapons program.']
          ] } },
          { note: '<b>NOTE:</b> that절 안에 <s>should / must</s>나 -s 형태를 쓰지 않고 <b>동사원형</b>만 쓴다 (be·stop·shut down).', kind: 'tip' },
          { h: '11-3b. require and ask' },
          'The verbs <b>require</b> and <b>ask</b> also can follow the pattern above, but you can also use them the same way you use <i>want</i> (<b>S want(s/ed) OBJ [infinitive]</b>):',
          { ex: 'Ex6', lines: [
            ['My boss often asks everyone <b>to come</b> to after-work events.', 'OK', 'ok'],
            ['My boss often asks that everyone <b>come</b> to after-work events.', 'OK', 'ok']
          ] },
          'Both sentences are OK.',
          { h: '11-3c. It is important/essential/crucial/imperative that…' },
          'The phrase <b>It is important/essential/crucial/imperative that</b> also uses a similar subjunctive pattern:',
          { table: { head: ['It is important that', '[SUBJECT 2]', '[BASE FORM VERB]', '[REST OF PREDICATE]'], rows: [
            ['It is important that', 'Melissa', '<b>finish</b>', 'the project before tomorrow.'],
            ['It is crucial that', 'the principal', '<b>make</b>', 'the process fair for everyone.']
          ] } },
          { h: '11-3d. Subjunctive phrases can set up “fake beginnings” (see 2-2)' },
          { ex: 'Ex8', lines: [
            ['Dan recommends that before buying a new computer, Jill <s>gets</s> advice from Dr. Kim.', 'wrong', 'err'],
            ['Dan recommends that before buying a new computer, Jill <s>should get</s> advice from Dr. Kim.', 'wrong', 'err'],
            ['Dan says that before buying a new computer, Jill get advice from Dr. Kim.', 'wrong (says는 subjunctive 동사 아님)', 'err'],
            ['Dan <b>recommends that</b> before buying a new computer, Jill <b>get</b> advice from Dr. Kim.', 'correct', 'ok']
          ] },
          'Only the last sentence is correct; it’s the only one with both a <b>subjunctive verb</b> (<i>recommends</i>) and a correct <b>base form verb</b> (<i>get</i>). Note that the structure of Ex8 forces you to recognize <b>fake beginnings, modifiers,</b> and <b>subjunctive mood</b>. You’ll occasionally encounter this structure in difficult SAT problems.'
        ]
      },
      {
        kind: 'quiz', id: '11C', short: 'Practice 11C', title: 'Practice 11C — 간접 요구 패턴', page: 'p.35',
        options: OS, legend: OS_LEG,
        instr: '<b>PRACTICE 11C:</b> The sentences below focus on the sentence patterns explained in 11-3 above. Label each sentence as <b>SUBJ</b> or <b>OK</b> and circle any errors. Careful—<b>non-subjunctive verbs</b> may be incorrectly using subjunctive patterns!',
        ko: NOTE_KEY,
        items: [
          { q: 'I hope that Candace show up on time tomorrow.', a: 'SUBJ', why: 'hope는 subjunctive 동사가 아님 → shows (또는 will show).' },
          { q: 'Stan’s mother demands that before leaving the house, he always eat breakfast.', a: 'OK', why: 'demands that + [fake beginning] + he + 동사원형(eat) → 올바름.' },
          { q: 'The regulator didn’t fine the company, but it did recommend the firm to update its safety protocols.', a: 'SUBJ', why: 'recommend는 “recommend that + S + 동사원형” 패턴 → recommended that the firm update … (recommend ~ to는 불가).' },
          { q: 'It’s imperative that everyone on the team follows the coach’s instructions.', a: 'SUBJ', why: 'It’s imperative that + S + 동사원형 → follow.' },
          { q: 'Whenever my debate team travels, our school insists that each of us should get permission to miss class from all of our teachers.', a: 'SUBJ', why: 'insists that + S + 동사원형 → should get가 아니라 get.' }
        ]
      },
      {
        kind: 'quiz', id: 'C111', short: 'Cumulative 1–11', title: 'Cumulative Practice 1–11', page: 'p.36',
        options: ['OK', 'FRAG', 'MOD', 'PUNC', 'SV', 'PR', 'PL/PO', 'VT', 'N#', '//', '//ID', 'COMP', 'SUBJ'],
        legend: { OK: '오류 없음', FRAG: 'Fragment error', MOD: 'Modifier error', PUNC: 'Punctuation error', SV: 'S-V agreement error', PR: 'Pronoun error', 'PL/PO': 'Plural/Possessive mix-up', VT: 'Verb Tense error', 'N#': 'Noun-number error', '//': 'Parallelism error', '//ID': 'Parallelism idiom error', COMP: 'Logical comparison error', SUBJ: 'Subjunctive mood (MOOD) error' },
        instr: 'Follow the same instructions you followed for the previous Cumulative Practice exercises, and keep marking the sentences to show your work. On the line provided, write <b>OK</b> or the following annotations for any errors you find: <b>FRAG, MOD, PUNC, SV, PR, PL/PO, VT, N#, //</b> (including <b>//ID</b>), <b>COMP,</b> or <b>SUBJ</b> (aka <b>MOOD</b>).',
        ko: NOTE_KEY,
        items: [
          { q: 'The government agency decided that it would not take legal action against the manufacturer, but the agency did publicly recommend the company to be more thoroughly audited by tax officials.', a: 'SUBJ', why: 'recommend + that + S + 동사원형 → recommended that the company be more thoroughly audited. (필기: demand, insist, recommend, request, suggest)' },
          { q: 'Even if the newspaper was not shut down by its owners this year, money problems probably would force the company to shut down sometime within the next two years.', a: 'SUBJ', why: 'probably would force(가정법) → if절은 were not shut down. (was 불가)' },
          { q: 'If the investigative journalists did not publish their story about the unsafe and abusive practices, the factory probably would not have been shut down.', a: 'SUBJ', why: 'would not have been(과거 가정) → if절은 had not published.' },
          { q: 'According to Senator Jameson, neither of her daughters are likely to follow her example and pursue a career in public service.', a: 'SV', why: 'neither of = 단수 → is.' },
          { q: 'There was little evidence that the diet programs were effective; however, that fact didn’t stop the company from aggressively advertising them.', a: 'OK', why: 'IC; however, IC. 모두 올바름. “that fact”는 명사가 붙은 지시어.' },
          { q: 'Having been raised in Morocco and Burundi, Ms. Tran has found few people in the small Missouri town with whom she can relate.', a: 'OK', why: '“Having been raised …”의 주체 = Ms. Tran. with whom she can relate — 전치사 + whom 올바름.' },
          { q: 'If the gymnasium had not been extensively renovated, it would not have been possible for the track and field team to train during last year’s exceptionally cold winter.', a: 'OK', why: 'if + had not been p.p. … would not have been — 올바른 과거 가정.' },
          { q: 'After Abraham Lincoln started his political career in the 1840s and failed for many years to earn prominence, he is able to rise to national prominence in the 1850s in a remarkably short time.', a: 'VT', why: '1850s는 과거 → is able to가 아니라 was able to.' },
          { q: 'Street protests rocked the town after the city council defaulted on its debts, and this led nearly all the municipal officials to offer their resignations.', a: 'PR', why: 'this 뒤에 명사가 없음(5-7) → this default / this crisis.' },
          { q: 'The husband and wife who ran the tavern have long been regarded as a leader in the community: they frequently organized free social events and held great influence in the neighborhood.', a: 'N#', why: 'The husband and wife(복수) → as leaders.' },
          { q: 'Unlike gorillas, for which grooming has an important social function, cats clean itself primarily for sanitary reasons.', a: 'PR', why: 'cats(복수) → clean themselves.' },
          { q: 'The ski instructor at the resort which had never received a certification to teach skiing was nevertheless a reasonably effective coach.', a: 'PR', why: '사람(instructor)에게 which 불가 → who. (5-2b)' },
          { q: 'The debate between nature and nurture presents a false choice: the two factors interact, and the genes that us humans inherit can express themselves only in certain environmental conditions.', a: 'PR', why: '“that we humans inherit” — 주어 자리 → we.' },
          { q: 'After the epidemic, the health bureau made great headway in its attempt to reform emergency care clinics, reprogram information-sharing software, and to expand access to vaccines.', a: '//', why: 'to reform A, [reprogram B], and [to expand C] — to가 한쪽에만 반복되어 형태가 다름.' },
          { q: 'Two popular sports—basketball and volleyball—actually started as activities developed by the YMCA to combat two social problems in early 1900s American cities, alcoholism and prostitution.', a: 'PUNC', why: 'IC 뒤에 two social problems를 설명하는 목록이 오므로 콤마가 아니라 콜론(:).' }
        ]
      }
    ]
  });
})(window.SAT_DATA);

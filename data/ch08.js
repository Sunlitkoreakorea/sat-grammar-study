/* Lesson 8. Noun-number errors (n#) (교재 pp.26–27) + Cumulative Practice 1–8 */
(function (D) {
  D.chapters.push({
    id: 'L8', order: 8, no: 'L8', short: 'Noun-# Agreement', title: 'Lesson 8. Noun-number errors (n#)',
    ko: '같은 사람/사물을 가리키는 두 명사는 수(단·복수)가 일치해야 한다 — be, become, as 문장에서 자주 나옴',
    parts: [
      {
        kind: 'learn', id: '8-1', short: '8 명사 수 일치', title: '8. Noun-number errors (n#)', page: 'p.26',
        ko: '두 명사가 같은 대상을 가리키면 단·복수가 같아야 한다. 특히 be / become / as / like 가 들어간 문장을 점검.',
        blocks: [
          'Two nouns must match in number if they’re used to refer to the <b>same person or thing</b>. Noun-number errors most frequently occur in sentences containing <span class="circ">be</span>, <span class="circ">become</span>, or <span class="circ">as</span>.',
          { ex: 'Ex7', lines: [
            'The bachelorette <u>party</u> and the <u>wedding</u> the next day are going to be <s>a very fun event</s> <b>very fun events</b>.',
            'Mariana had long regarded her <u>coworkers</u> as <s>a fool</s> <b>fools</b>.',
            'If <u>Tom and his brother</u> cannot behave like <s>a gentleman</s> <b>gentlemen</b>, they should not attend the party.'
          ] },
          { note: '<b>요령</b> — 주어(또는 앞 명사)가 복수이면 be/become/as/like 뒤의 “직업·정체성” 명사도 복수. 반대로 단수 주어 뒤엔 단수 보어.', kind: 'tip' }
        ]
      },
      {
        kind: 'quiz', id: '8A', short: 'Practice 8A', title: 'Practice 8A — 명사 수 일치', page: 'p.26',
        options: ['OK', 'N#'],
        legend: { OK: '오류 없음', 'N#': 'Noun-number error — 같은 대상을 가리키는 두 명사의 단·복수 불일치' },
        instr: '<b>PRACTICE 8A:</b> On the line provided, write <b>OK</b> or <b>N#</b>, and <span class="circ">circle</span> any nouns that you think should be corrected.',
        ko: '※ 교재 정답지는 사진에 없어서, 손필기 답과 규칙을 대조해 정리했어요.',
        example: { q: 'ExC. As a delegate on the school board, Ms. Kuriyami and Mr. Hardy are responsible for curriculum decisions.', a: 'N#', why: '주어는 두 사람(Ms. Kuriyami and Mr. Hardy) → As delegates.' },
        items: [
          { q: 'The children in the program were all training to become a professional musician.', a: 'N#', why: 'children(복수) → become professional musicians.' },
          { q: 'As the hosts of The Price Is Right, Bob Barker and Drew Carey had to develop the ability to connect with a wide range of audiences.', a: 'OK', why: 'the hosts(복수)와 Bob Barker and Drew Carey(복수) 일치. “the ability”는 한 가지 능력이라 단수 OK.' },
          { q: 'My classmates would make a great audience member for a comedy TV show: they laugh at everything.', a: 'N#', why: 'My classmates(복수) → make great audience members.' }
        ]
      },
      {
        kind: 'quiz', id: '8B', short: 'Practice 8B', title: 'Practice 8B — Lesson 6–8 종합', page: 'p.26',
        options: ['OK', 'PL/PO', 'VT', 'N#'],
        legend: { OK: '오류 없음', 'PL/PO': 'Plural/Possessive mix-up — 복수형과 소유격(’) 혼동', VT: 'Verb Tense error — 시제 이동', 'N#': 'Noun-number error — 두 명사의 수 불일치' },
        instr: '<b>PRACTICE 8B:</b> This exercise includes all the rules from this lesson. Label each sentence accordingly: <b>PL/PO, VT, N#,</b> or <b>OK</b>.',
        ko: '※ 교재 정답지는 사진에 없어서, 손필기 답과 규칙을 대조해 정리했어요.',
        items: [
          { q: 'The heiress lived very modestly, and people were surprised to learn that she had given away most of her family’s fortune to charity before she died.', a: 'OK', why: '과거·과거완료의 올바른 조합. her family’s = 소유격 OK.' },
          { q: 'There was an uproar in the school when a stray dog barged into the building; for the next hour, students and faculty scrambled to find it’s owner.', a: 'PL/PO', why: 'it’s(= it is)가 아니라 소유격 its owner.' },
          { q: 'Before the advent of the telegraph, the dissemination of information has been limited to the speed of the fastest horses and the swiftest ships.', a: 'VT', why: '“Before the advent of the telegraph”는 과거의 일 → has been limited가 아니라 was limited. <span class="sm">(필기: long time ago)</span>' },
          { q: 'At least one employee should have fixed the broken router last week; they’re were eleven members of the IT department who had the training to do so.', a: 'PL/PO', why: 'they’re were … → there were (존재).' },
          { q: 'Organic food was first mass produced in the 1960s and 1970s, but the industry will become globally significant only starting in the 1990s and early 2000s.', a: 'VT', why: '1990s·2000s는 과거 → will become가 아니라 became.' },
          { q: 'The death of businessman William Rice led to a scandal when it was discovered that he was murdered by men hoping to acquire his’ fortune.', a: 'PL/PO', why: 'his’는 존재하지 않는 형태 → his fortune.' },
          { q: 'The Emperor Tiberius was remembered by ancient historians as a dark, reclusive, and somber man who disliked being emperor and who longed for a quiet life.', a: 'OK', why: 'Tiberius(단수) = a … man(단수). 시제도 일관(과거).' },
          { q: 'The people at my summer camp all came from the city, but after two weeks, they all were eager to become a naturalist.', a: 'N#', why: 'they all(복수) → become naturalists.' },
          { q: 'In Attica, a historic region of Greece that includes Athens, several leaders decided that they can protect themselves from external threats only by combining their militaries.', a: 'VT', why: 'decided(과거) → can이 아니라 could. (short helping verb!)' }
        ]
      },
      {
        kind: 'quiz', id: 'C18', short: 'Cumulative 1–8', title: 'Cumulative Practice 1–8', page: 'p.27',
        options: ['OK', 'FRAG', 'MOD', 'PUNC', 'SV', 'PR', 'PL/PO', 'VT', 'N#'],
        legend: { OK: '오류 없음', FRAG: 'Fragment error', MOD: 'Modifier error', PUNC: 'Punctuation error', SV: 'Subject–Verb agreement error', PR: 'Pronoun error', 'PL/PO': 'Plural/Possessive mix-up', VT: 'Verb Tense error', 'N#': 'Noun-number error' },
        instr: 'Follow the same instructions you followed for the previous Cumulative Practice exercises, and make sure you continue to show where in each sentence the errors occur. On the line provided, write <b>OK</b> or the following annotations for any errors you find: <b>FRAG, MOD, PUNC, SV, PR, PL/PO, VT,</b> or <b>N#</b>.',
        ko: '※ 교재 정답지는 사진에 없어서, 손필기 답과 규칙을 대조해 정리했어요. 15번은 처음 쓴 답이 OK였는데, 빨간 펜으로 “5-7 · no noun”이라고 고친 흔적이 있어 PR로 했어요.',
        items: [
          { q: 'That the detectives were unable to find any evidence of wrongdoing surprised everyone who believed they would quickly discover a number of crimes.', a: 'OK', why: '명사절 주어 “That the detectives …” + 동사 surprised. they = detectives(복수) 하나. “a number of” = 복수.' },
          { q: 'Although not considered final drafts, many of Susan Sontag’s essays published after the author’s death—a decision that pleased her fans and bothered some of her family members.', a: 'FRAG', why: 'many of … essays에 대한 본동사가 없음(published는 분사) → IC가 없음.' },
          { q: 'The new office building looked impressive, but it’s entrance was apparently not built in accordance to standards established by the People with Disabilities Act.', a: 'PL/PO', why: 'it’s(= it is) → 소유격 its entrance.' },
          { q: 'The researchers were surprised to discover that the proteins can be synthesized in a cell even before membranes were fully formed.', a: 'VT', why: 'were surprised·were formed(과거) → can이 아니라 could be synthesized.' },
          { q: 'Neither of the ion channels were open; however, a current somehow was detected along the axon of the neuron.', a: 'SV', why: 'Neither of = 단수 → was.' },
          { q: 'The senior ski trip was marred by an unexpected crisis: the chaperone had to be evacuated by helicopter when several students and her collided on an icy slope.', a: 'PR', why: '“several students and her collided” — 주어 자리 → and she. <span class="sm">(필기: “and pronoun” — X and [PRN])</span>' },
          { q: 'Although the service examination was based on the four Confucian classics—Great Learning, The Mean, Analects, and Mencius—other texts such as the Book of Rites were also essential to the test takers.', a: 'OK', why: '삽입구는 대시로 짝이 맞음. other texts(복수) → were. DC, IC 구조 OK.' },
          { q: 'The rising number of complaints suggest that the new software is not being well received by the public.', a: 'SV', why: 'The number는 단수 → suggests.' },
          { q: 'Everyone except my roommates and I was happy about the new library, which was being constructed on our street; we were bothered by the nearly-constant sound of construction work.', a: 'PR', why: 'except = 전치사 → 목적격 “my roommates and me”. <span class="sm">(필기: except [O noun])</span>' },
          { q: 'Although not tested by IT professionals, the software which was coded by a student-led team and was determined to have fewer bugs than the professionally-made version.', a: 'FRAG', why: '주어 the software의 본동사가 없음(which was coded …, and was determined … 모두 관계절) → IC가 없음.' },
          { q: 'In the novel, the protagonist discovers her magical talent before she attempts to understand her mysterious past—an attempt that led to a surprise revelation near the end of the book.', a: 'VT', why: '현재(discovers, attempts) 서술 속 “an attempt that led …” — 시제가 섞임. 이야기 전체가 현재라면 an attempt that leads.' },
          { q: 'The driver continued long after he started feeling tired, which caused him to swerve uncontrollably and come dangerously close to running off the road.', a: 'PR', why: '“, which” — 앞 절 전체(상황)를 가리키는 overly broad which. (5-3)' },
          { q: 'The PET scan is an effective imaging technique; however, because of it’s use of radiation, it cannot be used for pregnant women.', a: 'PL/PO', why: 'it’s → its use.' },
          { q: 'The release of the singer’s new album, almost universally praised, allowed herself to regain some of the fame that she had lost during nearly a decade of seclusion.', a: 'PR', why: '주어는 The release → allowed her (재귀 불가).' },
          { q: 'Lisa suspects that one of the pipettes in the rack has been contaminated; this may have happened, she believes, when the new lab technician handled the equipment.', a: 'PR', why: '“this may have happened” — this 뒤에 명사가 없음(5-7) → this contamination. <span class="sm">(필기: 5-7 / no noun)</span>' }
        ]
      }
    ]
  });
})(window.SAT_DATA);

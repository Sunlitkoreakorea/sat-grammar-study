/* Chapter 0 — Glossary, Lesson map, References A–F (교재 pp.2–4) */
(function (D) {
  D.chapters.push({
    id: 'ref', order: 0, no: 'Ref', short: 'Glossary & Reference', title: 'Glossary & Reference A–F',
    ko: '핵심 용어 · 전치사/접속사 목록 · 불규칙 명사',
    parts: [
      {
        kind: 'learn', id: 'glossary', short: '용어집', title: 'Glossary (Key Terms)', page: 'p.4',
        ko: '교재 전체에서 쓰는 핵심 용어(주어·목적어·전치사·동사·절·수식어 등)의 정의.',
        blocks: [
          { ex: 'Subject', lines: ['One type of noun. Often the first N in a sentence clause, it is the N doing an action verb or the N being described by a linking verb (<i>is, feels, appears</i>)/passive voice verb (<i>was done, has been finished</i>).'] },
          { ex: 'Object', lines: [
            'The other type of noun. There are two types of object nouns:',
            '(1) <b>Verb objects</b> (aka direct objects) are nouns that action words act on: <i>I ate <u>the pizza</u>.</i> <i>The boss fired <u>Dana</u>.</i> <i>Running <u>home</u> takes <u>forty minutes</u>.</i>',
            '(2) <b>Preposition objects</b> are nouns that follow a preposition: <i>at <u>home</u>, of <u>a man</u>, except <u>me</u>.</i>'
          ] },
          { ex: 'Preposition', lines: ['common examples: <i>in, at, of, under, like, as, except.</i> Prepositions give info about an object’s location in time or space, or about the noun’s relationship with other nouns. See <b>Reference A</b> for a complete list of English prepositions.'] },
          { ex: 'Verb', lines: ['(1) an <b>action word</b> that may consist of one or more words: <i>do, does, did, has done, is doing,</i> OR (2) <b>word(s)</b> that link a subject to a description (<i>The song <u>sounds</u> good, We <u>were</u> sick, The work <u>is done</u></i>).'] },
          { ex: 'Gerund', lines: ['an action word but not a verb! Gerunds are –ing nouns: <i><b>Swimming</b> is fun. I like <b>running</b>.</i>'] },
          { ex: 'Infinitive', lines: ['an action word but not a verb! It consists of <i>to</i> + a base verb (<i>to do, to be</i>). It can be part of a longer verb (<i>want to go, plan to visit</i>).'] },
          { ex: 'Participle', lines: [
            'an action word but not a verb! Present participles are –ing words that are',
            '(1) part of a longer verb (<i>was <b>finishing</b></i>),',
            '(2) used as adjectives (<i>the <b>smoking</b> man, the <b>sleeping</b> baby</i>), OR',
            '(3) used at the beginning of modifiers (<i>While <b>running</b> away, by <b>completing</b> the work</i>).'
          ] },
          { ex: 'Clause', lines: ['a group of words containing a both subject and a verb. See 1-3 for info on the two types of clauses (independent and dependent clauses).'] },
          { ex: 'Fragment', lines: ['an error type. It looks like a sentence but isn’t because it <u>has no independent clause</u>.'] },
          { ex: 'Modifier', lines: ['a group of words that may imply an action but does not contain a subject or a verb. A <b><u>modifier error</u></b> is created when a modifier phrase is placed next to the wrong subject noun. (See Lesson 2.)'] },
          { note: '<b>Lesson 지도 (p.4):</b> 한 문장 안에서 각 레슨이 다루는 위치를 보여주는 그림이에요. 아래 “Lesson map” 단계에서 정리합니다.', kind: 'tip' }
        ]
      },
      {
        kind: 'learn', id: 'map', short: 'Lesson 지도', title: 'Lesson map — 한 문장으로 보는 12개 레슨', page: 'p.4',
        ko: '긴 SAT 문장 하나에서 Lesson 1–10이 각각 어느 부분을 점검하는지 보여주는 지도.',
        blocks: [
          { p: '교재는 아래 한 단락을 예시로 들어, 각 Lesson이 문장의 어느 부분에 해당하는지 선으로 연결해 보여줍니다.' },
          { ex: '예시문', lines: [
            '<i>French archaeologist Stephen Rostain believes that ancient settlements found in Upano, located in eastern Ecuador, were home to as many as 100,000 people. The settlements’ discovery was noteworthy both because it proved the value of laser-equipped drones, which were used at an unprecedented scale, and because the forest-covered mounds near the ancient site were revealed to be human-built monuments far larger than any other in the region.</i>'
          ] },
          { table: { head: ['Lesson', '주제', '예시문에서의 위치 (사진 속 연결선을 보고 정리)'], rows: [
            ['<b>Lesson 1</b>', 'subject nouns, verbs, &amp; clauses', '주어 <i>archaeologist Stephen Rostain</i>(동사 <i>believes</i>), 절의 구조'],
            ['<b>Lesson 2</b>', 'modifiers &amp; “fake beginnings”', '<i>believes that / ancient settlements…</i> — “that”은 fake beginning'],
            ['<b>Lesson 3</b>', 'punctuation (interrupters)', '<i>found in Upano<b>,</b> located in eastern Ecuador<b>,</b></i> — 삽입구 양쪽 콤마'],
            ['<b>Lesson 4</b>', 'Subject-Verb agreement', '<i>settlements … were</i> / <i>drones … were used</i>'],
            ['<b>Lesson 5</b>', 'Pronouns <small>(it, (s)he, they, which, who)</small>', '<i>which were used…</i> — which의 선행사 <i>drones</i>'],
            ['<b>Lesson 6</b>', 'Plurals vs. possessive nouns', '<i>settlements’ discovery</i>'],
            ['<b>Lesson 7</b>', 'Verb tense', '<i>believes … were … proved</i> 등 시제'],
            ['<b>Lesson 8</b>', 'Noun-# agreement', '<i>mounds … were revealed to be … monuments</i>'],
            ['<b>Lesson 9</b>', 'parallelism', '<i>both because it proved… <u>and</u> because the…mounds were revealed…</i>'],
            ['<b>Lesson 10</b>', 'comparisons', '<i>monuments far larger than any other in the region</i>'],
            ['<b>Lesson 11–12</b>', '가정법 / 접속사·접속부사', '(지도에는 없지만 교재 후반부에서 다룸)']
          ] } }
        ]
      },
      {
        kind: 'learn', id: 'refA', short: 'Ref A 전치사', title: 'Reference A: Common prepositions', page: 'p.2',
        ko: '전치사 뒤의 명사는 “목적어”라서 주어가 될 수 없어요 — Lesson 1·4에서 주어를 찾을 때 쓰는 목록.',
        blocks: [
          'You’ll need to recognize prepositions to distinguish subject nouns (1-1a) from object nouns (1-1b), especially to help you in Lesson 4 (S-V agreement). These are the most common prepositions:',
          { words: ['about', 'above / below', 'across', 'after / before', 'against', 'along', 'around', 'as / like / unlike'], title: '' },
          { words: ['at', 'behind', 'between / among', 'beyond', 'by', 'despite', 'during', 'except'] },
          { words: ['for', 'from', 'in / into', 'including', 'inside / outside', 'near', 'next to', 'of'] },
          { words: ['on / onto / off', 'over / under', 'since', 'through', 'throughout', 'till / until', 'to / towards', 'with / within / without'] }
        ]
      },
      {
        kind: 'learn', id: 'refB', short: 'Ref B FANBOYS', title: 'Reference B: Coordinating (FANBOYS) conjunctions', page: 'p.2',
        ko: 'for·and·nor·but·or·yet·so — 콤마 뒤에서 두 IC를 한 문장으로 잇는다. IC 앞에 붙여도 절은 IC 그대로.',
        blocks: [
          'These words are used in many ways. If used after a comma, these words join two ICs (3-1) into a single sentence:',
          { words: ['<b>F</b>or', '<b>A</b>nd', '<b>N</b>or', '<b>B</b>ut', '<b>O</b>r', '<b>Y</b>et', '<b>S</b>o'] },
          { note: 'NOTE: when you add a FANBOYS word to the beginning of an IC, the <u>clause remains an IC</u>.', kind: 'rule' }
        ]
      },
      {
        kind: 'learn', id: 'refC', short: 'Ref C 접속부사', title: 'Reference C: Conjunctive adverbs (“fancy conjunctions”)', page: 'p.2',
        ko: 'however·therefore 같은 “fancy conjunction”은 IC 앞에 붙여도 IC 그대로. 두 IC를 잇을 땐 콤마가 아니라 세미콜론(;).',
        blocks: [
          'Like FANBOYS words, when the following words are added to the beginning of an IC, the <u>clause remains an IC</u>. However, when they are used to join two ICs, you must use a <b>semicolon (;)</b> rather than a comma.',
          { words: ['accordingly', 'besides', 'consequently', 'conversely', 'finally', 'furthermore', 'hence', 'however'] },
          { words: ['indeed', 'in fact', 'likewise', 'meanwhile', 'moreover', 'nevertheless', 'next', 'nonetheless'] },
          { words: ['otherwise', 'rather', 'similarly', 'still', 'subsequently', 'that is', 'therefore', 'thus'] },
          'These conjunctive adverbs (“fancy conjunctions”) can be used in the middle of a clause—with commas if the interruption is strong and without commas if the interruption is weak (usually if before/inside a verb):',
          { ex: '예문', lines: [
            'I was elated about my victory; I did not<b>, however,</b> mention my excitement to anyone.',
            'I was elated about my victory; I had <b>nevertheless</b> already decided not to tell anyone.'
          ] },
          { note: '필기: <b>Only can turn IC to DC</b> — IC를 DC(종속절)로 바꿀 수 있는 건 Reference D의 단어뿐. FANBOYS·fancy conjunction은 IC를 DC로 만들지 못한다.', kind: 'tip' }
        ]
      },
      {
        kind: 'learn', id: 'refD', short: 'Ref D 종속접속사', title: 'Reference D: Subordinating conjunctions (&amp; other words that make DCs)', page: 'p.2',
        ko: '이 단어를 IC 앞에 붙이면 절이 DC(종속절)가 된다. 명사절·관계절은 별도로 외우기.',
        blocks: [
          'When the following are added to the beginning of an IC, the <u>clause becomes a DC</u>. See 1-3 for more information.',
          { words: ['after / before', 'although / [even] though', 'as', 'because', 'if / [even] if', 'how'] },
          { words: ['since', 'so that / such that', 'than', 'that / which', 'till / until', 'unless'] },
          { words: ['when / whenever / while', 'where / wherever', 'whereas', 'whether', 'who[m] / whose / whoever', 'why'] },
          '<u>Most DCs</u> are formed by placing a word from the list above in front of an IC. But you must learn <b>two more types of DCs</b> (rule 1-3c): <b>noun clauses</b> and <b>relative clauses</b>.',
          '<u>Noun clauses</u> function just like nouns. They begin with <b>whether, if, that,</b> or an interrogative word: <b>who(m), whose, what, when, where, which, why, how,</b> including the forms of these words that end with <b>–ever</b>:',
          { ex: '명사절', lines: ['I’ll support <u>whomever you nominate</u>.', '<u>Whether she can win the presidency</u> remains unclear.'] },
          '<u>Relative clauses</u> begin with <b>that, which,</b> or <b>who(m)</b> (or less commonly, other interrogatives). RCs can interrupt any part of a sentence and appear after a <b>noun that they’re related to</b>. Sometimes RCs include their own subject:',
          { ex: '#1', lines: ['The car <b>that <u>Jim</u> bought last year</b> needed to be fixed. <span class="sm">(필기: that은 S가 아님 → 이 RC의 주어는 <i>Jim</i>)</span>'] },
          'But other times, the RC subject is actually the relative pronoun itself (that/which/who(m)):',
          { ex: '#2', lines: ['I didn’t touch the toys <b>that were left on the table</b>; my sister probably was the person <b>who broke them</b>. <span class="sm">(필기: that·who가 각 RC의 주어 S)</span>'] },
          { note: 'Note how the RC subjects <b>that</b> &amp; <b>who</b> are singular or plural depending on the noun that they relate to.', kind: 'rule' }
        ]
      },
      {
        kind: 'learn', id: 'refE', short: 'Ref E 불규칙명사', title: 'Reference E: common irregular singular &amp; plural nouns', page: 'p.3',
        ko: '단·복수가 헷갈리는 명사 모음 — news·economics는 단수, data·media·bacteria·cattle은 복수, sheep·series·species는 단복수 동형.',
        blocks: [
          'You probably know most of these <u>common irregular nouns</u>:',
          { table: { head: ['', '', ''], rows: [
            ['*axis / axes <small>(see next list)</small>', 'leaf / leaves <small>(like wolf, loaf, calf)</small>', 'mouse / mice <small>(like louse)</small>'],
            ['child / children', 'life / lives <small>(like knife)</small>', '*passerby / passersby'],
            ['foot / feet <small>(like tooth)</small>', 'man / men <small>(like woman)</small>', 'person / people']
          ] } },
          'Many Greek- or Latin-derived words (especially related to science/education) use non-English plural forms:',
          { table: { head: ['단수', '복수형 / 비슷한 단어'], rows: [
            ['analysis', 'analyses, like basis, crisis, thesis'],
            ['*antenna', 'antennae, like larva/larvae'],
            ['cactus', 'cacti or cactuses, like fungus, octopus'],
            ['*criterion', 'criteria'],
            ['*index', 'indices or indexes, like vertex, vortex'],
            ['nucleus', 'nuclei or nucleuses, like focus, radius'],
            ['phenomenon', 'phenomena'],
            ['stratum', 'strata, like curriculum, datum']
          ] } },
          { h4: 'These nouns end in -s but are <u>singular</u>. They <u>have no plural form</u>:' },
          { words: ['*arthritis (&amp; other diseases ending with -itis)', '*billiards, darts', 'economics, mathematics, physics (&amp; other -ics)', '*diabetes, measles, mumps, rabies, rickets', 'news <small>(필기: singular)</small>'] },
          { h4: 'These common nouns are <u>plural</u> but may sound singular (see above for more Greek- &amp; Latin-derived words):' },
          { words: ['*alumni (sing: alumnus/alumna)', '*bacteria (sing: bacterium)', '*cattle (sing: cow)', '*data (sing: datum)', '*dice (sing: die)', '*media (sing: medium)', '*oxen (sing: ox)', 'the police (sing: police officer)'] },
          { h4: 'These (often animal-related) <i>base plurals</i> (aka <i>zero plurals</i>) are spelled the same whether singular or plural:' },
          { words: ['aircraft (&amp; spacecraft)', '*barracks', '*bison / buffalo', 'deer (&amp; similar: elk, moose, caribou)', 'fish (including salmon, carp, cod, etc)', '*fowl (including waterfowl)', 'gallows', 'headquarters', 'livestock', 'means (as in “a means to an end”)', 'offspring', 'series', 'sheep', 'shrimp', 'species'] },
          { note: '노란 형광펜 표시는 사진 속 필기본에서 강조된 단어를 그대로 살린 거예요.', kind: 'tip' }
        ]
      },
      {
        kind: 'learn', id: 'refF', short: 'Ref F 부정대명사', title: 'Reference F: Indefinite pronouns and other singular/plural nouns', page: 'p.3',
        ko: 'each·every-·any-·some-·no- 계열은 단수, both·several·many·few는 복수. most·all·some은 뒤 명사에 따라 달라진다.',
        blocks: [
          { table: { head: ['Always singular', 'Always plural', 'Depends on following noun'], rows: [
            ['each / either / neither', 'both', 'most'],
            ['every[one, thing, <i>etc</i>]', 'several', 'any'],
            ['any[one, thing, <i>etc</i>]', 'many', 'all'],
            ['some[one, thing, <i>etc</i>]', 'few / fewer', '*some'],
            ['no[one, thing, <i>etc</i>]', 'a number', 'a lot [of sth]'],
            ['the number', 'the [ADJECTIVE]', '[fractions]'],
            ['gerunds (–ing nouns)', '', '[percentages]']
          ] } }
        ]
      }
    ]
  });
})(window.SAT_DATA);

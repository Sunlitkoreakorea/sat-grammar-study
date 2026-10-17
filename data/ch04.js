/* Lesson 4. S-V Agreement (교재 pp.16–19) */
(function (D) {
  var OS = ['OK', 'SV'];
  var OS_LEG = { OK: '주어-동사 일치 오류 없음', SV: 'Subject–Verb agreement error — 주어와 동사의 수 불일치' };
  var NOTE_KEY = '※ 교재 정답지는 사진에 없어서, 손필기 답과 규칙(4-1~4-6)을 함께 대조해 정리한 답이에요.';

  D.chapters.push({
    id: 'L4', order: 4, no: 'L4', short: 'S-V Agreement', title: 'Lesson 4. S-V Agreement',
    ko: '진짜 주어 찾기 → 단수/복수 맞추기 · and / or / 도치문 / 불규칙 명사 / 부정대명사',
    parts: [
      {
        kind: 'learn', id: '4-1', short: '4-1 주어 찾기', title: '4-1. Correctly identifying subjects', page: 'p.16',
        ko: '모든 명사가 주어는 아니다. 전치사구·수식어 속 명사를 건너뛰고 “동사마다 진짜 주어”를 찾아야 한다. 구조가 의미보다 우선.',
        blocks: [
          'Remember from Lesson 1 that <u>not every noun is a subject</u>. The first noun is generally the subject—unless that N appears in a prepositional phrase or other modifier. To accurately check for <b>S-V errors</b>, you must therefore accurately be able to find the subject for each verb—without being distracted by modifiers or other interrupting phrases:',
          { ex: 'Ex1', lines: [ 'The president’s <u><b>team</b></u> of advisors <s>have</s> <b>has</b> impressive skills and extensive experience.' ] },
          'In Ex1 above, <b>team</b> is the subject and is a singular noun, so the singular verb <b>has</b> is correct. The noun <b>advisors</b> is an object noun because it comes after a preposition (<b>of</b>). Note also that <u>collective nouns</u> like <b>team, class,</b> and <b>couple</b> are singular forms, even though they refer to groups consisting of more than one person or thing. <b>Grammatical structure—not meaning—determines which N is the subject.</b> The following sentences are all correct:',
          { ex: 'Ex2', lines: [
            'The tissue <u>samples</u> on the tray, left out on the lab table overnight, <b>need</b> additional testing.',
            'The entire <u>class</u>, at least as far as I can tell, truly <b>respects</b> its teacher.',
            'That <u>couple</u> sitting at the table next to those noisy soccer fans really <b>appears</b> to be deeply in love.',
            'Apparently, not even <u>one</u> of my science fair projects <b>was</b> good enough to earn an award.'
          ] }
        ]
      },
      {
        kind: 'learn', id: '4-2', short: '4-2 AND', title: '4-2. “AND” sentences (compound subjects)', page: 'p.16',
        ko: 'and로 두 주어가 이어지면 복수. along with / in addition to는 전치사라 복수로 만들지 못함. N of N and N은 문맥으로 and가 무엇을 잇는지 판단.',
        blocks: [
          'When <span class="circ">AND</span> joins two subject nouns, they are treated as a <mark>plural subject</mark>:',
          { ex: 'Ex3', lines: [ '<u>Bill and his sister</u> still <b>have</b> a tendency to fight over ridiculous things, even though they’re both adults.' ] },
          'Phrases like <b>along with</b> or <b>in addition to</b> are just prepositions. They do <b>NOT</b> make your subject plural:',
          { ex: 'Ex4', lines: [ '<u>The dog</u>, along with the cat, <b>has been</b> treated for potential rabies exposure.' ] },
          'You may have to consider context to determine whether <span class="circ">AND</span> is joining <u>two S</u> or <u>two O</u>:',
          { ex: 'Ex5', lines: [
            '<u>A book</u> of poems <u>and a discarded notebook</u> <b>were</b> left in an old box in the attic.',
            '<u>The portrait</u> of the elderly man and his grown son <b>is</b> my favorite in the museum.'
          ] },
          'Both sentences above follow a <b>N of N and N</b> structure, but the word <b>and</b> joins <u>two S</u> in the first sentence and <u>two O</u> in the second sentence. <mark>When looking at how <b>and</b> is used, it’s necessary to read and consider context.</mark>'
        ]
      },
      {
        kind: 'learn', id: '4-3', short: '4-3 OR', title: '4-3. “OR” sentences — (N)Either… (n)or', page: 'p.16',
        ko: 'S or S / Either S or S / Neither S nor S → 동사에 더 가까운 주어에만 맞춘다.',
        blocks: [
          'When <b>OR</b> joins two subjects—as in <mark>S or S / Either S or S / Neither S nor S</mark>—<u>look only at the S <span class="circ">nearer</span> to the V</u>:',
          { ex: 'Ex6', lines: [ 'Professional tools <span class="circ">or</span> at least a power <u>screwdriver</u>, like the one my roommate owns, <b class="circ">is</b> needed for this job.' ] },
          'Even though <b>tools</b> is one of the subjects, in an <b>S or S</b> sentence, we match the V only with the <u>nearer S</u>.'
        ]
      },
      {
        kind: 'learn', id: '4-4', short: '4-4 도치문 ★', title: '4-4. Inverted Sentences (when V comes before S)', page: 'p.16',
        ko: '★ Memorize these! — 평소엔 S가 V 앞에 오지만 6가지 구조에서는 순서가 뒤집힌다 (there/here · 전치사구 · 분사 먼저 · 도치 비교 · 부정어 문두 · 의문문).',
        blocks: [
          { note: '필기: ★ <b>Memorize these!!</b> “inverted” — 도치문은 V를 먼저 보고 그 뒤에서 S를 찾는다.', kind: 'rule' },
          'The S usually comes before the V, but in some sentence structures, that order is reversed. <b>Memorize these!</b>',
          { table: { head: ['', '예문', '유형'], rows: [
            ['<b>4-4a</b>', 'There <b>were</b> fifteen <u>dogs</u> in the kennel.', '<b>A:</b> there/here before V <small>(NOTE: <i>There</i> isn’t a noun — 진짜 S는 V 뒤에 나옴)</small>'],
            ['<b>4-4b</b>', 'In the back of the hall <b>were</b> <u>a picture and a statue</u>.', '<b>B:</b> prepo phrases before V'],
            ['<b>4-4c</b>', 'Hoping to break the record <b>was</b> <u>a boy</u> named Mark.', '<b>C:</b> V is divided in two parts, participle first'],
            ['<b>4-4d</b>', 'Beef requires 10 times more water than <b>do</b> <u>other types</u> of meat.', '<b>D:</b> inverted comparison'],
            ['<b>4-4e</b>', 'Not since 1945 <b>has</b> such a big <u>conflict</u> been seen.', '<b>E:</b> clauses beginning w/ negative — <small><i>Not only/since</i>, <i>Never before</i>, <i>Only after/when</i></small>'],
            ['<b>4-4f</b>', 'Do <u>Amy and Michelle</u> like basketball?', '<b>F:</b> interrogative sentences (questions)']
          ] } }
        ]
      },
      {
        kind: 'quiz', id: '4A', short: 'Practice 4A', title: 'Practice 4A — 규칙 4-1 ~ 4-4', page: 'p.17',
        options: OS, legend: OS_LEG,
        instr: '<b>PRACTICE 4A:</b> On the line provided, write <b>OK</b> or <b>SV</b>. If you find an SV error, <u>circle and connect</u> the S and V. These sentences focus only on rules 4-1 through 4-4.',
        ko: NOTE_KEY,
        example: { q: 'ExA. Neither a punishment nor promises of a big reward was effective in motivating my brother.', a: 'SV', why: 'Neither … nor → 가까운 주어 promises(복수) → were.' },
        items: [
          { q: 'Neither my parents nor my sister are willing to drive with me to Georgia this fall.', a: 'SV', why: '동사에 가까운 주어는 my sister(단수) → is.' },
          { q: 'There was a half-wrecked car and an old refrigerator on the front lawn of my uncle’s house.', a: 'SV', why: 'There 도치문 — 진짜 주어는 “a car and an old refrigerator”(복수) → were.' },
          { q: 'A box of pencils and a protractor are the only supplies you need for this class; erasers will be provided.', a: 'OK', why: '“A box of pencils”와 “a protractor”를 and가 잇는 복수 주어 → are 맞음. (pencils는 of 뒤 목적어)' },
          { q: 'Only after spending several days apart was Pat and I able to figure out a fair way to resolve our dispute.', a: 'SV', why: '도치문(Only after … was ~) — 주어 “Pat and I”는 복수 → were.' },
          { q: 'The charity workers try to maintain optimism even in the face of tragedy, but sometimes the employees doing work in a disaster zone feels overwhelmed.', a: 'SV', why: '주어 employees(복수) — doing work in a disaster zone은 수식어 → feel.' }
        ]
      },
      {
        kind: 'learn', id: '4-5', short: '4-5 불규칙 명사', title: '4-5. Irregular nouns', page: 'p.17',
        ko: 'References E·F를 외워 두기. the number는 단수, a number는 복수. the+형용사는 복수. 동명사 주어·제목/회사명은 단수.',
        blocks: [
          { h: '4-5a.' },
          'Study <u>References E and F</u> carefully until you know <b>all the irregular singular/plural nouns!</b> (이 앱의 “Glossary &amp; Reference” 챕터에서 확인)',
          { ex: 'Ex7', lines: [ 'The <u>bison</u> <b>were</b> grazing peacefully but then suddenly began to stampede.' ] },
          { h: '4-5b. A number… / the number…' },
          'The SAT commonly tests these two phrases—<mark><b>the number</b> is singular</mark> and <mark><b>a number</b> is plural</mark>:',
          { ex: 'Ex8', lines: [
            'The large <u>number</u> of members in my online coin collecting club <b>has</b> been increasing recently.',
            'A great <u>number</u> of protests <b>were</b> held when the mayor announced high fines for jaywalking.'
          ] },
          { h: '4-5c. “The [adjective]”' },
          'Authors sometimes use <b>the ADJ</b> as a way of referring to <mark>the ADJ people</mark>. Treat that phrase as <b>plural</b>:',
          { ex: 'Ex9', lines: [
            '<u>The French</u> <b>are</b> famous for their love of fine foods.',
            'Compared to the unattractive, <u>the beautiful</u> <b>are</b> more likely to be hired.'
          ] },
          { h: '4-5d. Gerund (-ing nouns) subjects' },
          'It’s easy to overlook a gerund subject and accidentally focus on its object instead. Remember that <mark>gerunds are singular</mark>:',
          { ex: 'Ex10', lines: [ '<u>Buying</u> stocks and bonds <b>is</b> risky. <span class="sm">NOTE: <i>Buying</i> is the subject; <i>stocks and bonds</i> are objects.</span>' ] },
          { h: '4-5e. Titles, phrases, companies' },
          'Capitalization, italics, or quotes show you when a writer is referring to <mark>a singular company or work of art</mark>, etc:',
          { ex: 'Ex11', lines: [ '<u><i>Lost Cities</i></u> <s>are</s> <b>is</b> my favorite documentary series.' ] }
        ]
      },
      {
        kind: 'learn', id: '4-6', short: '4-6 부정대명사', title: '4-6. Indefinite pronoun subjects (see Reference F)', page: 'p.17',
        ko: 'every-/any-/no-/some- + body/one/thing, each·either·neither는 단수(of 뒤가 복수여도). both·several·many·few·others는 복수. most·any·a lot·all·some·분수·퍼센트는 뒤 명사에 따라 달라지는 “카멜레온”.',
        blocks: [
          { h: '4-6a. Most indefinite pronouns are singular' },
          { words: ['every- / any- / no- / somebody', 'every- / any- / someone / no one', 'every- / any- / no- / something', '*each (of)', '*either (of)', '*neither (of)'] },
          { note: '필기: <b>each of · either of · neither of → always singular</b> (of 뒤에 복수 명사가 와도 단수 동사)', kind: 'rule' },
          { ex: 'Ex12', lines: [
            '<u>Not one</u> of my family members <s>are</s> <b>is</b> happy about the recent election.',
            '<u>Neither</u> of my cousins <s>have</s> <b>has</b> had even a part-time job.'
          ] },
          { h: '4-6b. These indefinite pronouns are always plural' },
          { words: ['*both', '*several', '*many', '*few / fewer', '*others'] },
          { ex: 'Ex13', lines: [ '<u>Several</u> of the pelicans <b>have</b> displayed signs of illness.' ] },
          { h: '4-6c. Chameleons — they’re plural when in front of a plural object noun, singular when in front of a singular noun' },
          'These indefinite pronouns (along with <b>fractions</b> and <b>percentages</b>) are like <b>chameleons</b>:',
          { words: ['most', 'any', 'a lot', 'all', 'some'] },
          { ex: 'Ex14', lines: [
            '<u>Some</u> of the <u>sectors</u> of our economy <s>has</s> <b>have</b> not yet fully recovered from the recession.',
            '<u>Some</u> of my <u>artwork</u> <s>were</s> <b>was</b> inspired by my experiences in Alaska.'
          ] },
          { note: '<b>NOTE:</b> Don’t worry about <b>none</b> &amp; <b>a majority</b>; opinions vary on how to treat them, so the SAT avoids them. Note also that <b>relative pronouns (that/which/who(m))</b> act a bit like chameleons. See <b>Reference D</b> for details.', kind: 'tip' }
        ]
      },
      {
        kind: 'quiz', id: '4B', short: 'Practice 4B', title: 'Practice 4B — 불규칙 명사 (4-5, 4-6)', page: 'p.18',
        options: OS, legend: OS_LEG,
        instr: '<b>PRACTICE 4B:</b> The following problems focus on irregular nouns from rules 4-5 and 4-6. Study <b>References E &amp; F!</b>',
        ko: NOTE_KEY,
        example: { q: 'ExB. Neither of the people nominated by the students were allowed to serve on the council.', a: 'SV', why: 'Neither(of) = 단수 → was.' },
        items: [
          { q: 'I eventually realized that solving the puzzles were easier than I had expected—as long as I read the clues.', a: 'SV', why: '동명사 solving이 주어 → 단수 was. (puzzles는 목적어)' },
          { q: 'Some of the people in the audience were aware of the methods used by the magician and felt disappointed.', a: 'OK', why: 'Some of + 복수명사(people) → 복수 were.' },
          { q: 'Several of the concertgoers have become ill because of the poor food handling practices of a few vendors.', a: 'OK', why: 'Several = 항상 복수 → have.' },
          { q: 'I hope that neither of my children ever have to experience what I went through at the hospital.', a: 'SV', why: 'neither of = 항상 단수 → has.' },
          { q: 'The alumni was planning to hold a reunion at a theater, but a smaller venue was chosen instead.', a: 'SV', why: 'alumni = alumnus의 복수 → were. (Reference E)' }
        ]
      },
      {
        kind: 'quiz', id: '4C', short: 'Practice 4C', title: 'Practice 4C — Lesson 4 전체 규칙', page: 'p.18',
        options: OS, legend: OS_LEG,
        instr: '<b>PRACTICE 4C:</b> Follow the same instructions you followed above. These sentences cover <b>all the rules from Lesson 4</b>.',
        ko: NOTE_KEY,
        items: [
          { q: 'Only after a long discussion was the president of the civic association and the county board of supervisors able to reach an agreement.', a: 'SV', why: '도치문. “the president … and the county board …” — and가 두 주어를 이음 → 복수 were.' },
          { q: 'The announcement about the new playground and recreation center has incited a flurry of protest because little advance notice to the community residents was given.', a: 'OK', why: '주어 announcement(단수) → has. “playground and recreation center”는 about의 목적어. notice(단수) → was.' },
          { q: 'Neither Tom nor I were prepared to deal with the controversy that followed the publication of our protest letter: all of the members of the school board were apparently upset.', a: 'SV', why: 'Neither Tom nor I → 가까운 주어 I → was prepared.' },
          { q: 'Neither of my best friends was able to help me finish my presentation; each of them were busy with the science project.', a: 'SV', why: 'each of them = 항상 단수 → was. (첫 절 Neither of … was는 OK)' },
          { q: 'I was surprised to learn that neither of my cousins were planning to attend college next year.', a: 'SV', why: 'neither of = 단수 → was planning.' },
          { q: 'The auction was highlighted by the sale of fifteen 19th-century landscape paintings, each of which were sold for more than a million dollars.', a: 'SV', why: 'each of which = 단수 → was sold.' },
          { q: 'Underneath several layers of shale lie natural gas reserves that have yet to be tapped by drilling companies.', a: 'OK', why: '도치문(B: 전치사구 먼저). 주어 = natural gas reserves(복수) → lie. shale은 of 뒤 목적어, that절 주어도 reserves.' },
          { q: 'Because the farm equipment and antiquated irrigation system has fallen into disrepair, the inspectors from the Agriculture Department have decided to recommend a total overhaul.', a: 'SV', why: '“the farm equipment and antiquated irrigation system” = and로 이은 복수 주어 → have fallen.' },
          { q: 'The news about the controversial statements and the subsequent resignation of the franchise owner were reported in the media, but local newspapers tried to bury the story, owned as they were by that same man.', a: 'SV', why: 'news는 -s로 끝나지만 단수(Reference E) → was reported. about … 이하는 수식어.' },
          { q: 'Undiscovered for more than a century were a collection of hand-crafted jewelry and silverware, the creations of a long-forgotten Portuguese artisan.', a: 'SV', why: '도치문(C: 분사 먼저). 주어 “a collection of jewelry and silverware” — collection(단수)이 주어 → was.' },
          { q: 'Finishing several articles overnight were easy for the newly-hired journalist; she was the chief editor of her college newspaper for three years.', a: 'SV', why: '동명사 Finishing이 주어 → 단수 was.' },
          { q: 'An increasing number of city residents and business owners have joined the chorus of protest because neither of the popular mayoral candidates were approved by the city council.', a: 'SV', why: '“An increasing number”는 복수(have joined OK) 하지만 neither of … → was approved.' },
          { q: 'The larger part of the author’s poems and prose thought to have been destroyed in a fire were actually recovered shortly after the debris was removed by a salvage crew.', a: 'SV', why: '주어의 핵심 명사는 단수 part (of the author’s poems and prose는 전치사구, thought to … fire는 수식어) → was actually recovered. “part”는 4-6c의 카멜레온 목록(most, any, a lot, all, some)에 없어서 구조대로 단수로 봐요. (뒤의 “the debris was removed”는 올바른 단수.) <span class="sm">※ 내 첫 풀이는 OK였지만, 손필기 답(SV)과 교재 규칙에 맞춰 바로잡았어요.</span>' },
          { q: 'Not one of the city planners on the ad hoc committee was willing to defend the actions of the recently-disgraced commissioner.', a: 'OK', why: 'Not one = 단수 → was.' },
          { q: 'Only by executing deserters was General Washington and his top commanders able to hold together the often-undisciplined colonial militias.', a: 'SV', why: '도치문(E: Only by …). 주어 “General Washington and his top commanders”는 복수 → were.' }
        ]
      },
      {
        kind: 'quiz', id: 'C14', short: 'Cumulative 1–4', title: 'Cumulative Practice 1–4', page: 'p.19',
        options: ['OK', 'FRAG', 'MOD', 'PUNC', 'SV'],
        legend: { OK: '오류 없음', FRAG: 'Fragment error — IC가 없음', MOD: 'Modifier error', PUNC: 'Punctuation error', SV: 'Subject–Verb agreement error' },
        instr: 'Follow the same instructions you followed for the previous Cumulative Practice exercises, and make sure you continue to show where in each sentence the errors occur. On the line provided, write <b>OK</b> or the following annotations for any errors you find: <b>FRAG, MOD, PUNC,</b> or <b>SV</b>.',
        ko: NOTE_KEY + ' 손필기 답과 달라서 규칙으로 다시 판단한 문항은 해설에 표시했어요.',
        items: [
          { q: 'The director was taken aback at the news that her footage was lost, because the film had been shot overseas, she couldn’t imagine any way that the project could continue without that footage.', a: 'PUNC', why: 'IC, DC(because …), IC → 콤마 스플라이스(3-1d). 필기: DC 뒤에서 IC가 연결되는 구조 오류.' },
          { q: 'Jeremy’s dad likes to say that / when in doubt about what to do, pausing to consider the implications of each possible action may be a wise first step.', a: 'MOD', why: 'fake beginning(says that) 뒤 “when in doubt …”의 주체는 사람인데 주어는 pausing(동명사).' },
          { q: 'A surprisingly large number of conservatives has shown their support for the inexperienced candidate, despite her controversial record as a leader in the business world.', a: 'SV', why: '“A number of”은 복수 → have shown.' },
          { q: 'Educators must be aware of different factors that may inhibit effective learning, for example, a student may perform poorly because of family problems or food insecurity.', a: 'PUNC', why: 'IC, for example, IC → “learning<b>;</b> for example,”처럼 세미콜론 필요.' },
          { q: 'Even after Christmas break had started, Jean couldn’t enjoy a moment of peace: she had to take care of three younger siblings and work two jobs to pay her accumulated bills.', a: 'OK', why: 'DC, IC: IC 형태로 콜론(왼쪽 IC → 오른쪽 설명 IC). 올바름.' },
          { q: 'Unless Ray improves his knowledge of fundamental concepts, he bound to struggle in his math class next year, too.', a: 'FRAG', why: 'DC(Unless Ray improves …) 뒤의 “he bound to struggle …”에는 동사가 없음(bound는 동사가 아님) → IC가 없음. 필기: “S is”가 필요.' },
          { q: 'Stolen from the museum’s archive was an original Proust manuscript and a sketch by Picasso of an image that he later incorporated into one of his most famous works.', a: 'SV', why: '도치문(C: 분사 먼저). 주어 “an original Proust manuscript and a sketch” = 복수 → were.' },
          { q: 'Even after getting help from his peers, Henry’s efforts to change the school dress code were largely unsuccessful.', a: 'MOD', why: '“getting help”의 주체는 사람(Henry)인데 주어는 Henry’s efforts.' },
          { q: 'Some of the money the Lowe brothers used to start their company were their parents’; most of their funds, however, were provided by a start-up incubator fund.', a: 'SV', why: 'Some of + money(단수) → was. (“most of their funds … were”는 OK)' },
          { q: 'Luke’s golden retriever barged in the living room with muddy paws while working on a school project.', a: 'MOD', why: 'IC + while working …: 일하는 주체는 사람(Luke)인데 IC의 주어는 golden retriever (소유격 Luke’s는 주어 아님).' },
          { q: 'The general’s trembling voice revealed his true feelings; he understood that his forces were outnumbered, and he feared that each of his soldiers were facing death and defeat.', a: 'SV', why: 'each of = 항상 단수 → was facing.' },
          { q: 'The Motion Picture Association of America has determined that neither of the films submitted for review are appropriate for viewers under 17.', a: 'SV', why: 'neither of = 단수 → is.' },
          { q: 'By gaining a more complex understanding of the human body, a cure for most types of cancer may soon be developed.', a: 'MOD', why: '“By gaining …”의 주체는 사람인데 주어는 a cure.' },
          { q: 'Neither the cabinet members nor the committee chair are willing to take responsibility for the debacle; everyone involved is blaming someone else for the misunderstanding and public controversy.', a: 'SV', why: 'Neither … nor → 가까운 주어 chair(단수) → is.' },
          { q: 'Because of his friendly, energetic personality: Noah is well-liked by his classmates and professors alike.', a: 'PUNC', why: '콜론 왼쪽 “Because of his friendly, energetic personality”는 IC가 아님 → 콜론 오류(콤마로).' }
        ]
      }
    ]
  });
})(window.SAT_DATA);

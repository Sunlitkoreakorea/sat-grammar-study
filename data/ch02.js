/* Lesson 2. Modifiers (교재 pp.8–11) + Cumulative Practice 1–2 + Decision Tree */
(function (D) {
  var OM = ['O', 'MOD'];
  var OM_LEG = { O: '수식어가 올바르게 쓰임(또는 수식어 자체가 없음)', MOD: 'Modifier error — 수식어가 뒤따르는 엉뚱한 주어를 꾸밈' };
  var IC_NODE = '+<b>IC</b>를 보고 있다 → 완전한 문장(Fragment 오류는 불가능). 이제 확인: ① IC 뒤에 분사 MOD가 있나? (2-3 규칙; 콤마가 없을 수도!) <i>The food began to spoil after taking it out of the refrigerator.</i> → taking it out은 주어 food를 꾸밀 수 없어 오류. ② (Lesson 3부터) 구두점 오류가 있나?';

  D.chapters.push({
    id: 'L2', order: 2, no: 'L2', short: 'Modifiers', title: 'Lesson 2. Modifiers',
    ko: '수식어는 바로 뒤 절의 주어를 꾸민다 — dangling modifier, fake beginning, 문장 뒤에 오는 -ing 수식어',
    parts: [
      {
        kind: 'learn', id: '2-1', short: '2-1 수식어', title: '2-1. Modifiers describe the S of the clause they’re next to', page: 'p.8',
        ko: '수식어(S·V가 없는 구)는 반드시 바로 뒤 절의 주어를 설명해야 한다. 문장이 수식어로 시작하면 그 뒤 주어를 꼭 검사!',
        blocks: [
          '<b>Modifiers</b> are groups of words that lack an <b>S</b> or <b>V</b>. They may contain action words—like <i>-ing</i> participles, as in <b>walking home from school</b>—or infinitives, as in <b>in order to get home</b>—but they <u>don’t contain a verb</u>.',
          { ex: 'Ex1', lines: [
            ['While <b>I was walking</b> home', 'clause — subject: I, verb: was walking home', 'ok'],
            ['While <b>walking</b> home', 'modifier — walking isn’t a verb; home is an object, not a subject']
          ] },
          { p: '<u>Modifiers must describe the <b>S</b> of the clause they’re next to.</u> A <mark>dangling modifier</mark> is an SAT error type. It occurs when a modifier fails to describe the S it is placed next to:' },
          { ex: 'Ex2', lines: [
            ['<u>While walking home</u>, <b>the sun</b> was setting.', 'ERROR', 'err'],
            ['<u>While I was walking home</u>, the sun was setting.', 'OK', 'ok']
          ] },
          { list: [
            '<b>ERROR:</b> the modifier <i>While walking home</i> must describe something that can actually walk. (필기: 뒤에 오는 S는 walking 하는 대상이어야 함 → “the sun”은 걸을 수 없다.)',
            '<b>OK:</b> the sentence no longer contains a modifier, so no modifier error is possible.'
          ] },
          { note: '필기 예문 — <i>While shouting at class, Mr. R’s face turns purple.</i> (shouting의 주체는 사람인데 S가 “face”라 오류). “Modifier phrase → select valid subject.”', kind: 'tip', title: '손필기 예시' },
          { note: '<b>IMPORTANT!</b> As you see in Ex2 above, you must <u>check the beginning of every SAT sentence</u>: <mark>does it start with a modifier or a clause?</mark> If it’s a clause, you can safely ignore the subject that follows. However, if a sentence starts with a modifier, <u>you must <i>always</i> check the subject noun in the clause that follows!</u>', kind: 'rule' }
        ]
      },
      {
        kind: 'quiz', id: '2A', short: 'Practice 2A', title: 'Practice 2A — 수식어 오류 찾기', page: 'p.8',
        options: OM, legend: OM_LEG,
        instr: '<b>PRACTICE 2A:</b> <u>Underline</u> all modifiers. Then circle the S that it modifies and draw a connecting line between them. If the modifiers are used correctly, write <b>O</b> on the line provided. If the modifier incorrectly describes a subject, write <b>MOD</b> on the line provided and X out the subject. If a sentence has no modifiers, don’t underline or draw lines; just write <b>O</b> on the line provided.',
        ko: '문장이 수식어로 시작하면 바로 뒤 주어가 그 수식어의 동작 주체로 말이 되는지 확인. 수식어가 아예 없으면(S·V가 있는 절로 시작하면) O.',
        example: { q: 'ExA. While working in California, Dr. Peterson’s stress was worsened by the awful teammate she was partnered with.', a: 'MOD', why: '“While working in California”의 주체는 사람인데 바로 뒤 주어는 stress(스트레스는 일할 수 없음).' },
        items: [
          { q: 'If not properly prepared, the chicken might end up tasting bland or dry.', a: 'O', why: '“If not properly prepared” = 수식어. 조리되는(prepared) 대상은 the chicken → 올바름.' },
          { q: 'When it was sitting on a pedestal, the statue looked quite majestic.', a: 'O', why: '“When it was sitting …”에는 S(it)와 V(was sitting)가 있는 DC → 수식어가 아니라 절. MOD 오류 불가능.' },
          { q: 'If not in the right state of mind, appreciating this symphony is impossible.', a: 'MOD', why: '“If not in the right state of mind”는 사람을 설명해야 하는데 뒤 주어는 appreciating(감상하는 행위) → MOD.' },
          { q: 'Because Martha did her work so well, her bonus was doubled.', a: 'O', why: 'Because Martha did …는 S·V가 있는 DC(절) → 수식어가 아님. MOD 불가능.' },
          { q: 'After studying for nearly ten hours, my eyes could barely focus.', a: 'MOD', why: '공부한 주체는 사람(I)인데 뒤 주어는 my eyes.' },
          { q: 'After examining the crime scene, the investigation continued in the laboratory.', a: 'MOD', why: '현장을 조사한 주체는 사람인데 뒤 주어는 the investigation.' },
          { q: 'By quickly completing its challenge, the team was awarded bonus points.', a: 'O', why: '“By quickly completing its challenge” — 도전을 완수한 주체 = the team (its가 team을 가리킴).' },
          { q: 'As a talented artist, Ken’s ability to render the human form is widely recognized.', a: 'MOD', why: '“As a talented artist”는 사람(Ken)을 설명해야 하는데 뒤 주어는 Ken’s ability (소유격 Ken은 주어가 아님).' },
          { q: 'If a captive animal is not properly cared for, its health can suffer, or it can die.', a: 'O', why: 'If a captive animal is …는 S·V가 있는 DC. 수식어가 아니므로 O.' },
          { q: 'While raining, drivers must turn on their headlights.', a: 'MOD', why: '“While raining”은 비를 주어로 하는 수식어이지만 뒤 주어는 drivers(운전자가 비가 올 수 없음). “While it is raining”이면 OK.' }
        ]
      },
      {
        kind: 'learn', id: '2-2', short: '2-2 Fake beginning', title: '2-2. Modifiers hidden after “fake beginnings” or later in sentences', page: 'p.9',
        ko: '“I hope that / Mike believes that” 같은 fake beginning이 있으면 that 뒤에 슬래시를 긋고, 그 뒤 “진짜 시작”을 검사. IC가 둘이면 두 쪽 다 확인.',
        blocks: [
          'Otherwise simple sentences are often made <b>more complex</b> on the SAT with the addition of a “<b>fake beginning</b>,” an introductory phrase like <i>I hope that, Mike believes that,</i> or <i>The newspapers recently reported that…</i>',
          'It’s best to check every SAT problem for fake beginnings and, if you see one, to <u>draw a slash after the word <b>that</b></u>. Then you should check the “real beginning” that follows for possible modifier errors as you learned in 2-1:',
          { ex: 'Ex3', lines: [ ['My dad often says that<b> / </b><u>before buying a new car</u>, <u>its repair record</u> should be checked.', 'MOD ERROR', 'err'] ] },
          'Similarly, you should be mindful that SAT sentences often contain <u>more than one IC</u>. If a sentence has two parts (perhaps divided by a semicolon or FANBOYS conjunction—see Lesson 3), remember to <u>check both parts</u> for possible modifier errors:',
          { ex: 'Ex4', lines: [
            ['<u>Before opening the store</u>, <u>employees</u> must enter a security code;', 'OK', 'ok'],
            ['<u>before closing it</u>, <u>their job</u> is to lock all doors.', 'MOD ERROR', 'err']
          ] },
          { note: '두 번째 IC의 “before closing it”은 닫는 사람을 설명해야 하는데 주어는 “their job” → 오류.', kind: 'tip' }
        ]
      },
      {
        kind: 'quiz', id: '2B', short: 'Practice 2B', title: 'Practice 2B — fake beginning 포함', page: 'p.9',
        options: OM, legend: OM_LEG,
        instr: '<b>PRACTICE 2B:</b> Follow the instructions from Practice 2A. But mark any fake beginnings you see, and look for structures like Ex4 above.',
        ko: '“…that” 뒤에 슬래시를 긋고 그 뒤의 진짜 시작 부분의 수식어와 주어의 관계를 확인하세요.',
        example: { q: 'ExD. The scientists claimed that / if not dramatically reduced, we will witness a significant rise in sea levels because of greenhouse gas emissions.', a: 'MOD', why: '“if not dramatically reduced”는 emissions를 설명해야 하는데 뒤 주어는 we.' },
        items: [
          { q: 'The agency announced that / by rigorously enforcing existing laws, it intends to help reduce air pollution.', a: 'O', why: '법을 집행하는 주체 = it(= the agency) → 올바름.' },
          { q: 'The new law states that / while raining, headlights must be turned on.', a: 'MOD', why: '“while raining”은 비를 주어로 하는 수식어인데 뒤 주어는 headlights.' },
          { q: 'A consensus has emerged in medicine which suggests that / by informing patients about their treatment options, doctors may be better able to choose the best plan.', a: 'O', why: '“by informing patients …”의 주체 = doctors → 올바름. (that 뒤에 슬래시 후 진짜 시작 확인)' },
          { q: 'Mike thinks that / before he opened the window, the mosquito was already in his room.', a: 'O', why: '“before he opened the window”는 S(he)·V(opened)가 있는 DC → 수식어가 아니라 절이라 MOD 불가능.' }
        ]
      },
      {
        kind: 'learn', id: '2-3', short: '2-3 IC + MOD', title: '2-3. Modifiers in IC, MOD sentences', page: 'p.9',
        ko: 'IC 뒤에 -ing 수식어가 와도 OK — 단, 그 수식어가 IC의 주어를 올바르게 설명할 때만. 콤마는 before/after/if/while/when으로 시작하면 생략 가능.',
        blocks: [
          'Many students know about <i>–ing</i> MOD, IC sentences, but they assume that it’s wrong to reverse the order. It’s fine to write an <b>IC, –ing MOD</b> sentence, <u>as long as the –ing MOD correctly describes the S of the IC</u>.',
          { note: '필기: <b>Does action MOD describes S?</b> — 수식어의 동작을 S가 할 수 있는지 먼저 묻기.', kind: 'tip' },
          { ex: 'Ex4', lines: [
            ['<u>Tom</u> shouted from atop the mountain, <u>feeling invigorated by the cold air</u>.', 'OK', 'ok'],
            ['<u>The children</u> fell fast asleep, <u>exhausted after ten hours in the car</u>.', 'OK', 'ok'],
            ['<u>The boys</u> fell fast asleep <u>while studying for the exam</u>.', 'OK', 'ok'],
            ['Tom’s <u>legs</u> were aching, <u>having reached the summit after a long hike</u>.', 'MOD ERROR', 'err'],
            ['Sam’s <u>head</u> ached <u>after doing homework all day</u>.', 'MOD ERROR', 'err']
          ] },
          { list: [
            '<b>exhausted</b> is a participle, not a verb, and it correctly describes <b>children</b>.',
            '<mark class="o">Note also that <b>comma is omitted</b> when a modifier begins with <b>before, after, if, while, and when</b>.</mark>',
            '<b>MOD ERROR:</b> legs can’t reach a summit. &nbsp;·&nbsp; <b>MOD ERROR:</b> a head can’t do homework.'
          ] }
        ]
      },
      {
        kind: 'quiz', id: '2C', short: 'Practice 2C', title: 'Practice 2C — IC 뒤에 오는 수식어', page: 'p.9',
        options: OM, legend: OM_LEG,
        instr: '<b>PRACTICE 2C:</b> Follow the same instructions from Practice 2A &amp; 2B. This time, look for <b>modifiers after the IC</b>.',
        ko: '이번에는 문장 끝에 붙은 수식어가 IC의 주어를 올바르게 설명하는지 확인합니다.',
        example: { q: 'ExE. Dr. Peterson’s stress was worsened by her uncomfortable living conditions while staying in California.', a: 'MOD', why: '“while staying in California”의 주체는 사람인데 IC의 주어는 stress.' },
        items: [
          { q: 'Dr. Woo’s study was described in several newspapers before it was even vetted and formally published.', a: 'O', why: 'before it was even vetted …는 S(it)·V(was vetted)가 있는 DC → 수식어가 아님.' },
          { q: 'The map was prominently displayed in the exhibit, having been restored by a team of skilled cartographers.', a: 'O', why: '“having been restored”는 복원된 대상 = the map → 올바름.' },
          { q: 'Pria’s exam scores were disappointingly low even after studying for three weeks.', a: 'MOD', why: '“after studying for three weeks”의 주체는 사람(Pria)인데 IC의 주어는 exam scores(소유격 Pria’s는 주어 아님).' },
          { q: 'Gerard lay sprawled across the couch with his shoes still on his feet, snoring loudly in his sleep.', a: 'O', why: '“snoring loudly in his sleep”의 주체 = Gerard → 올바름.' }
        ]
      },
      {
        kind: 'quiz', id: 'C12', short: 'Cumulative 1–2', title: 'Cumulative Practice 1–2', page: 'p.10',
        options: ['OK', 'MOD', 'FRAG'],
        legend: { OK: '오류 없음', MOD: 'Modifier error — 수식어가 엉뚱한 주어를 꾸밈', FRAG: 'Fragment error — 독립절(IC)이 없음' },
        instr: 'Some of the sentences below contain <b>modifier</b> or <b>fragment</b> errors. On the line provided, write <b>MOD</b> or <b>FRAG</b> or <b>OK</b> as appropriate. <u>If you see a MOD error, you must show your work</u> as you did in the previous exercises: draw lines between the MOD and the S it fails to properly modify. You are not required to fix incorrect sentences. Watch out for <b><u>fake beginnings</u>!</b>',
        ko: '필기: “ignore decision tree = fail!” — 막히면 Decision Tree 단계의 순서대로 따라가 보세요.',
        example: { q: 'Ex) My mom says that / if not married before forty, a man’s chances of ever marrying are basically zero.', a: 'MOD', why: '“if not married before forty”는 사람을 설명해야 하는데 주어는 chances.' },
        items: [
          { q: 'The marketing department’s research showed that / even after offering generous discounts, the company was unable to significantly boost sales.', a: 'OK', why: '할인을 제공한 주체 = the company → 올바름.' },
          { q: 'The car swerved off the road when opening the window to let out a mosquito.', a: 'MOD', why: '“when opening the window …”는 IC 뒤 수식어 — 창문을 연 주체는 사람인데 IC의 주어는 the car.' },
          { q: 'With her powerful orations, Alice Paul argued that the cause of human rights could not be advanced until women had the right to vote.', a: 'OK', why: '“With her powerful orations”는 Alice Paul과 잘 맞음(바로 뒤 주어).' },
          { q: 'Although many are aware of California’s magnificent redwood forests, fewer know that the Pacific Northwest region home to the largest temperate rainforests in the world.', a: 'FRAG', why: 'that 뒤(fake beginning 이후)의 “the Pacific Northwest region home to…”에 동사가 없어 완전한 S+V 절이 성립하지 않음(is home to가 필요).' },
          { q: 'Without looking up, my face showed how I felt; I was extraordinarily disappointed.', a: 'MOD', why: '“Without looking up”의 주체는 사람인데 뒤 주어는 my face.' },
          { q: 'Long a mystery in the west, scurvy was widely understood in Asia by the 1400s, and Chinese sailors avoided the disease by growing and eating bean sprouts during ocean voyages.', a: 'OK', why: '“Long a mystery in the west”는 scurvy를 올바르게 설명. 두 번째 IC도 문제 없음.' },
          { q: 'Caroline rarely bothered by the things that stress out her classmates, even though she takes more challenging classes than most of her peers.', a: 'FRAG', why: '앞부분 “Caroline rarely bothered …”에는 동사가 없고(과거분사), 뒤는 even though로 시작하는 DC → IC가 없음.' },
          { q: 'In order to finish the assignment on time, help was essential for almost everyone in the class.', a: 'MOD', why: '“In order to finish …”의 주체는 사람인데 뒤 주어는 help.' },
          { q: 'When thinking about which news shows actually present the news in an unbiased way, very few programs come to mind.', a: 'MOD', why: '“When thinking about …”(participial MOD)의 주체는 사람인데 뒤 주어는 very few programs. (which news shows … present는 명사절)' },
          { q: 'Reflecting the progressive ideals of urban America, popular protagonists like Marjorie Dean encouraged young readers in the early 1900s to help the needy and fight injustice.', a: 'OK', why: '“Reflecting the progressive ideals …”는 popular protagonists를 설명 → 말이 됨.' },
          { q: 'Without even pausing for a second, the runner zoomed past all of her competitors; while strutting up to the winner’s platform, her face was full of pride.', a: 'MOD', why: '두 번째 IC에서 “while strutting up to the winner’s platform”의 주체는 사람인데 주어는 her face. (첫 번째 IC는 OK)' },
          { q: 'That no one at the inspector’s office had ever examined the bridge was astounding given its importance to the city.', a: 'OK', why: '“That no one … had ever examined the bridge”는 명사절 주어(동사 was astounding). given its importance …도 문제 없음.' },
          { q: 'Astounded by the enormity of the shipwreck, the divers who swam in to take a closer look.', a: 'FRAG', why: 'the divers who swam in …의 who는 관계절. 주어 the divers에 대한 본동사가 없어 IC가 없음.' },
          { q: 'If asked to name a popular reggae singer, the answer is almost always “Bob Marley.”', a: 'MOD', why: '“If asked to name …”는 사람(질문받는 이)을 설명해야 하는데 주어는 the answer.' },
          { q: 'Although Picasso’s work is today among the most acclaimed and expensive in the world, when the artist was young, the popularity of his work lacking and his income surprisingly low.', a: 'FRAG', why: 'Although … / when the artist was young 모두 DC. “the popularity of his work lacking …”에는 동사가 없어 IC가 없음.' }
        ]
      },
      {
        kind: 'learn', id: 'tree', short: 'Decision Tree', title: 'Decision Tree: Finding MODIFIER & FRAGMENT errors', page: 'p.11',
        ko: '① fake beginning 표시 → ② 시작 부분에 동사가 있나? → ③ 수식어면 뒤 주어 확인, 절이면 IC/DC 판별 → ④ IC가 있으면 문장 완성. (필기: THIS IS GRAMMAR ★)',
        blocks: [
          { note: '필기: <b>THIS IS GRAMMAR ★</b> — 문법 문제는 이 순서대로 푸는 습관이 핵심!', kind: 'rule' },
          { tree: { title: '<b>Decision Tree</b> — 위에서 아래로 따라가요', root: {
            q: '<b>① 문장 시작에 fake beginning이 있나?</b> 있으면 표시하고 (<i>Ms. Karp believes that<b>/</b>…</i>) 표시 뒤의 “진짜 시작(real beginning)”을 본다. <i>(필기: find RC or NC → continue)</i>',
            b: [['continue', {
              q: '<b>② 시작 부분의 구에서 <u>동사(verb)</u>가 보이나?</b>',
              b: [
                ['NO', {
                  q: '<b>MODIFIER</b> — 구에 V가 없음(따라서 S도 없음). <small>NOTE: <i>While walking the dog that I adopted,</i>는 DC(that I adopted)를 포함해도 MOD로 시작하므로 MOD로 취급.</small><br>이제 <u>뒤따르는 절의 S</u>가 이 MOD를 올바르게 받는지 확인!',
                  b: [
                    ['MOD ERROR', '!MOD ERROR — 수식어가 주어를 올바르게 설명하지 못함. <small>1. While walking the dog that I adopted, <u>many people</u> stared at me. (오류) 2. While walking the dog that I adopted, <u>I</u> was stared at by many people. (OK — 의도된 주어는 I)</small>'],
                    ['OK — no MOD ERROR', {
                      q: 'MOD와 S 사이에 문제 없음. <b>MOD 뒤에 IC가 있나?</b>',
                      b: [
                        ['NO', '!<b>FRAGMENT error</b> — 완전한 문장처럼 보이지만 IC가 없는 단어 묶음.'],
                        ['YES', IC_NODE]
                      ]
                    }]
                  ]
                }],
                ['YES', {
                  q: '<b>정말 동사가 맞나?</b> 동사라면 같은 구 안에서 그 동사의 주어 명사를 찾을 수 있어야 함 (Lesson 1). <small><i>While walking in the park,</i> → V 없음 (-ing는 동사가 아님; park는 전치사 in 뒤 목적어) · <i>To get to the store,</i> → V 없음 (to get은 V가 아님; store는 전치사 to 뒤 목적어)</small>',
                  b: [
                    ['Oops—동사를 잘못 본 것', '→ 위의 <b>MODIFIER</b> 경로(NO)로 이동'],
                    ['YES: 시작에 S &amp; V가 있음', {
                      q: '<b>시작 부분은 CLAUSE.</b> IC인지 DC인지 판별: Reference D의 종속접속사(subordinating conjunction)로 시작하나?',
                      b: [
                        ['YES — Ref D 단어로 시작', {
                          q: '시작 부분은 <b>DC</b>. DC 뒤를 보자 — <b>IC가 있나?</b>',
                          b: [
                            ['NO', '!<b>FRAGMENT error</b>'],
                            ['YES', IC_NODE]
                          ]
                        }],
                        ['NO — Ref D 단어로 시작 안 함', IC_NODE]
                      ]
                    }]
                  ]
                }]
              ]
            }]]
          } } }
        ]
      }
    ]
  });
})(window.SAT_DATA);

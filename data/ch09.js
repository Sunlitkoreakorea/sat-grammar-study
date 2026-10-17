/* Lesson 9. Parallelism (교재 pp.28–31) */
(function (D) {
  var PAR = ['OK', '//', '//ID'];
  var PAR_LEG = { OK: '병렬 구조 오류 없음', '//': 'Parallelism error — 병렬되어야 할 항목의 문법 형태가 다름', '//ID': 'Parallelism idiom error — both…and / not only…but also 같은 병렬 관용구 자체가 틀림' };
  var NOTE_KEY = '※ 교재 정답지는 사진에 없어서, 손필기 답과 규칙(9-1~9-3)을 함께 대조해 정리한 답이에요.';

  D.chapters.push({
    id: 'L9', order: 9, no: 'L9', short: 'Parallelism', title: 'Lesson 9. Parallelism',
    ko: '병렬 구조 — 문장을 두세 번 읽어 A·B(·C)를 괄호로 묶어 확인. 관용구(both A and B)는 정확히 지키기.',
    parts: [
      {
        kind: 'learn', id: '9-0', short: '9 개요', title: '9. Isolating sentence parts to test parallelism', page: 'p.28',
        ko: '가장 헷갈리고 자주 틀리는 문제 유형. 핵심 단계는 “문장을 두 번(또는 세 번) 읽어서” 각 부분이 문법적으로 병렬이고 의미가 맞는지 확인하는 것.',
        blocks: [
          'The most deceptive (and thus most commonly-missed) grammar problems on the SAT test your ability to evaluate a sentence’s parallelism. The essential step in testing parallelism is <mark><b>reading the sentence twice</b> (or three times)</mark> to make sure that its parts are grammatically parallel and create appropriate meaning:',
          { ex: 'Ex1', lines: [ 'A pair of cats has always protected our house, ridding it of <span class="bx">rats and other pests that could spread disease</span>, not to mention <b>gave / give / giving / has given</b> my mom a heart attack.' ] },
          'The above example, based closely on an SAT problem, requires you to consider context when you determine which words should be parallel. It also doesn’t use a typical parallelism signal word but can still be correctly tested by <b>bracketing each possible combination and reading the sentence twice</b>.',
          'Fortunately, SAT problems usually contain obvious signal words or structures that allow you to isolate and test each possible combination. Your job is to follow the correct steps based on the structures/signals you see.'
        ]
      },
      {
        kind: 'learn', id: '9-1', short: '9-1 두 부분 구조', title: '9-1. Easy parallelism 1: two-part structures', page: 'p.28',
        ko: 'not only A but also B · both A and B · neither A nor B 같은 두 부분 관용구. ① 관용구가 맞는지 → ② A·B 괄호 → ③ 같은 문법 형태인지 → ④ 두 번 읽기.',
        blocks: [
          { box: [
            '<b>not only</b> A <b>but also</b> B* &nbsp;·&nbsp; <b>not so much</b> A <b>as</b> B &nbsp;·&nbsp; <b>not</b> A <b>but</b> B &nbsp;·&nbsp; <b>[n]either</b> A <b>[n]or</b> B &nbsp;·&nbsp; <b>more</b> A <b>than</b> B',
            '<b>both</b> A <b>and</b> B &nbsp;·&nbsp; <b>at once</b> A <b>and</b> B &nbsp;·&nbsp; <b>between</b> A <b>and</b> B &nbsp;·&nbsp; <b>from</b> A <b>into/onto/to</b> B &nbsp;·&nbsp; <b>prefer</b> A <b>to</b> B',
            '<b>To</b> A <b>is to</b> B (infinitives) &nbsp;·&nbsp; <b>The more</b> A, <b>the more</b> B &nbsp;·&nbsp; <b>The [–er]</b> A, <b>the [–er]</b> B &nbsp;·&nbsp; <b>Some</b> A…; <b>others</b> B… &nbsp;·&nbsp; <b>One</b> A…; <b>another</b> B…'
          ] },
          { h: '(1) If you see one of the structures above, you must <mark>first check for idiom errors</mark>:' },
          { ex: 'Ex2', lines: [ ['I was unwilling to <b>both</b> help Tim cheat <span class="circ">or</span> to keep his dirty secrets.', 'idiom error → both … and', 'err'] ] },
          'It’s important for parallelism idioms to be followed <u>exactly</u>. The example above must be corrected by using a correct idiomatic structure—for example <b>both A and B</b> or <b>either A or B</b>.',
          { note: '<b>* NOTE:</b> Here’s one important exception! If you see <b>Not only</b> begin a sentence, these patterns are all fine:', kind: 'rule' },
          { ex: 'Ex3', lines: [
            '<b>Not only</b> was I upset about the election; I was <b>also</b> disgusted by the way the media covered it.',
            '<b>Not only</b> did Philip Roth influence a new generation of writers, <b>but</b> he <b>also</b> revitalized American fiction.',
            '<b>Not only</b> did Philip Roth influence a new generation of writers; he <b>also</b> revitalized American fiction.'
          ] },
          'All three sentences above are correct. They all contain <b>2 ICs</b> and start with an <u>inverted IC</u> (first seen in <b>4-4e</b>).',
          { h: 'If you’ve determined that the idiom structure is correct, you must then:' },
          { list: [
            'Use the signal words to help you bracket A and B. If the signals are <b>not… but</b>, item A consists of all the words between <b>not</b> and <b>but</b>.',
            'After you’ve identified A, use its structure to try to determine where item B ends. Do A and B have the same basic grammatical forms (verb phrase, infinitive phrase, prepo phrase, nouns, adjectives, etc)? They should.',
            'If you haven’t already found an error in step 2 above, <u>test the sentence by reading it twice</u>. <b>First, omit the signal words and item B and read the whole sentence with only part A. Then read the sentence again, this time omitting the signal words and item A.</b>'
          ], ol: true },
          'If the sentence is grammatical and correctly conveys the writer’s intended meaning when you read it both times, it’s a correct, parallel sentence.',
          { ex: 'Ex4', lines: [ 'Some Indian princes owed their status to either the invasion of the Huns or to Mauryan collapse.' ] },
          'At first glance, the sentence above may look correct, but here it is again with brackets and marks:',
          { ex: '괄호', lines: [ 'Some Indian princes owed their status to either <span class="bx">the invasion of the Huns</span> or <span class="bx"><s>to</s> Mauryan collapse</span>.' ] },
          'When the sentence is marked, it’s much easier to see that the word <b>to</b> was incorrectly repeated.'
        ]
      },
      {
        kind: 'quiz', id: '9A', short: 'Practice 9A', title: 'Practice 9A — 두 부분 구조(관용구 포함)', page: 'p.29',
        options: PAR, legend: PAR_LEG,
        instr: '<b>PRACTICE 9A:</b> On the line provided, write <b>OK</b> or <b>//</b> or <b>//ID</b>. Mark the parallel items regardless of whether you find an error. Don’t forget to check for <u>idiom errors</u> even before you evaluate the parallelism!',
        ko: NOTE_KEY,
        example: { q: 'ExA. Ecuador contains a wide variety of both birds as well as reptiles.', a: '//ID', why: 'both A and B — “as well as”는 관용구가 틀림.' },
        items: [
          { q: 'In a recent year, several museums in Philadelphia were visited by more protesters than by tourists.', a: 'OK', why: 'more A than B: A = “by more protesters”, B = “by tourists” — 둘 다 by + 명사 전치사구라 병렬이 맞음. <span class="sm">※ 손필기가 // 위에 덧쓰여 있어 최종 답을 읽을 수 없었어요. 표준 문법으로 판단한 답이라, 교재 해설과 다르면 알려주세요.</span>' },
          { q: 'I was not so much ready to win a match but eager to show how much I had improved.', a: '//ID', why: 'not so much A as B — “but”이 아니라 “as”여야 하는 관용구 오류.' },
          { q: 'You can either stop calling me late at night or can find yourself a new best friend.', a: '//', why: 'either [stop calling …] or [can find …] — “can”이 불필요하게 들어가 두 부분의 형태가 다름 (either stop … or find …).' }
        ]
      },
      {
        kind: 'learn', id: '9-2', short: '9-2 A, B, and C', title: '9-2. Easy parallelism 2: A, B, and/or C sentences', page: 'p.29',
        ko: 'A, B, and C / A, B, or C 목록은 콤마가 분명하니 B부터 찾는다 → B의 구조로 한 단어씩 뒤로 가며 A 시작점 → C 예측 → 세 번 읽기.',
        blocks: [
          'In a sentence structured with one of these patterns <b>A, B, and C</b> OR <b>A, B, or C</b>, it’s not difficult to test parallelism. This time, you don’t need to worry about idiom errors, but you should also first identify item <b>B</b> instead of <b>A</b> because the two commas make very clear exactly what item B contains.',
          { h: 'Follow these steps:' },
          { list: [
            'Use item B’s structure to help you step backwards one word at a time to try to determine where item A begins. (This step may require trial-and-error.)',
            'With A and B identified and bracketed, try to predict and check the structure of item C.',
            'Even if A, B, and C <i>seem</i> parallel, read the sentence <b>three times</b>, isolating each part, to make sure it’s correct.'
          ], ol: true },
          { ex: 'Ex5', lines: [ 'As deflation worsened, people flocked to supermarkets and bought <u>bread</u>, <u>oil</u>, <u>salt</u>, and <s>others hoarded</s> <u>meat</u>.' ] },
          'Particularly when we underline or bracket items A, B, and C, it’s easy to see that item D doesn’t match.'
        ]
      },
      {
        kind: 'quiz', id: '9B', short: 'Practice 9B', title: 'Practice 9B — A, B, and C 목록', page: 'p.29',
        options: ['OK', '//'], legend: { OK: '병렬 구조 오류 없음', '//': 'Parallelism error' },
        instr: '<b>PRACTICE 9B:</b> On the line provided, write <b>OK</b> or <b>//</b>. Use the bracketing methods in 9-2 even if the sentence is correct! <b>NOTE: //ID errors are not possible</b> on these Qs.',
        ko: NOTE_KEY,
        items: [
          { q: 'PAs are trained to talk with patients about treatment options, to prescribe medications, and even perform certain medical procedures like bone marrow aspirations.', a: '//', why: '[to talk …], [to prescribe …], and [perform …] — C에도 to가 있어야 함(to perform).' },
          { q: 'D. W. Griffith, an early filmmaker, introduced close-ups and cross-cutting; he also filmed chase scenes, used dramatic music, and he made historical epics.', a: '//', why: '[filmed chase scenes], [used dramatic music], and [he made historical epics] — C에 “he”가 더해져 형태가 다름(→ made historical epics).' }
        ]
      },
      {
        kind: 'learn', id: '9-3', short: '9-3 어려운 병렬', title: '9-3. Hard parallelism', page: 'pp.29–30',
        ko: 'A and B / A or B / A rather than B / A as well as B / A along with B — 콤마·신호어가 없으니 “B는 신호어 바로 뒤에서 시작”이라는 사실에서 출발해 한 단어씩 뒤로 가며 A를 찾는다.',
        blocks: [
          'In a sentence structured with one of these patterns: <b>A and B</b> · <b>A or B</b> · <b>A rather than B</b> · <b>A as well as B</b> · <b>A along with B</b> — your job is made <u>more difficult</u> by the fact that you can’t use commas or signal words to identify at least one parallel item. You must start with what you know—the fact that <b>item B begins right after the signal word/phrase</b>.',
          { h: 'Follow these steps:' },
          { list: [
            'Examine the beginning of item B and <b>move backwards one word at a time</b> until you find one possible place where item A begins. (This step may require trial-and-error.)',
            'After identifying one possible place where A begins, look at item B and try to determine where it ends. (This step may require trial-and-error.)',
            'If you can’t find any place where the grammatical forms of A and B match, you’ve found an error. <b>If the items you’ve tentatively bracketed <u>seem to match</u>, move on to step 4.</b>',
            'Read the sentence <b>twice</b>—once with item A only (and no signal words, such as <i>and</i> or <i>as well as</i>) and again with item B only.'
          ], ol: true },
          'If the sentence doesn’t convey the writer’s intended meaning, you may need to <b>repeat steps 1–4 a few times</b>. But <b>if you’ve exhausted every possible bracketing and the sentence still doesn’t make sense, you’ve found an error.</b>',
          { ex: 'Ex6', lines: [ ['Jabir slowly came to understand that his son <span class="bx">never had</span> and <span class="bx">never would be</span> a successful chef.', 'ERROR', 'err'] ] },
          'In the example above, we see that there’s no possible way to bracket item B to create a sentence that makes sense. When we try to read the sentence omitting <b>and</b> and item B, the result is ungrammatical, no matter where we bracket: the writer did <b>not</b> intend to say his son <u>never had be a chef</u> or his son <u>never had a chef</u>. (→ never had <b>been</b> and never would be)'
        ]
      },
      {
        kind: 'quiz', id: '9C', short: 'Practice 9C', title: 'Practice 9C — 어려운 병렬', page: 'p.30',
        options: ['OK', '//'], legend: { OK: '병렬 구조 오류 없음', '//': 'Parallelism error' },
        instr: '<b>PRACTICE 9C:</b> Carefully follow the bracketing/testing methods described in 9-3! Mark each sentence as <b>OK</b> or <b>//</b>.',
        ko: NOTE_KEY,
        items: [
          { q: 'A few years later, Hassan decided to change plans and begin pursuing medicine instead.', a: 'OK', why: 'decided to [change plans] and [begin pursuing …] — to + 동사원형 두 개 병렬(둘 다 decided to에 연결).' },
          { q: 'The workers decided that the boss never had and never would offer them a fair, reasonable contract.', a: '//', why: '“never had [offer] and never would offer” — had 뒤에 offered가 와야 함(never had offered and never would offer).' },
          { q: 'According to Dr. Brennan, amphetamines—not testosterone—are responsible for the majority of the drug violations that haunt professional sports and disgracing many star athletes.', a: '//', why: 'that haunt A and [disgracing …] — haunt … and disgrace … (동사끼리 병렬).' }
        ]
      },
      {
        kind: 'quiz', id: '9D', short: 'Practice 9D', title: 'Practice 9D — Lesson 9 전체 규칙', page: 'p.30',
        options: PAR, legend: PAR_LEG,
        instr: '<b>PRACTICE 9D:</b> The sentences below include all three types of parallelism described in this lesson. Mark the sentences according to the instructions in 9-1, 9-2, and 9-3. On the line, write <b>//</b> or <b>//id</b> or <b>OK</b>.',
        ko: NOTE_KEY,
        items: [
          { q: 'Toni Morrison was honored by Harvard University not only as a great novelist but also she wrote eloquently of the history of African American culture.', a: '//', why: 'not only [as a great novelist] but also [she wrote …] — 전치사구 vs 절. → as a great novelist but also as an eloquent writer…' },
          { q: 'The techniques used in this factory are at once enormously productive but also extremely wasteful.', a: '//ID', why: 'at once A and B — “but also”는 틀린 관용구.' },
          { q: 'Not only should journalists present a balanced view of the news; they should also attempt to stir discussion and unsettle complacent thinkers.', a: 'OK', why: 'Not only로 시작하는 도치 IC + IC → 올바름(9-1 예외). stir … and unsettle …도 병렬.' },
          { q: 'Anyone who has high motivation or is reasonably intelligent can learn to play chess reasonably well.', a: 'OK', why: 'who [has high motivation] or [is reasonably intelligent] — 동사구끼리 병렬.' },
          { q: 'Social scientists agree that a system for exchanging goods and services is not only present but also is necessary for any civilization.', a: '//', why: 'not only [present] but also [is necessary] — A는 형용사, B는 동사구 → not only present but also necessary.' },
          { q: 'Studying dance for many years, by practicing difficult steps every day, and frequent performing have enabled the dancer to secure the leading role in the spring production.', a: '//', why: '“Studying dance …, by practicing … , and frequent performing” — 동명사구 vs 명사구가 섞임 → …, and performing frequently.' },
          { q: 'Chemical fertilizers may be either a curse but they may be a blessing; the issue is still being debated.', a: '//ID', why: 'either A or B — “but”이 아니라 “or”.' },
          { q: 'To save energy, Sahar is neither willing to drive less frequently or even willing to turn off all lights when she leaves the house.', a: '//ID', why: 'neither A nor B — “or”이 아니라 “nor”.' },
          { q: 'To an Iranian, only a salt desert truly merits the name “desert,” for other types of deserts can be sown with dates, figs, and pistachios and can be watered by sprinklers or by ancient subterranean canals called qanats.', a: 'OK', why: 'can be sown … and can be watered …, [by sprinklers] or [by ancient … canals], dates, figs, and pistachios — 모두 병렬 OK.' },
          { q: 'The streets were not only too steep but also were too narrow for anything other than pedestrian traffic.', a: '//', why: 'not only [too steep] but also [were too narrow] — A에는 were가 없는데 B에는 있음 → but also too narrow.' },
          { q: 'While visiting San Francisco, we visited Fisherman’s Wharf, the Golden Gate, and rode the cable cars.', a: '//', why: '“visited A, B, and rode C” — visited Fisherman’s Wharf, visited the Golden Gate, and rode … 또는 visited A, B, and C(명사) 형태로 맞춰야 함.' },
          { q: 'Life on Earth is a vast and sophisticated system for capturing, converting, storing, and moving solar energy, and the evolutionary success of each species depends on how well it taps into that system.', a: 'OK', why: 'capturing, converting, storing, and moving — 동명사 4개 병렬. 절 두 개는 “, and”로 올바르게 연결.' }
        ]
      },
      {
        kind: 'quiz', id: 'C19', short: 'Cumulative 1–9', title: 'Cumulative Practice 1–9', page: 'p.31',
        options: ['OK', 'FRAG', 'MOD', 'PUNC', 'SV', 'PR', 'PL/PO', 'VT', 'N#', '//', '//ID'],
        legend: { OK: '오류 없음', FRAG: 'Fragment error', MOD: 'Modifier error', PUNC: 'Punctuation error', SV: 'S-V agreement error', PR: 'Pronoun error', 'PL/PO': 'Plural/Possessive mix-up', VT: 'Verb Tense error', 'N#': 'Noun-number error', '//': 'Parallelism error', '//ID': 'Parallelism idiom error' },
        instr: 'Follow the same instructions you followed for the previous Cumulative Practice exercises, and make sure you continue to show where in each sentence the errors occur. On the line provided, write <b>OK</b> or the following annotations for any errors you find: <b>FRAG, MOD, PUNC, SV, PR, PL/PO, VT, N#,</b> or <b>//</b> (including <b>//ID</b>).',
        ko: NOTE_KEY,
        items: [
          { q: 'The leader of the republic vetoed a proposed law that would have lowered the voting age from 21 to 18, which sparked outrage among young people throughout the country.', a: 'PR', why: '“, which” — 앞 절 전체(법을 거부한 사건)를 가리키는 overly broad which.' },
          { q: 'In order to sign up for the advanced literature class, you must first fulfill your core requirements, unless one has been designated as an “Advanced Standing” scholar by the dean’s office.', a: 'PR', why: 'you → one 대명사 시프트(5-5).' },
          { q: 'During winter vacation, Eileen worked as a recreation center lifeguard, ate a lot of traditional food, and she also traveled to Guam.', a: '//', why: 'worked …, ate …, and [she also traveled …] — C에 주어(she also)가 붙어 형태가 다름.' },
          { q: 'In spite of the concerns raised by some economists, increasing the interest rates at banks across the country have not led to a decrease in consumer consumption.', a: 'SV', why: '동명사 increasing = 단수 → has.' },
          { q: 'New Amsterdam, a center of commerce and an important military outpost for the Dutch, was renamed New York in 1664 after its capture by the British.', a: 'OK', why: '삽입구 양쪽 콤마, a center … and an important … outpost 병렬 OK.' },
          { q: 'Labor tensions in South Africa, particularly in the mining industry, have made potential investors more skittish than they were just five or ten years ago.', a: 'OK', why: 'tensions(복수) → have made. “than they were” 비교 OK.' },
          { q: 'After a flood wiped away several of the city’s residential areas, thousands of people were left homeless and found themselves living as a refugee.', a: 'N#', why: 'thousands of people(복수) … living as refugees.' },
          { q: 'The greatest merit of the new grading system, the professor argued, is that it prevents students whom might be tempted to procrastinate from doing so.', a: 'PR', why: 'who test: “they might be tempted …” → who.' },
          { q: 'Medical school professors sometimes pay too much attention to whether their students are passing tests and too little attention to whether each of them are gaining enough practical experience.', a: 'SV', why: 'each of them = 단수 → is gaining.' },
          { q: 'Cats are often described as self-centered and uncaring creatures, but it can actually be surprisingly nurturing and affectionate.', a: 'PR', why: 'it → they (복수 선행사 Cats).' },
          { q: 'People who can finish a Rubik’s cube in less than a minute usually employ algorithms, thus they can quickly move the parts of the cube without even having to think.', a: 'PUNC', why: 'IC, thus IC — thus는 fancy conjunction → 세미콜론 필요(“algorithms; thus, they can…”).' },
          { q: 'When Dr. Thomas was young and found herself enraptured by mathematics, she decided that one day she will become a mathematician.', a: 'VT', why: 'decided(과거) → will이 아니라 would become.' },
          { q: 'Never managing to finish his assignment on time, Jared’s procrastination kept him from excelling in any of his classes.', a: 'MOD', why: '“Never managing …”의 주체는 사람(Jared)인데 주어는 Jared’s procrastination.' },
          { q: 'Never having excelled at science or math, the Smith siblings are more likely to study literature in college than to become an engineer.', a: 'N#', why: 'the Smith siblings(복수) → become engineers.' },
          { q: 'Last night the computer froze and turned off while drinking green tea, and the essay that Vera had been working on was apparently lost.', a: 'MOD', why: '“while drinking green tea”의 주체는 사람인데 IC의 주어는 the computer.' }
        ]
      }
    ]
  });
})(window.SAT_DATA);

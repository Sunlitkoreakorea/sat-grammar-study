/* Lesson 1. Nouns, Verbs, and Clauses (교재 pp.5–7) */
(function (D) {
  var C = function (t) { return '<span class="circ">' + t + '</span>'; };
  D.chapters.push({
    id: 'L1', order: 1, no: 'L1', short: 'Nouns, Verbs, Clauses', title: 'Lesson 1. Nouns, Verbs, and Clauses',
    ko: '주어·목적어 찾기, 진짜 동사 가려내기, 독립절(IC)과 종속절(DC)',
    parts: [
      {
        kind: 'learn', id: '1-1', short: '1-1 주어/목적어', title: '1-1. All nouns are subjects or objects', page: 'p.5',
        ko: '모든 명사는 주어(동사와 연결) 아니면 목적어(동작을 받거나 전치사 뒤). 전치사 뒤 명사는 절대 주어가 아니다.',
        blocks: [
          'DSAT grammar questions consist of long sentences with many interrupting parts. You’ll be able to handle even the longest sentences if you start by first learning to accurately locate all <u>subject nouns</u> and <u>verbs</u>.',
          { h: '1-1a. Subjects' },
          '<u>Subjects</u> (often the first noun in the sentence) are connected to a verb, either because they are the <u>person/thing doing an action verb</u> or because they are the <u>noun described by a description verb</u>:',
          { ex: 'Ex1', lines: [
            '<b>Action verb subjects:</b> &nbsp;<u>Tom</u> loves spaghetti. &nbsp;·&nbsp; <u>That dog</u> barks all day long.',
            '<b>Description verb subjects:</b> &nbsp;<u>The job</u> was finished by Amy. &nbsp;·&nbsp; <u>Running</u> feels good.'
          ] },
          'In a sentence with <b>action verbs like <i>love</i> or <i>visit</i></b>, the subject is the <u>person (or animal) performing the <i>love</i> or <i>visit</i> action</u>. But when we change those “active voice” verbs to the “passive voice” description form (like <u>is loved</u> or <u>was visited</u>), the subject noun will NOT be the person/animal who loves or visits. Instead, the subject noun is the thing that is <u>being loved</u> or <u>being visited</u>:',
          { ex: 'Ex2', lines: [
            '<b>Action verbs:</b> &nbsp;<u>My family</u> loved this movie. &nbsp;·&nbsp; <u>We</u> visit the bay every year.',
            '<b>Description (passive) verbs:</b> &nbsp;<u>This movie</u> is loved by my family. &nbsp;·&nbsp; <u>The bay</u> is visited every year.'
          ] },
          { h: '1-1b. Object nouns' },
          'A noun is an <b>object noun</b> (1) if it’s the noun being acted <u>on</u> (by a verb or other action word), or <span class="bx">(2) if it appears right after a preposition</span>. (See <b>Reference A</b> for a preposition list!)',
          { ex: 'Ex3', lines: [
            '<mark class="o">(1) Action word objects:</mark> &nbsp;Tom loves <u>spaghetti</u>. &nbsp;·&nbsp; Solving <u>math problems</u> all day is tedious.',
            '<mark class="o">(2) Preposition objects:</mark> &nbsp;Sam runs at <u>the gym</u> next to <u>his house</u>. &nbsp;·&nbsp; Each of <u>the boys</u> slept soundly.'
          ] },
          { h: '1-1c. Hard-to-spot subjects' },
          { ex: 'Ex4', lines: [ '<u>All</u> of the club members <span class="bx"><u>who</u> arrive late</span> will be punished. <span class="sm">(See Ref. D for more about clauses starting with <u>who</u> &amp; <u>that</u>)</span>' ] },
          'Students who don’t know grammar think that <i>club members</i> is a subject noun. It is NOT! We just learned that any noun after a preposition (like <i>of</i>) is an <u>object noun</u>. The first subject noun in the sentence is <b>All</b>. It’s hard to recognize <i>all</i> as a subject because <i>all</i> may not <i>feel like</i> a noun. But it is. Flip back to <b>Reference F</b> now to see several other <b>indefinite pronouns</b> like <i>each</i>. (<b>All</b> isn’t <i>always</i> a noun, but it is in this example sentence.)',
          'The second hard-to-spot subject is <b>who</b>. This word may also not feel like a noun, but it is (a <b>relative pronoun</b>); it’s the subject for the action verb <i>arrive</i>. Before you attempt the practice below, see the bottom of <b>Reference D</b> for important info on how words like <b>who, that,</b> and <b>which</b> are used as <b>Relative clause</b> subjects.',
          { note: '<b>기억하기</b> — 전치사(of, in, at, on…) 바로 뒤 명사 = 목적어 = 주어 후보에서 제외. <i>All of the club members</i>에서 주어는 <b>All</b>.', kind: 'tip', title: '필기 요약' }
        ]
      },
      {
        kind: 'quiz', id: '1A', short: 'Practice 1A', type: 'self', title: 'Practice 1A — 명사 찾기', page: 'p.5',
        instr: '<b>PRACTICE 1A:</b> Find and identify all the nouns: <u>underline</u> every subject noun and <s>cross out</s> every object noun.',
        ko: '종이(또는 머릿속)에 먼저 표시해 본 뒤 “정답 보기”로 확인하세요. 밑줄 = 주어 명사, 취소선 = 목적어 명사.',
        example: { q: 'ExA. <u>Mr. Farris</u> opened <s>a store</s> <u>that</u> specialized in <s>hiking gear</s> because <u>he</u> was raised near <s>mountains</s> and loved <s>hiking</s>.', why: '관계절의 that·접속사절의 he도 각 동사의 주어.' },
        items: [
          { q: 'The collection of artifacts that were on display at the national museum will soon be returned to Egypt.',
            reveal: 'The <u>collection</u> of <s>artifacts</s> <u>that</u> were on <s>display</s> at the national <s>museum</s> will soon be returned to <s>Egypt</s>.',
            why: 'collection이 will be returned의 주어, 관계절(R.C.)의 that이 were의 주어. artifacts·display·museum·Egypt는 모두 전치사(of·on·at·to) 뒤 → 목적어.' },
          { q: 'The 1844 election was won by a relatively unknown James K. Polk, who went on to double the size of the US.',
            reveal: 'The 1844 <u>election</u> was won by a relatively unknown <s>James K. Polk</s>, <u>who</u> went on to double <s>the size</s> of <s>the US</s>.',
            why: 'election이 was won의 주어(수동태), by 뒤 James K. Polk은 전치사 목적어, who는 went의 주어. size는 double의 동사 목적어(verb object), the US는 of 뒤 목적어.' },
          { q: 'Baseball has been described as an ideal sport for radio because the game lends itself well to descriptive storytelling.',
            reveal: '<u>Baseball</u> has been described as <s>an ideal sport</s> for <s>radio</s> because <u>the game</u> lends <s>itself</s> well to <s>descriptive storytelling</s>.',
            why: 'Baseball(수동태 has been described)과 the game(lends)이 주어. sport(as 뒤)·radio(for 뒤)·storytelling(to 뒤)는 전치사 목적어, itself는 lends의 목적어.' },
          { q: 'Playing loud music late at night is rude, but neither of my neighbors seems to care about basic human decency.',
            reveal: '<u>Playing</u> loud <s>music</s> late at <s>night</s> is rude, but <u>neither</u> of my <s>neighbors</s> seems to care about basic human <s>decency</s>.',
            why: '동명사(gerund) Playing …이 첫 주어, music은 그 목적어. neither는 부정대명사 주어(Reference F: 단수) — neighbors는 of 뒤 목적어. night(at)·decency(about)도 전치사 목적어.' },
          { q: 'All of the fruit in this store except bananas was grown locally on organic farms.',
            reveal: '<u>All</u> of <s>the fruit</s> in this <s>store</s> except <s>bananas</s> was grown locally on organic <s>farms</s>.',
            why: '주어는 All(부정대명사). fruit(of)·store(in)·bananas(except)·farms(on) 모두 전치사 뒤 목적어.' }
        ]
      },
      {
        kind: 'learn', id: '1-2', short: '1-2 진짜 동사', title: '1-2. Actual verbs vs. non-verb action words', page: 'p.6',
        ko: 'be·have·조동사는 항상 동사, to+동사·-ing는 혼자서는 절대 동사가 아님, -ed는 문맥(주어가 그 행동을 했는가)으로 판단.',
        blocks: [
          { h: '1-2a. Verbs often consist of more than one word' },
          'has been working, would eat, is opening, may be done… Verbs are often interrupted by other words: <b>Was</b> Sal <b>able to finish</b> his work? He <b>has</b> already <b>spent</b> a week on it.',
          { h: '1-2b.' },
          { box: ['<b>is/are/am/was/were, has/have, can/could, may/might, will/would</b> are <u>ALWAYS</u> verb words'] },
          '<b>Has</b> or <b>is</b> might be the entire verb—or just the beginning of a long verb: The house <b>is</b> old. She <b>has finished</b> the job.',
          { h: '1-2c.' },
          { box: ['<b>infinitives &amp; -ing words</b> are <u>NEVER</u> verbs:'] },
          'An <b>infinitive</b> (to + base form verb, like <b>to finish</b> or <b>to be</b>) can be part of a verb but is NOT a verb itself.',
          'An <i>–ing</i> word may be <b>part of a verb</b>, but it is NEVER a verb by itself! An <i>-ing</i> word may be an adjective, a gerund, or even a part of a longer verb (a present participle)—but is never a verb all by itself.',
          { ex: 'Ex5', lines: [
            ['The <b>running</b> boy suddenly fell.', 'adjective — not a verb!'],
            ['<b>Running</b> is my favorite way to relieve stress.', 'gerund (-ing noun) — not a verb!'],
            ['I <b>was running</b> around all day yesterday.', 'running 혼자는 동사 아님; was running이 통째로 동사']
          ] },
          { h: '1-2d.' },
          { box: ['<b>-ed words</b> <u>might be</u> verbs, depending on context:'] },
          'An <i>–ed</i> word is a verb only when the subject noun on the left was doing the <i>–ed</i> action:',
          { ex: 'Ex6', lines: [
            ['The floor tile suddenly <b>cracked</b>.', 'cracked IS a verb — tile이 cracked 동작을 한 주체', 'ok'],
            ['The bathroom wall <b>painted</b>.', 'painted IS NOT a verb — wall은 painted 동작을 하지 않음', 'err'],
            ['The engine <b>fixed</b> by my uncle.', 'fixed IS NOT a verb — by가 뒤에 오면 -ed는 동사가 아님', 'err']
          ] },
          { note: '<b>정리</b> — ① be/have/조동사 = 무조건 동사 ② to + 동사, -ing 단독 = 동사 아님 ③ -ed는 “앞 주어가 한 동작인가?”(그리고 by가 안 뒤따르는가?)로 판정.', kind: 'tip', title: '필기 요약' }
        ]
      },
      {
        kind: 'quiz', id: '1B', short: 'Practice 1B', type: 'self', title: 'Practice 1B — 주어와 동사 연결', page: 'p.6',
        instr: '<b>PRACTICE 1B:</b> <u>Underline</u> the subject word/words. Then <span class="circ">Circle</span> the verb or verbs. Then draw a line to connect them. <b>IMPORTANT!</b> Remember that verbs may consist of several words and that one noun may be the subject of two or more verbs. You must read the entire sentence to make sure you don’t miss part of a verb or additional verbs!',
        ko: '주어에 밑줄, 동사(여러 단어일 수 있음)에 동그라미. 한 주어가 동사를 둘 이상 가질 수 있어요. 직접 표시한 뒤 정답을 확인하세요.',
        example: { q: 'ExA. <u>Ms. Kucera</u> ' + C('tried to open') + ' a clothing store in Kansas, but <u>she</u> later ' + C('closed') + ' it and ' + C('moved') + ' to Iowa.', why: 'Ms. Kucera → tried to open / she → closed, moved (한 주어에 동사 둘).' },
        items: [
          { q: 'Unlike her kid sister, Minhee is very stubborn; however, that quality can often be helpful for her at work.',
            reveal: 'Unlike her kid sister, <u>Minhee</u> ' + C('is') + ' very stubborn; however, that <u>quality</u> ' + C('can often be') + ' helpful for her at work.',
            why: 'Minhee → is (설명 동사) / quality → can … be. 세미콜론으로 이어진 두 IC. Unlike her kid sister는 수식어라 주어 후보에서 제외.' },
          { q: 'When I lived in California, I went surfing every weekend.',
            reveal: 'When <u>I</u> ' + C('lived') + ' in California, <u>I</u> ' + C('went') + ' surfing every weekend.',
            why: 'DC(When I lived …)의 주어·동사와 IC(I went …)의 주어·동사. surfing은 -ing 단어 → 동사가 아님.' },
          { q: 'The physician who treated my ankle was very skilled; she was also the kindest doctor in the hospital.',
            reveal: 'The <u>physician</u> <u>who</u> ' + C('treated') + ' my ankle ' + C('was') + ' very skilled; <u>she</u> ' + C('was') + ' also the kindest doctor in the hospital.',
            why: 'physician → was (본동사), who(관계대명사, 주어) → treated, she → was. 관계절 who treated my ankle은 physician을 꾸밈.' },
          { q: 'I bought a new bike, and I planned to ride it to the lab but was asked to leave it at the front gate.',
            reveal: '<u>I</u> ' + C('bought') + ' a new bike, and <u>I</u> ' + C('planned to ride') + ' it to the lab but ' + C('was asked') + ' to leave it at the front gate.',
            why: '두 번째 I 하나가 planned to ride와 was asked 두 동사의 주어. to ride, to leave 같은 부정사는 동사가 아님.' },
          { q: 'Releasing more greenhouse gases is unwise if we aim to reduce climate change.',
            reveal: '<u>Releasing</u> more greenhouse gases ' + C('is') + ' unwise if <u>we</u> ' + C('aim') + ' to reduce climate change.',
            why: '동명사구 Releasing more greenhouse gases 전체가 주어(핵심어 Releasing) → is / DC(if we aim)의 주어 we → aim. Releasing, to reduce는 동사 아님.' }
        ]
      },
      {
        kind: 'learn', id: '1-3', short: '1-3 IC/DC/Fragment', title: '1-3. Independent clauses, dependent clauses, and fragment errors', page: 'pp.6–7',
        ko: '절 = 연결된 S+V. 문장은 IC가 최소 1개 있어야 하고, 없으면 fragment. DC = Ref D 단어 + S + V.',
        blocks: [
          '<mark class="o">A <b>clause</b> is a linked <u>S + V</u>.</mark> (If you see a phrase without S&amp;V, it’s a <b>modifier</b>, not a clause, as explained in 2-1.)',
          { h: '1-3a. Independent clause (IC)' },
          'An <u>independent clause</u> (IC) is, on its own, a complete sentence. <mark>Every sentence has at least one IC.</mark> If we try to make a sentence but fail to write even one complete independent clause, we made a <b><u>fragment</u> error</b>. <mark>A <i>sentence fragment</i> isn’t a sentence part; it’s just another way of saying “an incomplete sentence.”</mark>',
          { ex: 'Ex7', lines: [
            ['This monument built by the Assyrians who ruled for half a millennium.', 'fragment error!', 'err'],
            ['This monument <b>was built</b> by the Assyrians, who ruled for half a millennium.', 'OK—fixed', 'ok'],
            ['This monument built by the Assyrians, who ruled for half a millennium, <b>hasn’t been studied</b>.', 'OK—another fix', 'ok']
          ] },
          { h: '1-3b. Basic dependent clauses' },
          'An IC can be as simple as an S &amp; V, but a <mark><u>dependent clause</u> (DC) always has <b>3 parts</b>: <u>Reference D word/phrase, S,</u> and <u>V</u>.</mark> See Ref D for a list of words (<i>although, because, which,</i> etc) that turn an IC into a DC.',
          { ex: 'Ex8', lines: [ '<span class="bx">While I was walking home,</span> <sup>DC</sup> &nbsp;<span class="bx">an angry-looking dog started to follow me.</span> <sup>IC</sup>' ] },
          { h: '1-3c. Advanced dependent clauses: relative clauses &amp; noun clauses' },
          'A <u>relative clause</u> is one type of dependent clause, used to describe an earlier noun. It can interrupt any part of a sentence. (See the bottom of <b>Reference D</b> for important details and examples.)',
          { ex: 'Ex9', lines: [ '<sup>IC₁</sup> <span class="bx">The truck <span class="bx">that I was driving</span> <sup>DC (relative clause)</sup> broke down suddenly,</span> &nbsp;<sup>IC₂</sup> <span class="bx">so I had to hitchhike all the way home.</span>' ] },
          'In the above example, a <b>relative clause</b> describes the noun <i>truck</i>.',
          'A <u>noun clause</u> is another type of dependent clause. While a relative clause <i>describes</i> a noun, a <b>noun clause</b> actually <i>is</i> a noun. Just like regular nouns, <b>noun clauses</b> serve as subjects or objects:',
          { ex: 'Ex10', lines: [ '<sup>IC₁</sup> <span class="bx"><span class="bx">That Picasso was a visionary</span> <sup>DC (noun clause)</sup> is universally recognized,</span> &nbsp;<sup>IC₂</sup> <span class="bx">but his art hasn’t always been universally admired.</span>' ] },
          'In IC₁ above, we see a <b>noun clause</b> used as a <b>subject</b> instead of a normal noun. We could express a similar idea with a normal noun (Picasso’s brilliance) or a normal noun+RC (The fact that Picasso was a visionary); the writer of the sentence apparently prefers the formal style of <i>That Picasso…</i> Now let’s use a noun clause as an <b>object</b>:',
          { ex: 'Ex11', lines: [
            'Researchers have yet to determine <u>the location of the lost tomb</u>. <span class="sm">(IC — 일반 명사가 목적어)</span>',
            'Researchers have yet to determine <span class="bx">whether the tomb belonged to a king or a commoner.</span> <sup>DC (noun clause)</sup>'
          ] },
          'The first sentence uses a normal noun as the object—<u>the location</u> of the lost tomb. The second sentence uses a <b>noun clause</b> as the object noun: <b>whether the tomb belonged to a king or a commoner.</b>',
          { note: '<b>정리</b> — 관계절 = 앞 명사를 <i>꾸밈</i>(that/which/who) · 명사절 = 그 자체가 <i>명사</i>(that/whether/what/how… 주어·목적어 자리). 필기: Strangely obsessed! (명사절 주어 “That Picasso was a visionary”).', kind: 'tip', title: '핵심' }
        ]
      },
      {
        kind: 'quiz', id: '1C', short: 'Practice 1C', title: 'Practice 1C — 완전한 문장(O) vs 조각(F)', page: 'p.7',
        options: ['O', 'F'],
        legend: { O: 'complete sentence — 독립절(IC)이 있는 완전한 문장', F: 'fragment — 독립절이 없는 불완전한 문장' },
        instr: '<b>PRACTICE 1C:</b> On the line provided, write <b>O</b> next to each complete sentence, and <b>F</b> next to each fragment.',
        ko: '각 문장이 완전한 문장(O)인지 조각(F)인지 고르세요. 삽입구(…, they believe, …)와 수식어는 걷어내고 IC가 남는지 확인!',
        example: { q: 'ExB. Paranoia in an increasingly fragmented modern world which is depicted by Philip K. Dick’s novels and stories.', a: 'F', why: '주어 Paranoia에 대한 동사가 없고, which is depicted …는 world를 꾸미는 관계절일 뿐.' },
        items: [
          { q: 'That Stanley is a studious pupil is obvious to all of his friends and teachers.', a: 'O', why: '명사절 “That Stanley is a studious pupil”이 주어이고 동사는 is obvious. (필기: The fact that…으로 바꿔 읽기 — noun clause)' },
          { q: 'Unless they’re given advance warning, most employees unhappy with a sudden change to their work hours.', a: 'F', why: 'Unless they’re given…은 DC. 뒤의 most employees … work hours에는 동사가 없어 IC가 없음.' },
          { q: 'The first human settlements in Australia, paleontologists believe, were established at least 40,000 years ago.', a: 'O', why: '“paleontologists believe”는 삽입구(interrupter). 빼면 “The first human settlements … were established …” → 완전한 IC.' },
          { q: 'Established by computer engineers and former athletes, the sports analytics company, which is currently offering services to nine professional teams, known for its data-driven methods.', a: 'F', why: '주어 the sports analytics company의 본동사가 없음. which is … offering은 관계절, known for…는 분사 수식어.' },
          { q: 'Water and minerals on asteroids, some scientists believe, used to provide fuel for space probes or perhaps even manned spacecraft in the not-to-distant future.', a: 'F', why: '삽입구(some scientists believe)를 빼도 used는 “사용되는”이라는 분사 → 동사가 아님. will be used to… 처럼 be동사가 필요(필기: Will be).' },
          { q: 'In much the same way as gills, papillae that line the throats of many turtles allow the animals to absorb oxygen directly from water.', a: 'O', why: '주어 papillae(관계절 that line … turtles) → 본동사 allow. 완전한 IC.' },
          { q: 'The recent series of bank failures, academics have claimed, unlikely to harm the overall economy.', a: 'F', why: '주어 The recent series, 삽입구 academics have claimed, 그리고 unlikely to harm…은 수식어 → 본동사가 없음.' },
          { q: 'Having realized the team’s weakness, particularly in the second half of many games, the coaches decided to overhaul their defensive strategies.', a: 'O', why: 'Having realized … games는 수식어(S·V 없음). 뒤에 IC “the coaches decided to overhaul …”이 있음.' },
          { q: 'Although not yet widely adopted in classrooms, adaptive technology may soon allow teachers to personalize instruction, giving each student work suited to his or her particular needs.', a: 'O', why: '“Although not yet widely adopted in classrooms”에는 S&V가 없어 DC가 아니라 수식어. IC = adaptive technology may soon allow …' },
          { q: 'Because he is less famous today than his contemporary W. E. B. DuBois, William Monroe Trotter often omitted from US History textbooks despite his prominence in the early 1900s.', a: 'F', why: 'Because he is …는 DC. 뒤 William Monroe Trotter often omitted …에서 omitted는 동사가 아님(수동 의미인데 is가 없음 — 필기: 가 omit된 게 아니다).' }
        ]
      }
    ]
  });
})(window.SAT_DATA);

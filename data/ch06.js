/* Lesson 6. Possessives vs. plurals (교재 p.25) */
(function (D) {
  D.chapters.push({
    id: 'L6', order: 6, no: 'L6', short: 'Plural vs Possessive', title: 'Lesson 6. Possessives vs. plurals',
    ko: "복수형(-s)과 소유격(’s / s’) 혼동, their/there/they’re · its/it’s · whose/who’s",
    parts: [
      {
        kind: 'learn', id: '6-1', short: '6 복수 vs 소유격', title: 'Lesson 6. Possessives vs. plurals', page: 'p.25',
        ko: "소유격 형용사(their·its·whose)와 “명사+be동사” 축약형(they’re·it’s·who’s)을 구분. 단순 -s/-es = 복수. -s로 끝나는 단수 명사의 소유격은 두 가지 모두 가능.",
        blocks: [
          'Every SAT tests your knowledge of <b>apostrophe usage</b> and commonly misspelled words:',
          { table: { head: ['Possessive', 'N + be verb', 'Other'], rows: [
            ['their car', 'they’re <small>(they are)</small>', 'there <small>(not here)</small>'],
            ['its head', 'it’s <small>(it is)</small>', ''],
            ['whose hat', 'who’s <small>(who is)</small>', '']
          ] } },
          'Remember that a simple <b>–s</b> or <b>–es</b> typically indicates <b>plural</b> (see Ref E for irregular singular/plural nouns):',
          { ex: 'Ex1', lines: [
            ['Five <b>dogs’</b> ran away.', 'wrong', 'err'],
            ['Five <b>dog’s</b> ran away.', 'wrong', 'err'],
            ['Five <b>dogs</b> ran away.', 'OK — we need the plural noun, not a possessive form', 'ok']
          ] },
          'Both sentences above are wrong; we need the plural noun <b>dogs</b>, not a possessive form.',
          { ex: 'Ex2', lines: [
            ['The five <b>dog’s</b> owner refused to pay for damage caused by his animals.', 'wrong', 'err'],
            ['The five <b>dogs’</b> owner refused to pay for damage caused by his animals.', 'OK', 'ok']
          ] },
          'Ex2 above is also wrong. The adjective <b>five</b> tells us we need the plural form <b>dogs’</b> (not singular <i>dog’s</i>).',
          { note: '★ If a singular noun ends with <b>s</b> (<i>Texas, Christmas, news</i>), the possessive form can be correctly written <u>two ways</u>: <b>Texas’</b> OR <b>Texas’s</b> &nbsp;·&nbsp; <b>Christmas’</b> OR <b>Christmas’s</b> &nbsp;·&nbsp; <b>news’</b> OR <b>news’s</b>', kind: 'rule' }
        ]
      },
      {
        kind: 'quiz', id: '6', short: 'Practice 6', title: 'Practice 6 — 복수 vs 소유격', page: 'p.25',
        options: ['OK', 'PL/PO'],
        legend: { OK: '오류 없음', 'PL/PO': 'Plural/Possessive mix-up — 복수형과 소유격(’) 혼동, their/there/they’re 등' },
        instr: '<b>PRACTICE 6:</b> On the line provided, write <b>OK</b> or <b>PL/PO</b>, and <span class="circ">circle</span> any plural/possessive mix-up errors that you find.',
        ko: '※ 교재 정답지는 사진에 없어서, 손필기 답과 규칙을 대조해 정리했어요.',
        example: { q: 'ExA. The books’ introduction was 120 pages; after reading it, I decided to find a shorter, easier volume instead.', a: 'PL/PO', why: '뒤에 “it”이 나오므로 책은 한 권 → the book’s introduction.' },
        items: [
          { q: 'There is little you can do about your neighbors’ holiday decorations; they have the right to decorate their home any way they want.', a: 'OK', why: '이웃이 여러 명(복수 소유격 neighbors’), they·their도 올바름.' },
          { q: 'I was dumbstruck when Ms. Jennings’s departure was announced; their really was nothing I could say.', a: 'PL/PO', why: '“their really was” → there was (존재). Jennings’s는 올바른 소유격.' },
          { q: 'You can only choose a major after fulfilling you’re curricular requirements in your first or second year.', a: 'PL/PO', why: 'you’re(= you are)가 아니라 소유격 your.' }
        ]
      }
    ]
  });
})(window.SAT_DATA);

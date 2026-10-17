/* Lesson 7. Verb Tense (교재 pp.25–26) */
(function (D) {
  D.chapters.push({
    id: 'L7', order: 7, no: 'L7', short: 'Verb Tense', title: 'Lesson 7. Verb Tense',
    ko: '시제 일치: 같은 시간의 행동은 같은 계열 시제로 — 과거→미래 금지, 짧은 조동사(can/could, will/would)를 놓치지 말기',
    parts: [
      {
        kind: 'learn', id: '7-1', short: '7-1 시제 이동', title: '7-1. Tense shift errors', page: 'p.25',
        ko: '실제로 같은 때 일어난 일에 서로 크게 다른 시제를 쓰면 오류. 문맥을 보고 일부러 시제를 바꾼 건지 확인. 과거 계열끼리 / 현재+미래끼리는 OK. 현재완료는 현재시제.',
        blocks: [
          '<b>Tense shift errors</b> occur when two <b>significantly different</b> tenses are used for actions that actually happened at the same time. You need to <b>consider context</b> to make sure that a writer isn’t using two different tenses intentionally:',
          { ex: 'Ex3', lines: [ 'I <b>finished</b> my project yesterday; today, I <b>plan</b> to visit my friends and <b>play</b> basketball.' ] },
          'The sentence above is correct; context makes clear that each clause refers to a different time. It’s also OK to use <b>different types of past tense</b> together: <i>did, could do, had done, would do, would have done</i>. Or <b>different types of present tense</b> OR <b>present &amp; future</b>: <i>do, can do, have done, will do, will have done</i>.',
          { ex: 'Ex4', lines: [
            'When I <b>was</b> little, I <b>did</b> as much as I <b>could do</b> to avoid going to soccer practice. <span class="tag ok">past ✓</span>',
            'I <b>hope</b> that I <b>will lead</b> my team effectively, but I <b>have been doubting</b> my ability to do so recently. <span class="tag ok">present + future ✓</span>'
          ] },
          'The first sentence in Ex4 above correctly uses a variety of past tenses. The second correctly combines various present and future tenses.',
          { note: '<b>NOTE:</b> <b>Present perfect (has/have done) is present tense.</b> Focus on <u>tense</u>, not on meaning; <u>don’t over-correct!</u>', kind: 'rule' }
        ]
      },
      {
        kind: 'learn', id: '7-2', short: '7-2 과거→미래 금지', title: '7-2. Don’t shift from past to future tense', page: 'p.25',
        ko: '영어의 시제는 주어 기준이 아니라 “독자 시점”. 문장 전체가 과거면 will이 아니라 would.',
        blocks: [
          { ex: 'Ex5', lines: [ 'When Simon <b>was</b> young, his parents <b>hoped</b> he <s>will</s> <b>would</b> someday become a doctor.' ] },
          'English verb tense is <u>not relative to the subject</u> of a sentence. It doesn’t matter that <b>his parents</b> were looking to their own future when they <b>hoped</b>. From the reader’s perspective, the whole sentence happened in the <b>past</b>.'
        ]
      },
      {
        kind: 'learn', id: '7-3', short: '7-3 짧은 조동사', title: '7-3. Pay attention to short helping verbs (can/could, is/are, will/would)', page: 'p.25',
        ko: '동사의 시제는 “첫 단어”가 결정한다 — has finished는 finished가 아니라 has(현재). 짧은 동사/전체 동사를 놓치지 말 것.',
        blocks: [
          { ex: 'Ex6', lines: [ 'Before Cam <b>moved</b> out of her city apartment, she <s>can</s> <b>could</b> easily <b>walk</b> to work.' ] },
          'Most errors students make on the SAT come from a <b>failure to notice a short verb</b> or a <b>failure to locate an entire verb</b>—like when a student sees <i>finished</i> and assumes that a verb is past tense when in fact the whole verb is <b>has finished</b>, which is present tense. <mark>The <u>first word</u> in a verb (<b>has</b>, not <i>finished</i>) determines its tense.</mark>'
        ]
      },
      {
        kind: 'quiz', id: '7', short: 'Practice 7', title: 'Practice 7 — 시제 일치', page: 'p.26',
        options: ['OK', 'VT'],
        legend: { OK: '오류 없음', VT: 'Verb Tense error — 시제 이동·부적절한 시제' },
        instr: '<b>PRACTICE 7:</b> On the line provided, write <b>OK</b> or <b>VT</b>, and <span class="circ">circle</span> any verb or verbs that cause tense shift errors.',
        ko: '※ 교재 정답지는 사진에 없어서, 손필기 답과 규칙을 대조해 정리했어요.',
        example: { q: 'ExB. Though Louis Napoleon languished in prison, he knew that one day he will recreate the French Empire.', a: 'VT', why: 'languished·knew(과거)와 맞추려면 will → would.' },
        items: [
          { q: 'Kilmartin’s earlier experiences with translation served him well when he attempts to translate the literary works of Marcel Proust.', a: 'VT', why: 'served(과거) vs attempts(현재) → attempted.' },
          { q: 'Long after she finished her part of the project Cathy realized that she has forgotten to upload it.', a: 'VT', why: 'finished·realized(과거) — has forgotten(현재완료=현재시제) → had forgotten.' },
          { q: 'By the time Tchaikovsky released his “Romeo and Juliet” overture, he had already established himself as a masterful composer.', a: 'OK', why: '과거(released)와 과거완료(had established) — 과거 계열끼리 올바른 조합.' }
        ]
      }
    ]
  });
})(window.SAT_DATA);

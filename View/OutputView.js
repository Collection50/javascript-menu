const { Console } = require('@woowacourse/mission-utils');

const OutputView = {
  print(message) {
    Console.print(message);
  },

  start() {
    Console.print('점심 메뉴 추천을 시작합니다.');
  },

  printResult(coaches, category) {
    Console.print('\n메뉴 추천 결과입니다.');
    Console.print('[ 구분 | 월요일 | 화요일 | 수요일 | 목요일 | 금요일 ]');
    Console.print(`[ 카테고리 | ${category} ]`);
    coaches.forEach((coach) => Console.print(`[ ${coach} ]`));
    Console.print('\n추천을 완료했습니다.');
    Console.close();
  },
};

module.exports = OutputView;

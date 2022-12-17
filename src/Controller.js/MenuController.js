const Category = require('../Model/Category');
const Coach = require('../Model/Coach');
const MenuPicker = require('../Model/MenuPicker');
const Validate = require('../Model/Validate');
const InputView = require('../View/InputView');
const OutputView = require('../View/OutputView');

class MenuController {
  #samples;

  constructor(samples) {
    this.#samples = samples;
  }

  start() {
    OutputView.start();
    this.readCoaches();
  }

  // 코치 이름 입력받기
  readCoaches() {
    InputView.readCoachNames(this.validateCoach.bind(this));
  }

  // 유효성 검사
  validateCoach(names) {
    try {
      Validate.names(names);
      this.createCoach(names);
    } catch ({ message }) {
      OutputView.print(message);
      this.readCoaches();
    }
  }

  // 코치 생성
  createCoach(names) {
    Coach.create(names);
    this.getCurrentCoachName();
  }

  // 코치 이름 받기(카운팅)
  getCurrentCoachName() {
    const coachName = Coach.getName();
    this.readNoMenu(coachName);
  }

  readNoMenu(coachName) {
    InputView.readNoMenu(coachName, this.validateMenu.bind(this));
  }

  // 못 먹는 메뉴 선정
  validateMenu(menus) {
    try {
      Validate.noMenu(menus);
      Coach.addNoFood(menus);
    } catch ({ message }) {
      OutputView.print(message);
      this.getCoach();
    }
    this.checkAllInput();
  }

  checkAllInput() {
    const inputCount = Coach.getInputCount();
    const coachCount = Coach.getCoachCount();

    if (inputCount === coachCount) {
      this.generateCategory();
    } else {
      this.getCurrentCoachName();
    }
  }

  generateCategory() {
    Category.generate();
    this.tarverseCoach();
  }

  tarverseCoach() {
    for (const [coachName, noMenu] of Coach.people()) {
      this.recommendMenu(coachName, noMenu);
    }
    this.showResult();
  }

  recommendMenu(coachName, noMenu) {
    const category = Category.getCategory();
    const recommendMenu = MenuPicker.recommend(noMenu, category, this.#samples);
    Coach.assignMenu(coachName, recommendMenu);
  }

  showResult() {
    const coaches = Coach.toString();
    const category = Category.toString();
    OutputView.printResult(coaches, category);
  }
}

module.exports = MenuController;

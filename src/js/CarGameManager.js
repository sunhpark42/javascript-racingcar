import CarGameView from './CarGameView.js';
import Car from './Game/Car.js';
import RacingCarGame from './Game/RacingCarGame.js';
import Validator from './Validators/Validator.js';

export default class CarGameManager {
  constructor($element) {
    this.$element = $element;
    this.carGameView = new CarGameView($element);
    this.validator = new Validator();
    this.initGame();
    this.bindEvents();
  }

  initGame() {
    this.carGameView.init();
    this.cars = [];
    this.carNames = [];
  }

  bindEvents() {
    this.bindInputCarNamesEvent();
    this.bindInputTryCountEvent();
    this.bindResetEvent();
  }

  bindInputCarNamesEvent() {
    this.$element.querySelector('#car-names-check-button')
      .addEventListener('click', this.carNamesInputHandler.bind(this));
  }

  bindInputTryCountEvent() {
    this.$element.querySelector('#try-count-check-button')
      .addEventListener('click', this.tryCountInputHandler.bind(this));
  }

  bindResetEvent() {
    this.$element.querySelector('#reset-button')
      .addEventListener('click', () => this.initGame());
  }

  carNamesInputHandler() {
    this.carNames = this.carGameView.getCarNames();
    const errorMessage = this.validator.validateCarNames(this.carNames);

    if (errorMessage) {
      this.carGameView.alertError(errorMessage);
      this.initGame();
      return;
    }

    this.carGameView.displayTryCountView();
  }

  tryCountInputHandler() {
    const tryCount = this.carGameView.getTryCount();
    const errorMessage = this.validator.validateTryCount(tryCount);

    if (errorMessage) {
      this.carGameView.alertError(errorMessage);
      this.carGameView.resetTryCountView();
      return;
    }

    this.createCar();

    const racingCarGame = new RacingCarGame(this.cars, tryCount);

    this.carGameView.displayProgress(racingCarGame.getCars());
    this.carGameView.displayWinners(racingCarGame.getWinners());
  }

  createCar() {
    this.cars = this.carNames.map((carName) => new Car(carName));
  }
}

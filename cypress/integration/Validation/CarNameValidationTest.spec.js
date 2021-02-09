describe('자동차 이름 유효성 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  const initGame = () => {
    cy.get('#input-car-names').should('be.visible');
    cy.get('#input-try-count').should('not.be.visible');
    cy.get('#display-game-progress').should('not.be.visible');
    cy.get('#display-game-result').should('not.be.visible');
  };

  const alertCarNameError = (carNames, errorMessage) => {
    const stub = cy.stub();
    initGame();
    cy.get('#input-car-names > div > input').type(carNames);
    cy.on('window:alert', stub);
    cy
      .get('#input-car-names > div > button').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(errorMessage);
        cy.get('#input-try-count').should('not.be.visible');
        cy.get('#display-game-progress').should('not.be.visible');
        cy.get('#display-game-result').should('not.be.visible');
      });
  };

  it('자동차 이름이 5자 초과인 경우 경고창을 띄운다.', () => {
    alertCarNameError('aaaaa, aaaaaaa, aaaa', '자동차 이름은 5글자 이하여야합니다.(앞 뒤 공백 제외)');
  });

  it('자동차 이름이 공백인 경우 경고창을 띄운다.', () => {
    alertCarNameError('aaaaa, , aaaa', '자동차 이름은 1글자 이상으로 입력해 주세요');
  });

  it('자동차 이름이 공백을 포함하면 경고창을 띄운다.', () => {
    alertCarNameError('aa aa, a   a, bbb', '자동차 이름은 공백을 포함할 수 없습니다.');
  });

  it('자동차 이름이 중복되는 경우 경고창을 띄운다.', () => {
    alertCarNameError('aaaaa, aaaaa, bbb', '자동차 이름은 서로 중복될 수 없습니다.');
  });

  it('완전한 글자가 아닌 경우 경고창을 띄운다.(ex. ㄱㄷㄹ)', () => {
    alertCarNameError('ㄱㄷㄴ, ㅏㅏ, 우테코', '완전한 글자로 입력해주세요.');
  });
});

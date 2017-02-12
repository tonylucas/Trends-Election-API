import { ProjetPersoServerPage } from './app.po';

describe('projet-perso-server App', function() {
  let page: ProjetPersoServerPage;

  beforeEach(() => {
    page = new ProjetPersoServerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

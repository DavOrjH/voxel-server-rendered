import { MEANBasePage } from './app.po';

describe('mean-base App', () => {
  let page: MEANBasePage;

  beforeEach(() => {
    page = new MEANBasePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

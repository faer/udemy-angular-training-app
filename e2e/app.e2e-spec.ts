import { UdemyAngularTrainingAppPage } from './app.po';

describe('udemy-angular-training-app App', () => {
  let page: UdemyAngularTrainingAppPage;

  beforeEach(() => {
    page = new UdemyAngularTrainingAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

import { IonApp } from '@ionic/react';
import { render } from '@testing-library/react';
import MainLayout from '../layouts/MainLayout';
import RootApp from '../RootApp';

test('should be render main layout', () => {
  const { baseElement } = render(
    <RootApp>
      <IonApp>
        <MainLayout pageId="base-page" header="Title"></MainLayout>
      </IonApp>
    </RootApp>,
  );
  expect(baseElement).toBeDefined();
});

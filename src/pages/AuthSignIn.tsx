import { SignIn } from '@clerk/clerk-react';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import MainLayout from '../components/layouts/MainLayout';
import './AuthSignIn.css';

export default function AuthSignIn() {
  return (
    <MainLayout pageId="auth-sign-in-page">
      <IonGrid>
        <IonRow>
          <IonCol>
            <SignIn forceRedirectUrl={'/home'} />
          </IonCol>
        </IonRow>
      </IonGrid>
    </MainLayout>
  );
}

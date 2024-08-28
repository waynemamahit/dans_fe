import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { ReactNode } from 'react';
import { Redirect } from 'react-router';

export default function MainLayout({
  children,
  header,
  pageId = '',
  isAuth = false,
}: {
  children?: ReactNode;
  header?: ReactNode;
  pageId: string;
  isAuth?: boolean;
}) {
  return (
    <IonPage id={pageId}>
      <IonHeader>
        <IonToolbar color={'primary'}>
          <IonTitle>Dans Multi Pro Jobs</IonTitle>
          <IonButtons slot="end">
            <UserButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {header}
      <IonContent fullscreen>
        {isAuth ? (
          <>
            <SignedIn>{children}</SignedIn>
            <SignedOut>
              <Redirect to={'/auth'} />
            </SignedOut>
          </>
        ) : (
          children
        )}
      </IonContent>
    </IonPage>
  );
}

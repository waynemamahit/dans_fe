import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { ReactNode } from 'react';

export default function MainLayout({
  children,
  header,
  pageId = '',
}: {
  children?: ReactNode;
  header?: ReactNode;
  pageId: string;
}) {
  return (
    <IonPage id={pageId}>
      <IonHeader>
        <IonToolbar color={'primary'}>
          <IonTitle>Dans Multi Pro Jobs</IonTitle>
        </IonToolbar>
      </IonHeader>
      {header}
      <IonContent fullscreen>{children}</IonContent>
    </IonPage>
  );
}

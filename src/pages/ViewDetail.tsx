import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonItem,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import { useState } from 'react';
import { useParams } from 'react-router';
import MainLayout from '../components/layouts/MainLayout';
import { Message, getMessage } from '../data/messages';
import './ViewDetail.css';

function ViewDetail() {
  const [message, setMessage] = useState<Message>();
  const params = useParams<{ id: string }>();

  useIonViewWillEnter(() => {
    const msg = getMessage(parseInt(params.id, 10));
    setMessage(msg);
  });

  return (
    <MainLayout
      pageId="view-message-page"
      isAuth
      header={
        <IonHeader translucent>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton text="Back" defaultHref="/home"></IonBackButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      }
    >
      {message ? (
        <div className="ion-padding">
          <div>Full Time / Berlin</div>
          <IonItem>
            <h1>{message.subject}</h1>
          </IonItem>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      ) : (
        <div>Message not found</div>
      )}
    </MainLayout>
  );
}

export default ViewDetail;

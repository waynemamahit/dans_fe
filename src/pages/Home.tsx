import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import { search } from 'ionicons/icons';
import { useState } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import ListItem from '../components/ListItem';
import { Message, getMessages } from '../data/messages';
import './Home.css';

const Home: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useIonViewWillEnter(() => {
    const msgs = getMessages();
    setMessages(msgs);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <MainLayout
      pageId="home-page"
      isAuth
      header={
        <IonHeader>
          <IonToolbar>
            <IonGrid>
              <IonRow className="ion-justify-content-start">
                <IonCol>
                  <IonInput
                    label="Job Description"
                    labelPlacement="floating"
                    fill="outline"
                    placeholder="Filter by title, benefits, companies, expertise"
                  />
                </IonCol>
                <IonCol>
                  <IonInput
                    label="Location"
                    labelPlacement="floating"
                    fill="outline"
                    placeholder="Filter by city, state, zip code or country"
                  />
                </IonCol>
                <IonCol>
                  <IonButtons>
                    <IonCheckbox labelPlacement="end" style={{ paddingRight: 10}}>
                      Full Time Only
                    </IonCheckbox>
                    <IonButton color={'primary'} fill='solid'>
                      <IonIcon slot="start" icon={search}></IonIcon>
                      Search
                    </IonButton>
                  </IonButtons>
                </IonCol>
                <IonCol>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonToolbar>
        </IonHeader>
      }
    >
      <IonRefresher slot="fixed" onIonRefresh={refresh}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>

      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Inbox</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonList>
        {messages.map((m) => (
          <ListItem key={m.id} message={m} />
        ))}
      </IonList>
    </MainLayout>
  );
};

export default Home;

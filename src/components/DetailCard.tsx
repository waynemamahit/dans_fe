import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonItemDivider,
} from '@ionic/react';
import { ReactNode } from 'react';

export default function DetailCard({
  children,
  title,
  url,
}: {
  children?: ReactNode;
  title: string;
  url: string;
}) {
  return (
    <IonCard>
      <IonCardHeader>
        <IonItemDivider>
          <h5 style={{ color: 'black', fontWeight: 'bolder' }}>{title}</h5>
        </IonItemDivider>
      </IonCardHeader>

      <IonCardContent>{children}</IonCardContent>

      <IonCardContent>
        <a href={url}>{url}</a>
      </IonCardContent>
    </IonCard>
  );
}

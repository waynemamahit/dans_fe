import { IonItem, IonLabel, IonNote } from '@ionic/react';
import moment from 'moment';
import { JobData } from '../models/types/Job';
import './ListItem.css';

const ListItem: React.FC<{
  data: JobData;
}> = ({ data }) => {
  return (
    <IonItem routerLink={`/detail/${data.id}`} detail={false}>
      <IonLabel className="ion-text-wrap">
        <h2>
          <span style={{ color: 'royalblue', fontWeight: 'bold' }}>
            {data.title}
          </span>
          <div className="date">
            <IonNote color={'dark'}>{data.location}</IonNote>
            <IonNote>{moment(data.created_at).fromNow()}</IonNote>
          </div>
        </h2>
        <h3 style={{ color: 'gray' }}>
          {data.company} -{' '}
          <span style={{ color: 'green', fontWeight: 'bold' }}>
            {data.type}
          </span>
        </h3>
      </IonLabel>
    </IonItem>
  );
};

export default ListItem;

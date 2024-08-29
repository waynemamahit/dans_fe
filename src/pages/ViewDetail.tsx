import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonGrid,
  IonHeader,
  IonItem,
  IonProgressBar,
  IonRow,
  IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router';
import DetailCard from '../components/DetailCard';
import MainLayout from '../components/layouts/MainLayout';
import useQuery from '../hooks/useQuery';
import { JobData } from '../models/types/Job';
import { API_URL } from '../utils/constant';
import './ViewDetail.css';

function ViewDetail() {
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useQuery<JobData>({
    url: API_URL + '/positions/' + params.id,
  });

  return (
    <MainLayout
      pageId="view-detail-page"
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
      {isLoading ? (
        <IonProgressBar type="indeterminate"></IonProgressBar>
      ) : (
        <IonGrid>
          <IonRow>
            {data ? (
              <>
                <IonCol sizeLg="8" sizeMd="12" sizeSm="12" sizeXs="12">
                  <div className="ion-padding">
                    <div style={{ color: 'gray' }}>
                      {data.type} / {data.location}
                    </div>
                    <IonItem>
                      <h1 style={{ fontWeight: 'bolder' }}>{data.title}</h1>
                    </IonItem>
                    <div
                      dangerouslySetInnerHTML={{ __html: data.description }}
                    />
                  </div>
                </IonCol>
                <IonCol sizeLg="4" sizeMd="12" sizeSm="12" sizeXs="12">
                  <DetailCard title={data.company} url={data.company_url}>
                    <img alt={data.company} src={data.company_logo} />
                  </DetailCard>
                  <DetailCard title={'How to Apply'} url={data.url}>
                    <div
                      dangerouslySetInnerHTML={{ __html: data.how_to_apply }}
                    />
                  </DetailCard>
                </IonCol>
              </>
            ) : (
              <IonCol size="12">
                <h1 style={{ margin: 'auto' }}>Job not Found</h1>
              </IonCol>
            )}
          </IonRow>
        </IonGrid>
      )}
    </MainLayout>
  );
}

export default ViewDetail;

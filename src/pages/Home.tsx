import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonInput,
  IonItem,
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { search } from 'ionicons/icons';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import MainLayout from '../components/layouts/MainLayout';
import ListItem from '../components/ListItem';
import useQuery from '../hooks/useQuery';
import { FilterForm } from '../models/FilterForm';
import { JobData } from '../models/types/Job';
import './Home.css';

const Home: React.FC = () => {
  const { register, setValue, handleSubmit } = useForm<FilterForm>({
    defaultValues: new FilterForm(),
  });
  const { data, isLoading, getData } = useQuery<JobData[]>(
    'https://dev6.dansmultipro.com/api/recruitment/positions.json',
  );
  const [currentLength, setCurrentLength] = useState(data?.length ?? 0);

  const onLoadData = useCallback(async () => {
    await getData();
    setCurrentLength(data?.length as number);
  }, []);

  const onSearch = handleSubmit((data) => console.log(data));

  return (
    <MainLayout
      pageId="home-page"
      isAuth
      header={
        <IonHeader>
          <IonToolbar>
            <form onSubmit={onSearch}>
              <IonGrid>
                <IonRow className="ion-justify-content-around">
                  <IonCol sizeLg="5" sizeMd="6" sizeSm="12" sizeXs="12">
                    <IonInput
                      label="Job Description"
                      labelPlacement="floating"
                      fill="outline"
                      placeholder="Filter by title, benefits, companies, expertise"
                      {...register('description')}
                    />
                  </IonCol>
                  <IonCol sizeLg="4" sizeMd="6" sizeSm="12" sizeXs="12">
                    <IonInput
                      label="Location"
                      labelPlacement="floating"
                      fill="outline"
                      placeholder="Filter by city, state, zip code or country"
                      {...register('location')}
                    />
                  </IonCol>
                  <IonCol
                    sizeLg="3"
                    sizeMd="12"
                    sizeSm="12"
                    sizeXs="12"
                    style={{ margin: 'auto' }}
                  >
                    <IonButtons>
                      <IonCheckbox
                        labelPlacement="end"
                        style={{ paddingRight: 10 }}
                        onClick={(evt) =>
                          setValue(
                            'full_time',
                            evt.currentTarget.ariaChecked === 'false',
                          )
                        }
                      >
                        Full Time Only
                      </IonCheckbox>
                      <IonButton color={'primary'} fill="solid" type="submit">
                        <IonIcon slot="start" icon={search}></IonIcon>
                        Search
                      </IonButton>
                    </IonButtons>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </form>
          </IonToolbar>
        </IonHeader>
      }
    >
      <IonRefresher
        slot="fixed"
        onIonRefresh={(e) => onLoadData().finally(() => e.detail.complete())}
      >
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>

      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Inbox</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonList>
        <IonItem>
          <h1 className="ion-padding" style={{ fontWeight: 'bold' }}>
            Job List
          </h1>
        </IonItem>
        {data?.map((item) => <ListItem key={item.id} data={item} />)}
      </IonList>
      <IonInfiniteScroll
        style={{
          display:
            (data?.length ?? 0) === currentLength && !isLoading
              ? 'none'
              : 'block',
        }}
        onIonInfinite={(e) => onLoadData().finally(() => e.target.complete())}
      >
        <IonInfiniteScrollContent
          loadingText="Loading..."
          loadingSpinner="bubbles"
        ></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </MainLayout>
  );
};

export default Home;

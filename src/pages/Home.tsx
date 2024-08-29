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
  IonProgressBar,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonToolbar,
} from '@ionic/react';
import { close as closeIcon, search } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import MainLayout from '../components/layouts/MainLayout';
import ListItem from '../components/ListItem';
import useQuery from '../hooks/useQuery';
import { FilterForm } from '../models/FilterForm';
import { JobData } from '../models/types/Job';
import { API_URL } from '../utils/constant';
import './Home.css';

const Home: React.FC = () => {
  const {
    register,
    setValue,
    handleSubmit,
    reset: resetForm,
  } = useForm<FilterForm>({
    defaultValues: new FilterForm(),
  });
  const [queryParam, setQueryParam] = useState<
    Partial<FilterForm> & { page?: number }
  >({
    page: 1,
  });
  const [isFiltered, setIsFiltered] = useState(false);
  const { data, error, isLoading, getData, setData } = useQuery<JobData[]>({
    url: API_URL + '/positions.json',
    urlParams: queryParam,
    canSetData: false,
  });

  const onLoadData = async (newQueryParam: object) => {
    const newData = await getData(newQueryParam);
    setData(newData);
  };

  const onSearch = handleSubmit(async (formData) => {
    setIsFiltered(true);
    onLoadData(formData);
    setQueryParam(formData);
  });

  const onResetData = async () => {
    const newQueryParam = { page: 1 };
    onLoadData(newQueryParam);
    setIsFiltered(false);
    setQueryParam(newQueryParam);
    resetForm();
  };

  useEffect(() => {
    onLoadData(queryParam);
  }, []);

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
                  <IonCol sizeLg="3" sizeMd="6" sizeSm="12" sizeXs="12">
                    <IonInput
                      label="Location"
                      labelPlacement="floating"
                      fill="outline"
                      placeholder="Filter by city, state, zip code or country"
                      {...register('location')}
                    />
                  </IonCol>
                  <IonCol
                    sizeLg="4"
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
                      <IonButton color="primary" fill="solid" type="submit">
                        <IonIcon slot="start" icon={search}></IonIcon>
                        Search
                      </IonButton>
                      {isFiltered ? (
                        <IonButton
                          color="dark"
                          fill="solid"
                          type="button"
                          onClick={onResetData}
                        >
                          <IonIcon slot="start" icon={closeIcon}></IonIcon>
                          Clear
                        </IonButton>
                      ) : null}
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
        onIonRefresh={(e) => onResetData().finally(() => e.detail.complete())}
      >
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>

      {isLoading ? (
        <IonProgressBar type="indeterminate"></IonProgressBar>
      ) : null}

      {data ? (
        <IonList>
          <IonItem>
            <h1 className="ion-padding" style={{ fontWeight: 'bold' }}>
              {isFiltered ? `Showing ${data.length} jobs` : 'Job List'}
            </h1>
          </IonItem>
          {data
            .filter((item) => !!item)
            .map((item) => (
              <ListItem key={item.id} data={item} />
            ))}
        </IonList>
      ) : null}

      {!isFiltered ? (
        <IonInfiniteScroll
          onIonInfinite={async (e) => {
            if (!isFiltered) {
              const currentPage = queryParam.page ?? 1;

              if (!error && !isLoading) {
                const newQueryParam = {
                  page: currentPage + 1,
                };
                setQueryParam(newQueryParam);
                const newData = await getData(newQueryParam);
                setData((prevState) =>
                  [
                    ...new Set(
                      [...(prevState ?? []), ...(newData ?? [])].map(
                        (itemData) => JSON.stringify(itemData),
                      ),
                    ),
                  ].map((item) => JSON.parse(item)),
                );
              }
              e.target.complete();
            }
          }}
        >
          <IonInfiniteScrollContent
            loadingText="Loading..."
            loadingSpinner="bubbles"
          ></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      ) : null}
    </MainLayout>
  );
};

export default Home;

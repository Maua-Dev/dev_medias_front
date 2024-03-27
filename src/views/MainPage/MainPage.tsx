import {useContext, useCallback} from 'react';
import {ScrollView} from 'react-native';
import RefreshableScrollView from '../../components/RefreshableScrollView/RefreshableScrollView';
import CreationSubjectCard from '../../components/CreationSubjectCard/CreationSubjectCard';
import DevLogo from '../../components/DevLogo/DevLogo';
import Header from '../../components/Header/Header';
import InitialModal from '../../components/InitialModal/InitialModa';
import MainBox from '../../components/MainBox/MainBox';
import SubjectCard from '../../components/SubjectCard/SubjectCard';
import {SubjectContext} from '../../contexts/subjectContext';

const MainPage = () => {
  const {subjects, getAllSubjects, getSubjects} = useContext(SubjectContext);

  return (
    <>
      <Header isHomePage={true} />
      <MainBox>
        <RefreshableScrollView
          onRefresh={async () => {
            await getAllSubjects();
            await getSubjects();
          }}>
          {subjects.map(value => {
            return <SubjectCard key={value.code} subject={value} />;
          })}
          <CreationSubjectCard />
        </RefreshableScrollView>
      </MainBox>
      <DevLogo />
      <InitialModal />
    </>
  );
};

export default MainPage;

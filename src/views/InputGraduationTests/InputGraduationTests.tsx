import {useContext, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Button from '../../components/Button/Button';
import DevLogo from '../../components/DevLogo/DevLogo';
import GradesBox from '../../components/GradesBox/GradesBox';
import Header from '../../components/Header/Header';
import MainBox from '../../components/MainBox/MainBox';
import {SubjectContext} from '../../contexts/subjectContext';

const InputGraduationTests = () => {
  const {calculateFinalAverage} = useContext(SubjectContext);

  const [target, setTarget] = useState<boolean>(false);

  return (
    <>
      <Header isHomePage={false} />
      <MainBox>
        <ScrollView>
          <GradesBox
            isConfiguring={target}
            setIsConfiguring={(val: boolean) => setTarget(val)}
          />
        </ScrollView>
        <View style={styles.buttonPosition}>
          <Button action={() => calculateFinalAverage()}>Calcular média</Button>
          <Button action={() => setTarget(true)}>Definir meta</Button>
        </View>
      </MainBox>
      <DevLogo />
    </>
  );
};

const styles = StyleSheet.create({
  buttonPosition: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default InputGraduationTests;

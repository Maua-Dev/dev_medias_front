import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {SubjectContext} from '../../contexts/subjectContext';
import {getFontSize} from '../../utils/fontSizeHandlers';
import FinalAverage from '../FinalAverage/FinalAverage';
import Item from '../Item/Item';
import TargetSubjectModal from '../TargetSubjectModal/TargetSubjectModal';

const windowHeight = Dimensions.get('window').height;

type Props = {
  isConfiguring: boolean;
  setIsConfiguring: any;
};

interface IGrade {
  id: string;
  title: string;
  value: number;
  isExam: boolean;
  empty: boolean;
  generated: boolean;
}

const GradesBox = ({isConfiguring, setIsConfiguring}: Props) => {
  const {actualSubject, cleanGeneratedGrades} = useContext(SubjectContext);
  const [grades, setGrades] = useState<IGrade[]>([]);
  const [assignments, setAssignments] = useState<IGrade[]>([]);

  useEffect(() => {
    if (actualSubject) {
      let newActualSubjectsExams = actualSubject?.exams.map(exam => {
        return {
          id: exam!.name,
          title: exam!.name,
          value: exam!.value,
          isExam: true,
          empty: false,
          generated: exam?.generated,
        };
      });
      setGrades([...newActualSubjectsExams!]);

      let newActualSubjectsAssignments = actualSubject?.assignments.map(
        assignment => {
          return {
            id: assignment!.name,
            title: assignment!.name,
            value: assignment!.value,
            isExam: false,
            empty: false,
            generated: assignment?.generated,
          };
        },
      );
      setAssignments([...newActualSubjectsAssignments!]);
    }
  }, [actualSubject, actualSubject?.exams, actualSubject?.assignments]);

  const createRows = (
    data: {
      id: string;
      title: string;
      value: number;
      isExam: boolean;
      empty: boolean;
      generated: boolean;
    }[],
    columns: number,
  ) => {
    const rows = Math.floor(data.length / columns);
    let lastRowElements = data.length - rows * columns;
    while (lastRowElements !== columns && lastRowElements !== 0) {
      data.push({
        id: `empty-${lastRowElements}`,
        title: `empty-${lastRowElements}`,
        value: -1,
        isExam: false,
        empty: true,
        generated: false,
      });

      lastRowElements += 1;
    }

    return data;
  };

  return (
    <View style={styles.content}>
      <View style={styles.subareas}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{width: '10%'}}></View>
          <Text style={styles.title}>Provas</Text>
          <TouchableOpacity onPress={() => cleanGeneratedGrades()}>
            <Icon name="eraser" size={26} />
          </TouchableOpacity>
        </View>
        <FlatList
          numColumns={3}
          scrollEnabled={false}
          data={createRows(grades, 3)}
          keyExtractor={item => String(item.id)}
          renderItem={({item}: {item: IGrade}) => {
            return (
              <Item
                key={item.id}
                code={item.id}
                value={item.value}
                isExam={item.isExam}
                title={item.title}
                isEmpty={item.empty}
                generated={item.generated}
              />
            );
          }}
        />
      </View>
      <View style={styles.subareas}>
        <Text style={styles.title}>Trabalhos</Text>
        <FlatList
          numColumns={3}
          scrollEnabled={false}
          data={createRows(assignments, 3)}
          keyExtractor={item => String(item.id)}
          renderItem={({item}: {item: IGrade}) => {
            return (
              <Item
                key={item.id}
                code={item.id}
                isExam={item.isExam}
                value={item.value}
                title={item.title}
                isEmpty={item.empty}
                generated={item.generated}
              />
            );
          }}
        />
      </View>
      <FinalAverage
        finalAverage={actualSubject?.average ? actualSubject!.average : 0}
      />
      <TargetSubjectModal
        key={actualSubject?.code}
        subjectDetails={actualSubject}
        isConfiguring={isConfiguring}
        setIsConfiguring={setIsConfiguring}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingBottom: windowHeight * 0.05,
  },
  subareas: {
    marginVertical: '2.5%',
  },
  title: {
    fontSize: getFontSize(20),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GradesBox;

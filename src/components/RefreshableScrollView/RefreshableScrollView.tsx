import React, {useState, ReactNode} from 'react';
import {ScrollView, RefreshControl} from 'react-native';

type RefreshableScrollViewProps = {
  onRefresh: () => Promise<void>;
  children: ReactNode;
};

const RefreshableScrollView: React.FC<RefreshableScrollViewProps> = ({
  onRefresh,
  children,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }>
      {children}
    </ScrollView>
  );
};

export default RefreshableScrollView;

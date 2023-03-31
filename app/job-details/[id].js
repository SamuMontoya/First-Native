import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { Stack, useRouter, useSearchParams } from "expo-router";

import { useCallback, useState } from "react";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";

import { COLORS, icons, SIZES } from "../../constants";

import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { getDetails } from "../../api/get/getDetails/getDetails";

const QueryChild = () => {
  const params = useSearchParams();
  const router = useRouter();

  const { data, isLoading, error } = useQuery(
    ["GET_JOBS_DETAILS"],
    getDetails,
    params.id
  );

  const queryClient = new QueryClient();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {};

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerBackVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn
                iconUrl={icons.left}
                dimension="60%"
                handlePress={() => router.back()}
              />
            ),
            headerRight: () => (
              <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
            ),
            headerTitle: "",
          }}
        />
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {isLoading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : error ? (
              <Text>Something went wrong</Text>
            ) : data?.lenght === 0 ? (
              <Text>No Data</Text>
            ) : (
              <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                <Company />
                <JobTabs />
              </View>
            )}
          </ScrollView>
        </>
      </SafeAreaView>
    </QueryClientProvider>
  );
};

const JobDetails = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <QueryChild />
    </QueryClientProvider>
  );
};

export default JobDetails;

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
import { isLoading } from "expo-font";

const QueryChild = () => {
  const params = useSearchParams();
  const router = useRouter();

  const { data, response } = useQuery(
    ["GET_JOBS_DETAILS"],
    getDetails,
    params.id
  );

  const isLoading = false;
  const error = false;
  console.log(data);

  const queryClient = new QueryClient();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {};

  const tabs = ["About", "Qualifications", "Responsabilities"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return <Specifics title="Qualifications" points="Qualifications" />;
      case "About":
        return <JobAbout />;
      case "Responsabilities":
        return <Specifics title="Responsabilities" points="Responsabilities" />;
      default:
        break;
    }
  };

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
                <Company props={false} />
                <JobTabs
                  tabs={tabs}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                {displayTabContent()}
              </View>
            )}
          </ScrollView>

          <JobFooter url={"https://careers.google.com/jobs/results"} />
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

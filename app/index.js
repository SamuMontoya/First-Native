import { useState } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { getJobs } from "../api/get";

const QueryChild = () => {
  const { data, isLoading, error } = useQuery(["GET_POPULAR_JOBS"], getJobs);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="60%" />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome />
          <Popularjobs data={data} isLoading={isLoading} error={error} />
          <Nearbyjobs data={data} isLoading={isLoading} error={error} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Home = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <QueryChild />
    </QueryClientProvider>
  );
};

export default Home;

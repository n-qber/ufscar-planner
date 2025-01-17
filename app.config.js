module.exports = {
  expo: {
    name: "UFSCar Planner",
    owner: "petbccufscar",
    slug: "ufscar-planner",
    version: "1.5.1",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#E8243C",
    },
    updates: {
      fallbackToCacheTimeout: 0,
      url: "https://petbcc.ufscar.br/ru_api/updates/v1/manifest",
      requestHeaders: {
        "ufscar-planner-channel": process.env.PLANNER_CHANNEL,
      },
    },
    plugins: [
      "sentry-expo",
      [
        "expo-notifications",
        {
          icon: "./assets/adaptive-icon.png",
          color: "#E8243C",
          sounds: [],
        },
      ],
    ],
    assetBundlePatterns: [
      "**/*",
    ],
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#E8243C",
      },
      package: "com.pet.ufscarplanner",
      versionCode: 15,
      permissions: [
        "RECEIVE_BOOT_COMPLETED",
      ],
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    packagerOpts: {
      sourceExts: [
        "expo.ts",
        "expo.tsx",
        "expo.js",
        "expo.jsx",
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "wasm",
        "svg",
      ],
    },
    description: "",
    extra: {
      eas: {
        projectId: "5ff4fcf5-520f-4ac6-bc18-dd5d292dca98",
      },
    },
    hooks: {
      postPublish: [
        {
          file: "sentry-expo/upload-sourcemaps",
          config: {
            organization: "pet-bcc-ufscar",
            project: "ufscar-planner",
          },
        },
      ],
    },
    runtimeVersion: {
      policy: "sdkVersion",
    },
  },
};

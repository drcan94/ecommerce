import { City } from "@maxmind/geoip2-node";

/**
 * Default geo data matching the Partial<City> type.
 */
export const DEFAULT_GEO_DATA: Partial<City> = {
  continent: {
    code: "NA",
    geonameId: 0,
    names: {
      en: "North America",
      de: "Nordamerika",
      es: "América del Norte",
      fr: "Amérique du Nord",
      ja: "北アメリカ",
      "pt-BR": "América do Norte",
      ru: "Северная Америка",
      "zh-CN": "北美洲",
    },
  },
  country: {
    geonameId: 0,
    isInEuropeanUnion: false,
    isoCode: "US",
    names: {
      en: "United States",
      de: "USA",
      es: "Estados Unidos",
      fr: "États-Unis",
      ja: "アメリカ合衆国",
      "pt-BR": "Estados Unidos",
      ru: "США",
      "zh-CN": "美国",
    },
  },
  city: {
    geonameId: 0,
    names: {
      en: "Unknown",
    },
  },
  location: {
    accuracyRadius: 0,
    latitude: 0,
    longitude: 0,
    timeZone: "America/New_York",
    metroCode: undefined,
    averageIncome: undefined,
    populationDensity: undefined,
  },
  traits: {
    ipAddress: "1.1.1.1", // Cloudflare
    network: "1.1.1.0/24",
    isAnonymous: false,
    isAnonymousProxy: false,
    isAnonymousVpn: false,
    isHostingProvider: false,
    isPublicProxy: false,
    isResidentialProxy: false,
    isSatelliteProvider: false,
    isTorExitNode: false,
    isAnycast: false,
    isLegitimateProxy: false,
    autonomousSystemNumber: undefined,
    autonomousSystemOrganization: undefined,
    connectionType: undefined,
    domain: undefined,
    isp: undefined,
    mobileCountryCode: undefined,
    mobileNetworkCode: undefined,
    organization: undefined,
    staticIpScore: undefined,
    userCount: undefined,
    userType: undefined,
  },
};

export const plainDefaultGeoData = (
  result: Partial<City>,
  initialIp: string
): Partial<City> => {
  const resultTraits = result.traits!;

  return {
    ...DEFAULT_GEO_DATA,
    ...result,
    traits: {
      ...DEFAULT_GEO_DATA.traits,
      ...resultTraits,
      ipAddress:
        result.traits?.ipAddress ||
        initialIp ||
        DEFAULT_GEO_DATA.traits?.ipAddress,
    },
  };
};

"use client";

import { createContext, useContext, ReactNode, useState } from "react";
import { refreshGeoDataCache, getClientGeoData } from "@/utils/GeoData/geo";
import { type City } from "@maxmind/geoip2-node";

// Varsayılan değerler
const DEFAULT_GEO_DATA: Partial<City> = {
  country: {
    geonameId: 0,
    isInEuropeanUnion: false,
    isoCode: "US",
    names: {
      en: "United States",
    },
  },
  city: {
    geonameId: 0,
    names: {
      en: "Unknown",
    },
  },
};

interface GeoContextType {
  geoData: Partial<City>;
  refreshLocation: () => Promise<void>;
  isRefreshing: boolean;
}

const GeoContext = createContext<GeoContextType>({
  geoData: DEFAULT_GEO_DATA,
  refreshLocation: async () => {},
  isRefreshing: false,
});

export function GeoProvider({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData: Partial<City> | null;
}) {
  const [geoData, setGeoData] = useState<Partial<City>>(
    initialData || DEFAULT_GEO_DATA
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshLocation = async () => {
    try {
      setIsRefreshing(true);
      await refreshGeoDataCache();
      const newData = await getClientGeoData();
      setGeoData(newData || DEFAULT_GEO_DATA);
    } catch (error) {
      console.error("Failed to refresh location:", error);
      setGeoData(DEFAULT_GEO_DATA);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <GeoContext.Provider value={{ geoData, refreshLocation, isRefreshing }}>
      {children}
    </GeoContext.Provider>
  );
}

export const useGeo = () => useContext(GeoContext);

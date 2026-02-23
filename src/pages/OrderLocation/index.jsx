import React, { useMemo } from "react";
import { Box, Button, Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useColorModeValue } from "@/components/ui/color-mode";
import BackButton from "@/components/BackButton";
import { getOrderLocationMarkerIcon, TILE_LAYERS } from "@/libs/map";
import { useTranslation } from "react-i18next";

const FALLBACK_CENTER = { lat: 40.7837, lng: 72.3489 };

function OrderLocation() {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));
  const address = searchParams.get("address") || t("seller.address");
  const isValidCoords = Number.isFinite(lat) && Number.isFinite(lng);

  const center = useMemo(
    () => (isValidCoords ? { lat, lng } : FALLBACK_CENTER),
    [isValidCoords, lat, lng]
  );

  const tileLayer = useColorModeValue(TILE_LAYERS.light, TILE_LAYERS.dark);
  const navUrl = `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`;

  return (
    <Box minH="100vh" display="flex" justifyContent="center" bg="bg.primary">
      <Box w="100%" maxW="420px" position="relative" minH="100vh" overflow="hidden">
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          zIndex={2000}
          px={4}
          pt="calc(env(safe-area-inset-top, 0px) + 12px)"
          pb={3}
          bg="linear-gradient(to bottom, rgba(20,20,20,0.85), rgba(20,20,20,0.25), rgba(20,20,20,0))"
          pointerEvents="none"
        >
          <Flex direction="column" gap={2}>
            <Flex gap={2} pointerEvents="auto">
              <BackButton />
            </Flex>
          </Flex>
        </Box>

        <Box position="absolute" inset="0">
          <MapContainer
            center={[center.lat, center.lng]}
            zoom={15}
            zoomControl={false}
            scrollWheelZoom
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer url={tileLayer.url} attribution={tileLayer.attribution} />
            <ZoomControl position="bottomright" />
            <Marker position={[center.lat, center.lng]} icon={getOrderLocationMarkerIcon()}>
              <Popup>{address}</Popup>
            </Marker>
          </MapContainer>
        </Box>
      </Box>
    </Box>
  );
}

export default OrderLocation;

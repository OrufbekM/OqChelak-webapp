import L from "leaflet";

let cachedIcon = null;

export function getOrderLocationMarkerIcon() {
  if (!cachedIcon) {
    cachedIcon = L.divIcon({
      className: "order-location-marker",
      html: `
        <span style="
          display:block;
          width:18px;
          height:18px;
          border-radius:9999px;
          background:#2b8cff;
          border:3px solid #ffffff;
          box-shadow:0 4px 14px rgba(43,140,255,.5);
        "></span>
      `,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
      popupAnchor: [0, -10],
    });
  }

  return cachedIcon;
}

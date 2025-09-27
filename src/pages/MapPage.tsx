import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Search, Star, MapPin } from 'lucide-react';
import { businesses } from '@/data/businessData';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leaflet default marker icon
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = defaultIcon;

// Helper to fly to a location from URL params
const FlyToLocation = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 17, { duration: 1.5 });
  }, [lat, lng, map]);
  return null;
};

const MapPage = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const mapRef = useRef<L.Map | null>(null);

  const targetLat = searchParams.get('lat') ? parseFloat(searchParams.get('lat')!) : null;
  const targetLng = searchParams.get('lng') ? parseFloat(searchParams.get('lng')!) : null;
  const targetBizId = searchParams.get('biz') || null;

  const filtered = useMemo(() => {
    return businesses.filter((b) => {
      const matchesSearch = !search || b.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !selectedCategory || b.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const allCategories = ['', ...new Set(businesses.map(b => b.category))];

  const centerMap = () => {
    if (mapRef.current) {
      mapRef.current.setView([29.9691, -95.6977], 14);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Category filter */}
      <div className="bg-card border-b border-border px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <span className="text-sm text-muted-foreground font-medium">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-card border border-border rounded-lg px-3 py-1.5 text-sm text-foreground outline-none"
          >
            {allCategories.map((cat) => (
              <option key={cat || 'all'} value={cat}>
                {cat || `VIEW ALL (${businesses.length})`}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row" style={{ height: 'calc(100vh - 8rem)' }}>
        {/* Map */}
        <div className="flex-1 relative">
          <div className="absolute top-4 left-4 z-[1000] font-display">
            <h2 className="text-xl font-bold text-foreground bg-card/90 backdrop-blur-sm px-3 py-1 rounded">
              COMMUNITY MAP
            </h2>
          </div>
          <MapContainer
            center={[29.9691, -95.6977]}
            zoom={14}
            className="w-full h-full z-0"
            ref={mapRef}
          >
            {targetLat !== null && targetLng !== null && (
              <FlyToLocation lat={targetLat} lng={targetLng} />
            )}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filtered.map((biz) => (
              <Marker key={biz.id} position={[biz.lat, biz.lng]}>
                <Popup>
                  <div className="font-body">
                    <strong className="font-display">{biz.name}</strong>
                    <br />
                    <span className="text-xs">{biz.address}</span>
                    <br />
                    <span className="text-xs">⭐ {biz.rating}</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          <button
            onClick={centerMap}
            className="absolute bottom-4 right-4 z-[1000] bg-card text-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-medium border border-border hover:bg-muted transition-colors"
          >
            Center map
          </button>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-96 bg-card border-l border-border overflow-y-auto">
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search businesses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none"
              />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-3">All Businesses</h3>
          </div>

          <div className="divide-y divide-border">
            {filtered.map((biz) => (
              <div
                key={biz.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => {
                  if (mapRef.current) {
                    mapRef.current.setView([biz.lat, biz.lng], 16);
                  }
                }}
              >
                <img
                  src={biz.image}
                  alt={biz.name}
                  className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <h4 className="font-semibold text-sm text-foreground truncate">{biz.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="w-3 h-3 text-gold fill-gold" />
                    <span>{biz.rating}</span>
                    <span>·</span>
                    <span className="truncate">{biz.address}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;

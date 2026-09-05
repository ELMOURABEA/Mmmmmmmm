import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ExternalLink, 
  Navigation, 
  Search, 
  CheckCircle, 
  Building2, 
  Sparkles,
  Layers,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { Branch, Language } from '../types';

interface BranchMapProps {
  branches: Branch[];
  lang: Language;
  selectedBranchId?: string;
  onSelectBranch?: (branch: Branch) => void;
  onOrderToBranch?: (branch: Branch) => void;
  className?: string;
  height?: string;
}

export const BranchMap: React.FC<BranchMapProps> = ({
  branches,
  lang,
  selectedBranchId,
  onSelectBranch,
  onOrderToBranch,
  className = '',
  height = 'h-[580px]'
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});

  const [activeBranch, setActiveBranch] = useState<Branch | null>(
    branches.find(b => b.id === selectedBranchId) || branches[0] || null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [only24Hours, setOnly24Hours] = useState(false);

  // Filtered branches
  const filteredBranches = branches.filter((branch) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !query ||
      branch.name.toLowerCase().includes(query) ||
      branch.nameAr.includes(query) ||
      branch.address.toLowerCase().includes(query) ||
      branch.addressAr.includes(query) ||
      (branch.landmark && branch.landmark.toLowerCase().includes(query)) ||
      (branch.landmarkAr && branch.landmarkAr.includes(query)) ||
      branch.phone.includes(query) ||
      (branch.secondaryPhones && branch.secondaryPhones.some(p => p.includes(query)));

    const matchesCity = cityFilter === 'all' || branch.city.toLowerCase() === cityFilter.toLowerCase();
    const matches24Hours = !only24Hours || branch.is24Hours;

    return matchesSearch && matchesCity && matches24Hours;
  });

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center on Tanta (where most branches are situated)
    const initialLat = 30.7915;
    const initialLng = 31.0028;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: 14,
        zoomControl: true,
        attributionControl: false
      });

      // Crisp OSM / CartoDB tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers on map
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old markers
    for (const id in markersRef.current) {
      if (markersRef.current[id]) {
        markersRef.current[id].remove();
      }
    }
    markersRef.current = {};

    filteredBranches.forEach((branch) => {
      const isSelected = activeBranch?.id === branch.id;

      // Custom HTML Pin
      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div class="relative flex items-center justify-center cursor-pointer transition-transform duration-200 ${isSelected ? 'scale-125 z-50' : 'hover:scale-110 z-10'}">
            <div class="w-10 h-10 rounded-full ${isSelected ? 'bg-red-600 shadow-xl ring-4 ring-red-200 ring-offset-1' : 'bg-red-600 shadow-md'} flex items-center justify-center text-white font-bold text-xs border-2 border-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
                <path d="m8.5 8.5 7 7"/>
              </svg>
            </div>
            <div class="absolute -bottom-1 w-2 h-2 bg-red-600 rotate-45 border-r border-b border-white"></div>
          </div>
        `,
        iconSize: [40, 44],
        iconAnchor: [20, 44],
        popupAnchor: [0, -44],
      });

      const marker = L.marker([branch.lat, branch.lng], { icon: customIcon }).addTo(map);

      // Popup Content
      const popupHtml = `
        <div class="p-1 max-w-[260px] text-slate-900 font-sans" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
          <div class="flex items-center justify-between gap-2 border-b border-slate-200 pb-2 mb-2">
            <div class="font-bold text-sm text-red-600 flex items-center gap-1">
              <span>${lang === 'ar' ? branch.nameAr : branch.name}</span>
            </div>
            ${branch.is24Hours ? '<span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">24/7</span>' : ''}
          </div>
          ${branch.landmark ? `
            <div class="text-xs text-slate-600 mb-1.5 flex items-start gap-1 font-medium">
              <span>📍 ${lang === 'ar' && branch.landmarkAr ? branch.landmarkAr : branch.landmark}</span>
            </div>
          ` : ''}
          <div class="text-xs text-slate-500 mb-2">${lang === 'ar' ? branch.addressAr : branch.address}</div>
          <div class="flex flex-col gap-1 text-xs font-semibold text-slate-700 bg-slate-50 p-2 rounded mb-2">
            <div class="flex items-center gap-1">
              <span>📞 ${branch.phone}</span>
            </div>
            ${branch.secondaryPhones ? branch.secondaryPhones.map(p => `<div class="text-[11px] text-slate-600">📱 ${p}</div>`).join('') : ''}
          </div>
          <a href="${branch.googleMapUrl || `https://maps.google.com/?q=${branch.lat},${branch.lng}`}" target="_blank" rel="noopener noreferrer" 
             class="inline-flex items-center justify-center gap-1 w-full bg-slate-900 text-white text-xs font-bold py-1.5 rounded hover:bg-slate-800 transition-colors">
            <span>${lang === 'ar' ? 'فتح في خرائط Google' : 'Open in Google Maps'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        setActiveBranch(branch);
        if (onSelectBranch) onSelectBranch(branch);
      });

      markersRef.current[branch.id] = marker;
    });

    // If active branch, pan to it
    if (activeBranch && markersRef.current[activeBranch.id]) {
      map.panTo([activeBranch.lat, activeBranch.lng], { animate: true, duration: 0.6 });
    }
  }, [filteredBranches, activeBranch, lang]);

  const handleSelectBranchItem = (branch: Branch) => {
    setActiveBranch(branch);
    if (onSelectBranch) onSelectBranch(branch);
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo([branch.lat, branch.lng], 16, { animate: true, duration: 0.8 });
      const marker = markersRef.current[branch.id];
      if (marker) {
        setTimeout(() => marker.openPopup(), 400);
      }
    }
  };

  const cities = [
    { id: 'all', label: lang === 'ar' ? 'جميع الفروع' : 'All Branches' },
    { id: 'tanta', label: lang === 'ar' ? 'طنطا (١٠ فروع)' : 'Tanta (10 Branches)' },
    { id: 'el mahalla', label: lang === 'ar' ? 'المحلة الكبرى' : 'El Mahalla' },
    { id: 'mansoura', label: lang === 'ar' ? 'المنصورة' : 'Mansoura' },
    { id: 'zagazig', label: lang === 'ar' ? 'الزقازيق' : 'Zagazig' },
    { id: 'cairo', label: lang === 'ar' ? 'القاهرة' : 'Cairo' },
  ];

  return (
    <div className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden ${className}`}>
      {/* Header & Controls Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 rounded-xl">
                <MapPin className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  {lang === 'ar' ? 'الخريطة التفاعلية لفروع صيدليات البنداري' : 'El-Bendary Pharmacies Interactive Map'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  {lang === 'ar' 
                    ? `عرض مواقع ${filteredBranches.length} فرع مجهز بأعلى معايير الخدمة الدوائية وسلاسل التبريد` 
                    : `Showing ${filteredBranches.length} fully equipped medical pharmacy branches`}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[200px] flex-1 sm:flex-initial">
              <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={lang === 'ar' ? 'بحث بالفرع، الشارع أو الهاتف...' : 'Search branch, street, phone...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <button
              onClick={() => setOnly24Hours(!only24Hours)}
              className={`px-3 py-2 text-xs font-bold rounded-lg border transition-colors flex items-center gap-1.5 ${
                only24Hours 
                  ? 'bg-emerald-600 text-white border-emerald-600' 
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'فروع ٢٤ ساعة فقط' : '24/7 Branches Only'}</span>
            </button>
          </div>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-3 scrollbar-none">
          {cities.map((city) => (
            <button
              key={city.id}
              onClick={() => setCityFilter(city.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-full whitespace-nowrap transition-colors ${
                cityFilter === city.id
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700'
              }`}
            >
              {city.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map + Branch Sidebar Split Layout */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 ${height} relative`}>
        {/* Left Side: Interactive Branch List */}
        <div className="lg:col-span-5 border-r rtl:border-r-0 rtl:border-l border-slate-200 dark:border-slate-800 overflow-y-auto max-h-[280px] lg:max-h-none p-3 space-y-2.5 bg-slate-50/50 dark:bg-slate-900/50">
          {filteredBranches.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              {lang === 'ar' ? 'لم نجد فروعاً تطابق معايير البحث' : 'No branches match your search criteria'}
            </div>
          ) : (
            filteredBranches.map((branch) => {
              const isSelected = activeBranch?.id === branch.id;
              return (
                <div
                  key={branch.id}
                  onClick={() => handleSelectBranchItem(branch)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left rtl:text-right ${
                    isSelected 
                      ? 'bg-red-50/90 dark:bg-red-950/40 border-red-500 ring-2 ring-red-500/20 shadow-sm' 
                      : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-red-600 animate-pulse' : 'bg-slate-400'}`}></span>
                      <span>{lang === 'ar' ? branch.nameAr : branch.name}</span>
                    </div>
                    {branch.is24Hours ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                        24/7
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        {lang === 'ar' ? '٨ ص - ٣ ف' : '8 AM - 3 AM'}
                      </span>
                    )}
                  </div>

                  {/* Landmark Tag from screenshot */}
                  {branch.landmark && (
                    <div className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 dark:text-red-400 bg-red-100/70 dark:bg-red-950/80 px-2 py-0.5 rounded mb-1.5">
                      <span>📌</span>
                      <span>{lang === 'ar' && branch.landmarkAr ? branch.landmarkAr : branch.landmark}</span>
                    </div>
                  )}

                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">
                    {lang === 'ar' ? branch.addressAr : branch.address}
                  </p>

                  {/* Phone Numbers directly from screenshot */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2.5">
                    <a
                      href={`tel:${branch.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-slate-800 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 bg-slate-100 dark:bg-slate-700/60 px-2 py-1 rounded"
                    >
                      <Phone className="w-3 h-3 text-red-600" />
                      <span>{branch.phone}</span>
                    </a>
                    {branch.secondaryPhones && branch.secondaryPhones.slice(0, 2).map((phone, idx) => (
                      <a
                        key={idx}
                        href={`tel:${phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 bg-slate-100/70 dark:bg-slate-700/40 px-2 py-1 rounded text-[11px]"
                      >
                        <span>{phone}</span>
                      </a>
                    ))}
                  </div>

                  {/* Action row: Google Maps button matching screenshot */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/50">
                    <a
                      href={branch.googleMapUrl || `https://maps.google.com/?q=${branch.lat},${branch.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>{lang === 'ar' ? 'خرائط Google' : 'Google Maps'}</span>
                    </a>

                    {onOrderToBranch && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOrderToBranch(branch);
                        }}
                        className="text-[11px] font-bold text-red-600 hover:text-red-700 dark:text-red-400 hover:underline flex items-center gap-0.5"
                      >
                        <span>{lang === 'ar' ? 'طلب روشتة للفرع' : 'Order Rx here'}</span>
                        <ChevronRight className="w-3 h-3 rtl:rotate-180" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Side: Leaflet Map Container */}
        <div className="lg:col-span-7 h-[300px] lg:h-full relative w-full">
          <div ref={mapContainerRef} className="w-full h-full z-0" />
          
          {/* Quick Floating Map Overlay */}
          {activeBranch && (
            <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:w-80 z-[1000] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl pointer-events-auto">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-black text-slate-900 dark:text-white">
                  {lang === 'ar' ? activeBranch.nameAr : activeBranch.name}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
                  {activeBranch.city}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mb-2 truncate">
                {lang === 'ar' && activeBranch.landmarkAr ? `📍 ${activeBranch.landmarkAr}` : activeBranch.address}
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${activeBranch.phone}`}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg text-center flex items-center justify-center gap-1 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'اتصال بالفرع' : 'Call Branch'}</span>
                </a>
                <a
                  href={activeBranch.googleMapUrl || `https://maps.google.com/?q=${activeBranch.lat},${activeBranch.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold py-1.5 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'الاتجاهات' : 'Directions'}</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

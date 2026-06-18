// Türkiye il/ilçe verisi (plaka kodlu). İlçeler büyük şehirler için doludur,
// diğerlerinde serbest metin girişine düşülür.

export interface Province {
  plate: number;
  name: string;
}

export const TR_PROVINCES: Province[] = [
  { plate: 1, name: "Adana" }, { plate: 2, name: "Adıyaman" }, { plate: 3, name: "Afyonkarahisar" },
  { plate: 4, name: "Ağrı" }, { plate: 5, name: "Amasya" }, { plate: 6, name: "Ankara" },
  { plate: 7, name: "Antalya" }, { plate: 8, name: "Artvin" }, { plate: 9, name: "Aydın" },
  { plate: 10, name: "Balıkesir" }, { plate: 11, name: "Bilecik" }, { plate: 12, name: "Bingöl" },
  { plate: 13, name: "Bitlis" }, { plate: 14, name: "Bolu" }, { plate: 15, name: "Burdur" },
  { plate: 16, name: "Bursa" }, { plate: 17, name: "Çanakkale" }, { plate: 18, name: "Çankırı" },
  { plate: 19, name: "Çorum" }, { plate: 20, name: "Denizli" }, { plate: 21, name: "Diyarbakır" },
  { plate: 22, name: "Edirne" }, { plate: 23, name: "Elazığ" }, { plate: 24, name: "Erzincan" },
  { plate: 25, name: "Erzurum" }, { plate: 26, name: "Eskişehir" }, { plate: 27, name: "Gaziantep" },
  { plate: 28, name: "Giresun" }, { plate: 29, name: "Gümüşhane" }, { plate: 30, name: "Hakkari" },
  { plate: 31, name: "Hatay" }, { plate: 32, name: "Isparta" }, { plate: 33, name: "Mersin" },
  { plate: 34, name: "İstanbul" }, { plate: 35, name: "İzmir" }, { plate: 36, name: "Kars" },
  { plate: 37, name: "Kastamonu" }, { plate: 38, name: "Kayseri" }, { plate: 39, name: "Kırklareli" },
  { plate: 40, name: "Kırşehir" }, { plate: 41, name: "Kocaeli" }, { plate: 42, name: "Konya" },
  { plate: 43, name: "Kütahya" }, { plate: 44, name: "Malatya" }, { plate: 45, name: "Manisa" },
  { plate: 46, name: "Kahramanmaraş" }, { plate: 47, name: "Mardin" }, { plate: 48, name: "Muğla" },
  { plate: 49, name: "Muş" }, { plate: 50, name: "Nevşehir" }, { plate: 51, name: "Niğde" },
  { plate: 52, name: "Ordu" }, { plate: 53, name: "Rize" }, { plate: 54, name: "Sakarya" },
  { plate: 55, name: "Samsun" }, { plate: 56, name: "Siirt" }, { plate: 57, name: "Sinop" },
  { plate: 58, name: "Sivas" }, { plate: 59, name: "Tekirdağ" }, { plate: 60, name: "Tokat" },
  { plate: 61, name: "Trabzon" }, { plate: 62, name: "Tunceli" }, { plate: 63, name: "Şanlıurfa" },
  { plate: 64, name: "Uşak" }, { plate: 65, name: "Van" }, { plate: 66, name: "Yozgat" },
  { plate: 67, name: "Zonguldak" }, { plate: 68, name: "Aksaray" }, { plate: 69, name: "Bayburt" },
  { plate: 70, name: "Karaman" }, { plate: 71, name: "Kırıkkale" }, { plate: 72, name: "Batman" },
  { plate: 73, name: "Şırnak" }, { plate: 74, name: "Bartın" }, { plate: 75, name: "Ardahan" },
  { plate: 76, name: "Iğdır" }, { plate: 77, name: "Yalova" }, { plate: 78, name: "Karabük" },
  { plate: 79, name: "Kilis" }, { plate: 80, name: "Osmaniye" }, { plate: 81, name: "Düzce" },
];

export const DISTRICTS_BY_PROVINCE: Record<string, string[]> = {
  İstanbul: [
    "Adalar", "Arnavutköy", "Ataşehir", "Avcılar", "Bağcılar", "Bahçelievler", "Bakırköy",
    "Başakşehir", "Bayrampaşa", "Beşiktaş", "Beykoz", "Beylikdüzü", "Beyoğlu", "Büyükçekmece",
    "Çatalca", "Çekmeköy", "Esenler", "Esenyurt", "Eyüpsultan", "Fatih", "Gaziosmanpaşa",
    "Güngören", "Kadıköy", "Kağıthane", "Kartal", "Küçükçekmece", "Maltepe", "Pendik",
    "Sancaktepe", "Sarıyer", "Silivri", "Sultanbeyli", "Sultangazi", "Şile", "Şişli",
    "Tuzla", "Ümraniye", "Üsküdar", "Zeytinburnu",
  ],
  Ankara: [
    "Altındağ", "Ayaş", "Bala", "Çamlıdere", "Çankaya", "Çubuk", "Elmadağ", "Etimesgut",
    "Evren", "Gölbaşı", "Güdül", "Haymana", "Kalecik", "Kahramankazan", "Keçiören",
    "Kızılcahamam", "Mamak", "Nallıhan", "Polatlı", "Pursaklar", "Sincan", "Şereflikoçhisar",
    "Yenimahalle",
  ],
  İzmir: [
    "Aliağa", "Balçova", "Bayındır", "Bayraklı", "Bergama", "Bornova", "Buca", "Çeşme",
    "Çiğli", "Foça", "Gaziemir", "Güzelbahçe", "Karabağlar", "Karşıyaka", "Kemalpaşa",
    "Konak", "Menderes", "Menemen", "Narlıdere", "Ödemiş", "Seferihisar", "Selçuk", "Torbalı", "Urla",
  ],
  Bursa: [
    "Büyükorhan", "Gemlik", "Gürsu", "Harmancık", "İnegöl", "İznik", "Karacabey", "Keles",
    "Kestel", "Mudanya", "Mustafakemalpaşa", "Nilüfer", "Orhaneli", "Orhangazi", "Osmangazi",
    "Yenişehir", "Yıldırım",
  ],
  Antalya: [
    "Akseki", "Aksu", "Alanya", "Demre", "Döşemealtı", "Elmalı", "Finike", "Gazipaşa",
    "Gündoğmuş", "İbradı", "Kaş", "Kemer", "Kepez", "Konyaaltı", "Korkuteli", "Kumluca",
    "Manavgat", "Muratpaşa", "Serik",
  ],
  Kocaeli: ["Başiskele", "Çayırova", "Darıca", "Derince", "Gebze", "Gölcük", "İzmit", "Kandıra", "Karamürsel", "Kartepe", "Körfez"],
  Adana: ["Aladağ", "Ceyhan", "Çukurova", "Feke", "İmamoğlu", "Karaisalı", "Karataş", "Kozan", "Pozantı", "Saimbeyli", "Sarıçam", "Seyhan", "Tufanbeyli", "Yumurtalık", "Yüreğir"],
};

export const ALL_PROVINCE_NAMES = TR_PROVINCES.map((p) => p.name);

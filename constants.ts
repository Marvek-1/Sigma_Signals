
import { DiseaseInfo } from './types';

export const AFRO_ISO3_LIST = [
  "AGO","BEN","BWA","BFA","BDI","CPV","CMR","CAF","TCD","COM",
  "COG","CIV","COD","GNQ","ERI","ETH","GAB","GMB","GHA","GIN",
  "GNB","KEN","LSO","LBR","MDG","MWI","MLI","MRT","MUS","MOZ",
  "NAM","NER","NGA","RWA","STP","SEN","SYC","SLE","ZAF","SSD",
  "TZA","TGO","UGA","ZMB","ZWE","DZA","TUN","LBY","MAR","SWZ"
];

export const LANGUAGES = ["English", "French", "Arabic", "Yoruba", "Hausa", "Swahili", "Portuguese"];

export const DATA_SOURCES = [
  "TikTok", "Instagram", "Facebook", "X (Twitter)", 
  "Internet TV (Arise News, Channels TV, SABC News, Africa24)", 
  "Digital Newspapers", "WhatsApp Community Groups", "Local Radio Signal Reports"
];

export const AFRO_DISEASES: DiseaseInfo[] = [
  { code: "A00", name: "Cholera", syndrome: "AWD" },
  { code: "A96", name: "Lassa fever", syndrome: "Hemorrhagic" },
  { code: "U04", name: "Mpox", syndrome: "Rash" },
  { code: "A99", name: "Ebola/Marburg", syndrome: "Hemorrhagic" },
  { code: "A92", name: "Yellow fever", syndrome: "Febrile" },
  { code: "A80", name: "Polio", syndrome: "AFP" },
  { code: "B05", name: "Measles", syndrome: "Rash" },
  { code: "A39", name: "Meningitis", syndrome: "Neurological" }
];

export const DISEASE_KEYWORDS: Record<string, string[]> = {
  "A00": ["cholera", "Yellow water", "Watery Sheet", "shit", "poop", "fecal matter", "Acute Watery Diarrhea", "igbe gbuuru", "choléra"],
  "A96": ["Lassa", "rat fever", "iba lassa", "fièvre de lassa", "bleeding gums"],
  "U04": ["mpox", "monkeypox", "Monkey tail", "pocks", "olode", "eyin inaki", "strange rash", "sores on skin"],
  "A99": ["ebola", "marburg", "sudden bleeding", "hemorrhagic", "EVD", "fièvre hémorragique", "kuvuja damu"],
  "A92": ["yellow fever", "yellow eyes", "iba pon", "jaunisse", "homa ya manjano"],
  "B05": ["measles", "rougeole", "rash", "iba gbona", "shurua"],
  "A39": ["meningitis", "méningite", "iba opolo", "stiff neck", "brain fever"]
};

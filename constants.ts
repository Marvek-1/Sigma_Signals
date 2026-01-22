
import { DiseaseInfo } from './types';

export const AFRO_ISO3_LIST = [
  "AGO","BEN","BWA","BFA","BDI","CPV","CMR","CAF","TCD","COM",
  "COG","CIV","COD","GNQ","ERI","ETH","GAB","GMB","GHA","GIN",
  "GNB","KEN","LSO","LBR","MDG","MWI","MLI","MRT","MUS","MOZ",
  "NAM","NER","NGA","RWA","STP","SEN","SYC","SLE","ZAF","SSD",
  "TZA","TGO","UGA","ZMB","ZWE","DZA","TUN","LBY","MAR","SWZ"
];

export const LANGUAGES = ["English", "French", "Portuguese", "Swahili", "Amharic", "Hausa", "Yoruba", "Arabic"];

export const AFRO_DISEASES: DiseaseInfo[] = [
  { code: "A00", name: "Cholera", syndrome: "AWD" },
  { code: "A99", name: "Ebola/Marburg", syndrome: "Hemorrhagic" },
  { code: "A92", name: "Yellow fever", syndrome: "Febrile" },
  { code: "A96", name: "Lassa fever", syndrome: "Hemorrhagic" },
  { code: "A80", name: "Polio", syndrome: "AFP" },
  { code: "B05", name: "Measles", syndrome: "Rash" },
  { code: "A39", name: "Meningitis", syndrome: "Neurological" },
  { code: "A20", name: "Plague", syndrome: "Febrile" },
  { code: "U04", name: "Monkeypox/Mpox", syndrome: "Rash" }
];

export const DISEASE_KEYWORDS: Record<string, string[]> = {
  "A00": ["cholera", "watery stool", "running stomach", "kuhara", "AWD", "acute watery", "heavy stool"],
  "A99": ["ebola", "marburg", "bleeding from eyes", "sudden deaths", "hemorrhagic", "EVD"],
  "A92": ["yellow fever", "yellow eyes", "jaundice", "homa ya manjano"],
  "A96": ["lassa", "rat fever", "bleeding gums"],
  "A39": ["meningitis", "stiff neck", "brain fever", "shingo kukaza"],
  "U04": ["mpox", "monkeypox", "strange rash", "pocks", "sores on skin"],
  "A80": ["polio", "limping children", "sudden paralysis", "AFP"]
};

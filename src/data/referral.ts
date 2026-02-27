import type { FAQ } from "@/types";

export interface CommissionTier {
  service: string;
  price: string;
  rate: string;
  amount: string;
  icon: string;
}

export const commissionTiers: CommissionTier[] = [
  {
    service: "Site Vitrine",
    price: "599€+",
    rate: "10%",
    amount: "60 — 150€",
    icon: "monitor",
  },
  {
    service: "E-Commerce",
    price: "1 590€+",
    rate: "7%",
    amount: "110 — 200€",
    icon: "cart",
  },
  {
    service: "Réseaux Sociaux",
    price: "199€/mois",
    rate: "1er mois",
    amount: "199€",
    icon: "share",
  },
  {
    service: "Template",
    price: "99€",
    rate: "15%",
    amount: "~15€",
    icon: "template",
  },
];

export const referralSteps = [
  {
    step: 1,
    title: "Recommandez",
    description:
      "Partagez votre lien personnalisé avec un pro qui a besoin d'un site web. Par SMS, WhatsApp, en personne — comme vous voulez.",
    icon: "share",
  },
  {
    step: 2,
    title: "Il signe",
    description:
      "Votre contact me contacte, on discute de son projet, et il accepte le devis. Vous êtes automatiquement identifié comme parrain.",
    icon: "handshake",
  },
  {
    step: 3,
    title: "Vous gagnez",
    description:
      "Dès que le client a payé, vous recevez votre commission par virement. Aussi simple que ça.",
    icon: "cash",
  },
];

export const referralFAQ: FAQ[] = [
  {
    question: "Qui peut devenir parrain ?",
    answer:
      "Tout le monde. Clients satisfaits, collègues, amis, comptables, prescripteurs... Aucune compétence technique requise. Si vous connaissez un artisan, un commerçant ou un pro qui a besoin d'un site web, vous pouvez toucher une commission.",
  },
  {
    question: "Quand est-ce que je touche ma commission ?",
    answer:
      "La commission est versée par virement dans les 30 jours suivant le paiement intégral du client parrainé. Pour les paiements en 3x, la commission est versée après réception de la dernière échéance.",
  },
  {
    question: "Comment mon filleul est-il rattaché à moi ?",
    answer:
      "Quand vous partagez votre lien personnalisé (avec votre code parrain), il est automatiquement enregistré. Votre filleul peut aussi mentionner votre nom dans le formulaire de contact ou de devis.",
  },
  {
    question: "Y a-t-il un plafond de commissions ?",
    answer:
      "Non, aucun plafond. Vous pouvez parrainer autant de personnes que vous le souhaitez. Plus vous recommandez, plus vous gagnez.",
  },
  {
    question: "Dois-je déclarer ces revenus ?",
    answer:
      "Si vous êtes un particulier, les commissions perçues sont des revenus à déclarer. En pratique, pour des montants ponctuels de 50 à 200€, les modalités sont simples. Si vous êtes professionnel, vous pouvez me facturer la commission.",
  },
  {
    question: "Que se passe-t-il si le client ne paie pas ?",
    answer:
      "Pas de paiement, pas de commission. La commission n'est due que sur les ventes effectivement encaissées. C'est un principe de sécurité pour les deux parties.",
  },
  {
    question: "Combien de temps mon lien de parrainage est-il valide ?",
    answer:
      "Votre code parrain est enregistré pendant 30 jours sur l'appareil du prospect. Si votre filleul revient sur le site dans ce délai et remplit un formulaire, vous serez identifié comme parrain.",
  },
];

export const shareTemplates = {
  whatsapp:
    "Salut ! Je te recommande Kevin DX pour la création de ton site web. Il fait des sites modernes et performants pour les pros, à partir de 599€. Regarde ici : {link}",
  sms: "Je te recommande Kevin DX pour ton site web pro. Sites modernes, performants, à partir de 599€ : {link}",
  email: {
    subject: "Un développeur web que je te recommande",
    body: "Salut,\n\nJe te recommande Kevin DX pour la création de ton site web. Il fait des sites modernes et très performants pour les artisans et commerçants, à partir de 599€.\n\nRegarde son site : {link}\n\nDis-lui que tu viens de ma part !",
  },
};

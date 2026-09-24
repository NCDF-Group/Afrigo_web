import type { Dictionary } from './en'

// Traduction française. CEDEAO = ECOWAS, SLE = ETLS (Schéma de libéralisation des échanges de la CEDEAO),
// ZLECAf = AfCFTA (Zone de libre-échange continentale africaine), UA = Union africaine.
export const fr: Dictionary = {
  meta: {
    siteTitle: 'Afrigo | Plateforme panafricaine de commerce et d’accès aux marchés',
    description: 'Afrigo aide les entreprises africaines à trouver des marchés, à se connecter avec des partenaires commerciaux et à gérer le commerce transfrontalier — de l’inscription au suivi d’un dossier commercial.',
    pages: {
      howItWorks: { title: 'Comment ça marche', description: 'Inscrivez-vous, publiez ou recherchez, faites une demande, ouvrez un dossier commercial et suivez son avancement — le parcours commercial Afrigo.' },
      opportunities: { title: 'Opportunités commerciales', description: 'Recherchez des produits, des demandes d’achat et des opportunités d’approvisionnement auprès d’entreprises africaines.' },
      marketAccess: { title: 'Accès aux marchés', description: 'Des orientations traçables sur le SLE et la ZLECAf : exigences, références officielles et tâches de préparation pour le commerce en Afrique.' },
      services: { title: 'Services et tarifs', description: 'Logistique, inspection et préparation aux échanges assurées par des partenaires vérifiés, à demander directement depuis votre dossier commercial.' },
      about: { title: 'À propos', description: 'Afrigo est une plateforme panafricaine de commerce et d’accès aux marchés développée par NCDF Group.' },
      contact: { title: 'Nous contacter', description: 'Échangez avec l’équipe Afrigo sur l’inscription de votre entreprise, l’accès aux marchés, les partenariats ou l’assistance.' },
      privacy: { title: 'Politique de confidentialité', description: 'Comment Afrigo collecte, utilise et protège les informations professionnelles et personnelles.' },
      terms: { title: 'Conditions d’utilisation', description: 'Les conditions d’utilisation de la plateforme de commerce et d’accès aux marchés Afrigo.' },
      signIn: { title: 'Connexion', description: 'Connectez-vous à Afrigo.' },
      register: { title: 'Inscrire votre entreprise', description: 'Créez votre compte Afrigo.' },
      forgotPassword: { title: 'Réinitialiser votre mot de passe', description: 'Réinitialisez votre mot de passe Afrigo.' }
    }
  },

  common: {
    skipToContent: 'Aller au contenu',
    backToTop: 'Retour en haut',
    registerYourBusiness: 'Inscrire votre entreprise',
    exploreOpportunities: 'Explorer les opportunités',
    signIn: 'Se connecter',
    contactUs: 'Nous contacter',
    language: 'Langue',
    english: 'English',
    french: 'Français'
  },

  nav: {
    main: 'Principale',
    mobile: 'Mobile',
    menu: 'Menu',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    items: { howItWorks: 'Fonctionnement', opportunities: 'Opportunités', marketAccess: 'Accès aux marchés', services: 'Services et tarifs', about: 'À propos' },
    contact: 'Nous contacter',
    signIn: 'Se connecter',
    register: 'S’inscrire',
    openDashboard: 'Tableau de bord'
  },

  footer: {
    blurb: 'Trouvez des opportunités. Préparez vos échanges. Pilotez leur exécution. Conçu pour les exportateurs, importateurs, fabricants, coopératives, agrégateurs et prestataires de services commerciaux.',
    groups: {
      platform: { title: 'Plateforme', links: { howItWorks: 'Comment ça marche', opportunities: 'Opportunités commerciales', marketAccess: 'Accès aux marchés', services: 'Services et tarifs' } },
      company: { title: 'Entreprise', links: { about: 'À propos d’Afrigo', ncdf: 'NCDF Group', contact: 'Nous contacter' } },
      getStarted: { title: 'Commencer', links: { register: 'Inscrire votre entreprise', signIn: 'Se connecter', privacy: 'Confidentialité', terms: 'Conditions' } }
    },
    rights: '© {year} NCDF Group. Afrigo — tous droits réservés.'
  },

  cta: {
    title: 'Prêt à conquérir de nouveaux marchés africains ?',
    text: 'Inscrivez votre entreprise en quelques minutes ou parlez de vos échanges avec notre équipe.'
  },

  home: {
    hero: {
      overline: 'Commerce et accès aux marchés à l’échelle africaine',
      lead: 'La façon la plus simple de',
      phrases: ['trouver de nouveaux marchés.', 'préparer vos échanges.', 'piloter l’exécution.', 'vous développer en Afrique.'],
      srTitle: 'La façon la plus simple de trouver de nouveaux marchés, de préparer vos échanges et de piloter leur exécution partout en Afrique.',
      text: 'Afrigo aide les entreprises africaines à trouver des marchés, à se connecter avec des partenaires commerciaux et à gérer le commerce transfrontalier — de la première demande au suivi d’un dossier commercial.',
      note: 'Lancement dans une sélection de marchés d’Afrique de l’Ouest, avec des orientations SLE et ZLECAf intégrées.'
    },
    builtFor: 'Conçu pour',
    audiences: ['Exportateurs', 'Importateurs', 'Fabricants', 'Coopératives', 'Agrégateurs', 'Prestataires de services commerciaux'],
    how: {
      overline: 'Comment ça marche',
      title: 'Un parcours commercial connecté',
      text: 'De votre première annonce jusqu’à la livraison, tout se passe sur une seule plateforme, chaque étape s’appuyant sur la précédente.',
      steps: [
        { title: 'S’inscrire', text: 'Créez le profil de votre entreprise, téléversez vos documents et invitez vos collègues.' },
        { title: 'Publier ou rechercher', text: 'Publiez des produits et des demandes d’achat, ou recherchez l’offre et la demande dans les marchés couverts.' },
        { title: 'Faire une demande', text: 'Contactez directement les entreprises, posez vos questions et échangez des devis.' },
        { title: 'Ouvrir un dossier commercial', text: 'Transférez une demande conclue dans un espace de travail unique pour les documents, les tâches et les partenaires.' },
        { title: 'Suivre l’avancement', text: 'Suivez les étapes de l’expédition et les exigences restantes jusqu’à la livraison.' }
      ],
      more: 'Découvrir le fonctionnement en détail'
    },
    opportunities: {
      overline: 'Opportunités commerciales',
      title: 'Recherchez l’offre et la demande partout en Afrique',
      types: [
        { title: 'Produits', text: 'Des marchandises proposées par des entreprises africaines vérifiées, avec caractéristiques, quantités, lieux et photos.', browse: 'Parcourir les produits' },
        { title: 'Demandes d’achat', text: 'Des besoins d’achat publiés par des entreprises à la recherche d’un approvisionnement fiable.', browse: 'Parcourir les demandes d’achat' },
        { title: 'Opportunités d’approvisionnement', text: 'Une offre groupée et saisonnière issue de coopératives, d’agrégateurs et de fabricants.', browse: 'Parcourir les opportunités d’approvisionnement' }
      ]
    },
    market: {
      overline: 'Accès aux marchés',
      title: 'Connaissez les exigences avant d’expédier',
      text: 'Lancement dans une sélection de marchés d’Afrique de l’Ouest, avec une conception pensée pour tout le continent. Découvrez où le SLE et la ZLECAf peuvent s’appliquer, puis consultez les exigences détaillées.',
      disclaimer: 'Orientations uniquement. Afrigo ne délivre aucun certificat officiel et ne garantit pas l’exonération des droits de douane — les décisions finales relèvent des autorités compétentes.'
    },
    workspace: {
      overline: 'Espace de travail commercial',
      title: 'Pilotez l’exécution au même endroit',
      text: 'Quand une demande se concrétise, ouvrez un dossier commercial. Votre équipe, votre partenaire commercial et tout partenaire de services désigné travaillent sur le même dossier.',
      items: ['Devis, documents et tâches dans un seul dossier commercial', 'Étapes de l’expédition et exigences restantes', 'Demandes de logistique, d’inspection et de préparation aux échanges', 'Accès réservé à vos collègues et aux partenaires de services désignés']
    },
    services: {
      overline: 'Services',
      title: 'L’appui de partenaires de confiance',
      text: 'Demandez de l’aide directement depuis un dossier commercial et suivez-la avec vos autres tâches.',
      cta: 'Voir les services et tarifs',
      items: [
        { title: 'Logistique', text: 'Demandez un appui pour le fret, le transport routier et le passage des frontières auprès de partenaires vérifiés.' },
        { title: 'Inspection', text: 'Organisez le contrôle de la qualité, des quantités et l’inspection avant expédition de vos marchandises.' },
        { title: 'Préparation aux échanges', text: 'Faites-vous accompagner pour préparer vos documents, vos preuves d’origine et les exigences des marchés.' }
      ]
    }
  },

  howItWorks: {
    hero: { overline: 'Comment ça marche', title: 'De l’inscription au suivi d’un dossier commercial', text: 'Afrigo réunit chaque étape du commerce transfrontalier dans un parcours connecté, pour que rien ne se perde entre la première demande et la livraison.' },
    journey: { overline: 'Le parcours', title: 'Cinq étapes, une plateforme' },
    steps: [
      { title: 'Inscrire votre entreprise', text: 'Créez un compte avec votre adresse professionnelle ou Google, puis configurez le profil de votre entreprise.', points: ['Informations sur l’entreprise, son secteur et ses marchés', 'Documents de l’entreprise pour la vérification', 'Invitez vos collègues et choisissez qui administre le compte'] },
      { title: 'Publier ou rechercher', text: 'Faites savoir au marché ce que vous vendez ou ce dont vous avez besoin — ou trouvez-le vous-même.', points: ['Publiez des produits avec caractéristiques, quantités, lieux et photos', 'Publiez des demandes d’achat avec vos besoins', 'Recherchez des produits, des demandes d’achat et des opportunités d’approvisionnement'] },
      { title: 'Faire une demande', text: 'Contactez directement les entreprises et réglez les détails.', points: ['Envoyez et répondez aux demandes depuis une seule boîte de réception', 'Demandez, envoyez et comparez des devis', 'Chaque message reste rattaché à sa demande'] },
      { title: 'Ouvrir un dossier commercial', text: 'Quand les deux parties sont d’accord, transformez la demande en dossier commercial — un espace de travail unique pour toute la transaction.', points: ['Devis accepté, documents et tâches au même endroit', 'Ajoutez vos collègues et les partenaires de services désignés', 'Demandez un appui logistique, d’inspection ou de préparation aux échanges'] },
      { title: 'Suivre l’avancement', text: 'Voyez précisément où en est la transaction et ce qui reste à faire.', points: ['Étapes de l’expédition, de l’enlèvement à la livraison', 'Exigences restantes et leurs responsables', 'Notifications et tableau de bord des dossiers en cours'] }
    ],
    both: {
      overline: 'Acheter, vendre ou les deux',
      title: 'Une entreprise, tous les côtés de l’échange',
      text: 'De nombreuses entreprises africaines achètent des intrants et vendent des produits finis. Sur Afrigo, un même compte peut publier des produits, publier des demandes d’achat et gérer des dossiers commerciaux des deux côtés.',
      selling: { title: 'Vendre', text: 'Publiez des produits et votre offre, répondez aux demandes d’achat et envoyez des devis.' },
      buying: { title: 'Acheter', text: 'Publiez vos besoins d’achat, comparez les devis et choisissez vos fournisseurs.' }
    },
    access: {
      overline: 'Accès',
      title: 'Le bon accès pour chaque utilisateur',
      text: 'Les dossiers privés nécessitent un accès explicite. Chaque personne ne voit que ce que son rôle et ses affectations autorisent.',
      roles: [
        { title: 'Administrateur de l’entreprise', text: 'Gère l’organisation, ses collègues et ses dossiers.' },
        { title: 'Membre de l’équipe', text: 'Travaille sur les demandes, documents et dossiers commerciaux pour lesquels il est autorisé.' },
        { title: 'Partenaire de services', text: 'Consulte et met à jour uniquement les demandes de services qui lui sont attribuées.' },
        { title: 'Administrateur Afrigo', text: 'Vérifie les entreprises et les contenus, gère les orientations et supervise les opérations.' }
      ]
    },
    faq: {
      overline: 'Questions',
      title: 'Questions fréquentes',
      items: [
        { q: 'Qui peut s’inscrire ?', a: 'Les exportateurs, importateurs, fabricants, coopératives, agrégateurs et prestataires de services commerciaux actifs dans les marchés couverts. Les entreprises sont vérifiées avant la mise en ligne de leurs annonces.' },
        { q: 'Mon entreprise peut-elle à la fois acheter et vendre ?', a: 'Oui. Une entreprise peut publier des produits et des demandes d’achat depuis le même compte — inutile de choisir un seul rôle.' },
        { q: 'Quels pays sont couverts ?', a: 'Afrigo démarre dans une sélection de marchés d’Afrique de l’Ouest et est conçu pour s’étendre au reste du continent. Consultez la page Accès aux marchés pour la liste actuelle.' },
        { q: 'Afrigo délivre-t-il des certificats d’origine ?', a: 'Non. Afrigo fournit des orientations traçables et vous aide à préparer vos preuves, mais les certificats officiels sont délivrés par les autorités compétentes et l’exonération des droits n’est jamais garantie.' },
        { q: 'Qui peut voir mes dossiers ?', a: 'Les dossiers privés ne sont visibles que par les personnes à qui vous donnez explicitement accès : vos collègues, votre partenaire commercial sur un dossier et les partenaires de services affectés à une demande.' },
        { q: 'Combien ça coûte ?', a: 'Consultez la page Services et tarifs pour les offres actuelles et la manière dont les services des partenaires sont chiffrés.' }
      ],
      still: 'Vous avez encore une question ?',
      contactLink: 'Contactez notre équipe'
    }
  },

  opportunities: {
    hero: { overline: 'Opportunités commerciales', title: 'Trouvez produits, acheteurs et fournisseurs partout en Afrique', text: 'Découvrez ce que les entreprises africaines proposent et recherchent. Inscrivez-vous pour publier vos propres annonces et contacter directement les entreprises.' },
    form: { search: 'Rechercher', searchPlaceholder: 'Produit, ex. cajou, sésame, karité', location: 'Pays ou lieu', locationPlaceholder: 'Pays ou ville', type: 'Type d’opportunité', submit: 'Rechercher' },
    typesNav: 'Types d’opportunités',
    types: { all: 'Toutes les opportunités', products: 'Produits', requests: 'Demandes d’achat', supply: 'Opportunités d’approvisionnement' },
    typeLabel: { products: 'Produit', requests: 'Demande d’achat', supply: 'Approvisionnement' },
    countOne: '{count} opportunité',
    countOther: '{count} opportunités',
    quantity: 'Quantité',
    destination: 'Destination',
    origin: 'Origine',
    grade: 'Qualité',
    signInToEnquire: 'Se connecter pour faire une demande',
    empty: {
      unavailableTitle: 'Les opportunités sont temporairement indisponibles',
      unavailableText: 'Nous n’avons pas pu charger les annonces. Veuillez réessayer dans quelques minutes.',
      noMatchTitle: 'Aucune opportunité ne correspond à votre recherche',
      noMatchText: 'Essayez un autre produit ou un autre pays, ou effacez vos filtres.',
      comingTitle: 'Les opportunités publiques arrivent bientôt',
      comingText: 'Les entreprises de nos marchés pilotes publient leurs premiers produits et demandes d’achat. Inscrivez-vous pour faire partie des premières annonces.',
      clear: 'Effacer les filtres',
      register: 'S’inscrire pour publier'
    },
    cta: { title: 'Vous avez quelque chose à vendre ou à acheter ?', text: 'Publiez des produits et des demandes d’achat pour que les bonnes entreprises vous trouvent.' }
  },

  marketAccess: {
    hero: { overline: 'Accès aux marchés', title: 'Sachez ce qu’il faut pour commercer au-delà des frontières', text: 'Des orientations claires et référencées sur le SLE et la ZLECAf — pour préparer les bonnes preuves avant que les marchandises ne circulent.', register: 'S’inscrire pour accéder aux orientations', ask: 'Poser une question' },
    how: {
      overline: 'Fonctionnement des orientations',
      title: 'Des orientations traçables jusqu’à la source',
      steps: [
        { title: 'Décrivez l’échange', text: 'Choisissez le produit, le pays d’origine et le pays de destination.' },
        { title: 'Obtenez des orientations traçables', text: 'Consultez les exigences SLE ou ZLECAf applicables, chacune avec sa référence officielle et la date de sa dernière révision.' },
        { title: 'Préparez et faites remonter', text: 'Téléversez vos preuves d’origine, suivez vos tâches de préparation et transmettez les questions en suspens à l’équipe Afrigo.' }
      ]
    },
    schemes: {
      overline: 'Régimes commerciaux',
      title: 'Des parcours distincts pour le SLE et la ZLECAf',
      text: 'Les deux régimes ont des conditions d’éligibilité, des preuves et des étapes d’approbation différentes : Afrigo les traite donc séparément.',
      officialSource: 'Source officielle : {label}',
      items: [
        {
          name: 'SLE',
          full: 'Schéma de libéralisation des échanges de la CEDEAO',
          text: 'Le dispositif de libre circulation en franchise de droits des marchandises éligibles entre les États membres de la CEDEAO.',
          points: ['Couvre les produits non transformés, le bétail et l’artisanat traditionnel', 'Les produits industriels exigent l’agrément du produit et du fabricant au titre du schéma', 'Les produits industriels éligibles circulent avec un certificat d’origine CEDEAO', 'L’agrément passe par les autorités nationales de chaque État membre'],
          sourceLabel: 'Portail SLE de la CEDEAO'
        },
        {
          name: 'ZLECAf',
          full: 'Zone de libre-échange continentale africaine',
          text: 'L’accord continental de commerce préférentiel entre les États parties qui commercent dans son cadre.',
          points: ['Les marchandises doivent respecter les règles d’origine de la ZLECAf — entièrement obtenues ou suffisamment transformées', 'Des règles propres à chaque produit définissent ce qu’est une transformation suffisante', 'Les préférences dépendent des listes tarifaires publiées par les deux pays', 'Les demandes s’appuient sur un certificat d’origine ZLECAf délivré par une autorité compétente'],
          sourceLabel: 'Secrétariat de la ZLECAf'
        }
      ]
    },
    markets: { overline: 'Marchés couverts', title: 'Un départ en Afrique de l’Ouest, une vision continentale', text: 'Le pilote couvre une sélection de marchés d’Afrique de l’Ouest. Pays, devises, produits et exigences commerciales sont configurables : de nouveaux marchés peuvent s’ajouter au gré de la demande.' },
    notDo: {
      title: 'Ce qu’Afrigo ne fait pas',
      items: ['Afrigo ne délivre ni certificat d’origine ni aucun autre certificat officiel.', 'Afrigo ne promet ni ne garantit jamais l’exonération des droits de douane.', 'L’éligibilité et les droits sont déterminés par les douanes et les autorités compétentes de chaque pays.'],
      note: 'Chaque orientation indique sa référence officielle et la date de sa dernière révision. Confirmez toujours les exigences auprès de l’autorité compétente avant d’expédier.'
    },
    askMarket: 'Poser une question sur votre marché',
    cta: { title: 'Préparez votre prochaine expédition en toute confiance', text: 'Inscrivez-vous pour vérifier les exigences, téléverser vos preuves d’origine et suivre vos tâches de préparation.' }
  },

  services: {
    hero: { overline: 'Services et tarifs', title: 'Un appui à chaque étape de l’échange', text: 'Demandez un appui logistique, d’inspection ou de préparation aux échanges auprès de partenaires vérifiés — directement depuis le dossier commercial sur lequel vous travaillez.', partner: 'Devenir partenaire de services' },
    what: {
      overline: 'Services',
      title: 'Ce que vous pouvez demander',
      items: [
        { title: 'Logistique', text: 'Faites circuler vos marchandises entre les pays avec des partenaires logistiques vérifiés.', includes: ['Devis de fret et de transport routier', 'Appui au passage des frontières', 'Étapes d’enlèvement et de livraison dans votre dossier commercial'] },
        { title: 'Inspection', text: 'Des contrôles indépendants qui rassurent les deux parties.', includes: ['Contrôle de la qualité et du calibre', 'Vérification des quantités et de l’emballage', 'Rapports d’inspection avant expédition joints au dossier'] },
        { title: 'Préparation aux échanges', text: 'Préparez votre entreprise et vos documents pour un nouveau marché.', includes: ['Appui à la préparation des documents', 'Preuves d’origine pour le SLE et la ZLECAf', 'Vérification des exigences du marché avant expédition'] }
      ]
    },
    flow: {
      overline: 'Comment ça marche',
      title: 'Demander un service',
      text: 'Les partenaires ne voient que les dossiers commerciaux et les demandes qui leur sont attribués.',
      steps: [
        { title: 'Demander', text: 'Demandez un service depuis un dossier commercial.' },
        { title: 'Devis', text: 'Un partenaire désigné examine le dossier et envoie un devis.' },
        { title: 'Accepter', text: 'Rien ne commence avant que vous acceptiez le devis.' },
        { title: 'Suivre', text: 'Suivez l’avancement et les rapports avec vos autres tâches.' }
      ]
    },
    pricing: {
      overline: 'Tarifs',
      title: 'Des façons simples de démarrer',
      text: 'Les offres approuvées pour la première version sont communiquées aux participants du pilote. Les services des partenaires font toujours l’objet d’un devis avant tout engagement.',
      nowOpen: 'Ouvert',
      plans: [
        { title: 'Accès pilote', text: 'Pour les entreprises de nos marchés pilotes qui rejoignent la première version.', points: ['Profil d’entreprise et accès pour l’équipe', 'Publication de produits et de demandes d’achat', 'Demandes, devis et dossiers commerciaux', 'Orientations SLE et ZLECAf'], cta: 'Inscrire votre entreprise' },
        { title: 'Services des partenaires', text: 'Appui logistique, d’inspection et de préparation, facturé pour chaque demande.', points: ['Devis établi par le partenaire désigné pour chaque demande', 'Vous acceptez avant le début de tout travail', 'Rapports et étapes dans le dossier commercial'], cta: 'Voir le fonctionnement des services' },
        { title: 'Associations et groupements', text: 'Pour les coopératives, associations et organisations professionnelles qui intègrent de nombreux membres.', points: ['Accompagnement à l’intégration des entreprises membres', 'Orientations adaptées à votre secteur', 'Un interlocuteur dédié chez Afrigo'], cta: 'Nous contacter' }
      ]
    },
    partners: { overline: 'Partenaires de services', title: 'Proposez vos services sur Afrigo', text: 'Les entreprises de logistique, les organismes d’inspection et les conseillers en commerce peuvent devenir partenaires de services et recevoir des demandes issues des dossiers commerciaux en cours.', apply: 'Postuler comme partenaire' }
  },

  about: {
    hero: { overline: 'À propos d’Afrigo', title: 'Simplifier la préparation et l’exécution des échanges', text: 'Afrigo est une plateforme panafricaine de commerce et d’accès aux marchés qui aide les entreprises à trouver des marchés, à se connecter avec des partenaires commerciaux et à gérer le commerce transfrontalier.' },
    what: {
      overline: 'Notre mission',
      title: 'Une plateforme pour tout le parcours commercial',
      text: 'En Afrique, le commerce transfrontalier repose souvent sur des contacts dispersés, des exigences floues et des documents éparpillés entre messageries et boîtes mail. Afrigo rassemble tout.',
      pillars: [
        { title: 'Trouver des opportunités', text: 'Aider les entreprises à découvrir des marchés, des acheteurs et des fournisseurs qu’elles n’atteindraient pas autrement.' },
        { title: 'Préparer les échanges', text: 'Clarifier les exigences, les documents et les preuves avant que les marchandises ne circulent.' },
        { title: 'Piloter l’exécution', text: 'Réunir devis, tâches, partenaires et expéditions dans un dossier commercial partagé.' }
      ]
    },
    principles: {
      overline: 'Principes',
      title: 'Notre façon de construire',
      items: [
        { title: 'Des orientations traçables', text: 'Chaque exigence indique sa référence officielle et la date de sa dernière révision. Nous ne promettons jamais ce que seules les autorités peuvent accorder.' },
        { title: 'Confidentiel par défaut', text: 'Les dossiers ne sont visibles que par les personnes et partenaires explicitement autorisés.' },
        { title: 'Pensé pour les faibles débits', text: 'Des pages conçues d’abord pour le mobile, qui se chargent vite avec les connexions réelles de nos utilisateurs.' },
        { title: 'Panafricain par conception', text: 'Pays, devises, produits et exigences sont configurables : la plateforme s’étend marché par marché.' }
      ]
    },
    ncdf: {
      title: 'Développé par NCDF Group',
      text: 'Afrigo est développé et exploité par NCDF Group. La plateforme démarre dans une sélection de marchés d’Afrique de l’Ouest et est conçue pour s’étendre au reste de l’Afrique à mesure que s’ajoutent partenaires pilotes, marchés et intégrations.',
      partner: 'Devenir partenaire',
      roadmap: [
        { title: 'Valider et concevoir', text: 'Définir les marchés pilotes, les parcours utilisateurs et les maquettes d’écrans.' },
        { title: 'Développer', text: 'Livrer le site web, les profils d’entreprise, les annonces, les demandes, l’espace de travail commercial et l’administration.' },
        { title: 'Piloter', text: 'Tester de vraies demandes et des transactions encadrées, puis résoudre les problèmes d’usage et d’exploitation.' },
        { title: 'Lancer et étendre', text: 'Ouvrir la couverture approuvée, puis ajouter marchés et intégrations au gré de la demande.' }
      ]
    },
    cta: { title: 'Rejoignez les premières entreprises sur Afrigo', text: 'Inscrivez-vous au pilote ou parlez-nous de l’intégration de vos membres ou de vos services sur la plateforme.' }
  },

  contact: {
    hero: { overline: 'Nous contacter', title: 'Échangez avec l’équipe Afrigo', text: 'Parlez-nous de votre entreprise et de ce que vous commercialisez. Nous vous orienterons vers la bonne étape.' },
    help: {
      title: 'Comment pouvons-nous vous aider ?',
      reasons: [
        { title: 'Inscrire votre entreprise', text: 'Questions sur l’adhésion au pilote, la vérification ou l’accès de votre équipe.' },
        { title: 'Accès aux marchés', text: 'Vous ne savez pas comment le SLE ou la ZLECAf s’applique à votre produit et à votre itinéraire.' },
        { title: 'Partenaires de services', text: 'Prestataires de logistique, d’inspection et de préparation aux échanges souhaitant nous rejoindre.' },
        { title: 'Partenariats', text: 'Associations, coopératives et organisations qui soutiennent le commerce africain.' }
      ]
    },
    registered: { title: 'Déjà inscrit ?', text: 'Connectez-vous pour gérer vos demandes et vos dossiers commerciaux.', signIn: 'Se connecter' }
  },

  contactForm: {
    name: 'Nom complet',
    email: 'Adresse e-mail professionnelle',
    company: 'Entreprise',
    country: 'Pays',
    optional: 'Facultatif',
    topic: 'Comment pouvons-nous vous aider ?',
    message: 'Message',
    messagePlaceholder: 'Parlez-nous de votre entreprise et de ce que vous commercialisez.',
    send: 'Envoyer le message',
    sending: 'Envoi…',
    sentTitle: 'Message reçu',
    sentText: 'Merci de nous avoir contactés. Un membre de l’équipe Afrigo vous répondra par e-mail.',
    sendAnother: 'Envoyer un autre message',
    topics: { general: 'Demande générale', register: 'Inscrire mon entreprise', 'market-access': 'Question sur l’accès aux marchés', partner: 'Devenir partenaire de services', partnership: 'Partenariat ou association', support: 'Aide avec mon compte' },
    errors: {
      invalid: 'Indiquez votre nom, une adresse e-mail valide et un message d’au moins 10 caractères.',
      tooMany: 'Trop de messages envoyés. Veuillez réessayer dans quelques minutes.',
      failed: 'Nous n’avons pas pu envoyer votre message. Veuillez réessayer.'
    }
  },

  legal: {
    label: 'Mentions légales',
    lastUpdated: 'Dernière mise à jour : {date}',
    onThisPage: 'Sur cette page',
    draftNotice: 'Ce document est en cours de finalisation avec nos conseillers juridiques avant le lancement public et peut évoluer.',
    questions: 'Des questions ? Contactez-nous',
    privacy: {
      title: 'Politique de confidentialité',
      intro: 'Comment Afrigo, exploité par NCDF Group, collecte, utilise et protège les informations relatives aux entreprises et aux personnes qui y travaillent.',
      updated: '24 septembre 2026',
      sections: [
        { id: 'information', title: 'Informations que nous collectons', paragraphs: ['Les informations de compte, comme votre nom, votre adresse e-mail professionnelle et votre mode de connexion ; les informations sur votre entreprise et les documents de vérification que vous téléversez ; les annonces, demandes, devis, documents et messages des dossiers commerciaux ; ainsi que les demandes de services.', 'Nous enregistrons aussi des informations de sécurité et d’activité — comme les connexions et les modifications de dossiers — pour protéger les comptes et conserver une piste d’audit.'] },
        { id: 'use', title: 'Utilisation des informations', paragraphs: ['Pour faire fonctionner la plateforme : vérifier les entreprises, afficher les annonces, transmettre les demandes, gérer les dossiers commerciaux, fournir des orientations sur l’accès aux marchés, mettre en relation les partenaires de services désignés, prévenir la fraude, respecter nos obligations légales et accompagner les utilisateurs.'] },
        { id: 'access', title: 'Qui peut voir vos informations', paragraphs: ['Les dossiers privés ne sont visibles que par les personnes disposant d’un accès explicite : les collègues de votre entreprise, votre partenaire commercial sur un dossier et les partenaires de services affectés à une demande précise. Les administrateurs d’Afrigo peuvent consulter les dossiers pour vérifier les contenus, apporter une assistance et assurer la sécurité de la plateforme.', 'Les annonces que vous choisissez de rendre publiques n’affichent que les informations sur les produits — pas vos coordonnées.'] },
        { id: 'security', title: 'Documents et sécurité', paragraphs: ['Les documents sont conservés dans un stockage privé et ne sont accessibles qu’aux utilisateurs autorisés. L’accès est protégé par une connexion sécurisée, des autorisations fondées sur les rôles et des journaux d’activité.'] },
        { id: 'retention', title: 'Conservation', paragraphs: ['Nous conservons les dossiers commerciaux et les journaux d’activité aussi longtemps que nécessaire pour les audits, le règlement des litiges, la conformité légale et l’intégrité de la plateforme, et supprimons ou anonymisons les informations qui ne sont plus nécessaires.'] }
      ],
      rights: { title: 'Vos choix et vos droits', before: 'Vous pouvez demander à accéder à vos informations, à les corriger ou à les supprimer, le cas échéant.', link: 'Contactez-nous', after: 'et nous vous répondrons conformément aux lois sur la protection des données qui vous sont applicables.' }
    },
    terms: {
      title: 'Conditions d’utilisation',
      intro: 'Les conditions applicables lorsque des entreprises, leurs équipes et des partenaires de services utilisent Afrigo, exploité par NCDF Group.',
      updated: '24 septembre 2026',
      sections: [
        { id: 'platform', title: 'La plateforme', paragraphs: ['Afrigo aide des entreprises indépendantes à trouver des opportunités commerciales, à communiquer et à gérer des dossiers commerciaux avec leurs partenaires. Afrigo n’est pas partie aux échanges conclus entre utilisateurs, sauf mention écrite contraire.'] },
        { id: 'accounts', title: 'Comptes et exactitude des informations', paragraphs: ['Vous devez fournir des informations exactes sur votre entreprise, votre identité et vos annonces, et les tenir à jour. Les administrateurs d’entreprise sont responsables des collègues qu’ils invitent et des accès qu’ils accordent.'] },
        { id: 'guidance', title: 'Orientations sur l’accès aux marchés', paragraphs: ['Les orientations SLE et ZLECAf sont fournies uniquement à des fins de préparation. Afrigo ne délivre aucun certificat officiel et ne promet ni ne garantit l’exonération des droits de douane. L’éligibilité, les droits et les agréments relèvent des douanes et des autorités compétentes.'] },
        { id: 'services', title: 'Partenaires de services', paragraphs: ['Les services de logistique, d’inspection et de préparation aux échanges sont fournis par des partenaires indépendants selon les conditions du devis que vous acceptez. Les partenaires n’ont accès qu’aux dossiers commerciaux et aux demandes qui leur sont attribués.'] },
        { id: 'conduct', title: 'Utilisation acceptable', paragraphs: ['Vous ne pouvez pas présenter de manière trompeuse des marchandises ou des entreprises, tenter d’accéder à des dossiers pour lesquels vous n’êtes pas autorisé, manipuler des dossiers, téléverser des contenus illicites ni utiliser les communications d’Afrigo en dehors d’une relation commerciale légitime. Nous pouvons suspendre des comptes ou retirer des contenus qui enfreignent ces conditions.'] },
        { id: 'liability', title: 'Disponibilité et responsabilité', paragraphs: ['Les exigences douanières, la performance des transporteurs, la fiscalité et la réglementation peuvent influer sur tout échange. Vous restez responsable de vos propres décisions commerciales, juridiques et réglementaires.'] }
      ]
    }
  },

  map: {
    scheme: 'Régime commercial',
    tabs: { etls: 'SLE · CEDEAO', afcfta: 'ZLECAf' },
    stats: { etls: 'États membres de la CEDEAO', afcfta: 'Signataires de la ZLECAf', coverage: 'Couverture', westAfrica: 'Afrique de l’Ouest', ofAu: 'Des membres de l’UA' },
    badges: { ecowas: 'CEDEAO · SLE', signatory: 'Signataire de la ZLECAf', tooltipEcowas: 'CEDEAO' },
    describe: {
      ecowas: 'Membre de la CEDEAO. Les échanges avec les autres États membres peuvent relever du SLE lorsque les marchandises et les producteurs respectent les règles du schéma, et les préférences de la ZLECAf peuvent s’appliquer au commerce africain plus large.',
      signatory: 'Hors CEDEAO : le SLE ne s’applique pas. Les préférences de la ZLECAf peuvent s’appliquer lorsque les deux pays commercent dans le cadre de l’accord et que les marchandises respectent ses règles d’origine.',
      other: 'Non signataire de la ZLECAf et hors CEDEAO. Les exigences douanières habituelles s’appliquent — confirmez-les auprès des autorités compétentes.'
    },
    check: 'Vérifier les exigences',
    empty: 'Sélectionnez un pays sur la carte ou dans la liste pour voir les régimes commerciaux susceptibles de s’appliquer.',
    aria: { etls: 'Carte de l’Afrique mettant en évidence les {count} États membres de la CEDEAO où le SLE s’applique.', afcfta: 'Carte de l’Afrique mettant en évidence les {count} signataires de la ZLECAf.' },
    legend: { etls: 'Membre de la CEDEAO', afcfta: 'Signataire de la ZLECAf', selected: 'Sélectionné', corridor: 'Corridor commercial' },
    regions: { north: 'Afrique du Nord', west: 'Afrique de l’Ouest', central: 'Afrique centrale', east: 'Afrique de l’Est', south: 'Afrique australe' },
    picker: {
      label: 'Explorer un pays',
      placeholder: 'Rechercher parmi {count} pays…',
      clear: 'Effacer le pays',
      list: 'Pays',
      groups: { etlsMember: 'Membres de la CEDEAO', etlsOther: 'Autres pays africains', afcftaMember: 'Signataires de la ZLECAf', afcftaOther: 'Non signataire' },
      noMatch: 'Aucun pays ne correspond à « {query} ».',
      popular: 'Populaires :'
    }
  },

  countries: {
    '012': 'Algérie', '024': 'Angola', '204': 'Bénin', '072': 'Botswana', '854': 'Burkina Faso', '108': 'Burundi',
    '132': 'Cap-Vert', '120': 'Cameroun', '140': 'République centrafricaine', '148': 'Tchad', '174': 'Comores',
    '178': 'République du Congo', '180': 'RD Congo', '384': 'Côte d’Ivoire', '262': 'Djibouti', '818': 'Égypte',
    '226': 'Guinée équatoriale', '232': 'Érythrée', '748': 'Eswatini', '231': 'Éthiopie', '266': 'Gabon', '270': 'Gambie',
    '288': 'Ghana', '324': 'Guinée', '624': 'Guinée-Bissau', '404': 'Kenya', '426': 'Lesotho', '430': 'Liberia',
    '434': 'Libye', '450': 'Madagascar', '454': 'Malawi', '466': 'Mali', '478': 'Mauritanie', '480': 'Maurice',
    '504': 'Maroc', '508': 'Mozambique', '516': 'Namibie', '562': 'Niger', '566': 'Nigeria', '646': 'Rwanda',
    '678': 'Sao Tomé-et-Principe', '686': 'Sénégal', '690': 'Seychelles', '694': 'Sierra Leone', '706': 'Somalie',
    '710': 'Afrique du Sud', '728': 'Soudan du Sud', '729': 'Soudan', '834': 'Tanzanie', '768': 'Togo', '788': 'Tunisie',
    '800': 'Ouganda', '894': 'Zambie', '716': 'Zimbabwe', '732': 'Sahara occidental'
  },

  auth: {
    shell: { privacy: 'Confidentialité', terms: 'Conditions', help: 'Aide' },
    or: 'ou',
    show: 'Afficher',
    hide: 'Masquer',
    emailPlaceholder: 'vous@entreprise.com',
    google: { continue: 'Continuer avec Google', signUp: 'S’inscrire avec Google', connecting: 'Connexion à Google…' },
    signIn: {
      caption: 'Commercez à travers l’Afrique, chaque étape au même endroit.',
      captionDetail: 'Demandes, devis, documents et étapes d’expédition — suivis dans un seul espace de travail commercial.',
      title: 'Bon retour parmi nous',
      subtitle: 'Connectez-vous pour gérer vos demandes, vos dossiers commerciaux et le profil de votre entreprise.',
      email: 'Adresse e-mail professionnelle',
      password: 'Mot de passe',
      forgot: 'Mot de passe oublié ?',
      submit: 'Se connecter',
      submitting: 'Connexion…',
      newHere: 'Nouveau sur Afrigo ?',
      register: 'Inscrire votre entreprise',
      failed: 'Connexion impossible. Vérifiez votre adresse e-mail et votre mot de passe.'
    },
    register: {
      caption: 'Présentez votre entreprise à de nouveaux marchés africains.',
      captionDetail: 'Publiez des produits et des demandes d’achat, recevez des demandes et préparez-vous au commerce transfrontalier.',
      title: 'Inscrire votre entreprise',
      subtitle: 'Créez d’abord votre compte — vous ajouterez les informations de votre entreprise à l’étape suivante.',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Adresse e-mail professionnelle',
      password: 'Mot de passe',
      passwordHint: 'Au moins 8 caractères.',
      agreeBefore: 'J’accepte les',
      terms: 'Conditions',
      and: 'et la',
      privacy: 'Politique de confidentialité',
      submit: 'Créer mon compte',
      submitting: 'Création du compte…',
      already: 'Déjà inscrit ?',
      signIn: 'Se connecter',
      passwordShort: 'Utilisez un mot de passe d’au moins 8 caractères.',
      mustAgree: 'Acceptez les conditions et la politique de confidentialité pour continuer.',
      failed: 'Impossible de créer votre compte. Veuillez réessayer.'
    },
    forgot: {
      caption: 'Vos dossiers commerciaux restent protégés.',
      captionDetail: 'Les liens de récupération sont limités dans le temps et envoyés uniquement à l’adresse e-mail du compte.',
      title: 'Réinitialiser votre mot de passe',
      subtitle: 'Saisissez l’adresse e-mail utilisée lors de votre inscription et nous vous enverrons un lien de réinitialisation sécurisé.',
      email: 'Adresse e-mail professionnelle',
      submit: 'Envoyer le lien',
      submitting: 'Envoi du lien…',
      remembered: 'Vous vous en souvenez ?',
      signIn: 'Se connecter',
      sentTitle: 'Consultez votre boîte mail',
      sentBefore: 'Si un compte existe pour',
      sentAfter: ', vous recevrez un lien pour réinitialiser votre mot de passe. Cela peut prendre quelques minutes — pensez à vérifier vos courriers indésirables.',
      back: 'Retour à la connexion',
      different: 'Utiliser une autre adresse e-mail',
      notConfigured: 'La connexion n’est pas disponible pour le moment. Veuillez réessayer plus tard.'
    }
  },

  errors: {
    generic: 'Une erreur s’est produite. Veuillez réessayer.',
    auth: {
      'auth/invalid-credential': 'Cette adresse e-mail et ce mot de passe ne correspondent pas.',
      'auth/wrong-password': 'Cette adresse e-mail et ce mot de passe ne correspondent pas.',
      'auth/user-not-found': 'Cette adresse e-mail et ce mot de passe ne correspondent pas.',
      'auth/invalid-email': 'Saisissez une adresse e-mail valide.',
      'auth/email-already-in-use': 'Un compte existe déjà pour cette adresse e-mail. Connectez-vous plutôt.',
      'auth/weak-password': 'Choisissez un mot de passe plus robuste d’au moins 8 caractères.',
      'auth/too-many-requests': 'Trop de tentatives. Patientez quelques minutes, puis réessayez.',
      'auth/network-request-failed': 'Problème de réseau. Vérifiez votre connexion et réessayez.',
      'auth/account-exists-with-different-credential': 'Cette adresse e-mail est associée à un mot de passe. Connectez-vous avec votre e-mail et votre mot de passe.',
      'auth/unauthorized-domain': 'La connexion Google n’est pas encore activée pour ce domaine.',
      'auth/user-disabled': 'Ce compte a été désactivé. Contactez l’assistance.'
    }
  }
}

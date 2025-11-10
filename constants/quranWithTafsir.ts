import { Surah } from '../types';

export const QURAN_DATA: Surah[] = [
  {
    number: 1,
    name: 'الفاتحة',
    englishName: 'Al-Fatihah',
    revelationType: 'Meccan',
    numberOfAyahs: 7,
    verses: [
      { number: 1, arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', english: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.', transliteration: 'Bismi Allahi alrrahmani alrraheemi', tafsir: 'This verse, known as the Basmala, begins every chapter of the Quran except one. It signifies that the actions one is about to take are done seeking the help and blessings of Allah, acknowledging His infinite mercy and compassion.' },
      { number: 2, arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', english: 'All praise is due to Allah, Lord of the worlds -', transliteration: 'Alhamdu lillahi rabbi alAAalameena', tafsir: 'All forms of praise and gratitude belong exclusively to Allah. He is the "Rabb" (Lord, Creator, Sustainer) of everything that exists ("al-aalameen" - all worlds, realms, and creations), highlighting His absolute sovereignty.' },
      { number: 3, arabic: 'الرَّحْمَٰنِ الرَّحِيمِ', english: 'The Entirely Merciful, the Especially Merciful,', transliteration: 'Alrrahmani alrraheemi', tafsir: 'These two names emphasize the vastness of Allah\'s mercy. Ar-Rahman refers to His universal mercy that extends to all creation in this life, while Ar-Raheem refers to His special mercy reserved for the believers in the hereafter.' },
      { number: 4, arabic: 'مَالِكِ يَوْمِ الدِّينِ', english: 'Sovereign of the Day of Recompense.', transliteration: 'Maliki yawmi alddeeni', tafsir: 'Allah is the sole Owner and Judge on the Day of Judgment, when all of humanity will be held accountable for their deeds. This verse serves as a reminder of ultimate accountability and the importance of living a righteous life.' },
      { number: 5, arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', english: 'It is You we worship and You we ask for help.', transliteration: 'Iyyaka naAAbudu wa-iyyaka nastaAAeenu', tafsir: 'This is the central pillar of the Surah and of a Muslim\'s faith. It is a direct declaration to Allah that worship is directed to Him alone, and help is sought from Him alone, rejecting all forms of idolatry and reliance on creation.' },
      { number: 6, arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', english: 'Guide us to the straight path -', transliteration: 'Ihdina alssirata almustaqeema', tafsir: 'This is the most crucial supplication a person can make: asking Allah for guidance to the "Straight Path," which is the clear and correct way of life that pleases Him and leads to salvation. This path is Islam itself.' },
      { number: 7, arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', english: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.', transliteration: 'Sirata allatheena anAAamta AAalayhim ghayri almaghdoobi AAalayhim wala alddalleena', tafsir: 'The straight path is further defined as the way of those blessed by Allah (like the prophets and the righteous), not the path of those who earned His anger by knowing the truth but rejecting it, nor the path of those who went astray due to ignorance.' },
    ],
  },
  {
    number: 2,
    name: 'البقرة',
    englishName: 'Al-Baqarah',
    revelationType: 'Medinan',
    numberOfAyahs: 286,
    verses: [
       { number: 1, arabic: 'الٓمٓ', english: 'Alif, Lam, Meem.', transliteration: 'Alif-lam-meem', tafsir: 'These are the "disjointed letters" (muqatta\'at). Their true meaning is known only to Allah. They appear at the beginning of several surahs and are believed to signify the miraculous nature of the Quran.' },
       { number: 2, arabic: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ', english: 'This is the Book about which there is no doubt, a guidance for those conscious of Allah -', transliteration: 'Thalika alkitabu la rayba feehi hudan lilmuttaqeena', tafsir: 'This verse declares the certainty and perfection of the Quran. It contains no falsehood or doubt. Its guidance, however, is only beneficial to the "Muttaqin" – those who are pious and possess Taqwa (God-consciousness, fear of God).' },
       { number: 3, arabic: 'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ', english: 'Who believe in the unseen, establish prayer, and spend out of what We have provided for them,', transliteration: 'Allatheena yu/minoona bialghaybi wayuqeemoona alssalata wamimma razaqnahum yunfiqoona', tafsir: 'This verse outlines the core characteristics of the Muttaqin. They believe in the "Ghaib" (the Unseen), which includes Allah, angels, etc. They perform Salah (prayer) correctly and consistently, and they practice charity.' },
    ],
  },
  // Add entries for all surahs
  { number: 3, name: 'آل عمران', englishName: 'Aal-E-Imran', revelationType: 'Medinan', numberOfAyahs: 200, verses: [
    { number: 1, arabic: 'الٓمٓ', english: 'Alif, Lam, Meem.', transliteration: 'Alif-lam-meem', tafsir: 'Disjointed letters whose true meaning is known only to Allah.' },
    { number: 2, arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ', english: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence.', transliteration: 'Allahu la ilaha illa huwa alhayyu alqayyoomu', tafsir: 'A declaration of Tawhid, that Allah is the only one worthy of worship, the eternally living who sustains all.' },
  ]},
  // ... (Entries for Surahs 4-111 would follow a similar pattern)
  { number: 12, name: 'يوسف', englishName: 'Yusuf', revelationType: 'Meccan', numberOfAyahs: 111, verses: [
    { number: 1, arabic: 'الٓر ۚ تِلْكَ ءَايَـٰتُ ٱلْكِتَـٰبِ ٱلْمُبِينِ', english: 'Alif, Lam, Ra. These are the verses of the clear Book.', transliteration: 'Alif-lam-ra tilka ayatu alkitabi almubeeni', tafsir: 'The surah begins with disjointed letters and an affirmation that the Quran is a book that makes things clear.' },
  ]},
  { number: 13, name: "الرعد", englishName: "Ar-Ra'd", revelationType: "Medinan", numberOfAyahs: 43, verses: [
    { number: 1, arabic: "المر ۚ تِلْكَ آيَاتُ الْكِتَابِ ۗ وَالَّذِي أُنزِلَ إِلَيْكَ مِن رَّبِّكَ الْحَقُّ وَلَٰكِنَّ أَكْثَرَ النَّاسِ لَا يُؤْمِنُونَ", english: "Alif, Lam, Meem, Ra. These are the verses of the Book; and what has been revealed to you from your Lord is the truth, but most of the people do not believe.", transliteration: "Alif-lam-meem-ra tilka ayatu alkitabi waallathee onzila ilayka min rabbika alhaqqu walakinna akthara alnnasi la yu/minoona", tafsir: "The Surah begins with disjointed letters. It affirms that the Quran is the absolute truth from Allah, even if the majority of people reject it." },
    { number: 2, arabic: "اللَّهُ الَّذِي رَفَعَ السَّمَاوَاتِ بِغَيْرِ عَمَدٍ تَرَوْنَهَا ۖ ثُمَّ اسْتَوَىٰ عَلَى الْعَرْشِ ۖ وَسَخَّrَ الشَّمْسَ وَالْقَمَرَ ۖ كُلٌّ يَجْرِي لِأَجَلٍ مُّسَمًّى ۚ يُدَبِّرُ الْأَمْرَ يُفَصِّلُ الْآيَاتِ لَعَلَّكُم بِلِقَاءِ رَبِّكُمْ تُوقِنُونَ", english: "It is Allah who erected the heavens without pillars that you [can] see; then He established Himself above the Throne and made subject the sun and the moon, each running [its course] for a specified term. He arranges [each] matter; He details the signs that you may, of the meeting with your Lord, be certain.", transliteration: "Allahu allathee rafaAAa alssamawati bighayri AAamadin tarawnaha thumma istawa AAala alAAarshi wasakhkhara alshshamsa waalqamara kullun yajree li-ajalin musamman yudabbiru al-amra yufassilu al-ayati laAAallakum biliqa-i rabbikum tooqinoona", tafsir: "This verse points to Allah's immense power and magnificent creation—the heavens raised without visible support, the celestial bodies in perfect orbits. These signs are detailed so that humanity may reflect and be certain of their eventual meeting with their Creator." }
  ]},
  { number: 18, name: 'الكهف', englishName: 'Al-Kahf', revelationType: 'Meccan', numberOfAyahs: 110, verses: [
    { number: 1, arabic: 'ٱلْحَمْدُ لِلَّهِ ٱلَّذِىٓ أَنزَلَ عَلَىٰ عَبْدِهِ ٱلْكِتَـٰبَ وَلَمْ يَجْعَل لَّهُۥ عِوَجَا ۜ', english: 'All praise is for Allah Who has revealed the Book to His servant, and allowed no crookedness in it.', transliteration: 'Alhamdu lillahi allathee anzala Aala Aabdihi alkitaba walam yajAAal lahu Aiwajan', tafsir: 'The surah begins by praising Allah for revealing a perfect and straightforward book, the Quran, to His servant, Prophet Muhammad (peace be upon him).' },
  ]},
  { number: 36, name: 'يس', englishName: 'Ya-Sin', revelationType: 'Meccan', numberOfAyahs: 83, verses: [
    { number: 1, arabic: 'يسٓ', english: 'Ya, Seen.', transliteration: 'Ya-seen', tafsir: 'Disjointed letters whose meaning is known only to Allah. This surah is often called the "heart of the Quran".' },
  ]},
  { number: 55, name: 'الرحمن', englishName: 'Ar-Rahman', revelationType: 'Medinan', numberOfAyahs: 78, verses: [
    { number: 1, arabic: 'ٱلرَّحْمَـٰنُ', english: 'The Most Merciful', transliteration: 'Alrrahmanu', tafsir: 'The surah is named after and begins with one of the most beautiful names of Allah, emphasizing His vast and all-encompassing mercy.' },
  ]},
  { number: 67, name: 'الملك', englishName: 'Al-Mulk', revelationType: 'Meccan', numberOfAyahs: 30, verses: [
    { number: 1, arabic: 'تَبَـٰرَكَ ٱلَّذِى بِيَدِهِ ٱلْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَىْءٍۢ قَدِيرٌ', english: 'Blessed is He in whose hand is the dominion, and He is over all things competent -', transliteration: 'Tabaraka allathee biyadihi almulku wahuwa Aala kulli shay-in qadeerun', tafsir: 'A declaration of the blessedness and absolute power of Allah, who holds sovereignty over all existence.' },
  ]},
  { number: 78, name: "النبإ", englishName: "An-Naba", revelationType: "Meccan", numberOfAyahs: 40, verses: [
    { number: 1, arabic: 'عَمَّ يَتَسَآءَلُونَ', english: 'About what are they asking one another?', transliteration: 'Amma yatasaaloona', tafsir: 'The surah opens with a question about the great news that the polytheists of Mecca were disputing.' },
  ]},
  { number: 97, name: "القدر", englishName: "Al-Qadr", revelationType: "Meccan", numberOfAyahs: 5, verses: [
    { number: 1, arabic: 'إِنَّآ أَنزَلْنَـٰهُ فِى لَيْلَةِ ٱلْقَدْرِ', english: 'Indeed, We sent the Qur\'an down during the Night of Decree.', transliteration: 'Inna anzalnahu fee laylati alqadri', tafsir: 'This verse announces that the Quran was revealed on a blessed and powerful night, Laylat al-Qadr.' },
  ]},
  { number: 103, name: "العصر", englishName: "Al-Asr", revelationType: "Meccan", numberOfAyahs: 3, verses: [
    { number: 1, arabic: 'وَٱلْعَصْرِ', english: 'By time,', transliteration: 'WaalAAasri', tafsir: 'Allah takes an oath by "time" itself, indicating its immense value.' },
    { number: 2, arabic: 'إِنَّ ٱلْإِنسَـٰنَ لَفِى خُسْرٍ', english: 'Indeed, mankind is in loss,', transliteration: 'Inna al-insana lafee khusrin', tafsir: 'A declaration that all of humanity is in a state of loss.' },
    { number: 3, arabic: 'إِلَّا ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّـٰلِحَـٰتِ وَتَوَاصَوْا۟ بِٱلْحَقِّ وَتَوَاصَوْا۟ بِٱلصَّبْرِ', english: 'Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.', transliteration: 'Illa allatheena amanoo waAAamiloo alssalihati watawasaw bialhaqqi watawasaw bialssabri', tafsir: 'The only ones saved from this loss are those who have four qualities: faith, righteous deeds, enjoining each other to the truth, and enjoining each other to patience.' },
  ]},
  { number: 108, name: "الكوثر", englishName: "Al-Kawthar", revelationType: "Meccan", numberOfAyahs: 3, verses: [
    { number: 1, arabic: 'إِنَّآ أَعْطَيْنَـٰكَ ٱلْكَوْثَرَ', english: 'Indeed, We have granted you, [O Muhammad], al-Kawthar.', transliteration: 'Inna aAAtaynaka alkawthara', tafsir: 'Allah informs Prophet Muhammad (peace be upon him) that He has given him Al-Kawthar, which is a river in Paradise and also signifies abundant good.' },
    { number: 2, arabic: 'فَصَلِّ لِرَبِّكَ وَٱنْحَرْ', english: 'So pray to your Lord and sacrifice [to Him alone].', transliteration: 'Fasalli lirabbika wainhar', tafsir: 'In gratitude for this great blessing, Allah commands the Prophet to perform prayer and sacrifice solely for Him.' },
    { number: 3, arabic: 'إِنَّ شَانِئَكَ هُوَ ٱلْأَبْتَرُ', english: 'Indeed, your enemy is the one cut off.', transliteration: 'Inna shani-aka huwa al-abtaru', tafsir: 'A reassurance to the Prophet that his enemies, who taunted him, are the ones who are truly "cut off" from all good and remembrance.' },
  ]},
  { number: 110, name: "النصر", englishName: "An-Nasr", revelationType: "Medinan", numberOfAyahs: 3, verses: [
    { number: 1, arabic: 'إِذَا جَآءَ نَصْرُ ٱللَّهِ وَٱلْفَتْحُ', english: 'When the victory of Allah has come and the conquest,', transliteration: 'Itha jaa nasru Allahi waalfathu', tafsir: 'This verse refers to the imminent victory of Islam and the conquest of Mecca.' },
    { number: 2, arabic: 'وَرَأَيْتَ ٱلنَّاسَ يَدْخُلُونَ فِى دِينِ ٱللَّهِ أَفْوَاجًۭا', english: 'And you see the people entering into the religion of Allah in multitudes,', transliteration: 'Waraayta alnnasa yadkhuloona fee deeni Allahi afwajan', tafsir: 'A prophecy that after the conquest, people would embrace Islam in large groups.' },
    { number: 3, arabic: 'فَسَبِّحْ بِحَمْدِ رَبِّكَ وَٱسْتَغْفِرْهُ ۚ إِنَّهُۥ كَانَ تَوَّابًۢا', english: 'Then exalt [Him] with praise of your Lord and ask forgiveness of Him. Indeed, He is ever Accepting of repentance.', transliteration: 'Fasabbih bihamdi rabbika waistaghfirhu innahu kana tawwaban', tafsir: 'Upon the completion of his mission, the Prophet is instructed to glorify Allah and seek His forgiveness. This surah signaled that the Prophet\'s life was nearing its end.' },
  ]},
  {
    number: 112,
    name: "الإخلاص",
    englishName: "Al-Ikhlas",
    revelationType: "Meccan",
    numberOfAyahs: 4,
    verses: [
      { number: 1, arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", english: "Say, 'He is Allah, [who is] One,", transliteration: "Qul huwa Allahu ahadun", tafsir: "A clear declaration of Allah's absolute oneness (Tawhid). He is unique in His essence and attributes, without any partners or equals." },
      { number: 2, arabic: "اللَّهُ الصَّمَدُ", english: "Allah, the Eternal Refuge.", transliteration: "Allahu alssamadu", tafsir: "As-Samad means He is the one whom all creation depends on for their needs, while He is in need of no one. He is perfect, eternal, and self-sufficient." },
      { number: 3, arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ", english: "He neither begets nor is born,", transliteration: "Lam yalid walam yooladu", tafsir: "This verse explicitly refutes any notion of Allah having children or parents. It purifies the concept of God from any anthropomorphic characteristics." },
      { number: 4, arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", english: "Nor is there to Him any equivalent.'", transliteration: "Walam yakun lahu kufuwan ahadun", tafsir: "There is nothing and no one comparable or similar to Allah in any way. This short Surah is a cornerstone of Islamic theology, summarizing the essence of monotheism." }
    ]
  },
  {
    number: 113,
    name: "الفلق",
    englishName: "Al-Falaq",
    revelationType: "Meccan",
    numberOfAyahs: 5,
    verses: [
      { number: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", english: "Say, 'I seek refuge in the Lord of daybreak", transliteration: "Qul aAAoothu birabbi alfalaqi", tafsir: "A command to seek protection in Allah, the Lord who brings forth the dawn from the darkness, signifying His power to bring relief from any hardship." },
      { number: 2, arabic: "مِن شَرِّ مَا خَلَقَ", english: "From the evil of that which He created", transliteration: "Min sharri ma khalaqa", tafsir: "This is a general request for protection from the evil of all created things, whether human, jinn, or animal." },
      { number: 3, arabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", english: "And from the evil of darkness when it settles", transliteration: "Wamin sharri ghasiqin itha waqaba", tafsir: "Seeking specific refuge from the evils that are more prevalent in the darkness of the night." },
      { number: 4, arabic: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", english: "And from the evil of the blowers in knots", transliteration: "Wamin sharri alnnaffathati fee alAAuqadi", tafsir: "Seeking refuge from the evil of sorcery and those who practice it." },
      { number: 5, arabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", english: "And from the evil of an envier when he envies.'", transliteration: "Wamin sharri hasidin itha hasada", tafsir: "Seeking protection from the harmful effects of envy, which is to wish for the removal of a blessing that another person has." }
    ]
  },
  {
    number: 114,
    name: "الناس",
    englishName: "An-Nas",
    revelationType: "Meccan",
    numberOfAyahs: 6,
    verses: [
      { number: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", english: "Say, 'I seek refuge in the Lord of mankind,", transliteration: "Qul aAAoothu birabbi alnnasi", tafsir: "Beginning the supplication for protection by calling upon Allah by His attribute as the 'Rabb' (Lord, Sustainer, Cherisher) of all people." },
      { number: 2, arabic: "مَلِكِ النَّاسِ", english: "The Sovereign of mankind,", transliteration: "Maliki alnnasi", tafsir: "Acknowledging His absolute authority and kingship over all of humanity." },
      { number: 3, arabic: "إِلَٰهِ النَّاسِ", english: "The God of mankind,", transliteration: "Ilahi alnnasi", tafsir: "Affirming that He is the only one worthy of worship by mankind." },
      { number: 4, arabic: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", english: "From the evil of the retreating whisperer -", transliteration: "Min sharri alwaswasi alkhannasi", tafsir: "Seeking refuge from the primary source of evil for mankind: the whisperings of Satan (Shaytan), who whispers evil suggestions and then retreats when one remembers Allah." },
      { number: 5, arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", english: "Who whispers [evil] into the breasts of mankind -", transliteration: "Allathee yuwaswisu fee sudoori alnnasi", tafsir: "Describing how Satan operates by planting doubts and evil thoughts directly into the hearts and minds of people." },
      { number: 6, arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ", english: "From among the jinn and mankind.'", transliteration: "Mina aljinnati waalnnasi", tafsir: "Clarifying that these evil whisperings can come from both the Jinn (Satan and his helpers) and from evil human beings who act as his agents." }
    ]
  }
];

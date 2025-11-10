import { Dua } from '../types';

export const DUA_CATEGORIES = [
    'Morning & Evening', 'Before Eating', 'After Eating', 'Gratitude', 'Seeking Forgiveness', 'For Parents', 'Travel'
];

export const DUAS: Record<string, Dua[]> = {
    'Morning & Evening': [
        {
            title: "Ayat al-Kursi",
            arabic: "ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُۥ مَا فِى ٱلسَّمَٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۗ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَىْءٍ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرْسِيُّهُ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ ۖ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ",
            transliteration: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum. La ta'khudhuhu sinatun wa la nawm. Lahu ma fis-samawati wa ma fil-'ard. Man dhal-ladhi yashfa'u 'indahu illa bi-idhnihi. Ya'lamu ma bayna aydihim wa ma khalfahum, wa la yuhituna bi shay'im-min 'ilmihi illa bima sha'. Wasi'a kursiyyuhus-samawati wal ard, wa la ya'uduhu hifdhuhuma, wa Huwal-'Aliyyul-'Adheem.",
            english: "Allah! There is no god but He - the Living, The Self-subsisting, Eternal. No slumber can seize Him Nor sleep. His are all things In the heavens and on earth. Who is there can intercede In His presence except As he permitteth? He knoweth What (appeareth to His creatures As) Before or After or Behind them. Nor shall they compass Aught of his knowledge Except as He willeth. His throne doth extend Over the heavens And on earth, and He feeleth No fatigue in guarding And preserving them, For He is the Most High, The Supreme (in glory).",
            reference: "Quran 2:255"
        },
        {
            title: "Protection from Evil",
            arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
            transliteration: "A'udhu bikalimatil-lahit-tammati min sharri ma khalaq.",
            english: "I seek refuge in the perfect words of Allah from the evil of that which He has created.",
            reference: "Sahih Muslim"
        }
    ],
    'Before Eating': [
        {
            title: "Before Starting a Meal",
            arabic: "بِسْمِ اللَّهِ",
            transliteration: "Bismillah.",
            english: "In the name of Allah.",
            reference: "Sahih al-Bukhari"
        },
        {
            title: "If You Forget to Say Bismillah",
            arabic: "بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ",
            transliteration: "Bismillahi awwalahu wa akhirahu.",
            english: "In the name of Allah at the beginning and at the end.",
            reference: "Abu Dawud, At-Tirmidhi"
        }
    ],
    'After Eating': [
        {
            title: "After Finishing a Meal",
            arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
            transliteration: "Alhamdu lillahil-ladhi at'amani hadha, wa razaqanihi min ghayri hawlin minni wa la quwwah.",
            english: "Praise is to Allah Who has fed me this, and provided it for me without any might or power on my part.",
            reference: "At-Tirmidhi, Abu Dawud, Ibn Majah"
        }
    ],
    'Gratitude': [
        {
            title: "General Praise and Gratitude",
            arabic: "الْحَمْدُ لِلَّهِ",
            transliteration: "Alhamdulillah.",
            english: "All praise is for Allah.",
            reference: "Quran 1:2"
        },
        {
            title: "Acknowledging Blessings",
            arabic: "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ",
            transliteration: "Allahumma ma asbaha bi min ni'matin aw bi-ahadin min khalqika faminka wahdaka la sharika lak, falakal-hamdu walakash-shukr.",
            english: "O Allah, whatever blessing has been received by me or anyone of Your creation is from You alone, You have no partner. For You is all praise and for You is all thanks.",
            reference: "Abu Dawud"
        }
    ],
    'Seeking Forgiveness': [
        {
            title: "The Best Dua for Forgiveness",
            arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَّا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
            transliteration: "Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bini'matika 'alayya, wa abu'u bidhanbi faghfirli fa'innahu la yaghfirudh-dhunuba illa Anta.",
            english: "O Allah, You are my Lord, none has the right to be worshipped except You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can. I seek refuge in You from the evil of what I have committed. I acknowledge Your favor upon me and I acknowledge my sin, so forgive me, for verily none can forgive sins except You.",
            reference: "Sahih al-Bukhari"
        }
    ],
    'For Parents': [
        {
            title: "Dua for Parents",
            arabic: "رَّبِّ ٱرْحَمْهُمَا كَمَا رَبَّيَانِى صَغِيرًا",
            transliteration: "Rabbirhamhuma kama rabbayani sagheera.",
            english: "My Lord, have mercy upon them as they brought me up [when I was] small.",
            reference: "Quran 17:24"
        }
    ],
    'Travel': [
        {
            title: "Dua When Starting a Journey",
            arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
            transliteration: "Subhanal-ladhi sakh-khara lana hadha wa ma kunna lahu muqrinin. Wa inna ila Rabbina lamunqalibun.",
            english: "Glory is to Him Who has provided this for us though we could never have had it by our efforts. And verily, to Our Lord we are to return.",
            reference: "Quran 43:13-14, Sahih Muslim"
        }
    ]
};

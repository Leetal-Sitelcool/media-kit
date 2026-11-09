/* כל המספרים של המדיה קיט במקום אחד.
   עדכון (כל 1-3 חודשים): לשנות כאן מספרים ותאריך, ואז להריץ make-pdf.sh כדי שגם ה-PDF יתעדכן.
   נתון שאין - למחוק את השורה שלו. הדף לא מציג 0 ולא "--", רק מסתדר מחדש. */
window.KIT = {
  updated: "09-11-2026",
  windowDays: 90,
  source: "אינסטגרם",

  hero: { value: "72%", label: "מהצפיות" },

  stats: [
    { value: "56.6K", label: "חשבונות שהתוכן שלי הגיע אליהם" },
    { value: "202K", label: "צפיות" },
    { value: "6,886", label: "לייקים, תגובות, שמירות ושיתופים" },
    { value: "761", label: "עוקבים" }
  ],

  /* כרטיס ריל: אין cover - מוצג כרטיס ורוד עם הכותרת. אין url - הכרטיס לא לחיץ. */
  reels: [
    { title: "\"יום אחד הבריאות שלך תעמוד במבחן\"", views: "5,162", note: "זוגיות ובריאות", cover: "assets/reels/1-relationship-health.jpg", url: "https://www.instagram.com/reel/Dc_UQ9ztE85/" },
    { title: "עם @babkabakery", views: "1,312", note: "תוכן עם עסק · 15 תגובות", cover: "assets/reels/2-babka-bakery.jpg", url: "https://www.instagram.com/reel/De7BF4zNIWf/" },
    { title: "\"294 תכנים שמורים - קלוד סידר לי\"", views: "583", note: "7 שמירות · AI", cover: "assets/reels/3-saved-content.jpg", url: "https://www.instagram.com/reel/DeuISGaNBf8/" },
    { title: "\"לא הייטקיסטית. אמא לשניים. ו-AI עובד בשבילי\"", views: "867", note: "AI", cover: "assets/reels/4-not-a-techie.jpg", url: "https://www.instagram.com/reel/DeHX6mXt7Bl/" }
  ],
  reelsNote: "הסיפור האישי מגיע הכי רחוק. ה-AI בונה את הנישה.",

  audience: {
    followers: "761",
    gender: [
      { label: "נשים", pct: 68, color: "var(--red)" },
      { label: "גברים", pct: 17, color: "var(--ink)" },
      { label: "לא ידוע", pct: 15, color: "var(--paper)" }
    ],
    ageSummary: "58% בגילאי 25-44",
    ages: [
      { range: "13-17", pct: 2 }, { range: "18-24", pct: 4 }, { range: "25-34", pct: 17 },
      { range: "35-44", pct: 41, top: true }, { range: "45-54", pct: 20 }, { range: "55-64", pct: 10 }, { range: "+65", pct: 7 }
    ],
    region: "רובן במרכז הארץ",
    cities: ["תל אביב", "נהריה", "נתניה", "רמת גן", "ראשון לציון"],
    fit: "בדיוק מי שמותגים לביוטי, לבית ולמשפחה רוצים להגיע אליו."
  },

  /* סרטוני UGC. פחות מ-2 - כל הסקשן לא מוצג (וגם הקישור אליו בפס העליון). */
  ugc: [
    { brand: "LUMI LIFT", product: "מכשור פנים", category: "ביוטי וטיפוח", video: "assets/ugc/lumi-lift.mp4", poster: "assets/ugc/lumi-lift.jpg" },
    { brand: "VIRTUS", product: "נר Egyptian Amber", category: "בית ואווירה", video: "assets/ugc/virtus.mp4", poster: "assets/ugc/virtus.jpg" },
    { brand: "Picka", product: "משחק זיכרון בעיצוב אישי", category: "משפחה ומתנות", video: "assets/ugc/picka.mp4", poster: "assets/ugc/picka.jpg" },
    { brand: "קוברמי", product: "בליינד דייט עם ספר", category: "ספרים ופנאי", video: "assets/ugc/cover-me.mp4", poster: "assets/ugc/cover-me.jpg" }
  ],

  /* המייל מורכב בדפדפן ולא כתוב כטקסט אחד במקור הדף - פחות ספאם. */
  contact: {
    mailUser: "leetalcha", mailDomain: "gmail.com",
    mailSubject: "שיתוף פעולה",
    whatsapp: "972508777082", whatsappDisplay: "050-8777082",
    whatsappText: "היי ליטל, ראיתי את המדיה קיט שלך"
  },

  /* הכתובת של הקיט באינטרנט, כשתהיה. ריק = ה-PDF לא מציג קישור לקיט. */
  kitUrl: "https://leetal-sitelcool.github.io/media-kit/"
};

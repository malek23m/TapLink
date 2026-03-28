import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "nav": {
        "howItWorks": "How it works",
        "shop": "Shop",
        "dashboard": "Dashboard",
        "getStarted": "Get Started"
      },
      "hero": {
        "title": "ONE TAP,",
        "subtitle": "INFINITE CONNECTIONS.",
        "description": "The modern way to share your professional world. No apps, no friction—just a tap.",
        "cta": "Get Your Free Profile",
        "secondaryCta": "Shop Physical Cards",
        "features": {
          "instant": {
            "title": "Instant Sharing",
            "desc": "Works with all modern smartphones."
          }
        }
      },
      "auth": {
        "welcome": "Welcome back",
        "create": "Create your account",
        "loginDesc": "Enter your details to access your dashboard",
        "signupDesc": "Start sharing your professional world today",
        "google": "Continue with Google",
        "orEmail": "Or continue with email",
        "orContinue": "Or continue with",
        "email": "Email Address",
        "password": "Password",
        "signIn": "Sign In",
        "signUp": "Create Account",
        "noAccount": "Don't have an account? Sign up",
        "haveAccount": "Already have an account? Sign in",
        "processing": "Processing...",
        "welcomeBack": "Welcome back!",
        "accountCreated": "Account created successfully!",
        "popupClosed": "Sign-in window closed. Please try again.",
        "loginFailed": "Login failed. Please try again.",
        "errors": {
          "userNotFound": "No account found with this email.",
          "wrongPassword": "Incorrect password.",
          "emailInUse": "An account already exists with this email.",
          "weakPassword": "Password should be at least 6 characters.",
          "invalidEmail": "Invalid email address.",
          "operationNotAllowed": "Email/Password login is not enabled.",
          "default": "Authentication failed. Please try again."
        }
      },
      "dashboard": {
        "welcome": "Welcome back,",
        "dashboard": "Dashboard",
        "statsDesc": "Here's what's happening with your digital identity.",
        "viewProfile": "View Live Profile",
        "editProfile": "Edit Profile",
        "totalTaps": "Total Taps",
        "newLeads": "New Leads",
        "profileViews": "Profile Views",
        "recentLeads": "Recent Leads",
        "noLeads": "No leads captured yet. Start tapping!",
        "orderCard": "Order a Card",
        "orderDesc": "Upgrade to a physical NFC card for instant sharing.",
        "shopNow": "Shop Now",
        "activeProfile": "Active Profile",
        "signOut": "Sign Out",
        "analytics": "Analytics",
        "myCards": "My Cards",
        "settings": "Settings",
        "qrTitle": "Your Profile QR",
        "qrDesc": "Anyone can scan this to view your profile instantly.",
        "copyLink": "Copy Profile Link",
        "linkCopied": "Link copied to clipboard!",
        "close": "Close",
        "viewAll": "View All",
        "showQR": "Show QR Code",
        "linkCard": "Link Physical Card",
        "addToWallet": "Add to Apple Wallet",
        "liveStatus": "Your profile is live. Changes are saved instantly."
      },
      "linkCard": {
        "title": "Link Your Card",
        "description": "Enter the 12-digit ID found on the back of your physical TapLink card.",
        "placeholder": "Enter Card ID (e.g. ABC1-DEF2-GHI3)",
        "button": "Link Card",
        "linking": "Linking...",
        "success": "Card linked successfully!",
        "error": "Invalid Card ID. Please try again."
      },
      "wallet": {
        "generating": "Generating Wallet Pass...",
        "ready": "Your Wallet Pass is ready!",
        "download": "Add to Apple Wallet"
      },
      "editor": {
        "title": "Profile Editor",
        "preview": "Preview",
        "saveChanges": "Save Changes",
        "saving": "Saving...",
        "basicInfo": "Basic Information",
        "displayName": "Display Name",
        "username": "Username",
        "bio": "Bio",
        "bioPlaceholder": "Tell your story...",
        "linksSocials": "Links & Socials",
        "addLink": "Add Link",
        "noLinks": "No links added yet. Click the + to start.",
        "labelPlaceholder": "Label (e.g. Portfolio)",
        "urlPlaceholder": "URL or Username"
      },
      "analytics": {
        "title": "Tap Analytics",
        "subtitle": "Track your networking performance in real-time.",
        "back": "Back to Dashboard",
        "last30Days": "Last 30 Days",
        "export": "Export CSV",
        "trends": "Tap Trends",
        "totalTaps": "Total Taps",
        "devices": "Device Breakdown",
        "locations": "Top Locations",
        "loading": "Loading Analytics...",
        "tapsCount": "{{count}} Taps"
      },
      "customize": {
        "title": "Card Customizer",
        "subtitle": "Design your physical NFC card.",
        "back": "Back to Dashboard",
        "selectMaterial": "1. Select Material",
        "chooseColor": "2. Choose Color",
        "uploadLogo": "3. Upload Logo",
        "uploadDesc": "Click to upload SVG or PNG",
        "uploadHint": "Recommended: White logo with transparent background",
        "totalPrice": "Total Price",
        "addToCart": "Add to Cart",
        "secureChip": "Secure Chip",
        "premiumFinish": "Premium Finish",
        "laserEngraved": "LASER ENGRAVED LOGO AREA",
        "nfcChip": "NFC SECURE CHIP"
      },
      "settings": {
        "title": "Settings",
        "back": "Back to Dashboard",
        "account": "Account",
        "email": "Email Address",
        "displayName": "Display Name",
        "change": "Change",
        "edit": "Edit",
        "security": "Security",
        "resetPassword": "Reset Password",
        "notifications": "Notifications",
        "emailAlerts": "Email alerts for new leads",
        "signOut": "Sign Out of TapLink"
      },
      "profile": {
        "saveContact": "Save Contact",
        "tapBack": "Tap Back",
        "shareContact": "Share Contact Info",
        "sharing": "Sharing...",
        "contactSuccess": "Contact info shared successfully!",
        "contactError": "Failed to share contact info",
        "yourName": "Your Name",
        "emailAddress": "Email Address",
        "phoneNumber": "Phone Number (Optional)",
        "addNote": "Add a note...",
        "poweredBy": "Powered by",
        "notFound": "Profile Not Found",
        "notFoundDesc": "The profile you're looking for doesn't exist or has been moved.",
        "createOwn": "Create Your Own"
      },
      "howItWorks": {
        "title": "How it works",
        "subtitle": "Three simple steps to digital networking mastery.",
        "steps": {
          "order": {
            "title": "Order",
            "desc": "Order your high-quality Matte PVC card and upload your logo for laser engraving."
          },
          "build": {
            "title": "Build",
            "desc": "Design your digital profile in our drag-and-drop editor. Add links, social blocks, and portfolios."
          },
          "tap": {
            "title": "Tap",
            "desc": "Share your work instantly. No app required for the recipient—it just works."
          }
        }
      },
      "shop": {
        "title": "The Hardware",
        "subtitle": "Premium materials for a lasting first impression.",
        "viewAll": "View All Products",
        "customize": "Customize"
      }
    }
  },
  ar: {
    translation: {
      "nav": {
        "howItWorks": "كيف يعمل",
        "shop": "المتجر",
        "dashboard": "لوحة التحكم",
        "getStarted": "ابدأ الآن"
      },
      "hero": {
        "title": "نقرة واحدة،",
        "subtitle": "اتصالات لا نهائية.",
        "description": "الطريقة الحديثة لمشاركة عالمك المهني. لا تطبيقات، لا عوائق - فقط نقرة واحدة.",
        "cta": "احصل على ملفك الشخصي المجاني",
        "secondaryCta": "تسوق البطاقات الفعلية",
        "features": {
          "instant": {
            "title": "مشاركة فورية",
            "desc": "يعمل مع جميع الهواتف الذكية الحديثة."
          }
        }
      },
      "auth": {
        "welcome": "مرحباً بعودتك",
        "create": "أنشئ حسابك",
        "loginDesc": "أدخل بياناتك للوصول إلى لوحة التحكم الخاصة بك",
        "signupDesc": "ابدأ مشاركة عالمك المهني اليوم",
        "google": "المتابعة باستخدام جوجل",
        "orEmail": "أو المتابعة عبر البريد الإلكتروني",
        "orContinue": "أو المتابعة عبر",
        "email": "البريد الإلكتروني",
        "password": "كلمة المرور",
        "signIn": "تسجيل الدخول",
        "signUp": "إنشاء حساب",
        "noAccount": "ليس لديك حساب؟ سجل الآن",
        "haveAccount": "لديك حساب بالفعل؟ سجل دخولك",
        "processing": "جاري المعالجة...",
        "welcomeBack": "مرحباً بعودتك!",
        "accountCreated": "تم إنشاء الحساب بنجاح!",
        "popupClosed": "تم إغلاق نافذة تسجيل الدخول. يرجى المحاولة مرة أخرى.",
        "loginFailed": "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.",
        "errors": {
          "userNotFound": "لا يوجد حساب بهذا البريد الإلكتروني.",
          "wrongPassword": "كلمة المرور غير صحيحة.",
          "emailInUse": "يوجد حساب بالفعل بهذا البريد الإلكتروني.",
          "weakPassword": "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.",
          "invalidEmail": "عنوان بريد إلكتروني غير صالح.",
          "operationNotAllowed": "تسجيل الدخول بالبريد/كلمة المرور غير مفعل.",
          "default": "فشل المصادقة. يرجى المحاولة مرة أخرى."
        }
      },
      "dashboard": {
        "welcome": "مرحباً بعودتك،",
        "dashboard": "لوحة التحكم",
        "statsDesc": "إليك ما يحدث مع هويتك الرقمية.",
        "viewProfile": "عرض الملف الشخصي المباشر",
        "editProfile": "تعديل الملف الشخصي",
        "totalTaps": "إجمالي النقرات",
        "newLeads": "عملاء جدد",
        "profileViews": "مشاهدات الملف الشخصي",
        "recentLeads": "العملاء الأخيرون",
        "noLeads": "لم يتم التقاط أي عملاء بعد. ابدأ بالنقر!",
        "orderCard": "اطلب بطاقة",
        "orderDesc": "قم بالترقية إلى بطاقة NFC فعلية للمشاركة الفورية.",
        "shopNow": "تسوق الآن",
        "activeProfile": "الملف الشخصي النشط",
        "signOut": "تسجيل الخروج",
        "analytics": "التحليلات",
        "myCards": "بطاقاتي",
        "settings": "الإعدادات",
        "qrTitle": "رمز QR لملفك الشخصي",
        "qrDesc": "يمكن لأي شخص مسح هذا الرمز لعرض ملفك الشخصي على الفور.",
        "copyLink": "نسخ رابط الملف الشخصي",
        "linkCopied": "تم نسخ الرابط إلى الحافظة!",
        "close": "إغلاق",
        "viewAll": "عرض الكل",
        "showQR": "إظهار رمز QR",
        "linkCard": "ربط بطاقة فعلية",
        "addToWallet": "إضافة إلى Apple Wallet",
        "liveStatus": "ملفك الشخصي مباشر. يتم حفظ التغييرات فوراً."
      },
      "linkCard": {
        "title": "ربط بطاقتك",
        "description": "أدخل المعرف المكون من 12 رقماً الموجود خلف بطاقة TapLink الخاصة بك.",
        "placeholder": "أدخل معرف البطاقة (مثلاً: ABC1-DEF2-GHI3)",
        "button": "ربط البطاقة",
        "linking": "جاري الربط...",
        "success": "تم ربط البطاقة بنجاح!",
        "error": "معرف البطاقة غير صالح. يرجى المحاولة مرة أخرى."
      },
      "wallet": {
        "generating": "جاري إنشاء بطاقة المحفظة...",
        "ready": "بطاقة المحفظة جاهزة!",
        "download": "إضافة إلى Apple Wallet"
      },
      "editor": {
        "title": "محرر الملف الشخصي",
        "preview": "معاينة",
        "saveChanges": "حفظ التغييرات",
        "saving": "جاري الحفظ...",
        "basicInfo": "المعلومات الأساسية",
        "displayName": "الاسم المعروض",
        "username": "اسم المستخدم",
        "bio": "السيرة الذاتية",
        "bioPlaceholder": "أخبر قصتك...",
        "linksSocials": "الروابط والشبكات الاجتماعية",
        "addLink": "إضافة رابط",
        "noLinks": "لم يتم إضافة روابط بعد. انقر على + للبدء.",
        "labelPlaceholder": "العنوان (مثلاً: معرض الأعمال)",
        "urlPlaceholder": "الرابط أو اسم المستخدم"
      },
      "analytics": {
        "title": "تحليلات النقرات",
        "subtitle": "تتبع أداء تواصلك في الوقت الفعلي.",
        "back": "العودة إلى لوحة التحكم",
        "last30Days": "آخر 30 يومًا",
        "export": "تصدير CSV",
        "trends": "اتجاهات النقرات",
        "totalTaps": "إجمالي النقرات",
        "devices": "توزيع الأجهزة",
        "locations": "أهم المواقع",
        "loading": "جاري تحميل التحليلات...",
        "tapsCount": "{{count}} نقرة"
      },
      "customize": {
        "title": "تخصيص البطاقة",
        "subtitle": "صمم بطاقة NFC الفعلية الخاصة بك.",
        "back": "العودة إلى لوحة التحكم",
        "selectMaterial": "1. اختر المادة",
        "chooseColor": "2. اختر اللون",
        "uploadLogo": "3. تحميل الشعار",
        "uploadDesc": "انقر لتحميل SVG أو PNG",
        "uploadHint": "موصى به: شعار أبيض بخلفية شفافة",
        "totalPrice": "السعر الإجمالي",
        "addToCart": "أضف إلى السلة",
        "secureChip": "شريحة آمنة",
        "premiumFinish": "لمسة نهائية فاخرة",
        "laserEngraved": "منطقة الشعار المحفور بالليزر",
        "nfcChip": "شريحة NFC آمنة"
      },
      "settings": {
        "title": "الإعدادات",
        "back": "العودة إلى لوحة التحكم",
        "account": "الحساب",
        "email": "البريد الإلكتروني",
        "displayName": "الاسم المعروض",
        "change": "تغيير",
        "edit": "تعديل",
        "security": "الأمان",
        "resetPassword": "إعادة تعيين كلمة المرور",
        "notifications": "الإشعارات",
        "emailAlerts": "تنبيهات البريد الإلكتروني للعملاء الجدد",
        "signOut": "تسجيل الخروج من TapLink"
      },
      "profile": {
        "saveContact": "حفظ جهة الاتصال",
        "tapBack": "رد النقرة",
        "shareContact": "مشاركة معلومات الاتصال",
        "sharing": "جاري المشاركة...",
        "contactSuccess": "تمت مشاركة معلومات الاتصال بنجاح!",
        "contactError": "فشل في مشاركة معلومات الاتصال",
        "yourName": "اسمك",
        "emailAddress": "البريد الإلكتروني",
        "phoneNumber": "رقم الهاتف (اختياري)",
        "addNote": "أضف ملاحظة...",
        "poweredBy": "مشغل بواسطة",
        "notFound": "الملف الشخصي غير موجود",
        "notFoundDesc": "الملف الشخصي الذي تبحث عنه غير موجود أو تم نقله.",
        "createOwn": "أنشئ ملفك الخاص"
      },
      "howItWorks": {
        "title": "كيف يعمل",
        "subtitle": "ثلاث خطوات بسيطة لإتقان التواصل الرقمي.",
        "steps": {
          "order": {
            "title": "اطلب",
            "desc": "اطلب بطاقتك البلاستيكية عالية الجودة وقم بتحميل شعارك للنقش بالليزر."
          },
          "build": {
            "title": "ابنِ",
            "desc": "صمم ملفك الشخصي الرقمي في محررنا السهل. أضف الروابط والشبكات الاجتماعية والمعارض."
          },
          "tap": {
            "title": "انقر",
            "desc": "شارك عملك على الفور. لا يتطلب أي تطبيق للمستلم - إنه يعمل ببساطة."
          }
        }
      },
      "shop": {
        "title": "الأجهزة",
        "subtitle": "مواد ممتازة لترك انطباع أول يدوم.",
        "viewAll": "عرض جميع المنتجات",
        "customize": "تخصيص"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

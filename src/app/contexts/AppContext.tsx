import React, { createContext, useContext, useState, useEffect } from "react";

// ─── Color Palettes ─────────────────────────────────────────────────────────
export interface ColorPalette {
  id: string;
  name: string;
  nameVi: string;
  swatches: string[];
  bg: string;
  bg1: string;
  bg2: string;
  light: string;
  medium: string;
  accent: string;
  primary: string;
  primaryDim: string;
  text: string;
  textMuted: string;
  textLight: string;
  textOnDark: string;
  border: string;
  cardBg: string;
  footerBg: string;
  countdownBg: string;
  heroGradient: string;
  shadowAccent: string;
  shadowPrimary: string;
  navScrollBg: string;
}

export const palettes: ColorPalette[] = [
  {
    id: "green",
    name: "Botanical Green",
    nameVi: "Xanh Thực Vật",
    swatches: ["#F2FAE9", "#A8D38D", "#4A7C59", "#2C2C2C"],
    bg: "#FAFAF6",
    bg1: "#F2FAE9",
    bg2: "#E7FFCE",
    light: "#D8FFB1",
    medium: "#B6DA9F",
    accent: "#A8D38D",
    primary: "#4A7C59",
    primaryDim: "#7BAE7F",
    text: "#2C2C2C",
    textMuted: "#5A6472",
    textLight: "#F2FAE9",
    textOnDark: "#D8FFB1",
    border: "#D8FFB1",
    cardBg: "#FAFAF6",
    footerBg: "#4A7C59",
    countdownBg: "#4A7C59",
    heroGradient: "linear-gradient(to bottom, rgba(242,250,233,0.55) 0%, rgba(168,211,141,0.30) 50%, rgba(242,250,233,0.70) 100%)",
    shadowAccent: "rgba(168,211,141,0.22)",
    shadowPrimary: "rgba(74,124,89,0.13)",
    navScrollBg: "rgba(242,250,233,0.96)",
  },
  {
    id: "sky",
    name: "Sky & Sunshine",
    nameVi: "Bầu Trời & Nắng Vàng",
    swatches: ["#EEF7FF", "#87CEEB", "#1A7FAF", "#FFD700"],
    bg: "#FAFCFF",
    bg1: "#EEF7FF",
    bg2: "#FFFBE8",
    light: "#C8E8F8",
    medium: "#97CBE8",
    accent: "#6BB8E0",
    primary: "#1A7FAF",
    primaryDim: "#5EA8C8",
    text: "#1A3040",
    textMuted: "#456070",
    textLight: "#EEF7FF",
    textOnDark: "#C8E8F8",
    border: "#C8E8F8",
    cardBg: "#FAFCFF",
    footerBg: "#1A7FAF",
    countdownBg: "#1A7FAF",
    heroGradient: "linear-gradient(to bottom, rgba(238,247,255,0.55) 0%, rgba(107,184,224,0.30) 50%, rgba(238,247,255,0.70) 100%)",
    shadowAccent: "rgba(107,184,224,0.22)",
    shadowPrimary: "rgba(26,127,175,0.13)",
    navScrollBg: "rgba(238,247,255,0.96)",
  },
  {
    id: "pastel",
    name: "Pastel Spring",
    nameVi: "Xuân Pastel",
    swatches: ["#FFF5F8", "#EFA8BE", "#C05078", "#C8B4D8"],
    bg: "#FFFBF9",
    bg1: "#FFF5F8",
    bg2: "#F5EFFA",
    light: "#F8CDD8",
    medium: "#EFA8BE",
    accent: "#E088A8",
    primary: "#C05078",
    primaryDim: "#D87898",
    text: "#2A1C24",
    textMuted: "#6B4A58",
    textLight: "#FFF5F8",
    textOnDark: "#F8CDD8",
    border: "#F8CDD8",
    cardBg: "#FFFBF9",
    footerBg: "#C05078",
    countdownBg: "#C05078",
    heroGradient: "linear-gradient(to bottom, rgba(255,245,248,0.55) 0%, rgba(224,136,168,0.30) 50%, rgba(255,245,248,0.70) 100%)",
    shadowAccent: "rgba(224,136,168,0.22)",
    shadowPrimary: "rgba(192,80,120,0.13)",
    navScrollBg: "rgba(255,245,248,0.96)",
  },
  {
    id: "blush",
    name: "Blush Garden",
    nameVi: "Vườn Phấn Hồng",
    swatches: ["#F6DCCB", "#F4B8A5", "#FADFAF", "#C7D9A8"],
    bg: "#FFF9F5",
    bg1: "#F6DCCB",
    bg2: "#FFF2D9",
    light: "#FFE6D2",
    medium: "#F4B8A5",
    accent: "#F1A18F",
    primary: "#C97C63",
    primaryDim: "#E29A7E",
    text: "#3A2622",
    textMuted: "#7A5B52",
    textLight: "#FFF9F5",
    textOnDark: "#FFE6D2",
    border: "#F4B8A5",
    cardBg: "#FFF9F5",
    footerBg: "#C97C63",
    countdownBg: "#C97C63",
    heroGradient: "linear-gradient(to bottom, rgba(255,249,245,0.55) 0%, rgba(244,184,165,0.30) 50%, rgba(255,249,245,0.70) 100%)",
    shadowAccent: "rgba(244,184,165,0.22)",
    shadowPrimary: "rgba(201,124,99,0.13)",
    navScrollBg: "rgba(255,249,245,0.96)",
  },
  {
    id: "savvy_red",
    name: "Savvy Red",
    nameVi: "Đỏ Savvy",
    swatches: ["#EDD4BC", "#F7765E", "#8B1E28", "#74171E"],
    bg: "#FFF9F6",
    bg1: "#FDF0E7",
    bg2: "#FBE2D0",
    light: "#EDD4BC",
    medium: "#FAAD9D",
    accent: "#F7765E",
    primary: "#8B1E28",
    primaryDim: "#AF2B35",
    text: "#2D1215",
    textMuted: "#6A4A4D",
    textLight: "#FFF9F6",
    textOnDark: "#EDD4BC",
    border: "#FBE2D0",
    cardBg: "#FFF9F6",
    footerBg: "#8B1E28",
    countdownBg: "#8B1E28",
    heroGradient: "linear-gradient(to bottom, rgba(255,249,246,0.55) 0%, rgba(247,118,94,0.30) 50%, rgba(255,249,246,0.70) 100%)",
    shadowAccent: "rgba(247,118,94,0.22)",
    shadowPrimary: "rgba(139,30,40,0.13)",
    navScrollBg: "rgba(255,249,246,0.96)",
  },
];

// ─── Translations ────────────────────────────────────────────────────────────
export type Language = "en" | "vi";

export interface Translations {
  nav: {
    ourStory: string;
    details: string;
    gallery: string;
    rsvp: string;
    wishes: string;
    location: string;
    rsvpNow: string;
  };
  hero: {
    badge: string;
    badgeTitle: string;
    date: string;
    quote: string;
    scroll: string;
  };
  ourStory: {
    badge: string;
    title: string;
    items: { date: string; title: string; text: string }[];
  };
  eventDetails: {
    badge: string;
    title: string;
    events: {
      icon: string;
      title: string;
      date: string;
      items: { time: string; title: string; venue: string; address: string }[];
      note?: string;
    }[];
    dressCodeLabel: string;
    dressCode: string;
    countdownLabel: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    countdownSub: string;
  };
  gallery: {
    badge: string;
    title: string;
  };
  rsvp: {
    badge: string;
    title: string;
    description: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    attending: string;
    attendingYes: string;
    attendingNo: string;
    guests: string;
    guestLabel: (n: string) => string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: (name: string) => string;
    successText: string;
    addAnother: string;
  };
  wishes: {
    badge: string;
    title: string;
    attendingBadge: string;
  };
  location: {
    badge: string;
    title: string;
    ceremony: string;
    reception: string;
    getDirections: string;
    venueAddress: string;
    contactTitle: string;
    groomTitle: string;
    brideTitle: string;
    giftTitle: string;
    giftDesc: string;
    qrBtn: string;
    qrModalTitle: string;
    qrModalDesc: string;
    qrTabGroom: string;
    qrTabBride: string;
    bankName: string;
    accNumber: string;
    accName: string;
    copyAcc: string;
  };
  footer: {
    thankYou: string;
    withLove: string;
    madeWith: string;
  };
}

const en: Translations = {
  nav: {
    ourStory: "Our Story",
    details: "Details",
    gallery: "Gallery",
    rsvp: "RSVP",
    wishes: "Wishes",
    location: "Location",
    rsvpNow: "RSVP Now",
  },
  hero: {
    badge: "We're Getting Married",
    badgeTitle: "Wedding",
    date: "20 · September · 2026",
    quote: '"What God has joined together, let no one separate.\n(Mt 19:6)"',
    scroll: "Scroll",
  },
  ourStory: {
    badge: "A love story",
    title: "Our Story",
    items: [
      {
        date: "March 2020",
        title: "The First Meeting",
        text: "A quiet afternoon in a Hội An café, where the scent of jasmine tea lingered in the air. Our eyes met across the room, and the world softened just a little.",
      },
      {
        date: "June 2020",
        title: "Our First Date",
        text: "A sunset walk along the lantern-lit streets of the Ancient Town. We talked until the sky turned from gold to deep violet — and neither of us wanted to say goodnight.",
      },
      {
        date: "December 2024",
        title: "The Proposal",
        text: "Beneath a canopy of fairy lights in our favourite garden, he knelt on one knee. The answer, like always, was yes — a thousand times, yes.",
      },
      {
        date: "September 2026",
        title: "Forever Begins",
        text: "Now, surrounded by the people we love most, we begin the most beautiful chapter of our lives together. Thank you for being part of our story.",
      },
    ],
  },
  eventDetails: {
    badge: "Save the date",
    title: "Event Details",
    events: [
      {
        icon: "heart-home",
        title: "Bride's Family Celebration",
        date: "Saturday, 25 April 2026",
        items: [
          {
            time: "07:30 AM",
            title: "Traditional Ceremony",
            venue: "Bride's Residence",
            address: "Gia Lai",
          },
          {
            time: "10:30 AM",
            title: "Wedding Reception",
            venue: "Quang Chau Restaurant",
            address: "55 Vo Van Dung, Dinh Tan, Vinh Thanh, Gia Lai",
          }
        ],
      },
      {
        icon: "church",
        title: "Groom's Family Celebration",
        date: "Saturday, 02 May 2026",
        items: [
          {
            time: "09:00 AM",
            title: "Holy Matrimony",
            venue: "Trung Thanh Church",
            address: "Thanh Dong, An Giang",
          },
          {
            time: "11:00 AM",
            title: "Traditional Ceremony",
            venue: "Groom's Residence",
            address: "320A Kinh 9 St, Thanh Dong, An Giang",
          },
          {
            time: "11:30 AM",
            title: "Wedding Reception",
            venue: "Groom's Residence",
            address: "320A Kinh 9 St, Thanh Dong, An Giang",
          }
        ],
      },
      {
        icon: "party",
        title: "Celebration Party",
        date: "Saturday, 30 May 2026",
        items: [
          {
            time: "6:00 PM",
            title: "Evening Reception",
            venue: "Dai Hy Wedding Restaurant",
            address: "156 Ly Chieu Hoang, Binh Phu, Ho Chi Minh City",
          }
        ],
      }
    ],
    dressCodeLabel: "Dress Code",
    dressCode: "Garden Chic — Soft Florals & Earth Tones",
    countdownLabel: "Counting down to the wedding",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    countdownSub: "30 May 2026 · Ho Chi Minh City",
  },
  gallery: {
    badge: "Captured moments",
    title: "Our Gallery",
  },
  rsvp: {
    badge: "Join us",
    title: "RSVP & Leave a Wish",
    description: "Your presence means everything to us. Please let us know if you can make it, and leave a loving note for the couple.",
    name: "Full Name *",
    namePlaceholder: "Your name",
    email: "Email Address",
    emailPlaceholder: "your@email.com",
    attending: "Will you attend?",
    attendingYes: "Joyfully accepts",
    attendingNo: "Regretfully declines",
    guests: "Number of Guests",
    guestLabel: (n) => `${n} guest${n !== "1" ? "s" : ""}`,
    message: "Your Wish for the Couple *",
    messagePlaceholder: "Share your love and wishes...",
    submit: "Send Your Wishes",
    submitting: "Sending...",
    successTitle: (name) => `Thank You, ${name}!`,
    successText: "Your RSVP and wishes have been received. We can't wait to celebrate with you.",
    addAnother: "Add another response",
  },
  wishes: {
    badge: "Heartfelt messages",
    title: "Wishes & Love Notes",
    attendingBadge: "Attending",
  },
  location: {
    badge: "Find us here",
    title: "The Venue",
    ceremony: "Ceremony",
    reception: "Reception",
    getDirections: "Get Directions",
    venueAddress: "Hội An Ancient Town, Quảng Nam, Vietnam",
    contactTitle: "Contact Information",
    groomTitle: "Groom (Minh Hieu)",
    brideTitle: "Bride (Thao Tien)",
    giftTitle: "Wedding Gift",
    giftDesc: "Your presence is the most valuable gift. If you cannot attend, you may send your blessings via bank transfer below.",
    qrBtn: "View QR Code",
    qrModalTitle: "Wedding Gift Box",
    qrModalDesc: "Thank you for sending your blessings to the couple!",
    qrTabGroom: "Groom's Side",
    qrTabBride: "Bride's Side",
    bankName: "Bank",
    accNumber: "Account Number",
    accName: "Account Holder",
    copyAcc: "Copy account number",
  },
  footer: {
    thankYou:
      '"With full hearts, we thank you for your love, your laughter, and your presence in our lives. You are not just our guests — you are the very chapters of our story."',
    withLove: "With all our love,",
    madeWith: "Made with love · Linh & Minh · 2026",
  },
};

const vi: Translations = {
  nav: {
    ourStory: "Câu Chuyện",
    details: "Chi Tiết",
    gallery: "Bộ Ảnh",
    rsvp: "RSVP",
    wishes: "Lời Chúc",
    location: "Địa Điểm",
    rsvpNow: "RSVP Ngay",
  },
  hero: {
    badge: "Trân trọng thông báo",
    badgeTitle: "Hôn lễ",
    date: "20 · Tháng Chín · 2026",
    quote: '"Sự gì Thiên Chúa đã kết hợp, loài người không được phân ly.\n(Mt 19:6)"',
    scroll: "Cuộn xuống",
  },
  ourStory: {
    badge: "Câu chuyện tình yêu",
    title: "Chuyện Tình Của Chúng Tôi",
    items: [
      {
        date: "Tháng 3, 2020",
        title: "Lần Đầu Gặp Gỡ",
        text: "Một buổi chiều yên bình tại một quán cà phê ở Hội An, nơi hương trà nhài còn vương vấn trong không khí. Ánh mắt chúng tôi chạm nhau, và cả thế giới như dịu lại.",
      },
      {
        date: "Tháng 6, 2020",
        title: "Buổi Hẹn Đầu Tiên",
        text: "Một buổi dạo chơi hoàng hôn trên những con phố đèn lồng của Phố Cổ. Chúng tôi trò chuyện mãi cho đến khi bầu trời chuyển từ sắc vàng sang tím thẫm — chẳng ai muốn nói lời tạm biệt.",
      },
      {
        date: "Tháng 12, 2024",
        title: "Lời Cầu Hôn",
        text: "Dưới tán đèn fairy lung linh trong khu vườn yêu thích, anh quỳ xuống một gối. Câu trả lời, như mọi lần, là có — một ngàn lần, có.",
      },
      {
        date: "Tháng 9, 2026",
        title: "Mãi Mãi Bắt Đầu",
        text: "Giờ đây, được bao quanh bởi những người thân yêu nhất, chúng tôi bắt đầu chương đẹp nhất trong cuộc đời bên nhau. Cảm ơn bạn đã là một phần trong câu chuyện của chúng tôi.",
      },
    ],
  },
  eventDetails: {
    badge: "Save the date",
    title: "Hôn lễ và Tiệc cưới",
    events: [
      {
        icon: "heart-home",
        title: "Lễ Vu Quy",
        date: "Thứ Bảy, 25 Tháng 04 Năm 2026",
        items: [
          {
            time: "07:30 Sáng",
            title: "Lễ Vu Quy",
            venue: "Tư gia nhà gái",
            address: "74 Nguyễn Huệ, Thôn Định An, Xã Vĩnh Thạnh, T. Gia Lai",
          },
          {
            time: "10:30 Sáng",
            title: "Tiệc Cưới",
            venue: "Nhà hàng Quang Châu",
            address: "55 Võ Văn Dũng, Thôn Định Tân, Xã Vĩnh Thạnh, T. Gia Lai",
          }
        ],
      },
      {
        icon: "church",
        title: "Lễ Thành Hôn",
        date: "Thứ Bảy, 02 Tháng 05 Năm 2026",
        items: [
          {
            time: "09:00 Sáng",
            title: "Thánh Lễ Hôn Phối",
            venue: "Giáo xứ Trung Thành",
            address: "Xã Thạnh Đông, T. An Giang",
          },
          {
            time: "11:00 Sáng",
            title: "Lễ Thành Hôn",
            venue: "Tư gia nhà trai",
            address: "320A Đường Kinh 9, Xã Thạnh Đông, T. An Giang",
          },
          // {
          //   time: "11:30 Trưa",
          //   title: "Tiệc Cưới",
          //   venue: "Tư gia nhà trai",
          //   address: "320A Đường Kinh 9, Xã Thạnh Đông, Tỉnh An Giang",
          // }
        ],
      },
      {
        icon: "party",
        title: "Tiệc Báo Hỷ",
        date: "Thứ Bảy, 30 Tháng 05 Năm 2026",
        items: [
          {
            time: "18:00 Tối",
            title: "Tiệc Báo Hỷ",
            venue: "Nhà hàng tiệc cưới Đại Hỷ",
            address: "156 Đ. Lý Chiêu Hoàng, Phường Bình Phú, Quận 6, TP. Hồ Chí Minh",
          }
        ],
      }
    ],
    dressCodeLabel: "Trang Phục",
    dressCode: "Phong Cách Vườn — Hoa Pastel & Tông Đất",
    countdownLabel: "Cùng nhau đếm ngược",
    days: "Ngày",
    hours: "Giờ",
    minutes: "Phút",
    seconds: "Giây",
    countdownSub: "30 Tháng 5 năm 2026 · TP Hồ Chí Minh",
  },
  gallery: {
    badge: "Khoảnh Khắc Cùng Nhau",
    title: "Bộ Sưu Tập",
  },
  rsvp: {
    badge: "Tham Gia Cùng Chúng Tôi",
    title: "Gửi Lời Chúc",
    description: "Sự hiện diện của bạn là điều quý giá nhất với chúng tôi. Hãy cho chúng tôi biết bạn có thể tham dự, và để lại lời chúc yêu thương.",
    name: "Họ và Tên *",
    namePlaceholder: "Tên của bạn",
    email: "Địa Chỉ Email",
    emailPlaceholder: "email@cua.ban",
    attending: "Bạn có tham dự không?",
    attendingYes: "Vui lòng tham dự",
    attendingNo: "Tiếc không thể tham dự",
    guests: "Số Lượng Khách",
    guestLabel: (n) => `${n} khách`,
    message: "Lời Chúc Của Bạn *",
    messagePlaceholder: "Chia sẻ tình yêu và lời chúc của bạn...",
    submit: "Gửi Lời Chúc",
    submitting: "Đang gửi...",
    successTitle: (name) => `Cảm Ơn ${name}!`,
    successText: "{{our}} cảm ơn {{you}} vì những lời chúc tốt đẹp mà {{you}} đã gửi tặng cho {{our}}.",
    addAnother: "Thêm phản hồi",
  },
  wishes: {
    badge: "Những Lời Chúc Từ Trái Tim",
    title: "Lời Chúc Yêu Thương",
    attendingBadge: "Tham dự",
  },
  location: {
    badge: "Tìm Chúng Tôi Tại Đây",
    title: "Địa Điểm Tổ Chức",
    ceremony: "Lễ Thành Hôn",
    reception: "Tiệc Cưới",
    getDirections: "Chỉ Đường",
    venueAddress: "Phố Cổ Hội An, Quảng Nam, Việt Nam",
    contactTitle: "Thông Tin Liên Hệ",
    groomTitle: "Chú Rể (Minh Hiếu)",
    brideTitle: "Cô Dâu (Thảo Tiên)",
    giftTitle: "Mừng Cưới",
    giftDesc: "Sự hiện diện của quý vị là món quà vô giá đối với hai gia đình. Nếu không thể đến tham dự và chia vui, quý vị có thể gửi lời chúc phúc cùng một phần quà nhỏ qua hình thức chuyển khoản dưới đây.",
    qrBtn: "Xem Mã QR",
    qrModalTitle: "Hộp Mừng Cưới",
    qrModalDesc: "Chân thành cảm ơn bạn đã chúc phúc tới hai vợ chồng!",
    qrTabGroom: "Nhà Trai",
    qrTabBride: "Nhà Gái",
    bankName: "Ngân hàng",
    accNumber: "Số tài khoản",
    accName: "Chủ Tài khoản",
    copyAcc: "Copy số tài khoản",
  },
  footer: {
    thankYou:
      '"Với trái tim tràn đầy yêu thương, {{our}} xin cảm ơn {{you}} vì tình cảm, tiếng cười và sự hiện diện trong cuộc sống của {{our}}. {{you}} không chỉ là khách mời — {{you}} chính là những trang trong câu chuyện của {{our}}."',
    withLove: "Với tất cả yêu thương,",
    madeWith: "Với tất cả yêu thương · Hiếu & Tiên · 2026",
  },
};

export const translationsMap: Record<Language, Translations> = { en, vi };

// ─── Pronoun Detection ──────────────────────────────────────────────────────
export function detectViPronoun(name: string): { our: string; you: string } {
  const s = name.trim().toLowerCase();
  if (/^cô\/chú(?=\s|$)/.test(s)) return { our: "Chúng con", you: "Cô/Chú" };
  if (/^anh\/chị(?=\s|$)/.test(s)) return { our: "Chúng em", you: "Anh/Chị" };
  if (/^chú(?=\s|$)/.test(s)) return { our: "Chúng con", you: "Chú" };
  if (/^cô(?=\s|$)/.test(s)) return { our: "Chúng con", you: "Cô" };
  if (/^bác(?=\s|$)/.test(s)) return { our: "Chúng con", you: "Bác" };
  if (/^anh(?=\s|$)/.test(s)) return { our: "Chúng em", you: "Anh" };
  if (/^chị(?=\s|$)/.test(s)) return { our: "Chúng em", you: "Chị" };
  if (/^bạn(?=\s|$)/.test(s)) return { our: "Chúng mình", you: "Bạn" };
  return { our: "Chúng tôi", you: "Bạn" };
}

export function resolveThankYou(template: string, name?: string): string {
  const { our, you } = name ? detectViPronoun(name) : { our: "Chúng tôi", you: "Bạn" };
  return template.replace(/\{\{our\}\}/g, our).replace(/\{\{you\}\}/g, you);
}

// ─── Pronoun Context ─────────────────────────────────────────────────────────
interface PronounContextType {
  pronoun: { our: string; you: string };
  setPronounFromName: (name: string) => void;
}

const PronounContext = createContext<PronounContextType>({
  pronoun: { our: "Chúng tôi", you: "Bạn" },
  setPronounFromName: () => {},
});

export const usePronoun = () => useContext(PronounContext);

// ─── Theme Context ───────────────────────────────────────────────────────────
interface ThemeContextType {
  palette: ColorPalette;
  setPaletteId: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  palette: palettes[0],
  setPaletteId: () => { },
});

// ─── Language Context ────────────────────────────────────────────────────────
interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => { },
  t: en,
});

// ─── Provider ────────────────────────────────────────────────────────────────
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [paletteId, setPaletteId] = useState("savvy_red");
  const [lang, setLang] = useState<Language>("vi");
  const [pronoun, setPronoun] = useState(detectViPronoun(""));

  const setPronounFromName = (name: string) => setPronoun(detectViPronoun(name));

  const palette = palettes.find((p) => p.id === paletteId) ?? palettes[0];
  const t = translationsMap[lang];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-bg", palette.bg);
    root.style.setProperty("--color-bg1", palette.bg1);
    root.style.setProperty("--color-bg2", palette.bg2);
    root.style.setProperty("--color-light", palette.light);
    root.style.setProperty("--color-medium", palette.medium);
    root.style.setProperty("--color-accent", palette.accent);
    root.style.setProperty("--color-primary", palette.primary);
    root.style.setProperty("--color-primary-dim", palette.primaryDim);
    root.style.setProperty("--color-text", palette.text);
    root.style.setProperty("--color-text-muted", palette.textMuted);
    root.style.setProperty("--color-text-light", palette.textLight);
    root.style.setProperty("--color-text-on-dark", palette.textOnDark);
    root.style.setProperty("--color-border", palette.border);
    root.style.setProperty("--color-card-bg", palette.cardBg);
    root.style.setProperty("--color-footer-bg", palette.footerBg);
    root.style.setProperty("--color-countdown-bg", palette.countdownBg);
  }, [palette]);

  return (
    <ThemeContext.Provider value={{ palette, setPaletteId }}>
      <LanguageContext.Provider value={{ lang, setLang, t }}>
        <PronounContext.Provider value={{ pronoun, setPronounFromName }}>
          {children}
        </PronounContext.Provider>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
export const useLang = () => useContext(LanguageContext);

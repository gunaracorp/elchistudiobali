"use client";

import { Download, Mail, MessageCircle } from "lucide-react";
import { Reveal, Magnetic } from "./motion";
import { useSite } from "./locale-provider";
import { track } from "@vercel/analytics/react";

/**
 * Partners (ROADMAP Langkah 23) — B2B page for hotels, travel agents,
 * DMCs and corporate teams. All facts are sourced from the official
 * Corporate Profile PDF (Nov 2026): NIB 2007260087193, KBLI 85520,
 * groups up to 50, client organisations, 19 years of teaching.
 * Commission numbers are NOT published — every scheme is agreed in
 * writing directly with Ms. Elin. The referral code (?ref=) is captured
 * by the booking form and stored with each booking.
 */

/** Official studio WhatsApp — same number as the float widget & paket. */
const STUDIO_WA_NUMBER = "+62 823-3957-0355";
const STUDIO_MAIL = "ptelchistudiobali@gmail.com";
const PROFILE_PDF = "/docs/ELCHI_Studio_Corporate_Profile_EN.pdf";

type PartnerUI = {
  kicker: string;
  title: string;
  sub: string;
  brandsLabel: string;
  brands: string[];
  brandsNote: string;
  packsKicker: string;
  packs: { title: string; sub: string; inc: string[] }[];
  howKicker: string;
  how: string[];
  refTitle: string;
  refBody: string;
  commNote: string;
  waCta: string;
  waText: string;
  mailCta: string;
  pdfCta: string;
  pdfNote: string;
  legal: string;
};

const PARTNERS_UI: Record<string, PartnerUI> = {
  en: {
    kicker: "Partnerships · B2B",
    title: "Bring the Elchí experience to your guests",
    sub: "Hotels, villas, travel agencies, DMCs and corporate teams partner with Elchí Studio Bali for creative workshops their guests actually remember — led personally by founder Elin Kim.",
    brandsLabel: "Workshops proudly held for",
    brands: ["Pinterest", "Bottega Veneta", "Westfield", "Mirvac", "ClassBento", "Korean Cultural Centre AU"],
    brandsNote: "…and City of Parramatta, Fetch TV, Lyka, University of Sydney Union and more — see the corporate profile.",
    packsKicker: "Partner formats",
    packs: [
      {
        title: "Hotels & Villas",
        sub: "Guest experience program",
        inc: [
          "In-studio sessions or in-house activities at your property",
          "Morning or afternoon slots that fit guest itineraries",
          "Every guest leaves with a finished, take-home piece",
        ],
      },
      {
        title: "Travel Agents & DMCs",
        sub: "Scheduled group departures",
        inc: [
          "Group packages for itineraries of 8–50 participants",
          "Six signature classes, all beginner-friendly",
          "Instruction in English, French and Korean",
        ],
      },
      {
        title: "Corporate & Communities",
        sub: "Team building up to 50 guests",
        inc: [
          "Customised creative team-building programs",
          "Track record: Pinterest, Bottega Veneta, Westfield, Mirvac and more",
          "Outcome-first design — everyone finishes a real piece",
        ],
      },
    ],
    howKicker: "How the partnership starts",
    how: [
      "Message the studio on WhatsApp or email — tell us about your guests and volumes.",
      "Ms. Elin confirms availability, formats and your written partnership agreement.",
      "You receive a unique referral code — your guests book and every source is recorded.",
    ],
    refTitle: "Referral tracking, built in",
    refBody: "Every partner gets a unique code. When a guest books through your link — elchistudio.web.id/booking?ref=YOURCODE — the source is stored with the booking automatically. No spreadsheets, no guesswork: commission reporting is based on recorded bookings, and the scheme (per participant or per group) is agreed in writing with Ms. Elin directly.",
    commNote: "Commission schemes are agreed in writing per partnership — confirmed personally by Ms. Elin. No upfront payment for guests.",
    waCta: "WhatsApp the studio",
    waText: "Hello Ms. Elin! We would like to discuss a partnership for our guests with Elchí Studio Bali.",
    mailCta: STUDIO_MAIL,
    pdfCta: "Download the Corporate Profile (PDF)",
    pdfNote: "25 pages — company overview, programs, methodology, portfolio and licensing (NIB 2007260087193, KBLI 85520).",
    legal: "PT Elchi Studio Bali · NIB 2007260087193 · KBLI 85520 · Gg. Puji No. 9B, Tibubeneng, Kuta Utara, Badung, Bali 80361",
  },
  id: {
    kicker: "Kemitraan · B2B",
    title: "Hadirkan pengalaman Elchí untuk tamu Anda",
    sub: "Hotel, vila, agen perjalanan, DMC, dan tim korporat bermitra dengan Elchí Studio Bali untuk lokakarya kreatif yang benar-benar diingat tamu — dipandu langsung oleh pendiri, Elin Kim.",
    brandsLabel: "Lokakarya yang pernah dihelat untuk",
    brands: ["Pinterest", "Bottega Veneta", "Westfield", "Mirvac", "ClassBento", "Korean Cultural Centre AU"],
    brandsNote: "…serta City of Parramatta, Fetch TV, Lyka, University of Sydney Union, dan lainnya — lihat corporate profile.",
    packsKicker: "Format kemitraan",
    packs: [
      {
        title: "Hotel & Vila",
        sub: "Program pengalaman tamu",
        inc: [
          "Sesi di studio atau aktivitas di properti Anda",
          "Slot pagi atau sore yang pas dengan itinerary tamu",
          "Setiap tamu pulang dengan karya jadi yang siap dibawa",
        ],
      },
      {
        title: "Agen Perjalanan & DMC",
        sub: "Keberangkatan grup terjadwal",
        inc: [
          "Paket grup untuk itinerary 8–50 peserta",
          "Enam kelas unggulan, semuanya ramah pemula",
          "Pengajaran dalam bahasa Inggris, Prancis, dan Korea",
        ],
      },
      {
        title: "Korporat & Komunitas",
        sub: "Team building hingga 50 orang",
        inc: [
          "Program team-building kreatif yang disesuaikan",
          "Rekam jejak: Pinterest, Bottega Veneta, Westfield, Mirvac, dan lainnya",
          "Berorientasi hasil — semua peserta menyelesaikan karya nyata",
        ],
      },
    ],
    howKicker: "Cara memulai kemitraan",
    how: [
      "Hubungi studio via WhatsApp atau email — ceritakan tamu dan volume Anda.",
      "Ibu Elin konfirmasi ketersediaan, format, dan perjanjian kemitraan tertulis.",
      "Anda menerima kode referral unik — tamu melakukan booking dan setiap sumber tercatat.",
    ],
    refTitle: "Pelacakan referral sudah terpasang",
    refBody: "Setiap mitra mendapat kode unik. Saat tamu memesan melalui tautan Anda — elchistudio.web.id/booking?ref=KODEANDA — sumbernya otomatis tersimpan di setiap booking. Tanpa spreadsheet, tanpa tebak-tebakan: laporan komisi berdasar booking tercatat, dan skemanya (per peserta atau per grup) disepakati tertulis langsung dengan Ibu Elin.",
    commNote: "Skema komisi disepakati tertulis per kemitraan — dikonfirmasi langsung oleh Ibu Elin. Tamu tidak perlu membayar di muka.",
    waCta: "WhatsApp studio",
    waText: "Halo Ibu Elin! Kami ingin membahas kemitraan untuk tamu kami dengan Elchí Studio Bali.",
    mailCta: STUDIO_MAIL,
    pdfCta: "Unduh Corporate Profile (PDF)",
    pdfNote: "25 halaman — profil perusahaan, program, metodologi, portofolio, dan perizinan (NIB 2007260087193, KBLI 85520).",
    legal: "PT Elchi Studio Bali · NIB 2007260087193 · KBLI 85520 · Gg. Puji No. 9B, Tibubeneng, Kuta Utara, Badung, Bali 80361",
  },
  ko: {
    kicker: "파트너십 · B2B",
    title: "고객님께 엘치 경험을 선사하세요",
    sub: "호텔, 빌라, 여행사, DMC, 기업 팀이 설립자 엘린 김이 직접 진행하는 엘치 스튜디오 발리의 크리에이티브 워크숍으로 손님들에게 잊지 못할 경험을 만듭니다.",
    brandsLabel: "워크숍을 진행한 기관",
    brands: ["Pinterest", "Bottega Veneta", "Westfield", "Mirvac", "ClassBento", "한국문화원 AU"],
    brandsNote: "…그 외 City of Parramatta, Fetch TV, Lyka, 시드니대학 연합 등 — 기업 소개서를 참고하세요.",
    packsKicker: "파트너 프로그램",
    packs: [
      {
        title: "호텔 & 빌라",
        sub: "게스트 익스피리언스 프로그램",
        inc: [
          "스튜디오 방문 또는 숙소 내 활동 진행",
          "일정에 맞는 오전/오후 슬롯",
          "모든 게스트가 완성작을 들고 돌아갑니다",
        ],
      },
      {
        title: "여행사 & DMC",
        sub: "단체 일정 패키지",
        inc: [
          "8–50명 일정에 맞춘 단체 패키지",
          "초보자도 즐기는 6가지 시그니처 클래스",
          "영어 · 프랑스어 · 한국어 진행",
        ],
      },
      {
        title: "기업 & 커뮤니티",
        sub: "최대 50명 팀 빌딩",
        inc: [
          "맞춤형 크리에이티브 팀 빌딩 프로그램",
          "Pinterest · Bottega Veneta · Westfield · Mirvac 등 진행 이력",
          "결과 중심 — 모두가 실제 작품을 완성합니다",
        ],
      },
    ],
    howKicker: "파트너십 시작 방법",
    how: [
      "WhatsApp 또는 이메일로 스튜디오에 문의 — 손님 규모와 일정을 알려주세요.",
      "엘린 김이 가용 일정, 프로그램, 서면 파트너십 계약을 확인합니다.",
      "고유 추천 코드를 드립니다 — 손님이 예약하면 모든 출처가 자동 기록됩니다.",
    ],
    refTitle: "추천 코드 추적이 기본 제공",
    refBody: "모든 파트너에게 고유 코드가 제공됩니다. 손님이 링크(elchistudio.web.id/booking?ref=CODE)로 예약하면 출처가 예약에 자동으로 저장됩니다. 수작업 정리 없이 기록된 예약 기준으로 커미션을 정산하며, 방식(인당/그룹당)은 엘린 김과 서면으로 합의합니다.",
    commNote: "커미션 방식은 파트너십별로 서면 합의 — 엘린 김이 직접 확인합니다. 게스트 예약 시 선결제는 없습니다.",
    waCta: "스튜디오 WhatsApp 문의",
    waText: "안녕하세요 엘린님! Elchí Studio Bali와 게스트 대상 파트너십을 논의하고 싶습니다.",
    mailCta: STUDIO_MAIL,
    pdfCta: "기업 소개서 다운로드 (PDF)",
    pdfNote: "25페이지 — 회사 개요, 프로그램, 교육 방법론, 포트폴리오, 라이선스 (NIB 2007260087193, KBLI 85520).",
    legal: "PT Elchi Studio Bali · NIB 2007260087193 · KBLI 85520 · Gg. Puji No. 9B, Tibubeneng, Kuta Utara, Badung, Bali 80361",
  },
  zh: {
    kicker: "合作伙伴 · B2B",
    title: "把 Elchí 的体验带给您的客人",
    sub: "酒店、别墅、旅行社、DMC 与企业团队与 Elchí Studio Bali 合作，为客人提供真正难忘的创意工作坊——由创始人 Elin Kim 亲自带领。",
    brandsLabel: "曾为之举办工作坊的机构",
    brands: ["Pinterest", "Bottega Veneta", "Westfield", "Mirvac", "ClassBento", "韩国文化院 AU"],
    brandsNote: "……以及 City of Parramatta、Fetch TV、Lyka、悉尼大学学生联合会等——详见企业简介。",
    packsKicker: "合作形式",
    packs: [
      {
        title: "酒店与别墅",
        sub: "宾客体验计划",
        inc: [
          "到访工作室，或在您的物业内举办活动",
          "贴合宾客行程的上午或下午时段",
          "每位宾客都带着亲手完成的成品离开",
        ],
      },
      {
        title: "旅行社与 DMC",
        sub: "固定档期的团体行程",
        inc: [
          "适合 8–50 人行程的团体套餐",
          "六个招牌课程，全部对零基础友好",
          "以英语、法语与韩语授课",
        ],
      },
      {
        title: "企业与社区",
        sub: "最多 50 人的团队建设",
        inc: [
          "量身定制的创意团队建设方案",
          "服务记录：Pinterest、Bottega Veneta、Westfield、Mirvac 等",
          "成果导向——每位成员都完成真实作品",
        ],
      },
    ],
    howKicker: "如何开启合作",
    how: [
      "通过 WhatsApp 或邮箱联系工作室——告诉我们您的客源与规模。",
      "Elin 女士确认档期、形式，并与您签署书面合作协议。",
      "您获得唯一的推荐代码——客人通过您的链接预约，每一笔来源自动记录。",
    ],
    refTitle: "内置推荐追踪",
    refBody: "每位合作伙伴都会获得唯一代码。客人通过您的链接（elchistudio.web.id/booking?ref=您的代码）预约时，来源会自动随预约记录。无需手工整理报表：佣金结算以记录在案的预约为准，具体方案（按人头或按团体）由 Elin 女士书面确认。",
    commNote: "佣金方案按合作伙伴书面约定——由 Elin 女士亲自确认。客人无需预付。",
    waCta: "WhatsApp 联系工作室",
    waText: "您好 Elin 女士！我们希望与 Elchí Studio Bali 商谈面向我们客人的合作。",
    mailCta: STUDIO_MAIL,
    pdfCta: "下载企业简介 (PDF)",
    pdfNote: "25 页——公司概况、课程项目、教学方法、作品集与经营许可（NIB 2007260087193，KBLI 85520）。",
    legal: "PT Elchi Studio Bali · NIB 2007260087193 · KBLI 85520 · Gg. Puji No. 9B, Tibubeneng, Kuta Utara, Badung, Bali 80361",
  },
};

export function Partners() {
  const { locale } = useSite();
  const t = PARTNERS_UI[locale] ?? PARTNERS_UI.en;
  const wa = `https://wa.me/${STUDIO_WA_NUMBER.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(t.waText)}`;

  return (
    <section className="relative mx-auto max-w-6xl px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
      {/* Header */}
      <Reveal>
        <p className="font-monobrand text-[10px] uppercase tracking-[0.3em] text-blush">{t.kicker}</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
          {t.title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-inksoft sm:text-lg">{t.sub}</p>
      </Reveal>

      {/* Client organisations — from the official corporate profile */}
      <Reveal className="mt-10">
        <p className="font-monobrand text-[10px] uppercase tracking-[0.24em] text-inksoft">{t.brandsLabel}</p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {t.brands.map((b) => (
            <span
              key={b}
              className="rounded-full border border-ink/10 bg-white/80 px-4 py-2 font-monobrand text-[10px] uppercase tracking-[0.16em] text-ink"
            >
              {b}
            </span>
          ))}
        </div>
        <p className="mt-3 max-w-2xl text-xs italic text-inksoft/80">{t.brandsNote}</p>
      </Reveal>

      {/* Partner formats */}
      <div className="mt-14">
        <Reveal>
          <p className="font-monobrand text-[10px] uppercase tracking-[0.3em] text-blush">{t.packsKicker}</p>
        </Reveal>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {t.packs.map((p, i) => (
            <Reveal key={p.title} delay={0.08 * i}>
              <div className="h-full rounded-2xl border border-ink/10 bg-white/90 p-6 shadow-[0_2px_14px_rgba(52,35,28,0.06)]">
                <h2 className="font-display text-lg font-bold text-ink">{p.title}</h2>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-rosedeep">{p.sub}</p>
                <ul className="mt-4 space-y-2.5">
                  {p.inc.map((line) => (
                    <li key={line} className="flex gap-2.5 text-sm leading-relaxed text-inksoft">
                      <span aria-hidden className="mt-0.5 text-rose">✦</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* How to start + referral tracking */}
      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-2xl border border-ink/10 bg-white/90 p-6 sm:p-8">
            <p className="font-monobrand text-[10px] uppercase tracking-[0.3em] text-blush">{t.howKicker}</p>
            <ol className="mt-5 space-y-4">
              {t.how.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink font-monobrand text-[11px] font-bold text-cream">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-inksoft">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="h-full rounded-2xl border border-rose/30 bg-cream/60 p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-ink">{t.refTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-inksoft">{t.refBody}</p>
            <p className="mt-4 rounded-xl bg-paper px-4 py-3 text-xs leading-relaxed text-inksoft">{t.commNote}</p>
          </div>
        </Reveal>
      </div>

      {/* Contact CTAs */}
      <Reveal className="mt-14">
        <div className="flex flex-col items-start gap-4 rounded-2xl bg-ink p-6 text-cream sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("partner_whatsapp")}
                className="inline-flex items-center gap-2.5 rounded-full border border-cream/25 bg-cream/10 px-6 py-3 text-sm font-bold text-cream transition-colors hover:border-blush/70 hover:text-blush"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                {t.waCta}
              </a>
            </Magnetic>
            <a
              href={`mailto:${STUDIO_MAIL}?subject=${encodeURIComponent("Elchí Studio Bali — Partnership")}`}
              onClick={() => track("partner_mail")}
              className="inline-flex items-center gap-2.5 rounded-full border border-cream/25 px-6 py-3 text-sm font-bold text-cream transition-colors hover:border-blush/70 hover:text-blush"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {t.mailCta}
            </a>
          </div>
        </div>
        <a
          href={PROFILE_PDF}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("partner_profile_pdf")}
          className="mt-5 inline-flex items-center gap-2.5 rounded-full border-2 border-rose bg-white/80 px-6 py-3 text-sm font-bold text-rosedeep transition-colors hover:bg-rose/10"
        >
          <Download className="h-4 w-4" aria-hidden />
          {t.pdfCta}
        </a>
        <p className="mt-3 max-w-2xl text-xs leading-relaxed text-inksoft/80">{t.pdfNote}</p>
        <p className="mt-8 font-monobrand text-[10px] uppercase tracking-[0.14em] text-inksoft/60">{t.legal}</p>
      </Reveal>
    </section>
  );
}

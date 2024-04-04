import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import Logo from "@/components/logo-provider";
import NavBar from "@/components/navbar-provider";
import { ModeToggle } from "@/components/theme-button";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SearchBar from "@/components/search-bar";

type LayoutProps = {
  params: { locale: string };
  children: React.ReactNode;
};

const inter = Inter({ subsets: ["latin"] });
const seoKeywords = [
  // General Keywords
  "hulu originals",
  "netflix shows",
  "disney plus new releases",
  "hbo max must watch",
  "apple tv+ top rated",
  "comedy movies 2023",
  "action thrillers",
  "best sci-fi series",
  "romantic dramas",
  "documentaries 2024",
  "oscar nominated movies",
  "golden globe winning series",
  "critically acclaimed shows",
  "binge-worthy shows",
  "movies to watch with friends",
  "tearjerker films",
  "feel-good comedies",
  '"Stranger Things" season 5 theories',
  '"The Batman" reviews',
  '"Wednesday" Addams release date',
  "new movies with [actor's name]",
  "films directed by [director's name]",
  "hulu christmas movies",
  "netflix true crime documentaries",
  "disney+ marvel series",
  "upcoming horror movies 2024",
  "best animated films of 2023",
  "best psychological thriller movies on netflix for adults",
  "documentaries about climate change for kids on hulu",
  "animated films with strong female leads",
];
export const metadata: Metadata = {
  title: "JC-Movies",
  description: "Created By JamesCicada",
  icons: {
    icon: "logo.png",
  },
  keywords: [
    "movies",
    "Netflix",
    "Series",
    "Watch for free",
    "Jc-Movies",
    ...seoKeywords,
  ],
  openGraph: {
    title: "JC-Movies",
    description:
      "Watch Movies and TV Shows for Free No annoying ads no tracking. JC-Movies",
    url: "https://jc-movies.vercel.app/",
    siteName: "JC-Movies",
    images: [
      {
        url: "https://jc-movies.vercel.app/logo.png",
        width: 500,
        height: 500,
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

const kofi = `<script type='text/javascript' src='https://storage.ko-fi.com/cdn/widget/Widget_2.js'></script><script type='text/javascript'>kofiwidget2.init('Support JC-Movies', '#300066', 'U6U8WFUVX');kofiwidget2.draw();</script>`;

const GAnalytics = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-SJRYMDF8G5"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-SJRYMDF8G5');
</script>`;

export default function RootLayout({ params, children }: LayoutProps) {
  const { locale } = params;

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <div dangerouslySetInnerHTML={{ __html: GAnalytics }} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex justify-center space-x-2 items-center bg-white dark:bg-gray-900 px-4 py-2 shadow-md">
            <Logo />
            <NavBar />
            <SearchBar />
            <div className="w-fit">
              <ModeToggle />
            </div>
          </div>
          <div>{children}</div>
          <SpeedInsights />
        </ThemeProvider>
        <footer className="bg-gray-800/50 text-white text-center py-4">
          <div
            className="fixed bottom-5 left-5 z-10"
            dangerouslySetInnerHTML={{ __html: kofi }}
          ></div>
          <div className="container mx-auto">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} JC-Movies. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
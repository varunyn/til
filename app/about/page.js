import Image from "next/image";
import { Link } from "next-view-transitions";
import {
  FaArrowUpRightFromSquare,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaSquareXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import IconCheck from "../../components/icon-check";
import ProjectCard from "../../components/project-card";
import { getAllProjects } from "../../lib/work";

export const metadata = {
  title: "About - Varun Yadav",
  description:
    "Learn more about Varun Yadav, a Cloud Engineer focused on cloud, automation, and practical technical demos.",
  alternates: {
    canonical: "https://til.varunyadav.com/about",
  },
};

const CONTRIBUTION_LEVEL_REGEX = /\d$/u;

const githubContributionGrid = [
  ["a0", "b2", "c1", "d2", "e3", "f0", "g2", "h2", "i1", "j3", "k2", "l0"],
  ["m1", "n3", "o2", "p0", "q3", "r2", "s4", "t1", "u2", "v3", "w0", "x2"],
  [
    "y0",
    "z2",
    "aa0",
    "ab2",
    "ac2",
    "ad3",
    "ae2",
    "af0",
    "ag3",
    "ah1",
    "ai2",
    "aj3",
  ],
  [
    "ak2",
    "al3",
    "am2",
    "an1",
    "ao0",
    "ap2",
    "aq4",
    "ar3",
    "as2",
    "at2",
    "au1",
    "av0",
  ],
  [
    "aw0",
    "ax1",
    "ay3",
    "az0",
    "ba2",
    "bb1",
    "bc0",
    "bd4",
    "be1",
    "bf0",
    "bg2",
    "bh1",
  ],
];

const getContributionLevel = (cell) =>
  Number(cell.match(CONTRIBUTION_LEVEL_REGEX)?.[0] ?? 0);

const getContributionClassName = (cell) => {
  const level = getContributionLevel(cell);

  switch (level) {
    case 4:
      return "bg-emerald-600 dark:bg-emerald-400";
    case 3:
      return "bg-emerald-500 dark:bg-emerald-500";
    case 2:
      return "bg-emerald-300 dark:bg-emerald-700";
    case 1:
      return "bg-emerald-200 dark:bg-emerald-800";
    default:
      return "bg-gray-200 dark:bg-gray-700";
  }
};

const socialLinks = [
  {
    label: "X",
    href: "https://twitter.com/varun1_yadav",
    Icon: FaSquareXTwitter,
    preview: (
      <div className="w-[17rem] p-4 text-left">
        <div className="mb-3 flex items-start justify-between">
          <Image
            alt=""
            className="h-14 w-14 rounded-full object-cover"
            height={56}
            src="/avatar.png"
            width={56}
          />
          <span className="rounded-full bg-gray-950 px-3 py-2 font-semibold text-white text-xs dark:bg-white dark:text-gray-950">
            Follow
          </span>
        </div>
        <p className="font-bold text-gray-950 text-lg leading-none dark:text-white">
          Varun Yadav
        </p>
        <p className="mt-1 text-gray-500 text-sm dark:text-gray-400">
          @varun1_yadav
        </p>
        <p className="mt-3 text-gray-700 text-sm leading-snug dark:text-gray-300">
          Cloud notes, homelab experiments, and small useful things from the
          internet.
        </p>
      </div>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/varuncs/",
    Icon: FaLinkedin,
    preview: (
      <div className="w-[17rem] p-4 text-left">
        <p className="font-bold text-gray-950 text-lg dark:text-white">
          Varun Yadav
        </p>
        <p className="text-gray-500 text-sm dark:text-gray-400">
          Cloud Engineer
        </p>
        <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">
          <p className="font-semibold text-gray-900 text-sm dark:text-gray-100">
            Building scalable systems
          </p>
          <p className="mt-1 text-gray-600 text-sm leading-snug dark:text-gray-300">
            Infrastructure, automation, and practical cloud architecture.
          </p>
        </div>
      </div>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/varunyn",
    Icon: FaGithub,
    preview: (
      <div className="w-[18rem] p-4 text-left">
        <div className="mb-3 flex items-center justify-between">
          <FaGithub
            aria-hidden="true"
            className="h-5 w-5 text-gray-700 dark:text-gray-300"
          />
          <p className="text-gray-500 text-sm dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              Active
            </span>{" "}
            this year
          </p>
        </div>
        <div aria-hidden="true" className="grid grid-cols-12 gap-[3px]">
          {githubContributionGrid.map((week) =>
            week.map((cell) => (
              <span
                className={`h-3.5 w-3.5 rounded-[3px] ${getContributionClassName(
                  cell
                )}`}
                key={cell}
              />
            ))
          )}
        </div>
        <p className="mt-3 text-gray-600 text-sm dark:text-gray-300">
          Notes, experiments, and open source odds and ends.
        </p>
      </div>
    ),
  },
  {
    label: "Email",
    href: "mailto:hi@varunyadav.com",
    Icon: FaEnvelope,
  },
];

const technicalFocus = [
  "OCI",
  "Oracle Integration",
  "Visual Builder",
  "API Gateway",
  "Automation",
  "AI Apps",
];

const workVideos = [
  {
    title:
      "AI-Powered Invoice Validation and Processing with Oracle Integration Cloud and Private Agent Factory",
    href: "https://www.youtube.com/watch?v=cV_A2T6NJPU",
    topic: "Oracle Integration Cloud",
  },
  {
    title: "Creating Custom Events in Visual Builder Cloud Service",
    href: "https://youtube.com/watch?v=5BTZg5bIz7o",
    topic: "Visual Builder",
  },
  {
    title: "Shredding and Querying in Visual Builder with the Offline Toolkit",
    href: "https://youtube.com/watch?v=p6xwiKpkEpg",
    topic: "Offline Toolkit",
  },
  {
    title:
      "How to Upload, Download, and Preview Object Storage Files in Oracle Visual Builder Cloud Service",
    href: "https://youtube.com/watch?v=_YZguCWmQws",
    topic: "Object Storage",
  },
  {
    title:
      "Build an OCI AI Speech-to-Text App Using Visual Builder and Functions",
    href: "https://youtube.com/watch?v=9-KiORugqGc",
    topic: "OCI AI",
  },
  {
    title:
      "How to Send Push Notifications to VBCS PWA with Node.js and API Gateway",
    href: "https://youtube.com/watch?v=f7H1STOH-cM",
    topic: "PWA",
  },
  {
    title: "How to Create Usage Plans for Oracle API Gateway",
    href: "https://youtube.com/watch?v=6oArcvNz1qY",
    topic: "API Gateway",
  },
  {
    title: "How to Implement 2 Legged OAuth in API Gateway",
    href: "https://youtube.com/watch?v=-DD_2FzGQPs",
    topic: "OAuth",
  },
  {
    title: "Deploy and Get Started with Oracle Private Agent Factory on OCI",
    href: "https://youtube.com/watch?v=cg0mg4mWEZc",
    topic: "Private Agent Factory",
  },
  {
    title: "How to Build a Visual Builder Form with Process Automation",
    href: "https://youtube.com/watch?v=m1tyBqmLIQo",
    topic: "Process Automation",
  },
];

export default function About() {
  const featuredProjects = getAllProjects().slice(0, 3);

  return (
    <div className="py-10 sm:py-14 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="mb-8 grid items-end gap-6 md:grid-cols-[auto_1fr] md:text-left">
            <div className="relative mx-auto inline-block md:mx-0">
              <div className="rounded-full bg-sorbus-100 p-2 ring-1 ring-sorbus-200 dark:bg-sorbus-950/40 dark:ring-sorbus-900">
                <Image
                  alt="Varun Yadav"
                  className="rounded-full shadow-lg"
                  height={112}
                  priority
                  src="/avatar.png"
                  width={112}
                />
              </div>
              <div className="absolute right-2 bottom-2 h-5 w-5 rounded-full border-3 border-page-bg bg-green-500 dark:border-darkgrey" />
            </div>

            <div className="text-center md:text-left">
              <p className="mb-2 font-semibold text-sm text-sorbus-700 dark:text-sorbus-300">
                Cloud Engineer
              </p>
              <h1 className="mb-3 font-bold text-4xl text-gray-950 tracking-normal sm:text-5xl dark:text-white">
                Hi, I&apos;m Varun Yadav
              </h1>
              <p className="mx-auto max-w-2xl text-gray-700 text-lg leading-relaxed md:mx-0 dark:text-gray-300">
                I build cloud systems, automation workflows, and practical demos
                that make complex infrastructure easier to use and explain.
              </p>

              {/* Social Links */}
              <div className="relative z-10 mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
                {socialLinks.map(({ href, Icon, label, preview }) => (
                  <div className="group/social relative" key={href}>
                    <Link
                      className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-white/80 px-3.5 py-2 font-medium text-gray-700 text-sm shadow-sm ring-1 ring-gray-200 transition-[background-color,box-shadow,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-gray-950 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sorbus-500 focus-visible:ring-offset-2 dark:bg-gray-800/80 dark:text-gray-200 dark:ring-gray-700 dark:hover:bg-gray-800 dark:hover:text-white"
                      href={href}
                      rel={
                        href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      target={href.startsWith("http") ? "_blank" : undefined}
                    >
                      <Icon aria-hidden="true" className="h-4 w-4" />
                      <span>{label}</span>
                    </Link>
                    {preview ? (
                      <div className="pointer-events-none fixed top-72 right-4 left-4 mt-2 flex origin-top translate-y-2 scale-95 justify-center overflow-hidden rounded-lg border border-gray-200 bg-white opacity-0 shadow-[0_16px_40px_rgba(0,0,0,0.14)] blur-sm transition-[opacity,transform,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-focus-within/social:pointer-events-auto group-focus-within/social:translate-y-0 group-focus-within/social:scale-100 group-focus-within/social:opacity-100 group-focus-within/social:blur-none group-hover/social:pointer-events-auto group-hover/social:translate-y-0 group-hover/social:scale-100 group-hover/social:opacity-100 group-hover/social:blur-none sm:absolute sm:top-full sm:right-auto sm:left-1/2 sm:-translate-x-1/2 dark:border-gray-700 dark:bg-gray-900">
                        {preview}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid items-start gap-4 md:grid-cols-2">
            {/* About Section */}
            <div className="h-full rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-3 flex items-center gap-2 font-bold text-gray-900 text-lg dark:text-white">
                <span className="h-2.5 w-2.5 rounded-full bg-sorbus-500" />
                About Me
              </h2>
              <p className="mb-3 text-gray-600 text-sm leading-relaxed dark:text-gray-300">
                I&apos;m a Cloud Engineer who loves building scalable solutions
                and exploring new technologies. When I&apos;m not coding, you
                can find me sharing knowledge through blog posts and
                contributing to open source projects.
              </p>
              <p className="border-gray-200 border-t pt-3 text-gray-600 text-sm leading-relaxed dark:border-gray-700 dark:text-gray-300">
                What I&apos;ve learned from the community, I try to give back
                through writing, open source contributions, and technical
                walkthroughs.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {technicalFocus.map((item) => (
                  <span
                    className="rounded-md bg-sorbus-50 px-2.5 py-1 font-medium text-sorbus-800 text-xs dark:bg-sorbus-950/40 dark:text-sorbus-200"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            {/* Bucket List Section */}
            <div className="h-full rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-3 flex items-center gap-2 font-bold text-gray-900 text-lg dark:text-white">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                Bucket List
              </h2>
              <div className="space-y-2">
                <div className="flex min-h-[44px] items-center gap-2 rounded-md bg-green-50 px-3 py-2 dark:bg-green-900/20">
                  <IconCheck />
                  <span className="text-gray-700 text-sm line-through dark:text-gray-300">
                    Travel to Japan
                  </span>
                  <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-green-800 text-xs dark:bg-green-800 dark:text-green-200">
                    ✓
                  </span>
                </div>
                <div className="flex min-h-[44px] items-center gap-2 rounded-md bg-green-50 px-3 py-2 dark:bg-green-900/20">
                  <IconCheck />
                  <span className="text-gray-700 text-sm line-through dark:text-gray-300">
                    Skydive Above Dubai
                  </span>
                  <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-green-800 text-xs dark:bg-green-800 dark:text-green-200">
                    ✓
                  </span>
                </div>
                <div className="flex min-h-[44px] items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="h-4 w-4 rounded border-2 border-gray-300 dark:border-gray-600" />
                  <span className="text-gray-700 text-sm dark:text-gray-300">
                    See Northern Lights
                  </span>
                </div>
              </div>
            </div>
            {/* Selected Work Section */}
            {featuredProjects.length ? (
              <div className="pt-4 md:col-span-2">
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="flex items-center gap-2 font-bold text-gray-900 text-xl dark:text-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-sorbus-500" />
                      What I&apos;ve shipped
                    </h2>
                    <p className="mt-2 max-w-2xl text-gray-600 text-sm leading-relaxed dark:text-gray-300">
                      Selected cloud apps, integration patterns, and technical
                      demos with detail pages.
                    </p>
                  </div>
                  <Link
                    className="inline-flex min-h-11 w-fit touch-manipulation items-center rounded-md border border-gray-200 bg-white/70 px-3.5 py-2 font-medium text-gray-700 text-sm transition-[background-color,border-color,color] duration-200 ease-out [-webkit-tap-highlight-color:transparent] hover:border-sorbus-200 hover:bg-sorbus-50 hover:text-sorbus-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sorbus-500 focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-200 dark:focus-visible:ring-sorbus-400 dark:focus-visible:ring-offset-darkgrey dark:hover:border-sorbus-800 dark:hover:bg-sorbus-950/35 dark:hover:text-sorbus-200"
                    href="/work"
                  >
                    View all work
                  </Link>
                </div>
                <div className="grid gap-3 lg:grid-cols-3">
                  {featuredProjects.map((project) => (
                    <ProjectCard compact key={project.slug} project={project} />
                  ))}
                </div>
              </div>
            ) : null}
            {/* Videos Section */}
            <div className="pt-4 md:col-span-2">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="flex items-center gap-2 font-bold text-gray-900 text-xl dark:text-white">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-200">
                      <FaYoutube aria-hidden="true" className="h-3.5 w-3.5" />
                    </span>
                    Work Videos
                  </h2>
                  <p className="mt-2 max-w-2xl text-gray-600 text-sm leading-relaxed dark:text-gray-300">
                    Technical demos and walkthroughs I have published over the
                    years.
                  </p>
                </div>
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 font-semibold text-red-700 text-xs dark:bg-red-950/40 dark:text-red-200">
                  <FaYoutube aria-hidden="true" className="h-3.5 w-3.5" />
                  {workVideos.length} videos
                </span>
              </div>
              <div className="grid gap-3 lg:grid-cols-2">
                {workVideos.map(({ href, title, topic }) => (
                  <Link
                    className="group/video flex min-h-[88px] items-start gap-3 rounded-lg border border-gray-200 bg-white p-3.5 shadow-sm transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50/30 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-red-900 dark:hover:bg-gray-900"
                    href={href}
                    key={href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-200">
                      <FaYoutube aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-gray-900 text-sm leading-snug dark:text-gray-100">
                        {title}
                      </span>
                      <span className="mt-2 inline-flex items-center gap-1.5 text-gray-500 text-xs dark:text-gray-400">
                        {topic}
                        <FaArrowUpRightFromSquare
                          aria-hidden="true"
                          className="h-3 w-3 transition-transform group-hover/video:translate-x-0.5 group-hover/video:-translate-y-0.5"
                        />
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-projects",
          title: "projects",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-",
          title: "",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "projects-aviation-vr-training-platform",
          title: 'Aviation VR Training Platform',
          description: "Senior Unity/VR Developer",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project.html";
            },},{id: "projects-standalone-vr-gaming-wheel-support",
          title: 'Standalone VR Gaming Wheel Support',
          description: "Industry-First Native USB Force Feedback Wheel Driver for Meta Quest",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project.html";
            },},{id: "projects-industrial-vr-safety-training-solutions",
          title: 'Industrial VR Safety Training Solutions',
          description: "Lead Unity Developer",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project.html";
            },},{id: "projects-vr-roguelike-tower-defense-shooter",
          title: 'VR Roguelike Tower Defense Shooter',
          description: "Solo Unity Developer",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project.html";
            },},{id: "projects-reabell-vr-space-game-development",
          title: 'Reabell - VR Space Game Development',
          description: "My first VR project",
          section: "Projects",handler: () => {
              window.location.href = "/projects/reabell_project.html";
            },},{id: "projects-varwin-no-code-vr-platform-development",
          title: 'Varwin - No-Code VR Platform Development',
          description: "Middle Unity C# Developer",
          section: "Projects",handler: () => {
              window.location.href = "/projects/varwin_project.html";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%73%6B%61%70%65%72.%72%74%74@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/daniil-rostovsky-99457a149", "_blank");
        },
      },{
        id: 'social-telegram',
        title: 'telegram',
        section: 'Socials',
        handler: () => {
          window.open("https://telegram.me/skaper_ssd", "_blank");
        },
      },{
        id: 'social-whatsapp',
        title: 'whatsapp',
        section: 'Socials',
        handler: () => {
          window.open("https://wa.me/817085105939", "_blank");
        },
      },{
        id: 'social-custom_social_line',
        title: 'Custom_social_line',
        section: 'Socials',
        handler: () => {
          window.open("https://line.me/ti/p/ZpGhmwdJK2", "_blank");
        },
      },{
        id: 'social-custom_social_itch',
        title: 'Custom_social_itch',
        section: 'Socials',
        handler: () => {
          window.open("https://skaperdev.itch.io/", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];

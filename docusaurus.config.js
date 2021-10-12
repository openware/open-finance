const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'Open Finance Protocol',
  tagline: 'Network of sharded orderbook for Ultra-High-Frequency-Trading',
  url: 'https://www.open-finance.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'openware', // Usually your GitHub org/user name.
  projectName: 'open-finance', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/openware/open-finance/edit/master/',
          remarkPlugins: [require('mdx-mermaid')],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Open Finance',
        logo: {
          alt: 'Open Finance Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Protocol.',
          },
          {to: '/blog', label: 'Blogs.', position: 'left'},
          {to: 'https://www.custody.org', label: 'Custody.', position: 'left'},
          {
            href: 'https://github.com/openware/open-finance',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Protocol',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/open-finance',
              },
              {
                label: 'Telegram',
                href: 'https://t.me/yellow_defi',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/openwarecom',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Custody',
                href: 'https://www.custody.org/',
              },
              {
                label: 'Openware',
                href: 'https://www.openware.com/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/openware/open-finance',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Openware Inc, Open Source and Community driven.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
});

import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'High Performance protocol',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        The OFP is designed with the flexibility of JSON or MsgPack,
        But is compact and over persistent connections such as HTTP2 or WS
      </>
    ),
  },
  {
    title: 'Cross-Chain and Blockchain agnostic',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Protocol has been design for modern FinTech to interact with all web3 compatible blockchains
        you can comment our protocol described in <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Global Trade and Settlement network',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        The protocol describe and suggest how the Finance can upgrade to take advantage
        of the blockchain technologies for improving the legacy infrastructure.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

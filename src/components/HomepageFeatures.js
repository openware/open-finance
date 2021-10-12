import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'High Performance protocol',
    Svg: require('../../static/img/high-perf.svg').default,
    description: (
      <>
        The Open Finance Protocol (OFP) is designed to empower the flexibility of JSON or MsgPack. It is
        compact, and used over persistent connections such as HTTP2 or WebSocket.
      </>
    ),
  },
  {
    title: 'Cross-Chain and Blockchain agnostic',
    Svg: require('../../static/img/cross.svg').default,
    description: (
      <>
        Protocol has been designed for modern FinTech to interact with all web3 compatible blockchains.
        You can comment our protocol described in <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Global Trade and Settlement network',
    Svg: require('../../static/img/global.svg').default,
    description: (
      <>
        The protocol describes and suggests how the Finance can upgrade to take advantage
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
